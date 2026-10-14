import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';

const files = { '/': ['index.html', 'text/html'], '/index.html': ['index.html', 'text/html'], '/styles.css': ['styles.css', 'text/css'], '/app.mjs': ['app.mjs', 'text/javascript'], '/flow.mjs': ['flow.mjs', 'text/javascript'], '/icon.svg': ['icon.svg', 'image/svg+xml'] };
files['/learn.html'] = ['learn.html', 'text/html'];
files['/devices.html'] = ['devices.html', 'text/html'];
files['/learning.mjs'] = ['learning.mjs', 'text/javascript'];
createServer(async (request, response) => {
  const file = files[new URL(request.url, 'http://localhost').pathname];
  if (!file) { response.writeHead(404); response.end('Not found'); return; }
  try {
    const body = await readFile(new URL(file[0], import.meta.url));
    response.writeHead(200, { 'Content-Type': `${file[1]}; charset=utf-8`, 'Cache-Control': 'no-store' });
    response.end(body);
  } catch { response.writeHead(500); response.end('Unable to read asset'); }
}).listen(4182, '127.0.0.1', () => console.log('Local: http://127.0.0.1:4182'));
