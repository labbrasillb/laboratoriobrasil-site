import { getCollection } from 'astro:content';

export async function GET() {
  const base = 'https://laboratoriobrasil.com.br';
  const artigos = await getCollection('artigos', ({ data }) => !data.draft);
  const paths = ['/', '/artigos', '/metodo', '/sobre', ...artigos.map((a) => `/artigos/${a.id}`)];
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map((p) => `\n  <url><loc>${base}${p}</loc></url>`).join('')}\n</urlset>`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
