# Deploy no Cloudflare Workers

O site é gerado estaticamente pelo Astro e publicado com **Cloudflare Workers Static Assets**. O repositório usa **GitHub Flow** e produção acompanha a branch `main`.

## GitHub Flow

- `main`: única branch permanente; representa o estado publicável/produção.
- `feature/*`: novas funcionalidades.
- `fix/*`: correções de comportamento ou defeitos.
- `chore/*`: manutenção, dependências, CI, documentação técnica e tarefas internas.
- `article/*`: criação ou revisão editorial de artigos.

Não existe branch `develop`. Branches de trabalho são curtas, sempre nascem de `main` e voltam para `main` por Pull Request. Não desenvolva diretamente em `main`.

Fluxo:

```bash
git switch main
git pull --ff-only origin main
git switch -c feature/minha-feature

# trabalho + commits
npm run validate
git push -u origin feature/minha-feature
```

Depois, abra um Pull Request para `main`. O CI precisa passar antes da integração. O PR pode ser integrado por **Squash and merge** para manter um commit lógico por mudança. Depois da integração, remova a branch curta.

Nunca faça squash entre duas branches permanentes. Neste fluxo, isso deixa de ser um problema porque `main` é a única branch permanente.

## Build

- Node.js: versão definida em `.nvmrc`.
- Build command: `npm run build`.
- Output directory: `dist`.
- Deploy command: `npx wrangler deploy`.

O `wrangler.toml` aponta `[assets].directory` para `./dist`.

Antes de publicar uma mudança:

```bash
npm ci
npm run validate
```

O CI executa a mesma validação nos Pull Requests e em pushes para `main`.

## Domínio

Produção usa `https://laboratoriobrasil.com.br`. URLs `workers.dev` recebem `X-Robots-Tag: noindex, nofollow` por `public/_headers` para evitar conteúdo duplicado em mecanismos de busca.
