import { readFile, readdir } from 'node:fs/promises';
import { extname, join, relative } from 'node:path';

const root = process.cwd();
const sourceRoot = join(root, 'src');
const allowedExtensions = new Set(['.astro', '.css', '.ts', '.mjs']);
const violations = [];

const legacyTokens = new Map([
  ['--bg', '--color-bg'],
  ['--surface', '--color-surface'],
  ['--surface-soft', '--color-surface-soft'],
  ['--text', '--color-text'],
  ['--muted', '--color-muted'],
  ['--border', '--color-border'],
  ['--blue', '--brand-blue'],
  ['--green', '--brand-green'],
  ['--yellow', '--brand-yellow'],
  ['--tag-bg', '--color-tag-bg'],
  ['--tag-text', '--color-tag-text'],
  ['--quote-bg', '--color-quote-bg'],
  ['--notice-bg', '--color-notice-bg'],
  ['--notice-border', '--color-notice-border'],
  ['--header-bg', '--color-header-bg'],
  ['--icon-hover', '--color-icon-hover'],
]);

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(path)));
    else if (allowedExtensions.has(extname(entry.name))) files.push(path);
  }
  return files;
}

function add(file, line, message) {
  violations.push(`${relative(root, file)}:${line} — ${message}`);
}

for (const file of await walk(sourceRoot)) {
  const content = await readFile(file, 'utf8');
  const lines = content.split('\n');
  const isTokens = file.endsWith('src/styles/tokens.css');
  const isPage = file.includes(`${join('src', 'pages')}`);

  lines.forEach((line, index) => {
    const number = index + 1;

    for (const [legacy, replacement] of legacyTokens) {
      if (line.includes(`var(${legacy})`))
        add(file, number, `token legado ${legacy}; use ${replacement}`);
    }

    if (/\sstyle\s*=/.test(line))
      add(file, number, 'style inline não é permitido; use classe/token/componente');
    if (!isTokens && /#[0-9a-fA-F]{3,8}\b|rgba?\s*\(/.test(line)) {
      add(file, number, 'cor literal fora de tokens.css; crie/use um token semântico');
    }
    if (/!important\b/.test(line)) add(file, number, '!important não é permitido no Design System');
  });

  if (isPage && /<style(?:\s|>)/.test(content)) {
    add(file, 1, 'páginas não devem declarar <style>; mova UI para componente ou estilo global');
  }
}

if (violations.length) {
  console.error('\nDesign System: foram encontrados problemas:\n');
  for (const violation of violations) console.error(`  ✗ ${violation}`);
  console.error('\nCorreções automáticas seguras: npm run fix\n');
  process.exit(1);
}

console.log('Design System');
console.log('  ✓ sem tokens legados');
console.log('  ✓ sem style inline em páginas/componentes');
console.log('  ✓ sem cores literais fora de tokens.css');
console.log('  ✓ sem CSS local em src/pages');
console.log('  ✓ sem !important');
