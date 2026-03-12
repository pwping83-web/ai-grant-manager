import { Link } from 'react-router';
import { motion } from 'motion/react';
import { Sparkles, FileText, ChevronRight, Clock, ArrowLeft, Check } from 'lucide-react';
import { mockGrants } from '../data/mockData';

const matchedGrants = mockGrants.filter(g => g.matchRate >= 60 && g.status !== 'closed');

export function SubmitDocuments() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-lg mx-auto px-4 pt-8 sm:pt-12 pb-8">
        {/* Back */}
        <Link
          to="/results"
          className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground mb-6 transition-colors"
          style={{ fontSize: '0.8125rem' }}
        >
          <ArrowLeft className="w-4 h-4" />
          결과로 돌아가기
        </Link>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-accent to-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-primary" />
          </div>
          <h1 style={{ fontSize: '1.25rem', fontWeight: 700 }} className="mb-2">
            AI에게 서류 맡기기
          </h1>
          <p className="text-muted-foreground" style={{ fontSize: '0.875rem', lineHeight: 1.6 }}>
            지원할 공고를 선택하면<br />
            AI가 사업계획서 초안을 작성해 드려요.
          </p>
        </motion.div>

        {/* Process */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#F7F8FA] rounded-xl p-4 mb-8"
        >
          <div className="flex items-center gap-3">
            <div className="flex gap-1">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center"
                  style={{ fontSize: '0.75rem', fontWeight: 600 }}
                >
                  {n}
                </div>
              ))}
            </div>
            <div style={{ fontSize: '0.75rem', lineHeight: 1.5 }} className="text-muted-foreground">
              <span className="text-foreground font-medium">공고 선택</span> → 키워드 입력 → AI 초안 생성
            </div>
          </div>
        </motion.div>

        {/* Grant List */}
        <div className="space-y-2 mb-8">
          <h2 style={{ fontSize: '0.9375rem', fontWeight: 600 }} className="mb-4">
            지원할 공고를 선택하세요
          </h2>
          {matchedGrants.map((grant, i) => (
            <motion.div
              key={grant.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.05 }}
            >
              <Link
                to={`/ai-writer?grantId=${grant.id}`}
                className="block bg-white border border-border rounded-xl p-4 hover:border-primary/30 hover:shadow-md transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="bg-primary/10 text-primary px-2 py-0.5 rounded" style={{ fontSize: '0.6875rem', fontWeight: 600 }}>
                        {grant.matchRate}%
                      </span>
                      <span className="text-muted-foreground" style={{ fontSize: '0.6875rem' }}>
                        {grant.maxAmount}
                      </span>
                    </div>
                    <div className="font-medium truncate" style={{ fontSize: '0.9375rem' }}>{grant.title}</div>
                    <div className="text-muted-foreground" style={{ fontSize: '0.75rem' }}>
                      <Clock className="w-3 h-3 inline mr-0.5" /> D-{grant.dDay}
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary shrink-0 ml-3" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Pricing CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-accent to-blue-50 rounded-xl p-5 border border-primary/10"
        >
          <div className="flex items-start gap-3 mb-4">
            <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <div>
              <h3 style={{ fontSize: '0.875rem', fontWeight: 600 }} className="mb-1">
                무료 플랜으로 시작 가능
              </h3>
              <p className="text-muted-foreground" style={{ fontSize: '0.8125rem', lineHeight: 1.6 }}>
                맞춤 조회는 무료입니다. AI 작성이 필요하면 스탠다드(월 29,000원)로 업그레이드하세요.
              </p>
            </div>
          </div>
          <Link
            to="/pricing"
            className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
            style={{ fontSize: '0.8125rem' }}
          >
            요금제 보기
            <ChevronRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
