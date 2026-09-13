# Laboratório Brasil

> Ideias que conversam com o Brasil.

Site oficial do **Laboratório Brasil**, um espaço para trocar ideias, questionar o que já existe e imaginar novas possibilidades para o Brasil.

🌐 **Site:** https://laboratoriobrasil.com.br

## Tecnologia

- Astro para geração estática
- Markdown/Content Collections para artigos
- Git para histórico e revisão
- Cloudflare Workers Static Assets para publicação

A arquitetura é deliberadamente simples: conteúdo estático, sem banco de dados e sem backend permanente.

## Desenvolvimento local

Use a versão indicada em `.nvmrc`:

```bash
nvm use
npm install
npm run dev
```

Comandos do projeto:

```bash
npm run dev       # desenvolvimento
npm run check     # type/check do Astro
npm run lint      # regras do Design System
npm run fix       # correções automáticas seguras + formatação
npm run format    # formata o projeto
npm run test      # build + smoke tests
npm run validate  # quality gate completo
npm run build     # build de produção
```

## Artigos

Os artigos ficam em `src/content/artigos/`. Markdown é pequeno e adequado ao Git; binários grandes (vídeos, originais pesados, PDFs grandes) não devem ser versionados no repositório.

Por segurança editorial, `draft` é `true` quando omitido. Para publicar, use explicitamente `draft: false`.

## Design System

Leia [`DESIGN_SYSTEM.md`](DESIGN_SYSTEM.md). Tokens ficam em `src/styles/tokens.css` e o lint impede padrões que fariam a identidade visual divergir silenciosamente.

## Contribuições

Leia [`CONTRIBUTING.md`](CONTRIBUTING.md).

## Licenciamento

- **Código-fonte:** [Apache License 2.0](LICENSE)
- **Conteúdo editorial original:** [CC BY 4.0](CONTENT_LICENSE.md)
- **Nome, logotipos e identidade visual:** consulte [`TRADEMARKS.md`](TRADEMARKS.md)
