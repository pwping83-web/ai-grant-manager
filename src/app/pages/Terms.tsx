import { Link } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft, Sparkles } from 'lucide-react';

export function Terms() {
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
        <h1 style={{ fontSize: '1.375rem', fontWeight: 700 }} className="mb-1">이용약관</h1>
        <p className="text-muted-foreground mb-8" style={{ fontSize: '0.75rem' }}>2026년 3월 7일</p>

        <div className="space-y-6 text-muted-foreground" style={{ fontSize: '0.8125rem', lineHeight: 1.8 }}>
          <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 space-y-2">
            <p className="text-amber-900" style={{ fontWeight: 500 }}>
              본 서비스는 정부지원금 정보를 안내하는 <strong>정보 소개 플랫폼</strong>이며, 지원금 선정 결과에 대한 법적 책임을 지지 않습니다.
            </p>
            <p className="text-amber-900" style={{ fontSize: '0.8125rem', lineHeight: 1.6 }}>
              합격 여부는 전적으로 기업의 역량, 제출 자료 완성도, 심사 기관의 판단에 달려 있으며, AI 초안은 참고용 도구일 뿐 그 자체로 합격을 보장하지 않습니다.
            </p>
          </div>

          <div>
            <h2 className="text-foreground mb-2" style={{ fontSize: '0.9375rem', fontWeight: 600 }}>서비스 이용</h2>
            <ul className="space-y-1.5 list-disc list-inside">
              <li>기본 조회·매칭은 무료이며, AI 작성 등 유료 서비스는 별도 안내됩니다.</li>
              <li>이용자는 정확한 정보를 입력해야 하며, 허위 정보에 대한 책임은 이용자에게 있습니다.</li>
              <li>AI 생성 초안은 참고용이며, 제출 전 반드시 직접 검토해야 합니다.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-foreground mb-2" style={{ fontSize: '0.9375rem', fontWeight: 600 }}>면책</h2>
            <ul className="space-y-1.5 list-disc list-inside">
              <li>서비스는 지원금 선정·심사·지급에 대해 어떠한 법적 책임도 지지 않습니다.</li>
              <li>실제 자격·조건은 해당 공고 기관에 직접 확인하셔야 합니다.</li>
              <li>서비스는 운영상 필요에 따라 변경·중단될 수 있으며, 사전 공지합니다.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-foreground mb-2" style={{ fontSize: '0.9375rem', fontWeight: 600 }}>기타</h2>
            <p>본 약관에 관한 분쟁은 대한민국 법률을 적용하며, 서비스 소재지 관할 법원을 합의 관할로 합니다.</p>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border text-center">
          <Link to="/" className="text-primary hover:underline" style={{ fontSize: '0.8125rem' }}>← 홈으로</Link>
        </div>
      </motion.main>
    </div>
  );
}
