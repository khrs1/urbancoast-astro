import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { join, extname, normalize } from 'node:path';
import { gzipSync } from 'node:zlib';

const ROOT = join(process.cwd(), 'dist');
const PORT = process.env.PORT || 4321;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.map': 'application/json; charset=utf-8',
};

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://localhost:${PORT}`);
    let path = normalize(decodeURIComponent(url.pathname));
    
    // Security: prevent directory traversal
    if (path.includes('..')) {
      res.writeHead(403);
      res.end('Forbidden');
      return;
    }

    // Try to resolve the file
    let filePath = join(ROOT, path);
    
    // If path ends with /, try index.html
    if (path.endsWith('/')) {
      filePath = join(filePath, 'index.html');
    } else {
      // Check if it's a directory
      try {
        const s = await stat(filePath);
        if (s.isDirectory()) {
          filePath = join(filePath, 'index.html');
        }
      } catch {
        // Not found, try with .html extension
        try {
          await stat(filePath + '.html');
          filePath = filePath + '.html';
        } catch {
          // Try /index.html fallback for SPA-like routing
          try {
            await stat(join(ROOT, path, 'index.html'));
            filePath = join(ROOT, path, 'index.html');
          } catch {
            // 404
            res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end('<!doctype html><html><head><title>404</title></head><body><h1>404 - Side ikke fundet</h1><p><a href="/">Tilbage til forsiden</a></p></body></html>');
            return;
          }
        }
      }
    }

    // Check file exists
    try {
      await stat(filePath);
    } catch {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end('<!doctype html><html><head><title>404</title></head><body><h1>404 - Side ikke fundet</h1><p><a href="/">Tilbage til forsiden</a></p></body></html>');
      return;
    }

    // Read file
    const data = await readFile(filePath);
    const ext = extname(filePath).toLowerCase();
    const mime = MIME[ext] || 'application/octet-stream';

    // Headers
    const headers = {
      'Content-Type': mime,
      'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=31536000, immutable',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
    };

    // Gzip compression for text-based files
    const acceptEncoding = req.headers['accept-encoding'] || '';
    if (acceptEncoding.includes('gzip') && ['.html', '.css', '.js', '.json', '.xml', '.svg', '.txt'].includes(ext)) {
      headers['Content-Encoding'] = 'gzip';
      headers['Vary'] = 'Accept-Encoding';
      res.writeHead(200, headers);
      res.end(gzipSync(data));
    } else {
      headers['Content-Length'] = data.length;
      res.writeHead(200, headers);
      res.end(data);
    }
  } catch (err) {
    console.error('Server error:', err);
    res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end('<!doctype html><html><head><title>500</title></head><body><h1>500 - Server fejl</h1></body></html>');
  }
});

server.listen(PORT, () => {
  console.log(`🚀 UrbanCoast.dk serving on port ${PORT}`);
});