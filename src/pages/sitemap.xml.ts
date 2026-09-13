import { getCollection } from 'astro:content';
import { PUBLIC_ROUTES, SITE } from '../config/site';

export async function GET() {
  const artigos = await getCollection('artigos', ({ data }) => !data.draft);
  const paths = [...PUBLIC_ROUTES, ...artigos.map((artigo) => `/artigos/${artigo.id}`)];
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths
    .map((path) => `\n  <url><loc>${SITE.url}${path}</loc></url>`)
    .join('')}\n</urlset>`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}
