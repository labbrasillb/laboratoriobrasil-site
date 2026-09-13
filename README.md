# Laboratório Brasil

> Ideias que conversam com o Brasil.

Site oficial do **Laboratório Brasil**, um espaço para trocar ideias, questionar o que já existe e imaginar novas possibilidades para o Brasil.

🌐 **Site:** https://laboratoriobrasil.com.br

## Tecnologia

- [Astro](https://astro.build/) para geração estática
- Markdown para artigos
- Git para histórico e revisão
- Cloudflare Pages para publicação

A arquitetura é deliberadamente simples: conteúdo estático, sem banco de dados e sem backend permanente.

## Desenvolvimento local

Requer Node.js 22.12.0 ou superior.

```bash
npm install
npm run dev
```

Build de produção:

```bash
npm run build
```

## Artigos

Os artigos ficam em `src/content/artigos/` e usam frontmatter para registrar metadados como versão, estado da proposta e tags.

Exemplo:

```yaml
---
title: "Título"
description: "Resumo"
publishedAt: 2026-09-13
version: "1.0"
status: "em-discussao"
tags: ["tema"]
draft: false
---
```

Estados possíveis:

- `rascunho`
- `em-discussao`
- `estavel`

## Contribuições

Leia [`CONTRIBUTING.md`](CONTRIBUTING.md). Críticas, correções e contrapontos são bem-vindos quando ajudam a testar uma ideia de forma objetiva.

## Licenciamento

Este repositório separa código, conteúdo editorial e identidade de marca:

- **Código-fonte do site:** [Apache License 2.0](LICENSE)
- **Artigos e textos editoriais originais:** [Creative Commons Attribution 4.0 International (CC BY 4.0)](CONTENT_LICENSE.md)
- **Nome, logotipos e identidade visual:** não são licenciados pelas licenças acima; consulte [`TRADEMARKS.md`](TRADEMARKS.md)

Materiais de terceiros continuam sujeitos às respectivas licenças e direitos.
