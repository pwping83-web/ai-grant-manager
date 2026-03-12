import { Link } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft, Sparkles } from 'lucide-react';

const info = [
  { label: '상호', value: '지원금 AI 매니저' },
  { label: '대표', value: '박원평' },
  { label: '사업자등록번호', value: '302-47-00920' },
  { label: '소재지', value: '인천광역시 중구 운북동 506-59' },
  { label: '이메일', value: 'tseizou@naver.com' },
];

export function BusinessInfo() {
  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-2xl border-b border-border/30">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-br from-primary to-blue-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-white" />
            </div>
            <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>지원금 AI 매니저</span>
          </div>
        </div>
      </header>

      <motion.main
        className="max-w-3xl mx-auto px-4 py-8 sm:py-12"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 style={{ fontSize: '1.375rem', fontWeight: 700 }} className="mb-8">사업자정보</h1>

        <div className="border border-border rounded-2xl divide-y divide-border overflow-hidden">
          {info.map((item) => (
            <div key={item.label} className="flex items-center px-5 py-4 hover:bg-[#F7F8FA] transition-colors">
              <span className="text-muted-foreground w-28 shrink-0" style={{ fontSize: '0.8125rem' }}>{item.label}</span>
              <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>{item.value}</span>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-amber-50 border border-amber-100 rounded-xl p-4">
          <p className="text-amber-900" style={{ fontSize: '0.75rem', lineHeight: 1.6 }}>
            본 서비스는 정부지원금 정보를 안내하는 정보 소개 플랫폼이며, 선정 결과에 대한 법적 책임을 지지 않습니다.
          </p>
        </div>

        <div className="mt-6 flex gap-4 justify-center text-muted-foreground" style={{ fontSize: '0.8125rem' }}>
          <Link to="/terms" className="hover:text-primary transition-colors">이용약관</Link>
          <span className="text-border">·</span>
          <Link to="/privacy" className="hover:text-primary transition-colors">개인정보처리방침</Link>
        </div>

        <div className="mt-8 pt-6 border-t border-border text-center">
          <Link to="/" className="text-primary hover:underline" style={{ fontSize: '0.8125rem' }}>← 홈으로</Link>
        </div>
      </motion.main>
    </div>
  );
}
