const SECURITY_HEADERS = {
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Cross-Origin-Opener-Policy': 'same-origin',
};

function nonce() {
  const bytes = new Uint8Array(18);
  crypto.getRandomValues(bytes);
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary);
}

function applyCommonHeaders(headers, requestUrl) {
  for (const [name, value] of Object.entries(SECURITY_HEADERS)) headers.set(name, value);

  if (requestUrl.hostname.endsWith('.workers.dev')) {
    headers.set('X-Robots-Tag', 'noindex, nofollow');
  }

  if (requestUrl.pathname.startsWith('/_astro/') || requestUrl.pathname.startsWith('/assets/')) {
    headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  } else if (requestUrl.pathname === '/favicon.png') {
    headers.set('Cache-Control', 'public, max-age=604800');
  }
}

export default {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request);
    const headers = new Headers(response.headers);
    const url = new URL(request.url);
    applyCommonHeaders(headers, url);

    const contentType = headers.get('Content-Type') ?? '';
    if (!contentType.includes('text/html')) {
      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers,
      });
    }

    const value = nonce();
    headers.set(
      'Content-Security-Policy',
      `object-src 'none'; base-uri 'none'; script-src 'nonce-${value}' 'unsafe-inline' 'unsafe-eval' 'strict-dynamic' https: http:`
    );

    const rewritten = new HTMLRewriter()
      .on('script', {
        element(element) {
          element.setAttribute('nonce', value);
        },
      })
      .transform(
        new Response(response.body, {
          status: response.status,
          statusText: response.statusText,
          headers,
        })
      );

    return rewritten;
  },
};
