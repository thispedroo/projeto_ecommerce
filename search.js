document.addEventListener('DOMContentLoaded', function () {
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    if (!searchForm) return;

    const params = new URLSearchParams(window.location.search);
    const buscaAtual = params.get('busca');
    if (buscaAtual && searchInput) {
        searchInput.value = buscaAtual;
    }

    searchForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const termo = searchInput.value.trim();
        if (!termo) return;
        window.location.href = 'produtos.html?busca=' + encodeURIComponent(termo);
    });
});
