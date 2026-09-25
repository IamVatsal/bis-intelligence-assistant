import { app } from '../server/app.js';

// Vercel catch-all serverless function for the Express API.
// This keeps the existing /api/* URLs intact while removing the need for
// a long-running Express listener in production.
export default app;
