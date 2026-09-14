# Google AdSense

Integração do Google AdSense do Laboratório Brasil.

## Configuração no código

A identificação da conta fica centralizada em `src/config/site.ts`:

- client ID: `ca-pub-2610603380020880`
- publisher ID: `pub-2610603380020880`

O componente `src/components/AdSenseScript.astro` carrega o script oficial do AdSense uma única vez no `<head>` global por meio de `BaseLayout.astro`.

O arquivo `public/ads.txt` é copiado pelo Astro para `/ads.txt` no build e autoriza o Google como vendedor direto do inventário do site.

## Verificações antes de solicitar revisão

Execute:

```bash
npm run validate
```

Depois do deploy de produção, confirme:

```bash
curl -fsS https://laboratoriobrasil.com.br/ads.txt
curl -fsS https://laboratoriobrasil.com.br/ | grep -F 'ca-pub-2610603380020880'
```

O primeiro comando deve retornar:

```text
google.com, pub-2610603380020880, DIRECT, f08c47fec0942fa0
```

O segundo deve encontrar o ID do AdSense no HTML da página inicial.

## Painel do AdSense

A presença do script no site não significa que Anúncios automáticos precisam ficar ativados. A estratégia de formatos e posições de anúncio deve ser configurada separadamente no painel do AdSense.

No estado inicial do projeto:

- o código de verificação/AdSense está instalado;
- o `ads.txt` está publicado;
- Anúncios automáticos podem permanecer desativados até a definição editorial dos espaços de publicidade;
- otimizações automáticas não são necessárias para a verificação do domínio.

## Privacidade

A página `/privacidade` já informa o possível uso do Google AdSense, cookies e tecnologias semelhantes. Antes de ampliar publicidade personalizada ou atender públicos sujeitos a regimes específicos de consentimento, a configuração de consentimento/CMP deve ser revisada no painel do Google e refletida na política publicada.
