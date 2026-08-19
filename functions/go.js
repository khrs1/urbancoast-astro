// Cloudflare Pages Function - handles /go/?id=... affiliate redirects at the edge.
// This replaces the broken static go.astro approach. Runs server-side on every request.
// Click data is sent to a Cloudflare KV namespace if configured (see README).

import links from './affiliate-links.json';

// Flatten nested { network: { links: { id: {url} } } } into { id: {url, network} }
const LINK_MAP = {};
for (const [network, group] of Object.entries(links)) {
  for (const [id, entry] of Object.entries(group.links || {})) {
    LINK_MAP[id] = { url: entry.url, network };
  }
}

export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);
  const id = url.searchParams.get('id');

  const link = LINK_MAP[id];
  if (!link) {
    // Unknown id - redirect home
    return Response.redirect('https://urbancoast.dk/', 302);
  }

  // Log the click to Cloudflare KV if configured (click_logger namespace)
  try {
    if (context.env && context.env.AFFILIATE_CLICKS) {
      const ts = Date.now();
      await context.env.AFFILIATE_CLICKS.put(
        `click:${ts}:${id}:${Math.random().toString(36).slice(2, 8)}`,
        JSON.stringify({
          id,
          network: link.network,
          url: link.url,
          ts: new Date(ts).toISOString(),
          referrer: request.headers.get('referer') || '',
        })
      );
    }
  } catch (e) {
    // Logging failure shouldn't break the redirect
  }

  return Response.redirect(link.url, 302);
}
