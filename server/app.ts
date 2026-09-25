import express from 'express';
import dotenv from 'dotenv';
import { apiRouter } from './routes/api.js';

dotenv.config();

export function createApp() {
  const app = express();

  app.use(express.json({ limit: '20mb' }));
  app.use(express.urlencoded({ extended: true, limit: '20mb' }));

  // All application API routes live under /api/*.
  app.use('/api', apiRouter);

  app.get('/health', (_req, res) => {
    res.json({
      status: 'ok',
      service: 'BIS Intelligence Assistant Backend',
      runtime: process.env.VERCEL ? 'vercel' : 'node'
    });
  });

  return app;
}

export const app = createApp();
