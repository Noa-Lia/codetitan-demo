/**
 * Sample Express app used in the codetitan-demo repo.
 * This file intentionally contains patterns that CodeTitan flags.
 */
import express, { Request, Response } from 'express';
import { execSync } from 'child_process';
import { Pool } from 'pg';

const app = express();
app.use(express.json());

const db = new Pool({ connectionString: process.env.DATABASE_URL });

// FINDING: SQL injection — user input concatenated directly into query
app.get('/users', async (req: Request, res: Response) => {
  const role = req.query.role as string;
  const result = await db.query(`SELECT * FROM users WHERE role = '${role}'`);
  res.json(result.rows);
});

// FINDING: Command injection — exec with unsanitized input
app.post('/lint', (req: Request, res: Response) => {
  const file = req.body.file as string;
  const output = execSync(`eslint ${file}`).toString();
  res.json({ output });
});

// FINDING: XSS — innerHTML assignment from user data
app.get('/render', (req: Request, res: Response) => {
  const name = req.query.name as string;
  res.send(`<div id="greeting"></div><script>document.getElementById('greeting').innerHTML = '${name}';</script>`);
});

// Clean endpoint — CodeTitan should pass this
app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', ts: new Date().toISOString() });
});

export default app;
