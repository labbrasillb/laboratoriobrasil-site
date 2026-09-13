# Laboratório Brasil — Design System

Este documento é a fonte de verdade visual e editorial do Laboratório Brasil.

## Princípios

O projeto deve parecer claro, brasileiro sem clichês, editorial, moderno, acolhedor, racional, independente e simples sem parecer genérico.

Não deve parecer portal governamental, campanha política, startup SaaS, blog pessoal ou interface excessivamente decorativa. O conteúdo tem prioridade sobre a interface.

## Tokens

Tokens vivem em `src/styles/tokens.css`. Cores, raios, sombras, movimento e espaçamentos reutilizáveis devem partir deles. Cores literais fora desse arquivo são consideradas erro pelo lint de Design System.

## Componentes Astro canônicos

- `Header`
- `Footer`
- `ThemeToggle`
- `ArticlePage`
- `ArticleCard`
- `ButtonLink`
- `Eyebrow`
- `EmptyState`
- `Notice`
- `Tag`
- `SocialCard`

Antes de criar UI equivalente, reutilize esses componentes.

## Primitivos CSS

Algumas classes globais continuam sendo primitivas de layout/composição, como `.container`, `.section`, `.grid`, `.article`, `.prose` e `.actions`. Elas não devem ser descritas como componentes Astro.

## Regras de UI

- Branco/off-white é dominante no tema claro.
- Azul, verde e amarelo são acentos de marca.
- Cor de rede social só aparece em contexto social.
- Bordas e sombras são discretas.
- Nem tudo deve ser pill.
- Não usar `style="..."` no markup.
- Páginas em `src/pages` não devem declarar `<style>`; UI específica deve virar componente.
- Não usar cor literal fora de `tokens.css`.
- Toda UI nova deve funcionar em light/dark mode.
- Todo controle interativo precisa de foco de teclado visível.
- Movimento deve ser curto, discreto e funcional.
- Respeitar `prefers-reduced-motion`; movimento nunca deve ser requisito para compreender a interface.

## Responsividade

A navegação principal precisa permanecer acessível em telas pequenas. Conteúdo, marca e ações essenciais têm prioridade sobre elementos secundários.

## Identidade editorial

A voz é conversacional, clara, curiosa, independente, não partidária e aberta a crítica.

Evitar linguagem burocrática, linguagem de campanha, marketing exagerado, tom professoral e certeza absoluta onde existe hipótese.

Método editorial:

**problema → hipótese → teste → crítica → revisão**

## O que não fazer

Não introduzir sem revisão do Design System:

- glassmorphism;
- gradientes decorativos excessivos;
- cores neon;
- múltiplas linguagens de ícones;
- sombras pesadas;
- animações chamativas;
- layouts arbitrariamente diferentes por página;
- novos tons de marca sem token;
- CSS duplicado por página;
- componentes equivalentes com implementações diferentes.

## Quality gate

Comandos oficiais:

```bash
npm run lint
npm run fix
npm run format
npm run test
npm run validate
```

`npm run validate` é a validação completa usada pelo CI.

Uma implementação bonita, mas inconsistente com este documento, deve ser considerada incorreta.
