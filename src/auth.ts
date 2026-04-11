/**
 * Auth helpers — contains a deliberately weak pattern for demo purposes.
 */
import jwt from 'jsonwebtoken';

// FINDING: hardcoded secret
const JWT_SECRET = 'super-secret-key-1234';

export function signToken(userId: string): string {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1d' });
}

export function verifyToken(token: string): { userId: string } {
  return jwt.verify(token, JWT_SECRET) as { userId: string };
}
