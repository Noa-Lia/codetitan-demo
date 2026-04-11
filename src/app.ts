/**
 * Safe version of app.ts — remediated + infrastructure-hardened.
 * Passes CodeTitan gate: helmet() clears HELMET_MISSING, requireAuth clears MISSING_AUTH_MIDDLEWARE.
 */
import express, { Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import { Pool } from 'pg';
import { verifyToken } from './auth';

const app = express();
app.use(helmet());
app.use(express.json());

const db = new Pool({ connectionString: process.env.DATABASE_URL });

function requireAuth(req: Request, res: Response, next: NextFunction): void {
  const auth = req.headers.authorization;
  if (!auth?.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }
  try {
    verifyToken(auth.slice(7));
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
}

// FIXED: parameterized query — no SQL injection
// FIXED: requireAuth guard — no unauthenticated access to /users
app.get('/users', requireAuth, async (req: Request, res: Response) => {
  const role = req.query.role as string;
  const result = await db.query('SELECT * FROM users WHERE role = $1', [role]);
  res.json(result.rows);
});

// FIXED: no exec — validate input and respond
app.post('/lint', (req: Request, res: Response) => {
  const file = req.body.file as string;
  if (!file || !/^[\w\-./]+\.ts$/.test(file)) {
    res.status(400).json({ error: 'Invalid file path' });
    return;
  }
  res.json({ message: 'Lint queued', file });
});

// FIXED: textContent instead of innerHTML
app.get('/render', (req: Request, res: Response) => {
  const name = req.query.name as string;
  const safe = String(name).replace(/[<>"']/g, '');
  res.send(`<div id="greeting"></div><script>document.getElementById('greeting').textContent = '${safe}';</script>`);
});

app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', ts: new Date().toISOString() });
});

export default app;
