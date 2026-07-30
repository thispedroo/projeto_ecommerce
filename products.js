const PRODUCTS = [
    { name: "Galaxy M13 (4GB | 64 GB)", brand: "Samsung", price: 659, oldPrice: 1499, discount: "56% OFF", img: "img/galaxy-m13.png" },
    { name: "Galaxy M33 (4GB | 64 GB)", brand: "Samsung", price: 1699, oldPrice: 2499, discount: "32% OFF", img: "img/galaxy-m33.png" },
    { name: "Galaxy M53 (4GB | 64 GB)", brand: "Samsung", price: 3197, oldPrice: 4099, discount: "22% OFF", img: "img/galaxy-m53.png" },
    { name: "Galaxy S22 Ultra (12GB | 128 GB)", brand: "Samsung", price: 6793, oldPrice: 8599, discount: "21% OFF", img: "img/samsung-s22-ultra.png" },
    { name: "iPhone 13 (128 GB)", brand: "Apple", price: 3999, oldPrice: 5499, discount: "27% OFF", img: "img/iphone-13.png" },
    { name: "iPhone 12 (64 GB)", brand: "Apple", price: 2899, oldPrice: 3999, discount: "27% OFF", img: "img/iphone-12.png" },
    { name: "Redmi Note 12 (128 GB)", brand: "Xiaomi", price: 1199, oldPrice: 1699, discount: "29% OFF", img: "img/redmi-note-12.png" },
    { name: "Poco X5 (256 GB)", brand: "Xiaomi", price: 1599, oldPrice: 2199, discount: "27% OFF", img: "img/poco-x5.png" },
    { name: "Zenfone 9 (128 GB)", brand: "Asus", price: 2999, oldPrice: 3799, discount: "21% OFF", img: "img/zenfone-9.png" },
    { name: "Realme GT Neo 3 (256 GB)", brand: "Realme", price: 2199, oldPrice: 2899, discount: "24% OFF", img: "img/realme-gt-neo-3.png" },
];

function formatBRLProduct(value) {
    return 'R$ ' + value.toLocaleString('pt-BR');
}

function renderProductCard(product) {
    const savings = product.oldPrice - product.price;
    const imageHtml = product.img
        ? `<img src="${product.img}" alt="${product.name}" class="product-image">`
        : `<div class="product-image-placeholder"><i class="fa-solid fa-mobile-screen-button"></i></div>`;

    return `
        <div class="product-card" data-brand="${product.brand}">
            <div class="discount-badge">${product.discount}</div>
            <div class="product-image-container">
                ${imageHtml}
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <div class="product-pricing">
                    <span class="current-price">${formatBRLProduct(product.price)}</span>
                    <s class="original-price">${formatBRLProduct(product.oldPrice)}</s>
                </div>
                <div class="product-savings">
                    Economia de ${formatBRLProduct(savings)}
                </div>
                <button class="add-to-cart-btn" data-name="${product.name}" data-price="${product.price}" data-img="${product.img || ''}">
                    <i class="fa-solid fa-cart-plus"></i> Adicionar ao carrinho
                </button>
            </div>
        </div>
    `;
}

function renderProducts(filterBrand) {
    const grid = document.getElementById('all-products-grid');
    if (!grid) return;

    const filtered = filterBrand && filterBrand !== 'Todos'
        ? PRODUCTS.filter(p => p.brand === filterBrand)
        : PRODUCTS;

    grid.innerHTML = filtered.map(renderProductCard).join('');
    initAddToCartButtons();
}

function setupBrandFilters() {
    const buttons = document.querySelectorAll('.brand-filter-btn');
    if (buttons.length === 0) return;

    buttons.forEach(btn => {
        btn.addEventListener('click', function () {
            buttons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            renderProducts(this.dataset.brand);
        });
    });
}

document.addEventListener('DOMContentLoaded', function () {
    if (!document.getElementById('all-products-grid')) return;

    const params = new URLSearchParams(window.location.search);
    const marcaParam = params.get('marca');

    setupBrandFilters();

    if (marcaParam) {
        const targetBtn = document.querySelector(`.brand-filter-btn[data-brand="${marcaParam}"]`);
        if (targetBtn) {
            document.querySelectorAll('.brand-filter-btn').forEach(b => b.classList.remove('active'));
            targetBtn.classList.add('active');
            renderProducts(marcaParam);
        } else {
            renderProducts('Todos');
        }
    } else {
        renderProducts('Todos');
    }
});
