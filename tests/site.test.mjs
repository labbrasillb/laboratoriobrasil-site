import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { extname, join, relative, sep } from 'node:path';
import test from 'node:test';

const DIST = 'dist';
const SITE_URL = 'https://laboratoriobrasil.com.br';
const read = (path) => readFileSync(path, 'utf8');

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });
}

function htmlFiles() {
  return walk(DIST).filter((path) => extname(path) === '.html');
}

function routeFromHtml(file) {
  const rel = relative(DIST, file).split(sep).join('/');
  if (rel === 'index.html') return '/';
  if (rel.endsWith('/index.html')) return `/${rel.slice(0, -'/index.html'.length)}`;
  return `/${rel.slice(0, -'.html'.length)}`;
}

function publicHtmlFiles() {
  return htmlFiles().filter((file) => routeFromHtml(file) !== '/404');
}

function routeExists(pathname) {
  if (pathname === '/') return existsSync(join(DIST, 'index.html'));

  const clean = decodeURIComponent(pathname).replace(/^\//, '').replace(/\/$/, '');
  if (!clean) return existsSync(join(DIST, 'index.html'));

  return (
    existsSync(join(DIST, clean)) ||
    existsSync(join(DIST, `${clean}.html`)) ||
    existsSync(join(DIST, clean, 'index.html'))
  );
}

function attribute(tag, name) {
  const match = tag.match(new RegExp(`\\s${name}=(?:"([^"]*)"|'([^']*)')`, 'i'));
  return match?.[1] ?? match?.[2];
}

const requiredFiles = [
  'dist/index.html',
  'dist/404.html',
  'dist/artigos/index.html',
  'dist/contato/index.html',
  'dist/metodo/index.html',
  'dist/privacidade/index.html',
  'dist/sobre/index.html',
  'dist/sitemap.xml',
  'dist/robots.txt',
  'dist/_headers',
  'dist/ads.txt',
];

test('gera todas as rotas públicas essenciais', () => {
  for (const file of requiredFiles) assert.ok(existsSync(file), `arquivo ausente: ${file}`);
});

test('toda página pública gerada entra automaticamente no sitemap', () => {
  const sitemap = read('dist/sitemap.xml');
  const routes = publicHtmlFiles().map(routeFromHtml);

  for (const route of routes) {
    assert.ok(sitemap.includes(`<loc>${SITE_URL}${route}</loc>`), `sitemap não contém ${route}`);
  }

  assert.ok(!sitemap.includes(`<loc>${SITE_URL}/404</loc>`), '404 não deve estar no sitemap');
});

test('HTML público possui estrutura semântica e SEO mínimos', () => {
  for (const file of htmlFiles()) {
    const html = read(file);
    const route = routeFromHtml(file);
    const h1Count = (html.match(/<h1(?:\s|>)/gi) ?? []).length;
    const ids = [...html.matchAll(/\sid=["']([^"']+)["']/gi)].map((match) => match[1]);
    const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);

    assert.equal(h1Count, 1, `${route} deve possuir exatamente um h1; encontrou ${h1Count}`);
    assert.match(html, /<html[^>]+lang=["']pt-BR["']/i, `${route} sem lang pt-BR`);
    assert.match(html, /<title>[^<]+<\/title>/i, `${route} sem title`);
    assert.match(
      html,
      /<meta[^>]+name=["']description["'][^>]+content=["'][^"']+["']/i,
      `${route} sem meta description`
    );
    assert.match(
      html,
      /<link[^>]+rel=["']canonical["'][^>]+href=["']https:\/\/laboratoriobrasil\.com\.br[^"']*["']/i,
      `${route} sem canonical válido`
    );
    assert.deepEqual([...new Set(duplicateIds)], [], `${route} possui IDs HTML duplicados`);
    assert.ok(!html.includes('workers.dev'), `${route} contém workers.dev`);
  }
});

test('links internos apontam para rotas ou arquivos gerados', () => {
  for (const file of htmlFiles()) {
    const html = read(file);
    const route = routeFromHtml(file);
    const hrefs = [...html.matchAll(/\shref=["']([^"']+)["']/gi)].map((match) => match[1]);

    for (const href of hrefs) {
      if (!href.startsWith('/') || href.startsWith('//')) continue;
      const pathname = href.split('#', 1)[0].split('?', 1)[0];
      if (!pathname) continue;
      assert.ok(routeExists(pathname), `${route} aponta para link interno inexistente: ${href}`);
    }
  }
});

test('links que abrem nova aba usam noopener', () => {
  for (const file of htmlFiles()) {
    const html = read(file);
    const route = routeFromHtml(file);
    const anchors = html.match(/<a\b[^>]*>/gi) ?? [];

    for (const anchor of anchors) {
      if (attribute(anchor, 'target') !== '_blank') continue;
      const rel = attribute(anchor, 'rel') ?? '';
      assert.ok(
        rel.split(/\s+/).includes('noopener'),
        `${route} possui target=_blank sem noopener`
      );
    }
  }
});

test('navegação marca a página atual e menu móvel possui rótulo estável', () => {
  const html = read('dist/sobre/index.html');
  assert.match(
    html,
    /href=["']\/sobre["'][^>]*aria-current=["']page["']/i,
    'link atual de /sobre não possui aria-current=page'
  );
  assert.ok(html.includes('aria-label="Menu de navegação"'), 'menu móvel sem rótulo estável');
});

test('artigos publicados usam metadados Open Graph de artigo', () => {
  const article = read('dist/artigos/por-que-um-laboratorio/index.html');
  assert.ok(article.includes('property="og:type" content="article"'), 'og:type de artigo ausente');
  assert.ok(
    article.includes('property="article:published_time"'),
    'article:published_time ausente'
  );
  assert.ok(article.includes('13/09/2026'), 'data editorial não está determinística');
});

test('artigos marcados como draft não são gerados', () => {
  const contentRoot = 'src/content/artigos';
  if (!existsSync(contentRoot)) return;

  for (const file of walk(contentRoot).filter((path) => ['.md', '.mdx'].includes(extname(path)))) {
    const source = read(file);
    if (!/^draft:\s*true\s*$/im.test(source)) continue;

    const slug = relative(contentRoot, file)
      .split(sep)
      .join('/')
      .replace(/\.(md|mdx)$/i, '');
    assert.ok(!routeExists(`/artigos/${slug}`), `draft publicado indevidamente: ${slug}`);
  }
});

test('CSS respeita preferência por movimento reduzido', () => {
  const css = read('src/styles/global.css');
  assert.ok(
    css.includes('@media (prefers-reduced-motion: reduce)'),
    'faltou prefers-reduced-motion'
  );
  assert.ok(css.includes('scroll-behavior: auto'), 'reduced motion não desativa smooth scroll');
});

test('workers.dev recebe noindex por header', () => {
  const headers = read('dist/_headers');
  assert.ok(headers.includes('workers.dev/*'));
  assert.ok(headers.includes('X-Robots-Tag: noindex, nofollow'));
});

test('AdSense está configurado de forma consistente', () => {
  const clientId = 'ca-pub-2610603380020880';
  const publisherId = 'pub-2610603380020880';
  const expectedAdsTxt = `google.com, ${publisherId}, DIRECT, f08c47fec0942fa0`;

  assert.equal(
    read('dist/ads.txt').trim(),
    expectedAdsTxt,
    'ads.txt divergente do publisher esperado'
  );

  for (const file of htmlFiles()) {
    const html = read(file);
    const route = routeFromHtml(file);
    const scriptTags = html.match(/<script\b[^>]*>/gi) ?? [];
    const adsenseScripts = scriptTags.filter((tag) =>
      tag.includes(
        `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`
      )
    );

    assert.equal(
      adsenseScripts.length,
      1,
      `${route} deve carregar o script do AdSense exatamente uma vez`
    );
    assert.match(adsenseScripts[0], /\sasync(?:\s|>)/i, `${route} sem async no script do AdSense`);
    assert.match(
      adsenseScripts[0],
      /\scrossorigin=["']anonymous["']/i,
      `${route} sem crossorigin=anonymous no script do AdSense`
    );
  }

  const articleFiles = htmlFiles().filter((file) => routeFromHtml(file).startsWith('/artigos/'));
  for (const file of articleFiles) {
    const html = read(file);
    const route = routeFromHtml(file);
    assert.ok(html.includes('data-ad-layout="in-article"'), `${route} sem unidade In-article`);
    const slots = html.match(/data-ad-slot="8387700367"/g) ?? [];
    assert.equal(slots.length, 1, `${route} deve possuir exatamente uma unidade In-article`);
    assert.ok(
      html.includes("status === 'unfilled'") && html.includes('placement.hidden = true'),
      `${route} deve ocultar o espaço quando o AdSense retornar unfilled`
    );
  }
});

test('configuração do repositório segue GitHub Flow sem develop', () => {
  const workflow = read('.github/workflows/ci.yml');
  const dependabot = read('.github/dependabot.yml');
  const contributing = read('CONTRIBUTING.md');

  assert.ok(!/^[ \t-]*develop\s*$/m.test(workflow), 'CI ainda referencia develop');
  assert.ok(!dependabot.includes('target-branch: develop'), 'Dependabot ainda aponta para develop');
  assert.ok(contributing.includes('`main` é a única branch permanente'));
  assert.ok(contributing.includes('`feature/*`'));
  assert.ok(contributing.includes('`fix/*`'));
  assert.ok(contributing.includes('`chore/*`'));
  assert.ok(contributing.includes('`article/*`'));
});

test('diagramas editoriais usam Mermaid e a leitura possui largura ampliada', () => {
  const article = read('dist/artigos/e-se-o-mandato-politico-pudesse-voltar-as-urnas/index.html');
  const diagramCount = (article.match(/data-mermaid-diagram/g) ?? []).length;
  const source = read('src/content/artigos/e-se-o-mandato-politico-pudesse-voltar-as-urnas.md');
  const tokens = read('src/styles/tokens.css');

  assert.ok(
    diagramCount >= 10,
    `esperava pelo menos 10 diagramas Mermaid; encontrou ${diagramCount}`
  );
  assert.ok(source.includes('```mermaid'), 'artigo não possui blocos Mermaid');
  assert.ok(source.includes('```example'), 'artigo não possui exemplos editoriais');
  assert.ok(
    article.includes('class=\"article-example\"'),
    'exemplos editoriais não foram transformados em blocos semânticos'
  );
  assert.ok(
    !article.includes('language-text'),
    'exemplos conceituais voltaram a ser renderizados como bloco de código'
  );
  assert.ok(!source.includes('POVO\n ↓\nMILITARES'), 'fluxograma ASCII antigo ainda está presente');
  assert.ok(
    tokens.includes('--layout-article: 1040px'),
    'largura editorial ampliada não foi aplicada'
  );
});
