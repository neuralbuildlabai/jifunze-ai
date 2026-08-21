// UAT-only local server that emulates the vercel.json `routes` semantics against dist/.
// Not part of the app. Run: node scripts/uat-static-server.mjs [port]
import { createServer } from 'node:http'
import { readFileSync, existsSync, statSync } from 'node:fs'
import { join, normalize, extname } from 'node:path'

const dist = join(process.cwd(), 'dist')
const cfg = JSON.parse(readFileSync(join(process.cwd(), 'vercel.json'), 'utf8'))
const routes = cfg.routes
const port = Number(process.argv[2] || 4173)

const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.ico': 'image/x-icon',
  '.webmanifest': 'application/manifest+json', '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml', '.json': 'application/json', '.woff2': 'font/woff2',
}

function serveFile(res, file, status = 200) {
  const body = readFileSync(file)
  res.writeHead(status, { 'content-type': MIME[extname(file)] || 'application/octet-stream' })
  res.end(body)
}

createServer((req, res) => {
  const url = new URL(req.url, 'http://x')
  const path = normalize(url.pathname)
  for (const r of routes) {
    if (r.handle === 'filesystem') {
      const file = join(dist, path)
      if (path !== '/' && existsSync(file) && statSync(file).isFile()) return serveFile(res, file)
      continue
    }
    const re = new RegExp(r.src)
    if (!re.test(path)) continue
    if (r.headers?.Location) {
      res.writeHead(r.status ?? 308, { Location: path.replace(re, r.headers.Location) })
      return res.end()
    }
    if (r.dest) {
      const destFile = join(dist, r.dest === '/index.html' ? 'index.html' : r.dest)
      return serveFile(res, destFile, r.status ?? 200)
    }
  }
  res.writeHead(404, { 'content-type': 'text/plain' })
  res.end('unrouted')
}).listen(port, '127.0.0.1', () => console.log(`uat server on http://127.0.0.1:${port}`))
