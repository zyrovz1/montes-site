# Site — Montês Restaurante & Garden

Site estático (HTML + CSS + JavaScript), sem dependências de build.

## Estrutura
- `index.html` — conteúdo e SEO (meta tags, Open Graph, JSON-LD)
- `css/style.css` — identidade visual (cores no topo, em `:root`)
- `js/main.js` — menu mobile, animações, galeria ampliada, formulário → WhatsApp
- `img/` — imagens **ilustrativas** (SVG). Substitua pelas fotos reais.

## Executar localmente
Abra `index.html` no navegador, ou: `python3 -m http.server 8000` e acesse http://localhost:8000

## Publicar
Envie a pasta inteira para qualquer hospedagem estática (Netlify, Vercel, GitHub Pages, Cloudflare Pages ou hospedagem comum). Depois:
1. Troque `https://www.SEU-DOMINIO.com.br/` em `index.html` (canonical e Open Graph).
2. Use uma imagem JPG/PNG (1200×630) em `og:image`.

## Antes de publicar (pendências)
- **Fotos:** substitua os arquivos de `img/` por fotos reais e autorizadas (mesmos nomes, ou ajuste o HTML). Comprima (WebP/JPG) e remova os avisos "ilustrativo" e os textos alternativos correspondentes.
- **Cardápio:** os cartões são demonstrativos. Preencha com pratos e preços confirmados pelo restaurante.
- **Horários:** edite o cartão "Horários de funcionamento" em `index.html` quando confirmados.
- **Endereço:** confirme Rua Policarpo de Souza Costa, 01 — Centro, Urubici/SC (mapa e links usam esse texto).
- **Instagram:** a seção usa imagens ilustrativas e link para @montesrestaurante. Para publicações reais, use o widget oficial de incorporação do Instagram ou um serviço de feed.
- **Reservas:** o formulário apenas abre o WhatsApp (+55 49 98807-3723) com os dados preenchidos; a reserva só vale após confirmação do restaurante.
- **Ícone/privacidade:** ajuste o texto de privacidade conforme a LGPD se adicionar analytics ou outros formulários.
