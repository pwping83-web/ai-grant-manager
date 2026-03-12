import { useState } from 'react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import { Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import { mockGrants } from '../data/mockData';

const matchedGrants = mockGrants.filter(g => g.matchRate >= 60 && g.status !== 'closed');
const totalAmount = matchedGrants.reduce((sum, g) => sum + g.maxAmountNum, 0);

function formatKoreanAmount(num: number): string {
  if (num >= 100000000) {
    const eok = Math.floor(num / 100000000);
    const man = Math.floor((num % 100000000) / 10000);
    return man > 0 ? `${eok}억 ${man.toLocaleString()}만` : `${eok}억`;
  }
  if (num >= 10000) {
    return `${Math.floor(num / 10000).toLocaleString()}만`;
  }
  return num.toLocaleString();
}

export function Results() {
  const [showAllGrants, setShowAllGrants] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-lg mx-auto px-4 pt-12 sm:pt-16 pb-6 sm:pb-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="w-20 h-20 bg-gradient-to-br from-accent to-blue-100 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ boxShadow: '0 20px 25px -5px rgba(49,130,246,0.1)' }}>
            <motion.div
              initial={{ rotate: -10 }}
              animate={{ rotate: [0, -5, 5, 0] }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <Sparkles className="w-10 h-10 text-primary" />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-muted-foreground mb-2" style={{ fontSize: '0.875rem' }}>
              김민수 대표님,
            </p>
            <h1 style={{ fontSize: '1rem', fontWeight: 500, lineHeight: 1.5 }} className="text-foreground mb-4 sm:mb-6">
              지금 지원 가능한 공고가
            </h1>
          </motion.div>

          {/* Big number */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, type: 'spring', stiffness: 200 }}
            whileHover={{ scale: 1.02, boxShadow: '0 20px 40px rgba(49,130,246,0.12)' }}
            className="bg-gradient-to-br from-accent via-blue-50 to-accent border border-primary/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 mb-4 sm:mb-6 transition-all duration-400"
          >
            <div className="mb-1.5 sm:mb-2">
              <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent" style={{ fontSize: 'clamp(2rem, 6vw, 3rem)', fontWeight: 800 }}>
                총 {matchedGrants.length}건
              </span>
            </div>
            <div className="mb-3 sm:mb-4">
              <span className="text-foreground" style={{ fontSize: '0.875rem' }}>최대 </span>
              <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent" style={{ fontSize: 'clamp(1.5rem, 5vw, 2.25rem)', fontWeight: 800 }}>
                {formatKoreanAmount(totalAmount)}원
              </span>
            </div>
            <p className="text-muted-foreground" style={{ fontSize: '0.875rem' }}>
              대기 중입니다.
            </p>
          </motion.div>

          {/* Matched grants preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-8"
          >
            {matchedGrants.slice(0, showAllGrants ? matchedGrants.length : 3).map((grant, i) => (
              <motion.div
                key={grant.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 + i * 0.15 }}
                whileHover={{ scale: 1.02, x: 4, backgroundColor: '#EEF3FF' }}
                className="bg-[#F7F8FA] rounded-xl sm:rounded-2xl p-3.5 sm:p-4 flex items-center justify-between cursor-pointer transition-colors duration-200"
              >
                <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 bg-white rounded-lg sm:rounded-xl flex items-center justify-center shadow-sm border border-border/50 shrink-0">
                    <span className="text-primary" style={{ fontSize: '0.6875rem', fontWeight: 700 }}>{grant.matchRate}%</span>
                  </div>
                  <div className="min-w-0">
                    <div className="truncate" style={{ fontSize: '0.8125rem', fontWeight: 500 }}>{grant.title}</div>
                    <div className="text-muted-foreground" style={{ fontSize: '0.6875rem' }}>{grant.maxAmount}</div>
                  </div>
                </div>
                <span className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full shrink-0 ml-2 ${
                  grant.dDay <= 14 ? 'bg-red-50 text-red-600' : 'bg-accent text-primary'
                }`} style={{ fontSize: '0.625rem', fontWeight: 600 }}>
                  D-{grant.dDay}
                </span>
              </motion.div>
            ))}
            {matchedGrants.length > 3 && (
              <motion.button
                onClick={() => setShowAllGrants(!showAllGrants)}
                className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-dashed border-border text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-accent/30 transition-all"
                style={{ fontSize: '0.8125rem', fontWeight: 500 }}
              >
                {showAllGrants ? (
                  <>
                    <ChevronUp className="w-4 h-4" />
                    접기
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-4 h-4" />
                    +{matchedGrants.length - 3}건 더 있어요
                  </>
                )}
              </motion.button>
            )}
          </motion.div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="space-y-2.5 sm:space-y-3"
        >
          <Link to="/submit-documents">
            <motion.div
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-blue-600 text-white py-3.5 sm:py-4 rounded-xl sm:rounded-2xl transition-all duration-300"
              style={{ fontWeight: 600, fontSize: '0.875rem', boxShadow: '0 20px 25px -5px rgba(49,130,246,0.25)' }}
              whileHover={{ scale: 1.03, y: -2, boxShadow: '0 20px 40px rgba(49,130,246,0.3)' }}
              whileTap={{ scale: 0.97 }}
            >
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
              매칭 공고 확인하고 AI에게 서류 맡기기
            </motion.div>
          </Link>
          <Link
            to="/dashboard"
            className="w-full flex items-center justify-center gap-2 text-muted-foreground py-3 hover:text-foreground transition-colors"
            style={{ fontSize: '0.875rem' }}
          >
            정보만 보고 직접 할게요
          </Link>
        </motion.div>
      </div>

    </div>
  );
}