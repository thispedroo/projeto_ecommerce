const PRODUCTS = [
    { id: "galaxy-m13", name: "Galaxy M13 (4GB | 64 GB)", brand: "Samsung", price: 659, oldPrice: 1499, discount: "56% OFF", img: "img/galaxy-m13.png", description: "• Tela: 6.6\" FHD+ <br>• RAM: 4GB <br>• Armazenamento: 64GB <br>• Câmeras: Traseira Tripla (Principal 50MP) <br>• Bateria: 5000 mAh" },
    { id: "galaxy-m33", name: "Galaxy M33 (4GB | 64 GB)", brand: "Samsung", price: 1699, oldPrice: 2499, discount: "32% OFF", img: "img/galaxy-m33.png", description: "• Tela: 6.6\" 120Hz <br>• Conexão: 5G <br>• RAM: 4GB <br>• Armazenamento: 64GB <br>• Câmeras: Quádrupla (Principal 50MP) <br>• Bateria: 5000 mAh" },
    { id: "galaxy-m53", name: "Galaxy M53 (4GB | 64 GB)", brand: "Samsung", price: 3197, oldPrice: 4099, discount: "22% OFF", img: "img/galaxy-m53.png", description: "• Tela: 6.7\" Super AMOLED Plus 120Hz <br>• Conexão: 5G <br>• RAM: 4GB <br>• Armazenamento: 64GB <br>• Câmeras: Principal de 108MP <br>• Bateria: 5000 mAh" },
    { id: "samsung-s22-ultra", name: "Galaxy S22 Ultra (12GB | 128 GB)", brand: "Samsung", price: 6793, oldPrice: 8599, discount: "21% OFF", img: "img/samsung-s22-ultra.png", description: "• Tela: 6.8\" Dynamic AMOLED 2X <br>• Processador: Snapdragon 8 Gen 1 <br>• RAM: 12GB <br>• Armazenamento: 128GB <br>• Câmeras: 108MP (Nightography e Space Zoom) <br>• Extra: S Pen embutida" },
    { id: "iphone-13", name: "iPhone 13 (128 GB)", brand: "Apple", price: 3999, oldPrice: 5499, discount: "27% OFF", img: "img/iphone-13.png", description: "• Tela: 6.1\" Super Retina XDR <br>• Processador: A15 Bionic <br>• Armazenamento: 128GB <br>• Câmeras: Dupla 12MP (Modo Cinema) <br>• Face ID: Sim" },
    { id: "iphone-12", name: "iPhone 12 (64 GB)", brand: "Apple", price: 2899, oldPrice: 3999, discount: "27% OFF", img: "img/iphone-12.png", description: "• Tela: 6.1\" Super Retina XDR <br>• Conexão: 5G <br>• Processador: A14 Bionic <br>• Armazenamento: 64GB <br>• Câmeras: Dupla 12MP (Modo Noite)" },
    { id: "redmi-note-12", name: "Redmi Note 12 (128 GB)", brand: "Xiaomi", price: 1199, oldPrice: 1699, discount: "29% OFF", img: "img/redmi-note-12.png", description: "• Tela: 6.67\" AMOLED 120Hz <br>• Processador: Snapdragon <br>• Armazenamento: 128GB <br>• Câmeras: Tripla (Principal 50MP) <br>• Bateria: 5000 mAh (Carga de 33W)" },
    { id: "poco-x5", name: "Poco X5 (256 GB)", brand: "Xiaomi", price: 1599, oldPrice: 2199, discount: "27% OFF", img: "img/poco-x5.png", description: "• Tela: AMOLED 120Hz <br>• Conexão: 5G <br>• Processador: Snapdragon Série 6 <br>• Armazenamento: 256GB <br>• Bateria: 5000 mAh" },
    { id: "zenfone-9", name: "Zenfone 9 (128 GB)", brand: "Asus", price: 2999, oldPrice: 3799, discount: "21% OFF", img: "img/zenfone-9.png", description: "• Tela: 5.9\" AMOLED (Design Compacto) <br>• Processador: Snapdragon 8+ Gen 1 <br>• Armazenamento: 128GB <br>• Câmeras: Dupla 50MP (Gimbal 6 Eixos) <br>• Bateria: 4300 mAh" },
    { id: "realme-gt-neo-3", name: "Realme GT Neo 3 (256 GB)", brand: "Realme", price: 2199, oldPrice: 2899, discount: "24% OFF", img: "img/realme-gt-neo-3.png", description: "• Tela: AMOLED 120Hz <br>• Conexão: 5G <br>• Processador: Dimensity 8100 <br>• Armazenamento: 256GB <br>• Câmeras: Principal 50MP (Sensor Sony) <br>• Bateria: Carregamento SuperDart" },
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
            <a href="produto.html?id=${product.id}" class="product-image-container">
                ${imageHtml}
            </a>
            <div class="product-info">
                <h3 class="product-title"><a href="produto.html?id=${product.id}">${product.name}</a></h3>
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

let currentSearchTerm = '';

function renderProducts(filterBrand, searchTerm) {
    const grid = document.getElementById('all-products-grid');
    if (!grid) return;

    if (typeof searchTerm !== 'undefined') {
        currentSearchTerm = searchTerm || '';
    }

    let filtered = filterBrand && filterBrand !== 'Todos'
        ? PRODUCTS.filter(p => p.brand === filterBrand)
        : PRODUCTS;

    if (currentSearchTerm) {
        const termo = currentSearchTerm.toLowerCase();
        filtered = filtered.filter(p => p.name.toLowerCase().includes(termo));
    }

    grid.innerHTML = filtered.length
        ? filtered.map(renderProductCard).join('')
        : '<p class="no-results">Nenhum produto encontrado para essa busca.</p>';

    initAddToCartButtons();

    const heading = document.querySelector('.section-header h2');
    if (heading) {
        heading.textContent = currentSearchTerm
            ? `Resultados para: "${currentSearchTerm}"`
            : 'Todos os Smartphones';
    }
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
    const buscaParam = params.get('busca');

    setupBrandFilters();

    if (marcaParam) {
        const targetBtn = document.querySelector(`.brand-filter-btn[data-brand="${marcaParam}"]`);
        if (targetBtn) {
            document.querySelectorAll('.brand-filter-btn').forEach(b => b.classList.remove('active'));
            targetBtn.classList.add('active');
            renderProducts(marcaParam, buscaParam);
        } else {
            renderProducts('Todos', buscaParam);
        }
    } else {
        renderProducts('Todos', buscaParam);
    }
});
