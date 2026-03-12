/**
 * GitHub Actions workflow_dispatch 트리거
 * Vercel env: GITHUB_TOKEN (workflow 권한 있는 PAT)
 */
import type { VercelRequest, VercelResponse } from '@vercel/node';

const OWNER = 'pwping83-web';
const REPO = 'ai-grant-manager';
const WORKFLOW_ID = 'daily-crawler.yml';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    return res.status(500).json({
      ok: false,
      error: 'GITHUB_TOKEN이 설정되지 않았습니다. Vercel 환경변수에 등록해 주세요.',
    });
  }

  try {
    const response = await fetch(
      `https://api.github.com/repos/${OWNER}/${REPO}/actions/workflows/${WORKFLOW_ID}/dispatches`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github+json',
          'X-GitHub-Api-Version': '2022-11-28',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ref: 'main' }),
      }
    );

    if (!response.ok) {
      const text = await response.text();
      console.error('[crawl] GitHub API error:', response.status, text);
      return res.status(response.status).json({
        ok: false,
        error: `크롤러 실행 실패 (${response.status})`,
        details: text,
      });
    }

    return res.status(200).json({
      ok: true,
      message: '크롤러가 실행되었습니다. 약 1~2분 후 새로고침하면 최신 지원정보를 볼 수 있습니다.',
    });
  } catch (err) {
    console.error('[crawl] Error:', err);
    return res.status(500).json({
      ok: false,
      error: err instanceof Error ? err.message : '서버 오류',
    });
  }
}
