import { useParams, Link, useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft, Clock, CheckCircle, Circle, FileText, Sparkles, ExternalLink, Bookmark, BookmarkCheck, Share2, AlertCircle, Calendar } from 'lucide-react';
import { useGrants } from '@/lib/useGrants';
import { useState } from 'react';

export function GrantDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { grants } = useGrants();
  const grant = id ? grants.find((g) => g.id === id) : null;
  const [isScrapped, setIsScrapped] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'timeline' | 'docs'>('overview');

  if (!grant) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>공고를 찾을 수 없습니다</h2>
        <Link to="/dashboard" className="text-primary mt-4 inline-block">대시보드로 돌아가기</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 sm:py-8 pb-28 sm:pb-8">
      {/* Back */}
      <motion.button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1.5 sm:gap-2 text-muted-foreground hover:text-foreground mb-4 sm:mb-6 transition-colors"
        style={{ fontSize: '0.8125rem' }}
        whileHover={{ x: -3 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      >
        <ArrowLeft className="w-4 h-4" />
        목록으로
      </motion.button>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl sm:rounded-2xl border border-border p-4 sm:p-8 mb-4 sm:mb-6 hover:shadow-lg hover:shadow-black/3 transition-shadow duration-400"
      >
        <div className="flex items-start justify-between mb-3 sm:mb-4">
          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
            <span className="bg-secondary text-secondary-foreground px-2.5 py-0.5 sm:py-1 rounded-lg" style={{ fontSize: '0.75rem', fontWeight: 500 }}>
              {grant.category}
            </span>
            {grant.status === 'closing' && (
              <motion.span
                className="bg-red-50 text-red-600 px-2.5 py-0.5 sm:py-1 rounded-lg"
                style={{ fontSize: '0.75rem', fontWeight: 600 }}
                animate={{ opacity: [1, 0.6, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                마감임박
              </motion.span>
            )}
          </div>
          <div className="flex gap-1.5 sm:gap-2">
            <motion.button
              onClick={() => setIsScrapped(!isScrapped)}
              className="p-2 sm:p-2.5 rounded-lg sm:rounded-xl border border-border hover:bg-secondary transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isScrapped
                ? <BookmarkCheck className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                : <Bookmark className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
              }
            </motion.button>
            <motion.button
              className="p-2 sm:p-2.5 rounded-lg sm:rounded-xl border border-border hover:bg-secondary transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Share2 className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
            </motion.button>
          </div>
        </div>

        <h1 style={{ fontSize: 'clamp(1.125rem, 3vw, 1.5rem)', fontWeight: 700 }} className="mb-1 sm:mb-2">{grant.title}</h1>
        <p className="text-muted-foreground mb-4 sm:mb-6" style={{ fontSize: '0.8125rem' }}>{grant.organization}</p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 mb-4 sm:mb-6">
          {[
            { label: '지원 금액', value: grant.maxAmount, highlight: true },
            { label: '매칭률', value: `${grant.matchRate}%`, highlight: true },
            { label: '마감일', value: grant.deadline.slice(5), highlight: false },
            { label: '남은 기간', value: `D-${grant.dDay}`, highlight: false, urgent: grant.dDay <= 14 },
          ].map((item, idx) => (
            <motion.div
              key={item.label}
              className="bg-[#F7F8FA] rounded-lg sm:rounded-xl p-3 sm:p-4 hover:bg-accent/50 transition-colors duration-200"
              whileHover={{ scale: 1.03 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <div className="text-muted-foreground mb-0.5 sm:mb-1" style={{ fontSize: '0.625rem' }}>{item.label}</div>
              <div className={`${item.highlight ? 'text-primary' : item.urgent ? 'text-red-500' : 'text-foreground'}`} style={{ fontSize: 'clamp(0.875rem, 2vw, 1.125rem)', fontWeight: 700 }}>
                {item.value}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Match Reasons */}
        <motion.div
          className="bg-gradient-to-r from-accent to-blue-50 rounded-lg sm:rounded-xl p-4 sm:p-5"
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center gap-2 mb-2 sm:mb-3">
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
            <span className="text-primary" style={{ fontSize: '0.75rem', fontWeight: 600 }}>AI 매칭 분석</span>
          </div>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {grant.matchReasons.map((reason) => (
              <motion.span
                key={reason}
                className="bg-white text-accent-foreground px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-md sm:rounded-lg shadow-sm"
                style={{ fontSize: '0.6875rem', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}
                whileHover={{ scale: 1.05, boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}
              >
                ✓ {reason}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-0.5 sm:gap-1 bg-white rounded-lg sm:rounded-xl border border-border p-0.5 sm:p-1 mb-4 sm:mb-6">
        {([
          { key: 'overview', label: '개요' },
          { key: 'timeline', label: '타임라인' },
          { key: 'docs', label: '제출서류' },
        ] as const).map((tab) => (
          <motion.button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 py-2.5 sm:py-3 rounded-md sm:rounded-lg transition-all duration-200 ${
              activeTab === tab.key
                ? 'bg-gradient-to-r from-primary to-blue-600 text-white'
                : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
            }`}
            style={activeTab === tab.key ? { fontSize: '0.8125rem', fontWeight: 500, boxShadow: '0 4px 6px -1px rgba(49,130,246,0.15)' } : { fontSize: '0.8125rem', fontWeight: 500 }}
            whileHover={{ scale: activeTab === tab.key ? 1 : 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            {tab.label}
          </motion.button>
        ))}
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-xl sm:rounded-2xl border border-border p-4 sm:p-8 mb-4 sm:mb-6"
      >
        {activeTab === 'overview' && (
          <div className="space-y-6 sm:space-y-8">
            <div>
              <h3 style={{ fontSize: '0.9375rem', fontWeight: 600 }} className="mb-2 sm:mb-3">사업 개요</h3>
              <p className="text-muted-foreground" style={{ fontSize: '0.8125rem', lineHeight: 1.8 }}>{grant.description}</p>
            </div>
            <div>
              <h3 style={{ fontSize: '0.9375rem', fontWeight: 600 }} className="mb-2 sm:mb-3">지원 자격</h3>
              <div className="space-y-2">
                {grant.eligibility.map((item) => (
                  <motion.div
                    key={item}
                    className="flex items-start gap-2.5 sm:gap-3"
                    whileHover={{ x: 4 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                  >
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 shrink-0 mt-0.5" />
                    <span style={{ fontSize: '0.8125rem', lineHeight: 1.6 }}>{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            <div>
              <h3 style={{ fontSize: '0.9375rem', fontWeight: 600 }} className="mb-2 sm:mb-3">지원 혜택</h3>
              <div className="space-y-2">
                {grant.benefits.map((item) => (
                  <motion.div
                    key={item}
                    className="flex items-start gap-2.5 sm:gap-3"
                    whileHover={{ x: 4 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                  >
                    <div className="w-4 h-4 sm:w-5 sm:h-5 bg-primary/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-primary" style={{ fontSize: '0.625rem' }}>★</span>
                    </div>
                    <span style={{ fontSize: '0.8125rem', lineHeight: 1.6 }}>{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'timeline' && (
          <div>
            <h3 style={{ fontSize: '0.9375rem', fontWeight: 600 }} className="mb-4 sm:mb-6">준비 일정</h3>
            <div className="relative">
              {grant.timeline.map((item, i) => (
                <motion.div
                  key={item.label}
                  className="flex gap-3 sm:gap-4 mb-6 sm:mb-8 last:mb-0"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="flex flex-col items-center">
                    <motion.div
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center ${
                        item.done ? 'bg-gradient-to-br from-primary to-blue-600 text-white' : 'bg-secondary text-muted-foreground'
                      }`}
                      whileHover={{ scale: 1.2 }}
                    >
                      {item.done ? <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Circle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                    </motion.div>
                    {i < grant.timeline.length - 1 && (
                      <div className={`w-0.5 flex-1 mt-2 ${item.done ? 'bg-primary' : 'bg-border'}`} />
                    )}
                  </div>
                  <div className="pb-6 sm:pb-8">
                    <div className="flex items-center gap-2 sm:gap-3 mb-0.5 sm:mb-1">
                      <span style={{ fontSize: '0.8125rem', fontWeight: 600 }}>{item.label}</span>
                      {!item.done && grant.timeline[i - 1]?.done && (
                        <motion.span
                          className="bg-gradient-to-r from-primary to-blue-600 text-white px-1.5 sm:px-2 py-0.5 rounded-md"
                          style={{ fontSize: '0.5625rem', fontWeight: 600 }}
                          animate={{ scale: [1, 1.05, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          NEXT
                        </motion.span>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2 text-muted-foreground" style={{ fontSize: '0.75rem' }}>
                      <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      {item.date}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'docs' && (
          <div>
            <h3 style={{ fontSize: '0.9375rem', fontWeight: 600 }} className="mb-4 sm:mb-6">제출 서류</h3>
            <div className="space-y-2.5 sm:space-y-3">
              {grant.requiredDocs.map((doc, i) => (
                <motion.div
                  key={doc}
                  className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-[#F7F8FA] rounded-lg sm:rounded-xl hover:bg-accent/50 transition-colors duration-200"
                  whileHover={{ x: 4, scale: 1.01 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                >
                  <div className="w-9 h-9 sm:w-10 sm:h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                    <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="truncate" style={{ fontSize: '0.8125rem', fontWeight: 500 }}>{doc}</div>
                  </div>
                  {i === 0 && (
                    <motion.span
                      className="bg-gradient-to-r from-accent to-blue-50 text-primary px-2 sm:px-3 py-0.5 sm:py-1 rounded-md sm:rounded-lg shrink-0 border border-primary/10"
                      style={{ fontSize: '0.625rem', fontWeight: 600 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      AI 작성
                    </motion.span>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </motion.div>

      {/* Desktop Bottom Actions */}
      <div className="hidden sm:flex gap-3">
        <motion.div className="flex-1" whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}>
          <Link
            to={`/ai-writer?grantId=${grant.id}`}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-blue-600 text-white py-4 rounded-2xl transition-all duration-300"
            style={{ fontWeight: 600, boxShadow: '0 10px 15px -3px rgba(49,130,246,0.2)' }}
          >
            <Sparkles className="w-5 h-5" />
            AI로 지원서 작성하기
          </Link>
        </motion.div>
        <motion.button
          className="flex items-center justify-center gap-2 bg-white border border-border text-foreground py-4 px-6 rounded-2xl hover:bg-secondary transition-colors"
          style={{ fontWeight: 500 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <ExternalLink className="w-5 h-5" />
          원문 보기
        </motion.button>
      </div>

      {/* Mobile Floating Bottom CTA */}
      <div className="sm:hidden fixed bottom-[calc(env(safe-area-inset-bottom)+64px)] left-0 right-0 z-40 px-4 pb-3 bg-gradient-to-t from-[#F7F8FA] via-[#F7F8FA] to-transparent pt-4">
        <div className="flex gap-2.5">
          <Link
            to={`/ai-writer?grantId=${grant.id}`}
            className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-blue-600 text-white py-3.5 rounded-xl"
            style={{ fontWeight: 600, fontSize: '0.875rem', boxShadow: '0 10px 15px -3px rgba(49,130,246,0.25)' }}
          >
            <Sparkles className="w-4 h-4" />
            AI 지원서 작성
          </Link>
          <button className="flex items-center justify-center bg-white border border-border text-foreground p-3.5 rounded-xl"
            style={{ fontWeight: 500 }}>
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}