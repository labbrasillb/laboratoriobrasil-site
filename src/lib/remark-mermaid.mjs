function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function exampleTitle(meta) {
  const match = meta?.match(/(?:^|\s)title=(?:"([^"]+)"|'([^']+)'|([^\s]+))/);
  return match?.[1] ?? match?.[2] ?? match?.[3] ?? 'Exemplo';
}

function transform(node) {
  if (!node || !Array.isArray(node.children)) return;

  node.children = node.children.map((child) => {
    if (child?.type === 'code' && child.lang === 'mermaid') {
      const source = escapeHtml(child.value.trim());
      return {
        type: 'html',
        value: `<figure class="mermaid-diagram" data-mermaid-diagram><div class="mermaid">${source}</div></figure>`,
      };
    }

    if (child?.type === 'code' && child.lang === 'example') {
      const title = escapeHtml(exampleTitle(child.meta));
      const source = escapeHtml(child.value.trim());
      return {
        type: 'html',
        value: `<figure class="article-example"><figcaption>${title}</figcaption><pre>${source}</pre></figure>`,
      };
    }

    transform(child);
    return child;
  });
}

export default function remarkMermaid() {
  return (tree) => transform(tree);
}
