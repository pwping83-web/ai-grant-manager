import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Sparkles, Building2, MapPin, Users, Lightbulb, CheckCircle, Calendar, DollarSign, User } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface StepData {
  businessType: string;
  establishedDate: string;
  birthYear: string;
  gender: string;
  region: string;
  subRegion: string;
  industry: string;
  employees: string;
  revenue: string;
}

const steps = [
  {
    id: 'businessType',
    title: ['사업장 형태를', '알려주세요'],
    icon: Building2,
    subtitle: '가장 가까운 유형을 선택해 주세요',
    type: 'card' as const,
  },
  {
    id: 'establishedDate',
    title: ['언제 창업하셨나요?'],
    icon: Calendar,
    subtitle: "예비 창업자라면 '아직 창업 전'을 선택해 주세요",
    type: 'card' as const,
  },
  {
    id: 'birthYear',
    title: ['출생연도를', '알려주세요'],
    icon: User,
    subtitle: '청년 우대 지원금 매칭에 필요해요',
    type: 'card' as const,
  },
  {
    id: 'region',
    title: ['어느 지역에서', '사업하시나요?'],
    icon: MapPin,
    subtitle: '지자체별 지원금이 달라요',
    type: 'card' as const,
  },
  {
    id: 'industry',
    title: ['어떤 업종인가요?'],
    icon: Lightbulb,
    subtitle: '주요 사업 분야를 선택해 주세요',
    type: 'card' as const,
  },
  {
    id: 'employees',
    title: ['직원은', '몇 명인가요?'],
    icon: Users,
    subtitle: '4대 보험 가입 기준이에요',
    type: 'card' as const,
  },
  {
    id: 'revenue',
    title: ['매출액은', '어느 정도인가요?'],
    icon: DollarSign,
    subtitle: '매출 규모에 따라 공고가 달라져요',
    type: 'card' as const,
  },
];

const options: Record<string, { label: string; emoji?: string }[]> = {
  businessType: [
    { label: '예비 창업자', emoji: '🌱' },
    { label: '개인 사업자', emoji: '🏪' },
    { label: '법인 사업자', emoji: '🏢' },
  ],
  establishedDate: [
    { label: '아직 창업 전' },
    { label: '6개월 미만' },
    { label: '6개월~1년' },
    { label: '1~3년' },
    { label: '3~5년' },
    { label: '5~7년' },
    { label: '7년 이상' },
  ],
  birthYear: [
    { label: '1997년 이후 (만 29세 이하)' },
    { label: '1993~1996년 (만 30~33세)' },
    { label: '1987~1992년 (만 34~39세)' },
    { label: '1980~1986년 (만 40~46세)' },
    { label: '1979년 이전 (만 47세 이상)' },
  ],
  region: [
    { label: '서울' }, { label: '경기' }, { label: '인천' },
    { label: '부산' }, { label: '대구' }, { label: '광주' },
    { label: '대전' }, { label: '울산' }, { label: '세종' },
    { label: '강원' }, { label: '충북' }, { label: '충남' },
    { label: '전북' }, { label: '전남' }, { label: '경북' },
    { label: '경남' }, { label: '제주' },
  ],
  industry: [
    { label: 'IT/소프트웨어', emoji: '💻' },
    { label: '제조업', emoji: '🏭' },
    { label: '유통/물류', emoji: '📦' },
    { label: 'F&B (카페/식당)', emoji: '🍽️' },
    { label: '교육', emoji: '📚' },
    { label: '의료/바이오', emoji: '🧬' },
    { label: '문화/콘텐츠', emoji: '🎬' },
    { label: '환경/에너지', emoji: '🌿' },
    { label: '농업/식품', emoji: '🌾' },
    { label: '기타', emoji: '📋' },
  ],
  employees: [
    { label: '0명 (나 혼자)', emoji: '🙋' },
    { label: '1~4명', emoji: '👥' },
    { label: '5~9명', emoji: '👨‍👩‍👦‍👦' },
    { label: '10~19명' },
    { label: '20~49명' },
    { label: '50명 이상' },
  ],
  revenue: [
    { label: '매출 없음 (예비/초기)' },
    { label: '5천만원 미만' },
    { label: '5천만원~1억원' },
    { label: '1억~3억원' },
    { label: '3억~10억원' },
    { label: '10억원 이상' },
  ],
};

const loadingMessages = [
  '입력 정보를 바탕으로...',
  '전국 1,500개 공고를 스캔 중...',
  '맞춤 지원금을 찾았습니다!',
];

export function Onboarding() {
  const navigate = useNavigate();
  const [sessionChecked, setSessionChecked] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<StepData>({
    businessType: '',
    establishedDate: '',
    birthYear: '',
    gender: '',
    region: '',
    subRegion: '',
    industry: '',
    employees: '',
    revenue: '',
  });
  const [analyzing, setAnalyzing] = useState(false);
  const [loadingMsgIdx, setLoadingMsgIdx] = useState(0);
  const [loadingProgress, setLoadingProgress] = useState(0);

  const step = steps[currentStep];
  const stepKey = step.id as keyof StepData;

  const handleSelect = useCallback((value: string) => {
    setData((prev) => ({ ...prev, [stepKey]: value }));

    setTimeout(() => {
      if (currentStep < steps.length - 1) {
        setCurrentStep((prev) => prev + 1);
      } else {
        setAnalyzing(true);
      }
    }, 350);
  }, [currentStep, stepKey]);

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  // 로그인 확인: 미로그인 시 /login으로 리다이렉트
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate('/login?redirect=/onboarding', { replace: true });
        return;
      }
      setSessionChecked(true);
    });
  }, [navigate]);

  useEffect(() => {
    if (!analyzing) return;

    const saveToDb = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user?.id) {
        await supabase.from('users').upsert({
          id: session.user.id,
          business_type: data.businessType || null,
          established_date: data.establishedDate || null,
          birth_year: data.birthYear || null,
          region: data.subRegion ? `${data.region} ${data.subRegion}` : data.region || null,
          industry: data.industry || null,
          employees: data.employees || null,
          revenue: data.revenue || null,
        }, { onConflict: 'id' });
      }
    };
    saveToDb();

    const msgInterval = setInterval(() => {
      setLoadingMsgIdx((prev) => {
        if (prev < loadingMessages.length - 1) return prev + 1;
        return prev;
      });
    }, 1200);

    const progressInterval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + 2;
      });
    }, 70);

    const timeout = setTimeout(() => {
      navigate('/results');
    }, 4000);

    return () => {
      clearInterval(msgInterval);
      clearInterval(progressInterval);
      clearTimeout(timeout);
    };
  }, [analyzing, navigate]);

  if (analyzing) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md mx-auto"
        >
          <div className="w-24 h-24 bg-gradient-to-br from-accent to-blue-100 rounded-full flex items-center justify-center mx-auto mb-8 relative"
            style={{ boxShadow: '0 20px 25px -5px rgba(49,130,246,0.1)' }}>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            >
              <Sparkles className="w-12 h-12 text-primary" />
            </motion.div>
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3 bg-primary rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear', delay: i * 0.3 }}
                style={{
                  top: '50%',
                  left: '50%',
                  transformOrigin: `0 ${-50 + i * 5}px`,
                  opacity: 0.3 + i * 0.2,
                }}
              />
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.p
              key={loadingMsgIdx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={loadingMsgIdx === 2 ? 'bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent' : 'text-foreground'}
              style={{ fontSize: loadingMsgIdx === 2 ? '1.25rem' : '1.125rem', fontWeight: loadingMsgIdx === 2 ? 700 : 500, lineHeight: 1.5 }}
            >
              {loadingMsgIdx === 2
                ? <>{data.businessType || '대표'}님에게<br />딱 맞는 지원금을 찾았습니다!</>
                : loadingMessages[loadingMsgIdx]}
            </motion.p>
          </AnimatePresence>

          <div className="mt-8 w-72 mx-auto">
            <div className="h-2.5 bg-secondary rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-blue-400 rounded-full"
                style={{ width: `${loadingProgress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
            <p className="text-muted-foreground mt-3" style={{ fontSize: '0.8125rem' }}>
              {loadingProgress}% 분석 완료
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  const currentOptions = options[stepKey] || [];
  const isCompact = currentOptions.length > 6;

  if (!sessionChecked) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Top Bar */}
      <div className="px-4 sm:px-6 pt-4 sm:pt-6 max-w-lg mx-auto w-full">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <motion.button
            onClick={() => currentStep === 0 ? navigate('/') : handleBack()}
            className="text-muted-foreground hover:text-foreground p-2 -ml-2 rounded-xl hover:bg-secondary transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowLeft className="w-5 h-5" />
          </motion.button>
          <span className="text-muted-foreground" style={{ fontSize: '0.875rem' }}>
            {currentStep + 1} / {steps.length}
          </span>
        </div>
        {/* Progress Bar */}
        <div className="flex gap-1 sm:gap-1.5 mb-6 sm:mb-10">
          {steps.map((_, i) => (
            <motion.div
              key={i}
              className="h-1.5 rounded-full flex-1"
              animate={{
                backgroundColor: i <= currentStep ? 'var(--primary)' : 'var(--secondary)',
                scale: i === currentStep ? [1, 1.05, 1] : 1,
              }}
              transition={{ duration: 0.4 }}
            />
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="flex-1 px-4 sm:px-6 max-w-lg mx-auto w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="mb-6 sm:mb-8">
              <motion.div
                className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-accent to-blue-100 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-5"
                style={{ boxShadow: '0 10px 15px -3px rgba(49,130,246,0.1)' }}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1, type: 'spring', stiffness: 300, damping: 20 }}
              >
                <step.icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
              </motion.div>
              <h1 style={{ fontSize: 'clamp(1.25rem, 4vw, 1.625rem)', fontWeight: 700, lineHeight: 1.3 }}>
                {step.title.map((line, idx) => (
                  <span key={idx}>
                    {idx > 0 && <br />}
                    {line}
                  </span>
                ))}
              </h1>
              <p className="text-muted-foreground mt-1.5 sm:mt-2" style={{ fontSize: '0.8125rem' }}>
                {step.subtitle}
              </p>
            </div>

            <div className={`grid ${isCompact ? 'grid-cols-3' : currentOptions.length === 3 ? 'grid-cols-1' : 'grid-cols-2'} gap-2 sm:gap-3`}>
              {currentOptions.map((option, idx) => {
                const isSelected = data[stepKey] === option.label;
                return (
                  <motion.button
                    key={option.label}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.04, duration: 0.3 }}
                    whileHover={{ scale: 1.03, y: -2, boxShadow: '0 8px 25px rgba(0,0,0,0.06)' }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleSelect(option.label)}
                    style={isSelected ? { boxShadow: '0 10px 15px -3px rgba(49,130,246,0.1)' } : { boxShadow: '0 0px 0px rgba(0,0,0,0)' }}
                    className={`text-left px-3 sm:px-4 ${currentOptions.length === 3 ? 'py-4 sm:py-5' : 'py-3 sm:py-4'} rounded-xl sm:rounded-2xl border-2 transition-all duration-200 ${
                      isSelected
                        ? 'border-primary bg-accent text-primary'
                        : 'border-border bg-white hover:border-primary/30 text-foreground'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {option.emoji && (
                        <span style={{ fontSize: currentOptions.length === 3 ? '1.25rem' : '1rem' }}>{option.emoji}</span>
                      )}
                      <span style={{ fontSize: isCompact ? '0.6875rem' : '0.8125rem', fontWeight: isSelected ? 600 : 400 }}>
                        {option.label}
                      </span>
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                          className="ml-auto"
                        >
                          <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                        </motion.div>
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom info */}
      <div className="px-4 sm:px-6 py-4 sm:py-6 max-w-lg mx-auto w-full">
        <p className="text-center text-muted-foreground" style={{ fontSize: '0.6875rem' }}>
          입력된 정보는 맞춤 매칭에만 사용되며, AI 학습에는 절대 사용되지 않습니다.
        </p>
      </div>
    </div>
  );
}