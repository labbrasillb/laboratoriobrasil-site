# Deploy no Cloudflare Workers

O site é gerado estaticamente pelo Astro e publicado com **Workers Static Assets**.

## Build

- Node.js: versão definida em `.nvmrc`
- Build command: `npm run build`
- Output directory: `dist`
- Deploy command: `npx wrangler deploy`

O `wrangler.toml` aponta `[assets].directory` para `./dist`.

## Git

- `main`: produção
- `develop`: homologação/preview
- `feature/*`: desenvolvimento/preview

Antes de promover uma mudança:

```bash
npm ci
npm run validate
```

O CI executa a mesma validação nos pull requests.

## Domínio

Produção usa `https://laboratoriobrasil.com.br`. URLs `workers.dev` recebem `X-Robots-Tag: noindex, nofollow` por `public/_headers` para evitar conteúdo duplicado em mecanismos de busca.
