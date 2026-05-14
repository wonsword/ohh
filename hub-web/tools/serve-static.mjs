import { createServer } from 'node:http';
import { appendFileSync, createReadStream, statSync } from 'node:fs';
import { join, normalize, resolve, extname } from 'node:path';

const root = resolve(process.argv[2] ?? 'out');
const port = Number(process.env.PORT ?? process.argv[3] ?? 3001);
const host = process.env.HOST ?? '127.0.0.1';
const logFile = join(process.cwd(), 'static-server.log');

function log(message) {
  try {
    appendFileSync(logFile, `${new Date().toISOString()} ${message}\n`);
  } catch {
    // Keep the preview server alive even if another process has the log file open.
  }
}

process.on('uncaughtException', (error) => {
  log(`uncaughtException ${error.stack ?? error.message}`);
});

process.on('unhandledRejection', (error) => {
  log(`unhandledRejection ${error?.stack ?? error}`);
});

const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml'
};

function resolveFile(urlPath) {
  const requested = decodeURIComponent(urlPath.split('?')[0]);
  const cleanPath = normalize(requested === '/' ? 'index.html' : requested).replace(/^[/\\]+/, '');
  let file = resolve(join(root, cleanPath));
  if (!file.startsWith(root)) return null;

  try {
    if (statSync(file).isDirectory()) file = join(file, 'index.html');
  } catch {
    if (!extname(file)) file = `${file}.html`;
  }

  return file;
}

const server = createServer((request, response) => {
  log(`${request.method} ${request.url}`);
  const file = resolveFile(request.url ?? '/');
  if (!file) {
    response.writeHead(403);
    response.end('Forbidden');
    return;
  }

  try {
    const stream = createReadStream(file);
    stream.on('open', () => {
      response.writeHead(200, {
        'content-type': types[extname(file).toLowerCase()] ?? 'application/octet-stream'
      });
    });
    stream.on('error', () => {
      response.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' });
      response.end('Not found');
    });
    stream.pipe(response);
  } catch {
    response.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' });
    response.end('Not found');
  }
});

server.listen(port, host, () => {
  log(`Serving ${root} at http://${host}:${port}`);
  console.log(`Serving ${root} at http://${host}:${port}`);
});
