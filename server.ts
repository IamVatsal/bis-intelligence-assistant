import path from 'path';
import { fileURLToPath } from 'url';
import { app } from './server/app.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const port = Number(process.env.PORT) || 3000;
const isDev = process.env.NODE_ENV !== 'production';

async function startServer() {
  if (isDev) {
    // Vite is only used as middleware for local development.
    // On Vercel, the React build is served by Vercel and /api/* is handled
    // by the serverless function in api/[...path].ts.
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use((await import('express')).default.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${port} [${isDev ? 'development' : 'production'}]`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
