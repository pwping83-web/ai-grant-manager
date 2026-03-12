import { Link } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft, Sparkles } from 'lucide-react';

export function Privacy() {
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
        <h1 style={{ fontSize: '1.375rem', fontWeight: 700 }} className="mb-1">개인정보처리방침</h1>
        <p className="text-muted-foreground mb-8" style={{ fontSize: '0.75rem' }}>2026년 3월 7일</p>

        <div className="space-y-6 text-muted-foreground" style={{ fontSize: '0.8125rem', lineHeight: 1.8 }}>
          <div>
            <h2 className="text-foreground mb-2" style={{ fontSize: '0.9375rem', fontWeight: 600 }}>수집 항목 및 목적</h2>
            <div className="bg-[#F7F8FA] rounded-xl p-4 space-y-2">
              <p><span className="text-foreground" style={{ fontWeight: 500 }}>필수:</span> 사업장 형태, 창업 시기, 출생연도, 지역, 업종, 직원 수, 매출 규모</p>
              <p><span className="text-foreground" style={{ fontWeight: 500 }}>선택:</span> 이메일, 사업자등록번호, 대표자명</p>
            </div>
            <p className="mt-2">맞춤 지원금 매칭, AI 지원서 작성 보조, 서비스 개선(비식별)에 사용됩니다.</p>
          </div>

          <div>
            <h2 className="text-foreground mb-2" style={{ fontSize: '0.9375rem', fontWeight: 600 }}>보유 및 파기</h2>
            <ul className="space-y-1.5 list-disc list-inside">
              <li>비회원: 세션 종료 시 삭제</li>
              <li>회원: 탈퇴 시 즉시 삭제 (법령 보관 의무 제외)</li>
              <li>결제 기록: 전자상거래법에 따라 5년 보관</li>
            </ul>
          </div>

          <div>
            <h2 className="text-foreground mb-2" style={{ fontSize: '0.9375rem', fontWeight: 600 }}>이용자 권리</h2>
            <p>개인정보의 열람·수정·삭제·처리 정지를 언제든 요청할 수 있습니다.</p>
          </div>

          <div className="bg-accent rounded-xl p-4">
            <p className="text-primary" style={{ fontWeight: 500 }}>이용자의 동의 없이 개인정보를 제3자에게 제공하지 않습니다.</p>
          </div>

          <div>
            <h2 className="text-foreground mb-2" style={{ fontSize: '0.9375rem', fontWeight: 600 }}>AI 및 사업계획서 데이터</h2>
            <div className="bg-green-50 border border-green-100 rounded-xl p-4 space-y-2">
              <p><span className="text-foreground" style={{ fontWeight: 500 }}>학습 미사용:</span> 사업계획서, 키워드 등 AI에 입력하신 데이터는 AI 모델 학습에 절대 사용되지 않습니다.</p>
              <p><span className="text-foreground" style={{ fontWeight: 500 }}>암호화·폐기:</span> 처리 완료 후 즉시 암호화되어 보관되며, 서비스 이용 목적 달성 시 폐기됩니다.</p>
            </div>
          </div>

          <div>
            <h2 className="text-foreground mb-2" style={{ fontSize: '0.9375rem', fontWeight: 600 }}>보호책임자</h2>
            <p>박원평 · tseizou@naver.com</p>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border text-center">
          <Link to="/" className="text-primary hover:underline" style={{ fontSize: '0.8125rem' }}>← 홈으로</Link>
        </div>
      </motion.main>
    </div>
  );
}
