# The Bar — Coquetelaria para Eventos

Site institucional estático pronto para GitHub Pages.

## Estrutura

- `index.html`: página inicial.
- `sobre/`, `servicos/`, `portfolio/`, `faq/`, `contato/`: subpáginas com URLs limpas.
- `servicos/casamentos/`, `servicos/eventos-corporativos/`, `servicos/festas-exclusivas/`: páginas específicas de serviço.
- `termos-de-uso/`, `politica-de-privacidade/`, `politica-de-cookies/`: páginas legais.
- `assets/css/styles.css`: estilos globais.
- `assets/js/main.js`: interações globais.
- `assets/img/logo.webp`: logo otimizada em WebP usada no header, footer e loader.
- `assets/img/favicon.svg`: favicon.
- `assets/video/home-bg.mp4`: vídeo de fundo da home e do loader.

Vídeo base: [Pexels, "Bartender Making a Cocktail" por Gustavo Fring](https://www.pexels.com/video/bartender-making-a-cocktail-3970153/).
- `.nojekyll`: evita processamento Jekyll no GitHub Pages.

## Publicação no GitHub Pages

Publique a branch desejada e configure Pages para servir a raiz do repositório. As páginas funcionam como pastas com `index.html`, então os links aparecem sem `.html`, por exemplo `/sobre/` e `/servicos/casamentos/`.
