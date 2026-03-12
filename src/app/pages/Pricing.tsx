import { Link } from 'react-router';
import { motion } from 'motion/react';
import { Sparkles, Check, Zap, Crown, ArrowRight } from 'lucide-react';

const plans = [
  {
    id: 'free',
    name: '무료',
    price: 0,
    description: '맞춤 지원금만 조회하고 싶다면',
    icon: Zap,
    features: [
      '맞춤 지원금 조회 무제한',
      '마감 알림',
      '1,500+ 공고 매칭',
    ],
    cta: '무료로 시작하기',
    href: '/onboarding',
    highlight: false,
  },
  {
    id: 'standard',
    name: '스탠다드',
    price: 29000,
    description: 'AI가 초안을 써드려요',
    icon: Sparkles,
    features: [
      '무료 혜택 전체',
      'AI 사업계획서 초안 월 3회',
      '심사 기준 맞춤 강조',
      '전문가 첨삭 신청 가능 (별도)',
    ],
    cta: '월 29,000원 구독하기',
    href: '#',  // 결제 연동 시 교체
    highlight: true,
  },
  {
    id: 'premium',
    name: '프리미엄',
    price: 89000,
    description: '전문가가 1:1로 완성도를 높여요',
    icon: Crown,
    features: [
      '스탠다드 혜택 전체',
      'AI 초안 무제한',
      '전문가 1:1 첨삭 월 1회',
      '우선 고객 지원',
    ],
    cta: '월 89,000원 구독하기',
    href: '#',
    highlight: false,
  },
];

export function Pricing() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-2xl border-b border-border/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-primary to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <span className="text-foreground" style={{ fontSize: '1rem', fontWeight: 600 }}>지원금 AI</span>
          </Link>
          <Link to="/dashboard" className="text-muted-foreground hover:text-foreground" style={{ fontSize: '0.8125rem' }}>
            대시보드
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-24 sm:pt-32 pb-12 sm:pb-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-foreground mb-4"
            style={{ fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', fontWeight: 700, lineHeight: 1.3 }}
          >
            수천만 원 지원금 받는 데<br />
            <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">월 수만 원</span>이면 충분합니다
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground"
            style={{ fontSize: '0.9375rem', lineHeight: 1.7 }}
          >
            컨설팅비 수백만 원 대신, AI 초안과 전문가 첨삭으로 합격률을 높이세요.
          </motion.p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-20 sm:pb-28 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
            {plans.map((plan, i) => {
              const Icon = plan.icon;
              return (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`rounded-2xl sm:rounded-3xl border-2 p-6 sm:p-8 relative ${
                    plan.highlight
                      ? 'border-primary bg-gradient-to-b from-accent/30 to-white shadow-xl shadow-primary/10'
                      : 'border-border bg-white hover:border-primary/20'
                  }`}
                >
                  {plan.highlight && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="bg-gradient-to-r from-primary to-blue-600 text-white px-4 py-1 rounded-full" style={{ fontSize: '0.75rem', fontWeight: 600 }}>
                        인기
                      </span>
                    </div>
                  )}
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${
                    plan.highlight ? 'bg-primary/10' : 'bg-[#F7F8FA]'
                  }`}>
                    <Icon className={`w-6 h-6 ${plan.highlight ? 'text-primary' : 'text-muted-foreground'}`} />
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }} className="mb-1">{plan.name}</h3>
                  <p className="text-muted-foreground mb-6" style={{ fontSize: '0.8125rem' }}>{plan.description}</p>
                  <div className="mb-6">
                    <span className="text-foreground" style={{ fontSize: '2rem', fontWeight: 800 }}>
                      {plan.price === 0 ? '0' : plan.price.toLocaleString()}
                    </span>
                    {plan.price > 0 && (
                      <span className="text-muted-foreground" style={{ fontSize: '0.875rem' }}>원/월</span>
                    )}
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span style={{ fontSize: '0.8125rem', lineHeight: 1.5 }}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    to={plan.href}
                    className={`block w-full text-center py-3.5 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                      plan.highlight
                        ? 'bg-gradient-to-r from-primary to-blue-600 text-white shadow-lg shadow-primary/20 hover:shadow-xl'
                        : plan.price === 0
                          ? 'bg-[#F7F8FA] text-foreground hover:bg-secondary'
                          : 'border-2 border-primary text-primary hover:bg-accent'
                    }`}
                    style={{ fontSize: '0.875rem' }}
                  >
                    {plan.cta}
                    {plan.price > 0 && <ArrowRight className="w-4 h-4" />}
                  </Link>
                </motion.div>
              );
            })}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center text-muted-foreground mt-8"
            style={{ fontSize: '0.75rem' }}
          >
            * 결제 연동 시 실제 결제가 진행됩니다. 모든 요금제는 부가세 별도입니다.
          </motion.p>
        </div>
      </section>
    </div>
  );
}
