export const ARTICLE_STATUS_LABELS = {
  rascunho: 'rascunho',
  'em-discussao': 'em discussão',
  estavel: 'estável',
} as const;

export type ArticleStatus = keyof typeof ARTICLE_STATUS_LABELS;

export function formatArticleStatus(status: ArticleStatus): string {
  return ARTICLE_STATUS_LABELS[status];
}

export function formatArticleDate(date: Date): string {
  return new Intl.DateTimeFormat('pt-BR', {
    timeZone: 'UTC',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
}
