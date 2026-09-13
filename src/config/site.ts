export const SITE = {
  name: 'Laboratório Brasil',
  tagline: 'Ideias que conversam com o Brasil.',
  url: 'https://laboratoriobrasil.com.br',
  description:
    'Um espaço para trocar ideias, questionar o que já existe e imaginar novas possibilidades para o Brasil.',
  locale: 'pt-BR',
  ogLocale: 'pt_BR',
  socials: [
    {
      platform: 'youtube',
      name: 'YouTube',
      handle: '@labbrasillb',
      href: 'https://www.youtube.com/@labbrasillb',
    },
    {
      platform: 'instagram',
      name: 'Instagram',
      handle: '@labbrasillb',
      href: 'https://www.instagram.com/labbrasillb',
    },
    {
      platform: 'x',
      name: 'X',
      handle: '@labbrasillb',
      href: 'https://x.com/labbrasillb',
    },
    {
      platform: 'github',
      name: 'GitHub',
      handle: '@labbrasillb',
      href: 'https://github.com/labbrasillb',
    },
  ],
} as const;

export const PRIMARY_NAV = [
  { href: '/artigos', label: 'Artigos' },
  { href: '/metodo', label: 'Método' },
  { href: '/sobre', label: 'Sobre' },
  { href: '/contato', label: 'Contato' },
] as const;

export const PUBLIC_ROUTES = ['/', ...PRIMARY_NAV.map(({ href }) => href), '/privacidade'] as const;
