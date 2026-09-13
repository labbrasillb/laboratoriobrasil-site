# Deploy no Cloudflare Pages

## Build

- Framework preset: **Astro**
- Build command: `npm run build`
- Output directory: `dist`
- Node.js: 22.12.0 ou superior

## Domínio

Depois que o primeiro deploy em `*.pages.dev` estiver funcionando, adicione:

- `laboratoriobrasil.com.br`
- `www.laboratoriobrasil.com.br`

Escolha um como canônico e redirecione o outro.

## Git

O deploy deve ser conectado ao branch `main`. Cada push aprovado para `main` publica uma nova versão estática do site.
