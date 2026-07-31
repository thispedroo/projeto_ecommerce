# 🦅 Urubu Store

Protótipo de **e-commerce front-end** de eletrônicos (foco em smartphones), feito em **HTML, CSS e JavaScript puro**, sem frameworks e sem back-end , usuários e carrinho são persistidos no `localStorage` do navegador.

> Projeto em desenvolvimento contínuo. 🚧

---

## 📸 Visão geral

- Página inicial com carrossel de banners e vitrine de destaques;
- Listagem completa de produtos com filtro por marca (inclusive via URL, ex: `produtos.html?marca=Samsung`);
- Página de categorias (Samsung, Apple, Xiaomi, Realme, Asus);
- Carrinho funcional: adicionar, alterar quantidade, remover e finalizar compra (simulada);
- Autenticação: cadastro, login, perfil e logout.

---

## 🛠️ Tecnologias

- HTML5 e CSS3 (variáveis CSS, layout responsivo)
- JavaScript (ES6+), sem dependências
- Font Awesome 6 e Google Fonts (Manrope), via CDN
- `localStorage` para persistência de dados

Sem build tool, o projeto roda direto no navegador.

---

## 📁 Estrutura

```
urubu-store/
├── index.html / produtos.html / categorias.html / carrinho.html
├── login.html / cadastro.html / perfil.html
├── style.css              # Estilos globais
├── script.js               # Carrossel da home
├── auth.js                  # Cadastro, login, sessão e logout
├── cart.js                   # Lógica do carrinho
├── products.js                # Catálogo + renderização/filtros
└── img/                        # Imagens e logos
```

---

## ⚙️ Principais funcionalidades

- **Produtos**: catálogo em `products.js`, com filtro por marca;
- **Carrinho** (`cart.js`): subtotal automático, feedback visual (toast/badge), estado vazio tratado, checkout simulado (sem pagamento real);
- **Autenticação** (`auth.js`): cadastro com validação de email duplicado, login, sessão via `localStorage` e perfil protegido (redireciona para login se não houver sessão).

> ⚠️ Protótipo: senhas ficam em texto puro no `localStorage`, sem back-end real. Não use dados reais para testar.

---

## 🚀 Como rodar

```bash
git clone https://github.com/seu-usuario/urubu-store.git
cd urubu-store
python -m http.server 8000   # ou abra o index.html direto no navegador
```
Acesse `http://localhost:8000`.

---