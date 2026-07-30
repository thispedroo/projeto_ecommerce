const CART_KEY = 'urubu_cart';

function getCart() {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function formatBRL(value) {
    return 'R$ ' + value.toFixed(2).replace('.', ',');
}

function updateCartBadge() {
    const badge = document.getElementById('cart-badge');
    if (!badge) return;
    const totalQty = getCart().reduce((sum, item) => sum + item.qty, 0);
    badge.textContent = totalQty;
    badge.classList.toggle('visible', totalQty > 0);
}

function showToast(message) {
    let toast = document.getElementById('cart-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'cart-toast';
        toast.className = 'cart-toast';
        document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.remove('show');
    void toast.offsetWidth;
    toast.classList.add('show');

    clearTimeout(toast._hideTimeout);
    toast._hideTimeout = setTimeout(() => toast.classList.remove('show'), 2500);
}

function addToCart(name, price, img) {
    const cart = getCart();
    const existing = cart.find(item => item.name === name);
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ name, price, img, qty: 1 });
    }
    saveCart(cart);
    updateCartBadge();
    showToast(name + ' adicionado ao carrinho!');
}

function removeFromCart(name) {
    let cart = getCart();
    cart = cart.filter(item => item.name !== name);
    saveCart(cart);
    updateCartBadge();
    renderCartPage();
}

function changeQty(name, delta) {
    const cart = getCart();
    const item = cart.find(i => i.name === name);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) {
        return removeFromCart(name);
    }
    saveCart(cart);
    updateCartBadge();
    renderCartPage();
}

function renderCartPage() {
    const container = document.getElementById('cart-items');
    if (!container) return;

    const cart = getCart();
    const emptyState = document.getElementById('cart-empty');
    const layout = document.getElementById('cart-layout');

    if (cart.length === 0) {
        if (emptyState) emptyState.style.display = 'block';
        if (layout) layout.style.display = 'none';
        return;
    }

    if (emptyState) emptyState.style.display = 'none';
    if (layout) layout.style.display = 'flex';

    container.innerHTML = '';
    let subtotal = 0;

    cart.forEach(item => {
        subtotal += item.price * item.qty;

        const row = document.createElement('div');
        row.className = 'cart-item';
        row.innerHTML = `
            <img src="${item.img}" alt="${item.name}" class="cart-item-img">
            <div class="cart-item-info">
                <p class="cart-item-name">${item.name}</p>
                <p class="cart-item-price">${formatBRL(item.price)}</p>
            </div>
            <div class="cart-item-qty">
                <button class="qty-btn minus" aria-label="Diminuir quantidade">-</button>
                <span class="qty-value">${item.qty}</span>
                <button class="qty-btn plus" aria-label="Aumentar quantidade">+</button>
            </div>
            <p class="cart-item-total">${formatBRL(item.price * item.qty)}</p>
            <button class="cart-item-remove" aria-label="Remover item"><i class="fa-solid fa-trash"></i></button>
        `;

        row.querySelector('.minus').addEventListener('click', () => changeQty(item.name, -1));
        row.querySelector('.plus').addEventListener('click', () => changeQty(item.name, 1));
        row.querySelector('.cart-item-remove').addEventListener('click', () => {
            row.classList.add('removing');
            setTimeout(() => removeFromCart(item.name), 200);
        });

        container.appendChild(row);
    });

    const subtotalEl = document.getElementById('cart-subtotal');
    if (subtotalEl) subtotalEl.textContent = formatBRL(subtotal);
}

function initAddToCartButtons() {
    document.querySelectorAll('.add-to-cart-btn').forEach(function (btn) {
        if (btn.dataset.bound === 'true') return;
        btn.dataset.bound = 'true';

        btn.addEventListener('click', function () {
            const name = this.dataset.name;
            const price = parseFloat(this.dataset.price);
            const img = this.dataset.img;

            addToCart(name, price, img);

            const originalHTML = this.innerHTML;
            this.classList.add('added');
            this.innerHTML = '<i class="fa-solid fa-check"></i> Adicionado';
            setTimeout(() => {
                this.classList.remove('added');
                this.innerHTML = originalHTML;
            }, 1200);

            const cartLink = document.getElementById('cart-link');
            if (cartLink) {
                cartLink.classList.add('bump');
                setTimeout(() => cartLink.classList.remove('bump'), 400);
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', function () {
    updateCartBadge();
    renderCartPage();

    initAddToCartButtons();

    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function () {
            if (getCart().length === 0) return;
            saveCart([]);
            updateCartBadge();
            renderCartPage();
            showToast('Compra simulada finalizada — obrigado! (protótipo, sem pagamento real)');
        });
    }
});
