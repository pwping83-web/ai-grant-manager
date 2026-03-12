import { Link } from 'react-router';
import { motion } from 'motion/react';
import { Sparkles, Target, FileText, Clock, ArrowRight, ChevronRight, Shield, Zap, BarChart3, X, Check, Quote, AlertTriangle, Frown, PartyPopper, Users, TrendingUp, Star, Lock } from 'lucide-react';
import { useState } from 'react';

const painPoints = [
  '소상공인24 들어갔더니 이미 접수 마감...',
  '초창패, 청창사... 나한테 맞는 건지 포기...',
  '겨우 찾았는데 사업계획서 양식의 압박...',
];

const testimonials = [
  {
    quote: '저도 몰랐던 \'스마트상점 기술보급사업\'을 AI가 찾아줘서 단숨에 해결했습니다!',
    name: '김○○',
    desc: '디저트 F&B 창업 준비',
    age: '20대',
    amount: '3,000만원',
    color: 'bg-orange-50 border-orange-100',
  },
  {
    quote: '내 업력과 고용 상태에 딱 맞는 고용지원금을 알아서 필터링해주니 신세계네요.',
    name: '박○○',
    desc: 'IT 스타트업 대표',
    age: '30대',
    amount: '8,000만원',
    color: 'bg-blue-50 border-blue-100',
  },
  {
    quote: '키워드만 넣으면 AI가 정부 심사 기준에 맞춰 써주더라고요. 행정사비 아꼈어요.',
    name: '이○○',
    desc: '제조업 소상공인',
    age: '40대',
    amount: '1억원',
    color: 'bg-green-50 border-green-100',
  },
];

const features = [
  {
    icon: Target,
    title: '맞춤 큐레이션',
    description: '창업·고용·R&D·정책자금까지, 내 조건에 맞는 지원금만 추천',
    color: 'bg-blue-50 text-blue-600',
  },
  {
    icon: Sparkles,
    title: 'AI 초안 도구',
    description: '2주 걸리던 초안 작성, 1시간으로. 전문가 첨삭으로 완성',
    color: 'bg-purple-50 text-purple-600',
  },
  {
    icon: Clock,
    title: '마감 알림',
    description: '놓치면 안 되는 마감을 미리 안내',
    color: 'bg-amber-50 text-amber-600',
  },
  {
    icon: Shield,
    title: '검증된 정보',
    description: '정부 공식 데이터 기반 검수 완료',
    color: 'bg-green-50 text-green-600',
  },
];

const stats = [
  { value: '12,000+', label: '이용 대표님' },
  { value: '1,500+', label: '분석 공고' },
  { value: '89%', label: '매칭 정확도' },
  { value: '340억+', label: '누적 매칭' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export function Landing() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white">
      {/* 보안 안내 배너 */}
      <div className="fixed top-0 left-0 right-0 z-[60] bg-primary/95 text-white py-2 px-4 flex items-center justify-center gap-2" style={{ fontSize: '0.75rem', fontWeight: 500 }}>
        <Lock className="w-3.5 h-3.5 shrink-0" />
        <span>입력하신 데이터는 AI 학습에 절대 사용되지 않으며, 즉시 암호화·폐기됩니다</span>
      </div>

      {/* Header */}
      <header className="fixed top-9 left-0 right-0 z-50 bg-white/70 backdrop-blur-2xl border-b border-border/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between">
          <motion.div
            className="flex items-center gap-2"
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-primary to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <span className="text-foreground" style={{ fontSize: '1rem', fontWeight: 600 }}>지원금 AI</span>
          </motion.div>
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              to="/pricing"
              className="text-muted-foreground hover:text-foreground transition-colors px-2 sm:px-3 py-1.5"
              style={{ fontSize: '0.8125rem' }}
            >
              요금제
            </Link>
            <Link
              to="/login"
              className="text-muted-foreground hover:text-foreground transition-colors px-2 sm:px-3 py-1.5"
              style={{ fontSize: '0.8125rem' }}
            >
              로그인
            </Link>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/onboarding"
                className="bg-gradient-to-r from-primary to-blue-600 text-white px-3 sm:px-5 py-2 rounded-xl transition-all duration-300"
                style={{ fontSize: '0.8125rem', fontWeight: 500, boxShadow: '0 10px 15px -3px rgba(49,130,246,0.3)' }}
              >
                무료 조회
              </Link>
            </motion.div>
          </div>
        </div>
      </header>

      {/* ===== 섹션 1: 메인 히어로 ===== */}
      <section className="pt-32 sm:pt-40 pb-12 sm:pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute top-40 right-1/4 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <motion.div
              className="inline-flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-accent to-blue-50 text-primary px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-5 sm:mb-6 border border-primary/10"
              style={{ fontSize: '0.75rem', fontWeight: 500 }}
              whileHover={{ scale: 1.05, boxShadow: '0 4px 20px rgba(49,130,246,0.15)' }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>초안 작성 2주 → 1시간으로, AI가 도와드립니다</span>
            </motion.div>
            <h1 className="text-foreground mb-4 sm:mb-6 px-2" style={{ fontSize: 'clamp(1.5rem, 6vw, 3.25rem)', fontWeight: 700, lineHeight: 1.25 }}>
              놓친 정부지원금,<br />
              <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">AI가 찾고</span> 써드립니다.
            </h1>
            <p className="text-muted-foreground mb-4 max-w-2xl mx-auto px-2" style={{ fontSize: 'clamp(0.875rem, 2.5vw, 1.0625rem)', lineHeight: 1.7 }}>
              내 조건에 딱 맞는 <strong className="text-foreground">'지금 당장' 지원 가능한 공고</strong>만 매칭
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-3 sm:mb-4 px-2">
              <motion.div
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                <Link
                  to="/onboarding"
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-blue-600 text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl transition-all duration-300"
                  style={{ fontSize: '0.9375rem', fontWeight: 600, boxShadow: '0 20px 25px -5px rgba(49,130,246,0.25)' }}
                >
                  내 숨은 지원금 조회하기
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
            </div>
            <p className="text-muted-foreground" style={{ fontSize: '0.75rem' }}>
              조회는 100% 무료 · 수수료는 AI 작성 시에만
            </p>
          </motion.div>

          {/* Hero Visual */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mt-10 sm:mt-16 relative"
          >
            <motion.div
              className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl shadow-black/8 border border-border/50 p-4 sm:p-8 max-w-3xl mx-auto backdrop-blur-sm"
              style={{ boxShadow: '0 25px 50px -12px rgba(0,0,0,0.08)' }}
              whileHover={{ y: -4, boxShadow: '0 25px 50px -12px rgba(0,0,0,0.12)' }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-primary/10 to-blue-100 rounded-xl flex items-center justify-center">
                  <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                </div>
                <div className="text-left">
                  <div style={{ fontSize: '0.8125rem', fontWeight: 600 }}>김민수 대표님의 맞춤 분석</div>
                  <div className="text-muted-foreground" style={{ fontSize: '0.6875rem' }}>
                    지원 가능 <span className="text-primary" style={{ fontWeight: 700 }}>5건</span> · 최대 <span className="text-primary" style={{ fontWeight: 700 }}>7억 6천만원</span>
                  </div>
                </div>
              </div>
              <div className="space-y-2.5 sm:space-y-3">
                {[
                  { title: '초기창업패키지', match: 95, amount: '최대 1억원', tag: 'D-39', reasons: ['경기 지역', '창업 1년차'] },
                  { title: '경기도 청년창업사관학교', match: 88, amount: '최대 5천만원', tag: 'D-13', reasons: ['경기도 소재', '청년 대상'] },
                  { title: 'K-스타트업 그랜드챌린지', match: 82, amount: '최대 3억원', tag: 'D-25', reasons: ['IT/SW 최적'] },
                ].map((item, i) => (
                  <motion.div
                    key={item.title}
                    className="flex items-center justify-between p-3 sm:p-4 bg-[#F7F8FA] rounded-xl sm:rounded-2xl cursor-pointer group/card"
                    whileHover={{ backgroundColor: '#EEF3FF', scale: 1.01, x: 4 }}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: 0.6 + i * 0.12 }}
                  >
                    <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
                      <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-white flex items-center justify-center shadow-sm border border-border/50 shrink-0 group-hover/card:shadow-md group-hover/card:border-primary/20 transition-all duration-300">
                        <span className="text-primary" style={{ fontSize: '0.6875rem', fontWeight: 700 }}>{item.match}%</span>
                      </div>
                      <div className="min-w-0">
                        <div className="truncate" style={{ fontSize: '0.8125rem', fontWeight: 500 }}>{item.title}</div>
                        <div className="flex gap-1 mt-0.5 flex-wrap">
                          {item.reasons.map(r => (
                            <span key={r} className="bg-accent text-primary px-1.5 py-0.5 rounded" style={{ fontSize: '0.5625rem' }}>{r}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="text-right shrink-0 ml-2">
                      <span className="text-primary bg-accent px-2 sm:px-3 py-0.5 sm:py-1 rounded-full block mb-0.5" style={{ fontSize: '0.625rem', fontWeight: 600 }}>{item.tag}</span>
                      <span className="text-muted-foreground" style={{ fontSize: '0.625rem' }}>{item.amount}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-10 sm:py-16 bg-gradient-to-b from-[#F7F8FA] to-white">
        <motion.div
          className="max-w-5xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {stats.map((stat) => (
            <motion.div key={stat.label} className="text-center" variants={itemVariants}>
              <div className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent" style={{ fontSize: 'clamp(1.25rem, 3vw, 2rem)', fontWeight: 700 }}>{stat.value}</div>
              <div className="text-muted-foreground mt-0.5" style={{ fontSize: '0.75rem' }}>{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ===== 섹션 2: 문제 공감 ===== */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12"
          >
            <h2 className="text-foreground mb-4" style={{ fontSize: 'clamp(1.25rem, 4vw, 2rem)', fontWeight: 700 }}>
              이런 경험, 한번쯤 있으시죠?
            </h2>
          </motion.div>

          <div className="space-y-3 sm:space-y-4 max-w-2xl mx-auto mb-8 sm:mb-10">
            {painPoints.map((point, i) => (
              <motion.div
                key={point}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                whileHover={{ x: 6, backgroundColor: 'rgba(254,226,226,0.5)' }}
                className="flex items-start gap-3 sm:gap-4 bg-red-50/40 border border-red-100/60 rounded-xl sm:rounded-2xl p-4 sm:p-5 cursor-default transition-colors duration-300"
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-red-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <X className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-500" />
                </div>
                <span className="text-red-800" style={{ fontSize: '0.875rem', lineHeight: 1.6 }}>{point}</span>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -3, boxShadow: '0 20px 40px rgba(49,130,246,0.08)' }}
            style={{ boxShadow: '0 0px 0px rgba(49,130,246,0)' }}
            className="bg-gradient-to-r from-accent via-blue-50 to-accent border border-primary/10 rounded-xl sm:rounded-2xl p-5 sm:p-8 max-w-2xl mx-auto transition-all duration-400"
          >
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                <Check className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              </div>
              <div>
                <p style={{ fontSize: '0.9375rem', fontWeight: 600, lineHeight: 1.6 }} className="text-foreground">
                  이제 사업에만 집중하세요.
                </p>
                <p className="text-muted-foreground mt-1" style={{ fontSize: '0.8125rem', lineHeight: 1.7 }}>
                  검색과 서류 작성은 AI가 대신합니다.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== 섹션 3: 가치 증명 ===== */}
      <section className="py-14 sm:py-20 px-4 bg-gradient-to-b from-[#F7F8FA] to-white">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 sm:mb-14"
          >
            <h2 className="text-foreground mb-4 px-2" style={{ fontSize: 'clamp(1.25rem, 3.5vw, 1.75rem)', fontWeight: 700, lineHeight: 1.3 }}>
              수수료 아끼려다,<br />
              <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">수천만 원</span>을 놓칩니다.
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto mb-8 sm:mb-10">
            {/* 나홀로 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
              className="bg-white border border-border rounded-2xl p-6 sm:p-8 relative hover:shadow-xl hover:shadow-black/5 transition-shadow duration-400"
            >
              <div className="absolute -top-3 left-5 sm:left-6">
                <span className="bg-gray-500 text-white px-3 sm:px-4 py-1 sm:py-1.5 rounded-full" style={{ fontSize: '0.75rem', fontWeight: 600 }}>나홀로 지원</span>
              </div>
              <div className="mt-3 sm:mt-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gray-100 rounded-2xl flex items-center justify-center mb-4 sm:mb-5">
                  <Frown className="w-6 h-6 sm:w-7 sm:h-7 text-gray-400" />
                </div>
                <p className="text-muted-foreground mb-4 sm:mb-6" style={{ fontSize: '0.875rem', lineHeight: 1.7 }}>
                  밤새 검색하고 겨우 썼는데 탈락.<br />
                  남는 건 스트레스뿐.
                </p>
                <div className="space-y-2">
                  {['평균 40시간 정보 탐색', '복잡한 HWP 양식', '심사 기준 파악 불가', '탈락 원인 모름'].map(item => (
                    <div key={item} className="flex items-center gap-2 text-muted-foreground" style={{ fontSize: '0.8125rem' }}>
                      <X className="w-3.5 h-3.5 text-red-400 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* AI와 함께 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -4 }}
              className="bg-white border-2 border-primary rounded-2xl p-6 sm:p-8 relative transition-shadow duration-400"
              style={{ boxShadow: '0 10px 30px rgba(49,130,246,0.08)' }}
            >
              <div className="absolute -top-3 left-5 sm:left-6">
                <span className="bg-gradient-to-r from-primary to-blue-600 text-white px-3 sm:px-4 py-1 sm:py-1.5 rounded-full" style={{ fontSize: '0.75rem', fontWeight: 600 }}>AI 매니저와 함께</span>
              </div>
              <div className="mt-3 sm:mt-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-accent rounded-2xl flex items-center justify-center mb-4 sm:mb-5">
                  <PartyPopper className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
                </div>
                <p className="text-foreground mb-4 sm:mb-6" style={{ fontSize: '0.875rem', lineHeight: 1.7, fontWeight: 500 }}>
                  키워드만 넣으면 AI가<br />
                  정부 스타일로 문서 완성!
                </p>
                <div className="space-y-2">
                  {['3초 맞춤 공고 매칭', 'AI 초안 도구 (2주→1시간)', '심사 기준 맞춤 강조', '전문가 1:1 첨삭 지원'].map(item => (
                    <div key={item} className="flex items-center gap-2 text-foreground" style={{ fontSize: '0.8125rem' }}>
                      <Check className="w-3.5 h-3.5 text-primary shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent px-4" style={{ fontSize: '0.9375rem', fontWeight: 600 }}
          >
            합격의 문턱을 넘는 비용, 결과로 증명합니다.
          </motion.p>
        </div>
      </section>

      {/* Features */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-foreground mb-3 sm:mb-4" style={{ fontSize: 'clamp(1.25rem, 4vw, 2rem)', fontWeight: 700 }}>
              왜 지원금 AI인가요?
            </h2>
            <p className="text-muted-foreground" style={{ fontSize: '0.875rem' }}>
              관공서 사이트를 돌아다니지 않아도 됩니다
            </p>
          </div>
          <motion.div
            className="grid grid-cols-2 md:grid-cols-2 gap-3 sm:gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  variants={itemVariants}
                  onMouseEnter={() => setHoveredFeature(i)}
                  onMouseLeave={() => setHoveredFeature(null)}
                  whileHover={{ y: -6, scale: 1.02 }}
                  className="bg-white border border-border rounded-xl sm:rounded-2xl p-4 sm:p-8 hover:shadow-xl hover:shadow-black/5 hover:border-primary/20 transition-all duration-400 cursor-default"
                >
                  <motion.div
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl ${feature.color} flex items-center justify-center mb-3 sm:mb-5`}
                    animate={hoveredFeature === i ? { scale: 1.1, rotate: [0, -5, 5, 0] } : { scale: 1, rotate: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </motion.div>
                  <h3 style={{ fontSize: 'clamp(0.875rem, 2vw, 1.25rem)', fontWeight: 600 }} className="mb-1 sm:mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground" style={{ fontSize: '0.75rem', lineHeight: 1.6 }}>{feature.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ===== 섹션 4: 후기 ===== */}
      <section className="py-14 sm:py-20 px-4 bg-gradient-to-b from-[#F7F8FA] to-white">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-14"
          >
            <h2 className="text-foreground mb-4 px-2" style={{ fontSize: 'clamp(1.25rem, 3.5vw, 1.75rem)', fontWeight: 700, lineHeight: 1.4 }}>
              이미 수많은 대표님들이<br />자금을 확보하고 있습니다.
            </h2>
          </motion.div>

          <div className="flex md:grid md:grid-cols-3 gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory pb-4 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-none">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(0,0,0,0.06)' }}
                style={{ boxShadow: '0 0px 0px rgba(0,0,0,0)' }}
                className={`${t.color} border rounded-2xl p-5 sm:p-6 relative snap-center min-w-[280px] sm:min-w-0 shrink-0 md:shrink transition-all duration-400 cursor-default`}
              >
                <Quote className="w-6 h-6 sm:w-8 sm:h-8 text-primary/20 mb-3 sm:mb-4" />
                <p className="text-foreground mb-4 sm:mb-6" style={{ fontSize: '0.8125rem', lineHeight: 1.7 }}>
                  "{t.quote}"
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <div style={{ fontSize: '0.8125rem', fontWeight: 600 }}>{t.name}</div>
                    <div className="text-muted-foreground" style={{ fontSize: '0.6875rem' }}>{t.desc} / {t.age}</div>
                  </div>
                  <span className="bg-gradient-to-r from-primary to-blue-600 text-white px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-lg" style={{ fontSize: '0.6875rem', fontWeight: 600 }}>
                    {t.amount}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-14 sm:py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-foreground mb-3 sm:mb-4" style={{ fontSize: 'clamp(1.25rem, 4vw, 2rem)', fontWeight: 700 }}>
            3단계면 충분합니다
          </h2>
          <p className="text-muted-foreground mb-10 sm:mb-16" style={{ fontSize: '0.875rem' }}>
            복잡한 과정은 AI에게 맡기세요
          </p>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { num: '1', title: '내 정보 입력', desc: '3분이면 충분해요', sub: '간단한 질문 7개' },
              { num: '2', title: 'AI 맞춤 분석', desc: '1,500개 공고 매칭', sub: '창업·고용·R&D·정책자금' },
              { num: '3', title: '지원서 작성', desc: 'AI 초안 → 전문가 첨삭', sub: '2주 → 1시간으로' },
            ].map((step, i) => (
              <motion.div
                key={step.num}
                variants={itemVariants}
                whileHover={{ y: -6, scale: 1.02 }}
                className="bg-[#F7F8FA] rounded-2xl p-6 sm:p-8 relative flex sm:flex-col items-center sm:items-center gap-4 sm:gap-0 cursor-default hover:shadow-lg hover:shadow-black/5 transition-all duration-400"
              >
                <motion.div
                  className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary to-blue-600 text-white rounded-full flex items-center justify-center shrink-0 sm:mx-auto sm:mb-5"
                  style={{ fontSize: '1rem', fontWeight: 700, boxShadow: '0 10px 25px -5px rgba(49,130,246,0.2)' }}
                  whileHover={{ scale: 1.15, rotate: 10 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                >
                  {step.num}
                </motion.div>
                <div className="text-left sm:text-center">
                  <h3 style={{ fontSize: '1rem', fontWeight: 600 }} className="mb-0.5 sm:mb-2">{step.title}</h3>
                  <p className="text-primary" style={{ fontSize: '0.8125rem', fontWeight: 500 }}>{step.desc}</p>
                  <p className="text-muted-foreground" style={{ fontSize: '0.75rem' }}>{step.sub}</p>
                </div>
                {i < 2 && (
                  <div className="hidden sm:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ChevronRight className="w-6 h-6 text-muted-foreground/30" />
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 요금제 섹션 */}
      <section className="py-14 sm:py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-foreground mb-4" style={{ fontSize: 'clamp(1.25rem, 3.5vw, 1.75rem)', fontWeight: 700 }}>
            합리적인 요금으로 시작하세요
          </h2>
          <p className="text-muted-foreground mb-8" style={{ fontSize: '0.875rem', lineHeight: 1.7 }}>
            무료 조회 후, AI 작성이 필요할 때만 유료 플랜을 선택하세요. 월 29,000원부터.
          </p>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <Link
              to="/pricing"
              className="inline-flex items-center gap-2 bg-white border-2 border-primary text-primary px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl font-semibold hover:bg-accent transition-all"
              style={{ fontSize: '0.9375rem', boxShadow: '0 4px 14px rgba(49,130,246,0.15)' }}
            >
              요금제 보기
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ===== 섹션 5: 최종 CTA ===== */}
      <section className="py-16 sm:py-24 px-4 bg-[#F7F8FA]">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.01 }}
            className="bg-gradient-to-br from-primary via-blue-600 to-blue-700 rounded-2xl sm:rounded-3xl p-8 sm:p-16 text-white relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.06),transparent_50%)]" />
            <div className="relative z-10">
              <AlertTriangle className="w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-4 sm:mb-6 opacity-80" />
              <h2 style={{ fontSize: 'clamp(1.25rem, 3.5vw, 1.75rem)', fontWeight: 700, lineHeight: 1.3 }} className="mb-3 sm:mb-4">
                오늘도 수백 개의 공고가<br />마감되고 있습니다.
              </h2>
              <p className="opacity-80 mb-6 sm:mb-8" style={{ fontSize: '0.875rem', lineHeight: 1.7 }}>
                지금 바로 내 조건에 맞는<br />정부지원금을 확인해 보세요.
              </p>
              <motion.div
                whileHover={{ scale: 1.06, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                <Link
                  to="/onboarding"
                  className="inline-flex items-center gap-2 bg-white text-primary px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl hover:shadow-2xl transition-all duration-300 shadow-lg"
                  style={{ fontSize: '0.9375rem', fontWeight: 600 }}
                >
                  놓친 지원금, 지금 확인하기
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 sm:py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Top row */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-to-br from-primary to-blue-600 rounded-md flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5 text-white" />
              </div>
              <span style={{ fontSize: '0.8125rem', fontWeight: 600 }}>지원금 AI 매니저</span>
            </div>
            <div className="flex items-center gap-4 flex-wrap">
              <Link to="/pricing" className="text-primary hover:underline font-medium" style={{ fontSize: '0.75rem' }}>요금제</Link>
              <Link to="/terms" className="text-muted-foreground hover:text-foreground transition-colors" style={{ fontSize: '0.75rem' }}>이용약관</Link>
              <Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors" style={{ fontSize: '0.75rem', fontWeight: 600 }}>개인정보처리방침</Link>
              <Link to="/business-info" className="text-muted-foreground hover:text-foreground transition-colors" style={{ fontSize: '0.75rem' }}>사업자정보</Link>
            </div>
          </div>

          {/* Business info */}
          <div className="text-muted-foreground space-y-1 mb-4" style={{ fontSize: '0.6875rem', lineHeight: 1.6 }}>
            <p>대표 박원평 | 사업자등록번호 302-47-00920 | 인천광역시 중구 운북동 506-59</p>
            <p>이메일 tseizou@naver.com</p>
          </div>

          {/* Disclaimer */}
          <div className="bg-[#F7F8FA] rounded-xl p-3.5 sm:p-4 mb-4">
            <p className="text-muted-foreground" style={{ fontSize: '0.6875rem', lineHeight: 1.6 }}>
              본 서비스는 공개된 정부지원금 정보를 수집·정리하여 안내하는 정보 소개 플랫폼이며, 지원금 선정 결과에 대한 법적 책임을 지지 않습니다. 합격 여부는 전적으로 기업의 역량과 제출 자료에 달려 있으며, 심사 기관의 최종 결정에 따릅니다. AI가 생성한 지원서 초안은 참고용 도구이며, 최종 제출 전 반드시 직접 검토·수정·전문가 첨삭을 받으시기 바랍니다.
            </p>
          </div>

          <p className="text-muted-foreground flex items-center gap-1 flex-wrap" style={{ fontSize: '0.6875rem' }}>
            &copy; 2026 지원금 AI 매니저. All rights reserved.
            <Link to="/admin" className="text-muted-foreground/35 hover:text-muted-foreground/70 transition-colors" style={{ fontSize: '0.5rem', letterSpacing: '0.05em' }}>a</Link>
          </p>
        </div>
      </footer>
    </div>
  );
}