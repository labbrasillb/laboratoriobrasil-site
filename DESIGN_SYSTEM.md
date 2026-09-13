# Laboratório Brasil — Design System

Este documento é a fonte de verdade visual e editorial do Laboratório Brasil.

A identidade deve permanecer reconhecível ao longo do tempo. Novas páginas e
componentes devem reutilizar os padrões existentes antes de criar novos.

## 1. Princípios

O Laboratório Brasil deve parecer:

- claro;
- brasileiro sem clichês;
- editorial;
- moderno;
- acolhedor;
- racional;
- independente;
- simples sem parecer genérico.

Não deve parecer:

- portal governamental;
- campanha política;
- startup SaaS;
- blog pessoal;
- site corporativo burocrático;
- interface excessivamente decorativa.

O conteúdo tem prioridade sobre a interface.

## 2. Identidade visual

A base visual usa superfícies claras, azul, verde e amarelo como acentos.

As cores da marca não devem dominar grandes áreas sem necessidade. Branco ou
off-white continua sendo a superfície predominante no tema claro.

### Cores canônicas

As cores devem ser consumidas por tokens CSS. Não criar novas cores diretamente
dentro de componentes sem justificar a necessidade.

- Azul: `--brand-blue`
- Verde: `--brand-green`
- Amarelo: `--brand-yellow`

Cores semânticas:

- fundo: `--color-bg`
- superfície: `--color-surface`
- superfície secundária: `--color-surface-soft`
- texto: `--color-text`
- texto secundário: `--color-muted`
- borda: `--color-border`

## 3. Tipografia

Família padrão:

`Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`

Regras:

- títulos usam peso forte e tracking negativo;
- texto corrido deve permanecer confortável e legível;
- não adicionar nova fonte sem revisão do Design System;
- artigos devem privilegiar leitura longa.

## 4. Larguras

- conteúdo geral: `--layout-max`
- conteúdo editorial: `--layout-article`

Não definir larguras máximas arbitrárias em cada página.

## 5. Espaçamento

Use a escala de espaçamento definida em `tokens.css`.

Evitar valores aleatórios como `1.17rem`, `37px`, `2.3rem` quando um token
existente resolve a necessidade.

## 6. Raios

Escala canônica:

- pequeno: `--radius-sm`
- médio: `--radius-md`
- grande: `--radius-lg`
- pill: `--radius-pill`

Nem tudo deve ser pill.

O site pode ser amigável sem transformar toda a interface em elementos
excessivamente arredondados.

## 7. Sombras

Sombras devem ser discretas.

São usadas principalmente para indicar elevação e interatividade, não como
decoração.

Utilizar:

- `--shadow-card`
- `--shadow-card-hover`

## 8. Componentes canônicos

Antes de criar um componente novo, verificar se um padrão existente atende.

Padrões atuais:

- Header
- Footer
- ThemeToggle
- Button
- Card
- Tag
- Eyebrow
- Notice
- Article/Prose
- Social Link
- Social Card

Novos componentes reutilizáveis devem ser adicionados ao Design System.

## 9. Botões

Variantes permitidas:

- padrão;
- primary.

Características:

- altura mínima acessível;
- raio médio;
- peso forte;
- borda discreta;
- animação curta.

Não criar estilos de botão exclusivos por página sem necessidade.

## 10. Cards

Cards:

- usam superfície padrão;
- borda sutil;
- raio grande;
- sombra discreta;
- hover curto quando interativos.

Cards não devem se transformar em blocos coloridos decorativos sem justificativa.

## 11. Ícones

Usar uma linguagem visual consistente.

Redes sociais podem utilizar suas cores reconhecíveis em contextos sociais.

Ícones não devem competir visualmente com a navegação principal.

## 12. Dark mode

Toda nova interface deve funcionar nos temas claro e escuro.

Nunca assumir fundo branco ou texto preto diretamente no componente.

Usar tokens semânticos.

## 13. Movimento

Animações devem ser:

- curtas;
- discretas;
- funcionais.

Preferência por aproximadamente 160–200 ms.

Evitar:

- animações contínuas;
- parallax decorativo;
- efeitos chamativos;
- movimento que prejudique leitura.

## 14. Responsividade

O site deve continuar legível e utilizável em telas pequenas.

Prioridades mobile:

1. conteúdo;
2. marca;
3. ações essenciais;
4. elementos secundários.

Elementos podem desaparecer do cabeçalho mobile se isso melhorar legibilidade.

## 15. Identidade editorial

A voz é:

- conversacional;
- clara;
- curiosa;
- independente;
- não partidária;
- aberta a crítica.

Evitar:

- linguagem burocrática;
- linguagem de campanha;
- marketing exagerado;
- certeza absoluta onde existe hipótese;
- tom professoral.

### Exemplo adequado

> Ajude a quebrar esta ideia.

### Exemplo inadequado

> Conheça a proposta revolucionária que vai transformar o Brasil.

## 16. Método editorial

O padrão conceitual é:

**problema → hipótese → teste → crítica → revisão**

As páginas e textos devem reforçar a ideia de que propostas podem evoluir.

## 17. O que não fazer

Não introduzir sem revisão:

- glassmorphism;
- gradientes decorativos excessivos;
- cores neon;
- múltiplos estilos de ícones;
- sombras pesadas;
- bordas muito grossas;
- animações chamativas;
- layouts diferentes em cada página;
- novos tons de marca arbitrários;
- CSS duplicado por página;
- componentes visualmente equivalentes com implementações diferentes.

## 18. Regra para IA e contribuições

Ao modificar a interface:

1. reutilize tokens existentes;
2. reutilize componentes existentes;
3. não invente um novo padrão visual apenas para uma página;
4. se um novo padrão for realmente necessário, documente-o neste arquivo;
5. preserve compatibilidade com light/dark mode;
6. valide responsividade;
7. mantenha o conteúdo como elemento visual prioritário.

Uma implementação visualmente bonita mas inconsistente com este documento deve
ser considerada incorreta.
