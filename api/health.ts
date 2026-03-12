/**
 * API 동작 확인용 (GITHUB_TOKEN 불필요)
 */
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  return res.status(200).json({ ok: true, message: 'API 정상' });
}
