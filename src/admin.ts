/**
 * Admin panel routes — intentionally dense with HIGH/CRITICAL findings.
 * Used to validate the risk score gate (threshold: 80).
 * Expected: risk score ≥ 80, gate FAIL via risk_gate not quality_gate.
 */
import express, { Request, Response } from 'express';
import { execSync } from 'child_process';
import { Pool } from 'pg';
import * as crypto from 'crypto';

const router = express.Router();
const db = new Pool({ connectionString: process.env.DATABASE_URL });

// FINDING: SQL injection
router.get('/users', async (req: Request, res: Response) => {
  const id = req.query.id as string;
  const result = await db.query(`SELECT * FROM users WHERE id = '${id}'`);
  res.json(result.rows);
});

// FINDING: Command injection
router.post('/run', (req: Request, res: Response) => {
  const cmd = req.body.command as string;
  const output = execSync(cmd).toString();
  res.json({ output });
});

// FINDING: Hardcoded secret
const ADMIN_SECRET = 'supersecret123';

// FINDING: Weak crypto (MD5)
router.post('/hash', (req: Request, res: Response) => {
  const data = req.body.data as string;
  const hash = crypto.createHash('md5').update(data).digest('hex');
  res.json({ hash });
});

// FINDING: XSS
router.get('/greet', (req: Request, res: Response) => {
  const name = req.query.name as string;
  res.send(`<h1>Welcome ${name}</h1>`);
});

// FINDING: eval with user input
router.post('/eval', (req: Request, res: Response) => {
  const expr = req.body.expr as string;
  const result = eval(expr);
  res.json({ result });
});

export default router;
