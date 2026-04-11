/**
 * Safe version of app.ts — this is what CodeTitan's fixes look like after remediation.
 * Used in a PR to show a PASS result.
 */
import express, { Request, Response } from 'express';
import { Pool } from 'pg';

const app = express();
app.use(express.json());

const db = new Pool({ connectionString: process.env.DATABASE_URL });

// FIXED: parameterized query — no SQL injection risk
app.get('/users', async (req: Request, res: Response) => {
  const role = req.query.role as string;
  const result = await db.query('SELECT * FROM users WHERE role = $1', [role]);
  res.json(result.rows);
});

// FIXED: removed exec — validate and respond with an error instead
app.post('/lint', (req: Request, res: Response) => {
  const file = req.body.file as string;
  if (!file || !/^[\w\-./]+\.ts$/.test(file)) {
    res.status(400).json({ error: 'Invalid file path' });
    return;
  }
  res.json({ message: 'Lint queued', file });
});

// FIXED: textContent used instead of innerHTML
app.get('/render', (req: Request, res: Response) => {
  const name = req.query.name as string;
  const safe = String(name).replace(/[<>"']/g, '');
  res.send(`<div id="greeting"></div><script>document.getElementById('greeting').textContent = '${safe}';</script>`);
});

app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', ts: new Date().toISOString() });
});

export default app;
