import { useState } from 'react';
import { useSearchParams, Link } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ChevronDown, ChevronRight, Lightbulb, FileText, ArrowLeft, RefreshCw, Copy, Check, BookOpen, Wand2, AlertCircle, Crown } from 'lucide-react';
import Groq from 'groq-sdk';
import { mockGrants, mockSubscription } from '../data/mockData';

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
});

const sampleSections = [
  { id: 's1', title: '1. 창업 아이템 개요', guide: '핵심 가치와 해결 문제를 명확히 기술하세요.', tip: '30초 안에 이해할 수 있도록 간결하게.' },
  { id: 's2', title: '2. 시장 분석', guide: '목표 시장의 규모, 성장성을 데이터로 분석하세요.', tip: 'TAM-SAM-SOM 프레임워크 활용.' },
  { id: 's3', title: '3. 비즈니스 모델', guide: '수익 모델, 가격 전략을 구체적으로 설명하세요.', tip: '경쟁사 차별점을 강조하세요.' },
  { id: 's4', title: '4. 기술/제품 현황', guide: 'MVP 현황과 개발 로드맵을 기술하세요.', tip: '특허가 있다면 반드시 언급.' },
  { id: 's5', title: '5. 팀 구성', guide: '핵심 팀원의 역량과 역할 분담을 소개하세요.', tip: '경험을 구체적 수치로 제시.' },
  { id: 's6', title: '6. 자금 사용 계획', guide: '세부 사용 내역과 기대 효과를 명시하세요.', tip: '항목별 금액을 표로 정리.' },
];

const SYSTEM_PROMPT = `당신은 정부지원사업(초창패, 소상공인 지원금 등) 전문 심사위원이자 최고 수준의 사업계획서 컨설턴트입니다. 모든 문장은 '~함', '~임' 형태의 개조식(명사형 종결)으로 작성하고, 주관적인 감정 표현을 배제한 전문적인 비즈니스 용어를 사용하세요.`;

export function AIWriter() {
  const [searchParams] = useSearchParams();
  const grantId = searchParams.get('grantId') || '1';
  const grant = mockGrants.find((g) => g.id === grantId) || mockGrants[0];

  const [activeSection, setActiveSection] = useState('s1');
  const [content, setContent] = useState<Record<string, string>>({});
  const [generating, setGenerating] = useState(false);
  const [keywords, setKeywords] = useState('');
  const [copied, setCopied] = useState(false);
  const [showGuide, setShowGuide] = useState(true);
  const [mobileTab, setMobileTab] = useState<'editor' | 'guide'>('editor');
  const [showSectionPicker, setShowSectionPicker] = useState(false);

  const currentSection = sampleSections.find((s) => s.id === activeSection)!;

  const { plan, aiGenerationsUsed, aiGenerationsLimit, expertReviewAvailable } = mockSubscription;
  const canGenerate = aiGenerationsLimit === -1 || aiGenerationsUsed < aiGenerationsLimit;

  const handleGenerate = async () => {
    if (!canGenerate) return;
    const apiKey = import.meta.env.VITE_GROQ_API_KEY;
    if (!apiKey) {
      console.error('VITE_GROQ_API_KEY가 설정되지 않았습니다.');
      return;
    }
    setGenerating(true);
    setContent((prev) => ({ ...prev, [activeSection]: '' }));

    const userPrompt = `현재 작성 중인 항목: [${currentSection.title}]
작성 가이드: ${currentSection.guide}
사용자 입력 키워드: ${keywords || '(키워드 없음)'}

이 내용을 바탕으로 사업계획서 해당 항목의 초안을 작성해 줘.`;

    try {
      const stream = await groq.chat.completions.create({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: userPrompt },
        ],
        stream: true,
      });

      let fullText = '[AI 초안] ' + currentSection.title + '\n\n';
      setContent((prev) => ({ ...prev, [activeSection]: fullText }));

      for await (const chunk of stream) {
        const delta = chunk.choices[0]?.delta?.content;
        if (delta) {
          fullText += delta;
          setContent((prev) => ({ ...prev, [activeSection]: fullText }));
        }
      }
    } catch (err) {
      console.error('Groq API 오류:', err);
      setContent((prev) => ({
        ...prev,
        [activeSection]: '[오류] AI 생성에 실패했습니다. API 키와 네트워크를 확인해 주세요.\n' + (err instanceof Error ? err.message : String(err)),
      }));
    } finally {
      setGenerating(false);
      setKeywords('');
    }
  };

  const handleCopy = () => {
    if (content[activeSection]) {
      navigator.clipboard.writeText(content[activeSection]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <motion.div whileHover={{ scale: 1.1, x: -2 }} whileTap={{ scale: 0.9 }}>
            <Link to="/dashboard" className="p-1.5 sm:p-2 rounded-lg hover:bg-secondary transition-colors shrink-0">
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
            </Link>
          </motion.div>
          <div className="min-w-0">
            <h1 style={{ fontSize: 'clamp(0.9375rem, 2vw, 1.25rem)', fontWeight: 700 }}>AI 지원서 작성실</h1>
            <p className="text-muted-foreground truncate" style={{ fontSize: '0.6875rem' }}>{grant.title}</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <span className="text-muted-foreground hidden sm:inline" style={{ fontSize: '0.8125rem' }}>자동 저장됨</span>
          <motion.div
            className="w-2 h-2 bg-green-400 rounded-full"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </div>

      {/* Mobile Controls */}
      <div className="lg:hidden mb-3">
        <motion.button
          onClick={() => setShowSectionPicker(!showSectionPicker)}
          className="w-full flex items-center justify-between bg-white border border-border rounded-xl px-4 py-3 mb-2 hover:border-primary/30 transition-colors"
          whileTap={{ scale: 0.99 }}
        >
          <div className="flex items-center gap-2 min-w-0">
            <FileText className="w-4 h-4 text-primary shrink-0" />
            <span className="truncate" style={{ fontSize: '0.8125rem', fontWeight: 600 }}>{currentSection.title}</span>
          </div>
          <motion.div animate={{ rotate: showSectionPicker ? 180 : 0 }}>
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </motion.div>
        </motion.button>

        <AnimatePresence>
          {showSectionPicker && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white border border-border rounded-xl mb-2 overflow-hidden shadow-xl"
            >
              {sampleSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => { setActiveSection(section.id); setShowSectionPicker(false); }}
                  className={`w-full text-left px-4 py-3 border-b border-border last:border-0 transition-colors flex items-center justify-between ${
                    activeSection === section.id ? 'bg-accent text-primary' : 'hover:bg-secondary'
                  }`}
                  style={{ fontSize: '0.8125rem', fontWeight: activeSection === section.id ? 600 : 400 }}
                >
                  <span>{section.title}</span>
                  {content[section.id] && <Check className="w-3.5 h-3.5 text-green-500" />}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex gap-0.5 bg-white rounded-lg border border-border p-0.5">
          {([
            { key: 'editor' as const, label: '에디터', icon: FileText },
            { key: 'guide' as const, label: '작성 가이드', icon: BookOpen },
          ]).map((tab) => {
            const Icon = tab.icon;
            return (
              <motion.button
                key={tab.key}
                onClick={() => setMobileTab(tab.key)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-md transition-all ${
                  mobileTab === tab.key ? 'bg-gradient-to-r from-primary to-blue-600 text-white shadow-md' : 'text-muted-foreground'
                }`}
                style={{ fontSize: '0.75rem', fontWeight: 500 }}
                whileTap={{ scale: 0.97 }}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </motion.button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 min-h-[calc(100vh-200px)]">
        {/* Left Panel - Guide */}
        <div className={`${showGuide ? 'lg:w-[380px]' : 'lg:w-0 overflow-hidden'} transition-all shrink-0 ${mobileTab === 'guide' ? 'block' : 'hidden'} lg:block`}>
          <div className="bg-white rounded-xl sm:rounded-2xl border border-border overflow-hidden h-full">
            <div className="p-4 sm:p-5 border-b border-border bg-gradient-to-r from-[#F7F8FA] to-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>작성 가이드</span>
                </div>
                <button
                  onClick={() => setShowGuide(false)}
                  className="lg:block hidden text-muted-foreground hover:text-foreground transition-colors"
                  style={{ fontSize: '0.8125rem' }}
                >
                  접기
                </button>
              </div>
            </div>

            {/* Sections Nav - desktop */}
            <div className="hidden lg:block p-3 border-b border-border max-h-60 overflow-y-auto">
              {sampleSections.map((section) => (
                <motion.button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full text-left px-3 py-2.5 rounded-lg mb-1 transition-all ${
                    activeSection === section.id
                      ? 'bg-accent text-primary'
                      : 'text-muted-foreground hover:bg-secondary'
                  }`}
                  style={{ fontSize: '0.8125rem', fontWeight: activeSection === section.id ? 600 : 400 }}
                  whileHover={{ x: 3 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                >
                  <div className="flex items-center justify-between">
                    <span>{section.title}</span>
                    {content[section.id] && <Check className="w-3.5 h-3.5 text-green-500" />}
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Guide Content */}
            <div className="p-4 sm:p-5 space-y-4 sm:space-y-5">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
                  <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>작성 방향</span>
                </div>
                <p className="text-muted-foreground" style={{ fontSize: '0.75rem', lineHeight: 1.7 }}>
                  {currentSection.guide}
                </p>
              </div>

              <motion.div
                className="bg-amber-50 rounded-lg sm:rounded-xl p-3 sm:p-4"
                whileHover={{ scale: 1.01 }}
              >
                <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
                  <Lightbulb className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-600" />
                  <span className="text-amber-800" style={{ fontSize: '0.75rem', fontWeight: 600 }}>TIP</span>
                </div>
                <p className="text-amber-700" style={{ fontSize: '0.75rem', lineHeight: 1.7 }}>
                  {currentSection.tip}
                </p>
              </motion.div>

              <motion.div
                className="bg-gradient-to-r from-accent to-blue-50 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-primary/5"
                whileHover={{ scale: 1.01 }}
              >
                <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
                  <AlertCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
                  <span className="text-primary" style={{ fontSize: '0.75rem', fontWeight: 600 }}>심사 포인트</span>
                </div>
                <p className="text-primary/80" style={{ fontSize: '0.75rem', lineHeight: 1.7 }}>
                  전체 배점의 약 20%. 구체적 수치와 근거를 제시하세요.
                </p>
              </motion.div>

              <motion.button
                onClick={() => setMobileTab('editor')}
                className="lg:hidden w-full py-3 bg-gradient-to-r from-primary to-blue-600 text-white rounded-xl flex items-center justify-center gap-2"
                style={{ fontSize: '0.8125rem', fontWeight: 600, boxShadow: '0 10px 15px -3px rgba(49,130,246,0.2)' }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FileText className="w-4 h-4" />
                에디터로 돌아가기
              </motion.button>
            </div>
          </div>
        </div>

        {/* Right Panel - Editor */}
        <div className={`flex-1 flex flex-col ${mobileTab === 'editor' ? 'block' : 'hidden'} lg:block`}>
          {!showGuide && (
            <motion.button
              onClick={() => setShowGuide(true)}
              className="hidden lg:flex items-center gap-1 text-primary mb-3 hover:underline"
              style={{ fontSize: '0.8125rem', fontWeight: 500 }}
              whileHover={{ x: 3 }}
            >
              <ChevronRight className="w-4 h-4" />
              가이드 열기
            </motion.button>
          )}

          <div className="bg-white rounded-xl sm:rounded-2xl border border-border flex-1 flex flex-col overflow-hidden hover:shadow-lg hover:shadow-black/3 transition-shadow duration-400">
            {/* Editor Header */}
            <div className="p-3.5 sm:p-5 border-b border-border flex items-center justify-between">
              <h3 className="hidden sm:block" style={{ fontSize: '1rem', fontWeight: 600 }}>{currentSection.title}</h3>
              <h3 className="sm:hidden truncate" style={{ fontSize: '0.875rem', fontWeight: 600 }}>{currentSection.title.replace(/\d+\.\s/, '')}</h3>
              <div className="flex items-center gap-1.5 sm:gap-2">
                {content[activeSection] && (
                  <motion.button
                    onClick={handleCopy}
                    className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg border border-border hover:bg-secondary transition-colors"
                    style={{ fontSize: '0.75rem' }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {copied ? <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-green-500" /> : <Copy className="w-3 h-3 sm:w-3.5 sm:h-3.5" />}
                    <span className="hidden sm:inline">{copied ? '복사됨' : '복사'}</span>
                  </motion.button>
                )}
              </div>
            </div>

            {/* AI Input */}
            <div className="px-3.5 sm:px-5 pt-3.5 sm:pt-5">
              <div className="flex items-center justify-between gap-2 mb-3 flex-wrap">
                <div className="flex items-center gap-2 text-muted-foreground bg-green-50 border border-green-100 rounded-lg px-3 py-2" style={{ fontSize: '0.6875rem' }}>
                  <AlertCircle className="w-3.5 h-3.5 text-green-600 shrink-0" />
                  <span>입력하신 데이터는 AI 학습에 절대 사용되지 않으며, 즉시 암호화·폐기됩니다.</span>
                </div>
                {aiGenerationsLimit !== -1 && (
                  <span className="text-muted-foreground" style={{ fontSize: '0.6875rem' }}>
                    이번 달 {aiGenerationsUsed}/{aiGenerationsLimit}회 사용
                  </span>
                )}
              </div>
              {!canGenerate && (
                <Link
                  to="/pricing"
                  className="flex items-center justify-center gap-2 mb-3 py-3 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl text-amber-800 hover:bg-amber-100 transition-colors"
                  style={{ fontSize: '0.8125rem', fontWeight: 600 }}
                >
                  <Crown className="w-4 h-4" />
                  AI 작성 한도 초과 · 프리미엄으로 무제한 이용하기
                </Link>
              )}
              <motion.div
                className="bg-gradient-to-r from-[#F7F8FA] to-blue-50/30 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-border/50"
                whileHover={{ borderColor: 'rgba(49,130,246,0.2)' }}
              >
                <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                  <Wand2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
                  <span className="text-primary" style={{ fontSize: '0.75rem', fontWeight: 600 }}>AI에게 키워드를 알려주세요 (초안 작성 도구)</span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                    placeholder="예: AI 매칭, 정부지원금, SaaS..."
                    className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 bg-white border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                    style={{ fontSize: '0.8125rem' }}
                    onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                  />
                  <motion.button
                    onClick={handleGenerate}
                    disabled={generating || !canGenerate}
                    className="flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-primary to-blue-600 text-white rounded-lg transition-all duration-200 disabled:opacity-50 shrink-0"
                    style={{ fontSize: '0.8125rem', fontWeight: 500, boxShadow: '0 4px 6px -1px rgba(49,130,246,0.15)' }}
                    whileHover={{ scale: 1.04, boxShadow: '0 8px 20px rgba(49,130,246,0.25)' }}
                    whileTap={{ scale: 0.96 }}
                  >
                    {generating ? (
                      <RefreshCw className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-spin" />
                    ) : (
                      <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    )}
                    <span className="hidden sm:inline">{generating ? '생성 중...' : '초안 생성'}</span>
                    <span className="sm:hidden">{generating ? '...' : '생성'}</span>
                  </motion.button>
                </div>
              </motion.div>
            </div>

            {/* Text Editor */}
            <div className="flex-1 p-3.5 sm:p-5">
              <textarea
                value={content[activeSection] || ''}
                onChange={(e) => setContent((prev) => ({ ...prev, [activeSection]: e.target.value }))}
                placeholder="AI가 생성한 초안이 여기에 표시됩니다. AI는 2주 걸리던 초안을 1시간으로 줄여주는 도구이며, 최종 제출 전 전문가 첨삭을 권장합니다. 직접 수정하거나, 위에서 키워드를 입력한 후 '초안 생성'을 클릭하세요."
                className="w-full h-full min-h-[250px] sm:min-h-[300px] resize-none bg-transparent focus:outline-none text-foreground placeholder:text-muted-foreground/50"
                style={{ fontSize: '0.875rem', lineHeight: 1.8 }}
              />
            </div>

            {/* Word Count */}
            <div className="px-3.5 sm:px-5 py-2.5 sm:py-3 border-t border-border flex items-center justify-between">
              <span className="text-muted-foreground" style={{ fontSize: '0.6875rem' }}>
                {(content[activeSection] || '').length}자
              </span>
              <motion.button
                onClick={() => {
                  const allContent = Object.entries(content)
                    .map(([key, val]) => {
                      const section = sampleSections.find(s => s.id === key);
                      return section ? section.title + String.fromCharCode(10) + val : val;
                    })
                    .join(String.fromCharCode(10, 10) + '---' + String.fromCharCode(10, 10));
                  navigator.clipboard.writeText(allContent);
                }}
                className="px-3 sm:px-4 py-1.5 sm:py-2 border border-border rounded-lg hover:bg-secondary transition-colors"
                style={{ fontSize: '0.6875rem', fontWeight: 500 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                전체 내보내기
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}