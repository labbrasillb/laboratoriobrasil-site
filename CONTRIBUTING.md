# Contribuindo com o Laboratório Brasil

O melhor tipo de contribuição é aquela que ajuda a testar uma ideia.

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
