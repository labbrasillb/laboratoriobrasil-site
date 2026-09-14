# Contribuindo com o Laboratório Brasil

O melhor tipo de contribuição é aquela que ajuda a testar uma ideia.

## Fluxo Git

Este repositório usa **GitHub Flow**. `main` é a única branch permanente e deve permanecer publicável. Não existe `develop` e o trabalho não deve ser feito diretamente em `main`.

Crie branches curtas a partir de `main` usando apenas estes prefixos:

- `feature/*` para funcionalidades;
- `fix/*` para correções;
- `chore/*` para manutenção e tarefas técnicas;
- `article/*` para trabalho editorial.

Toda mudança deve voltar para `main` por Pull Request. O CI executa o quality gate e o PR pode ser integrado por squash para manter um commit lógico por mudança. Depois da integração, a branch curta deve ser removida.

O fluxo completo de publicação está em [`DEPLOY.md`](DEPLOY.md).

## Antes de enviar um PR

```bash
npm ci
npm run validate
```

Se o lint do Design System encontrar algo corrigível automaticamente:

```bash
npm run fix
```

As mensagens do lint devem dizer o arquivo, a linha, o problema e o padrão esperado.

## Você pode contribuir com

- erro factual ou fonte problemática;
- caso-limite não considerado;
- incentivo perverso ou efeito colateral;
- contraexemplo;
- alternativa mais simples;
- correção de escrita ou acessibilidade;
- melhoria técnica no site.

## Para artigos

Ao abrir uma issue, tente separar:

1. Qual afirmação ou regra está sendo questionada?
2. Qual é o problema?
3. Existe evidência, exemplo ou caso concreto?
4. Que mudança você sugere?

Discordância, por si só, não é defeito. O objetivo é tornar a crítica verificável e útil.

## Para o site

Pull requests devem ser pequenos e focados. Reutilize o [`DESIGN_SYSTEM.md`](DESIGN_SYSTEM.md) e evite adicionar infraestrutura sem necessidade clara.

## Conduta

Ataques pessoais, assédio, spam e conteúdo discriminatório não fazem parte da conversa. Critique a ideia, não a pessoa.
