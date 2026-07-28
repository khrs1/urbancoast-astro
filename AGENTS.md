# UrbanCoast.dk — Agent Information

## Site Information
- **Name**: UrbanCoast.dk
- **Language**: Danish (da-DK)
- **Type**: Content site / blog — fitness, supplements, training guides
- **Description**: Dansk website med vejledning, tests og guides til træning, kosttilskud og en aktiv livsstil.

## Content Structure
- **Blog posts**: `/blog/[slug]` — markdown-based articles about fitness, supplements, and training
- **Glossary**: `/ordbog/[slug]` — fitness terminology definitions
- **Products**: `/produkter/[slug]` — product reviews with affiliate links
- **Categories**: `/kategori/[name]` — category listing pages

## Agent Instructions
- This site is in Danish. All content, titles, and descriptions are in Danish.
- Blog content is available as markdown files in `src/content/blog/`
- Glossary entries are in `src/content/glossary/`
- Product reviews are in `src/content/products/`
- Affiliate links use the `/go/?id=...` redirect pattern

## Build
- **Framework**: Astro v4
- **Deployment**: Static site (Cloudflare Pages / Railway)
- **Build command**: `npm run build`
- **Output**: `dist/` directory

## Key Files
- `llms.txt` — Site summary for AI agents
- `robots.txt` — Crawler rules (AI bots allowed)
- `sitemap-index.xml` — Auto-generated sitemap
- `.well-known/mcp/server-card.json` — MCP Server Card
- `.well-known/agent.json` — A2A Agent Card
- `.well-known/ai-catalog.json` — Agentic Resource Discovery

## Affiliate Networks
- **Partner Ads**: `https://www.partner-ads.com/dk/klikbanner.php?partnerid=27805`
- **Adtraction**: `https://track.adtraction.com/t/t?a=...`