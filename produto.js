function renderProductNotFound() {
    const container = document.getElementById('product-detail-content');
    container.innerHTML = `
        <div class="product-not-found">
            <p>Produto não encontrado.</p>
            <a href="produtos.html" class="add-to-cart-btn">Ver todos os produtos</a>
        </div>
    `;
}

function renderProductDetail(product) {
    const container = document.getElementById('product-detail-content');
    const savings = product.oldPrice - product.price;
    const imageHtml = product.img
        ? `<img src="${product.img}" alt="${product.name}" class="product-detail-image">`
        : `<div class="product-image-placeholder"><i class="fa-solid fa-mobile-screen-button"></i></div>`;

    const descriptionHtml = product.description
        ? `<p class="product-detail-description">${product.description}</p>`
        : `<p class="product-detail-description">Descrição em breve.</p>`;

    container.innerHTML = `
        <div class="product-detail-grid">
            <div class="product-detail-image-container">
                <div class="discount-badge">${product.discount}</div>
                ${imageHtml}
            </div>
            <div class="product-detail-info">
                <span class="product-detail-brand">${product.brand}</span>
                <h1 class="product-detail-title">${product.name}</h1>
                <div class="product-pricing">
                    <span class="current-price">${formatBRLProduct(product.price)}</span>
                    <s class="original-price">${formatBRLProduct(product.oldPrice)}</s>
                </div>
                <div class="product-savings">
                    Economia de ${formatBRLProduct(savings)}
                </div>
                ${descriptionHtml}
                <button class="add-to-cart-btn" data-name="${product.name}" data-price="${product.price}" data-img="${product.img || ''}">
                    <i class="fa-solid fa-cart-plus"></i> Adicionar ao carrinho
                </button>
            </div>
        </div>
    `;

    document.title = `${product.name} - Urubu Store`;
    initAddToCartButtons();
}

document.addEventListener('DOMContentLoaded', function () {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');
    const product = PRODUCTS.find(p => p.id === productId);

    if (product) {
        renderProductDetail(product);
    } else {
        renderProductNotFound();
    }
});
