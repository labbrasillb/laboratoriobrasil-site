import { readFile, readdir, writeFile } from 'node:fs/promises';
import { extname, join } from 'node:path';

const sourceRoot = join(process.cwd(), 'src');
const allowedExtensions = new Set(['.astro', '.css', '.ts', '.mjs']);
const replacements = new Map([
  ['var(--bg)', 'var(--color-bg)'],
  ['var(--surface)', 'var(--color-surface)'],
  ['var(--surface-soft)', 'var(--color-surface-soft)'],
  ['var(--text)', 'var(--color-text)'],
  ['var(--muted)', 'var(--color-muted)'],
  ['var(--border)', 'var(--color-border)'],
  ['var(--blue)', 'var(--brand-blue)'],
  ['var(--green)', 'var(--brand-green)'],
  ['var(--yellow)', 'var(--brand-yellow)'],
  ['var(--tag-bg)', 'var(--color-tag-bg)'],
  ['var(--tag-text)', 'var(--color-tag-text)'],
  ['var(--quote-bg)', 'var(--color-quote-bg)'],
  ['var(--notice-bg)', 'var(--color-notice-bg)'],
  ['var(--notice-border)', 'var(--color-notice-border)'],
  ['var(--header-bg)', 'var(--color-header-bg)'],
  ['var(--icon-hover)', 'var(--color-icon-hover)'],
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

let changed = 0;
for (const file of await walk(sourceRoot)) {
  const before = await readFile(file, 'utf8');
  let after = before;
  for (const [from, to] of replacements) after = after.replaceAll(from, to);
  if (after !== before) {
    await writeFile(file, after);
    changed += 1;
  }
}

console.log(`Design System: ${changed} arquivo(s) corrigido(s) automaticamente.`);
