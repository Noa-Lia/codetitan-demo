/**
 * Auth helpers — fixed version using environment variable for the secret.
 */
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is required');
}

export function signToken(userId: string): string {
  return jwt.sign({ userId }, JWT_SECRET as string, { expiresIn: '1d' });
}

export function verifyToken(token: string): { userId: string } {
  return jwt.verify(token, JWT_SECRET as string) as { userId: string };
}
