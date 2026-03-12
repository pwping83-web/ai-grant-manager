import { RouterProvider } from 'react-router';
import { router } from './routes';
import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';

function useFavicon() {
  useEffect(() => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
      <defs>
        <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#3182F6"/>
          <stop offset="100%" style="stop-color:#2563EB"/>
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="8" fill="url(#g)"/>
      <path d="M16 7l1.5 3.5L21 12l-3.5 1.5L16 17l-1.5-3.5L11 12l3.5-1.5L16 7z" fill="white" opacity="0.95"/>
      <path d="M22 17l1 2.2L25.2 20l-2.2 1L22 23.2 21 21l-2.2-1L21 19l1-2z" fill="white" opacity="0.7"/>
      <path d="M11 18l0.7 1.6 1.6 0.7-1.6 0.7-0.7 1.6-0.7-1.6-1.6-0.7 1.6-0.7 0.7-1.6z" fill="white" opacity="0.5"/>
    </svg>`;
    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    let link = document.querySelector("link[rel*='icon']") as HTMLLinkElement;
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    link.type = 'image/svg+xml';
    link.href = url;

    // Also set the page title
    document.title = '지원금 AI 매니저 | 내 숨은 정부지원금 찾기';

    return () => URL.revokeObjectURL(url);
  }, []);
}

function useSupabaseConnectionTest() {
  useEffect(() => {
    const testConnection = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          console.error('[Supabase 연결 테스트] 오류:', error.message);
          return;
        }
        console.log('[Supabase 연결 테스트] ✅ 연결 성공!', {
          session: data.session ? '세션 있음' : '세션 없음(비로그인)',
        });
      } catch (err) {
        console.error('[Supabase 연결 테스트] 예외:', err);
      }
    };
    testConnection();
  }, []);
}

export default function App() {
  useFavicon();
  useSupabaseConnectionTest();
  return <RouterProvider router={router} />;
}
