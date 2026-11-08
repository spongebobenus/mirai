import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { resolve, extname } from 'path';

// Binary-safe multipart parser (no dependencies)
function parseMultipart(body: Buffer, boundary: string): { filename: string; data: Buffer } | null {
  const sep = Buffer.from('\r\n--' + boundary);
  const start = Buffer.from('--' + boundary + '\r\n');

  let pos = body.indexOf(start);
  if (pos === -1) return null;
  pos += start.length;

  while (pos < body.length) {
    const hEnd = body.indexOf(Buffer.from('\r\n\r\n'), pos);
    if (hEnd === -1) break;

    const header = body.slice(pos, hEnd).toString('utf8');
    const dataStart = hEnd + 4;

    const nextBound = body.indexOf(sep, dataStart);
    const dataEnd = nextBound === -1 ? body.length : nextBound;

    if (header.includes('filename=')) {
      const m = header.match(/filename="([^"]+)"/);
      const filename = m ? m[1] : 'upload';
      return { filename, data: body.slice(dataStart, dataEnd) };
    }

    if (nextBound === -1) break;
    pos = nextBound + sep.length + 2;
  }
  return null;
}

const devUploadPlugin = {
  name: 'dev-upload',
  configureServer(server: any) {
    server.middlewares.use('/upload.php', (req: any, res: any) => {
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.setHeader('Access-Control-Allow-Origin', '*');

      if (req.method === 'OPTIONS') { res.end('{}'); return; }
      if (req.method !== 'POST') {
        res.statusCode = 405;
        res.end(JSON.stringify({ error: 'Method not allowed' }));
        return;
      }

      const chunks: Buffer[] = [];
      req.on('data', (c: Buffer) => chunks.push(c));
      req.on('error', (e: Error) => {
        console.error('[upload] read error:', e.message);
        if (!res.headersSent) { res.statusCode = 500; res.end(JSON.stringify({ error: 'Read error' })); }
      });
      req.on('end', () => {
        try {
          const body = Buffer.concat(chunks);
          const ct: string = req.headers['content-type'] ?? '';
          const bm = ct.match(/boundary=([^\s;]+)/);
          if (!bm) {
            res.statusCode = 400;
            res.end(JSON.stringify({ error: 'No boundary in Content-Type' }));
            return;
          }

          const parsed = parseMultipart(body, bm[1]);
          if (!parsed) {
            res.statusCode = 400;
            res.end(JSON.stringify({ error: 'Файл не найден в запросе' }));
            return;
          }

          const ext = (extname(parsed.filename) || '.jpg').toLowerCase();
          const allowed = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.mp4', '.webm'];
          if (!allowed.includes(ext)) {
            res.statusCode = 415;
            res.end(JSON.stringify({ error: 'Недопустимый тип файла: ' + ext }));
            return;
          }

          // process.cwd() — работает и в CJS и в ESM
          const uploadDir = resolve(process.cwd(), 'public', 'images', 'uploads');
          if (!existsSync(uploadDir)) mkdirSync(uploadDir, { recursive: true });

          const name = `upload_${Date.now()}_${Math.random().toString(36).slice(2)}${ext}`;
          const dest = resolve(uploadDir, name);
          writeFileSync(dest, parsed.data);

          console.log('[upload] saved:', dest);
          res.end(JSON.stringify({ path: `/images/uploads/${name}` }));
        } catch (e: any) {
          console.error('[upload] error:', e);
          if (!res.headersSent) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: 'Ошибка сервера: ' + String(e?.message ?? e) }));
          }
        }
      });
    });
  },
};

export default defineConfig({
  base: '/',
  plugins: [react(), devUploadPlugin],
  server: {
    port: 3000,
    host: true, // доступен по локальной сети (192.168.x.x)
  },
});
