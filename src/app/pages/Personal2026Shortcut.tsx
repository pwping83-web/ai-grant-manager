/**
 * 2026 지원사업 바로가기
 * - 링크 클릭 시 2026 지원사업 표시
 * - 2026이 아니면 "아직 미정" 표시
 */
import { Link } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft, Calendar, AlertCircle } from 'lucide-react';
import { personalProfiles } from '../data/personalProfiles';

const TARGET_YEAR = 2026;

export function Personal2026Shortcut() {
  const currentYear = new Date().getFullYear();
  const is2026 = currentYear === TARGET_YEAR;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F7F8FA] to-white">
      <div className="max-w-lg mx-auto px-4 pt-12 pb-12">
        <Link
          to="/personal"
          className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-primary mb-6"
          style={{ fontSize: '0.8125rem' }}
        >
          <ArrowLeft className="w-4 h-4" />
          개인용 지원정보
        </Link>

        {is2026 ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h1 className="text-foreground font-semibold" style={{ fontSize: '1.125rem' }}>
                  {TARGET_YEAR}년 지원사업
                </h1>
                <p className="text-muted-foreground" style={{ fontSize: '0.8125rem' }}>
                  프로필을 선택하세요
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {personalProfiles.map((profile, i) => (
                <motion.div
                  key={profile.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link to={`/personal/${profile.id}?year=${TARGET_YEAR}`}>
                    <motion.div
                      className="bg-white rounded-2xl p-5 sm:p-6 border border-border shadow-sm hover:shadow-md hover:border-primary/20 transition-all cursor-pointer"
                      whileHover={{ scale: 1.01, y: -2 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h2 className="text-foreground font-semibold" style={{ fontSize: '1rem' }}>
                            {profile.name} 사장님 {TARGET_YEAR}년 지원사업
                          </h2>
                          <p className="text-muted-foreground mt-1" style={{ fontSize: '0.8125rem' }}>
                            {profile.businessName}
                          </p>
                        </div>
                        <span className="text-primary shrink-0" style={{ fontSize: '0.875rem', fontWeight: 600 }}>
                          바로가기 →
                        </span>
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-amber-50 border border-amber-200 rounded-2xl p-6 sm:p-8 text-center"
          >
            <div className="w-14 h-14 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-7 h-7 text-amber-600" />
            </div>
            <h2 className="text-foreground font-semibold mb-2" style={{ fontSize: '1.125rem' }}>
              {TARGET_YEAR}년 지원사업은 아직 미정입니다
            </h2>
            <p className="text-muted-foreground mb-6" style={{ fontSize: '0.875rem', lineHeight: 1.6 }}>
              현재 {currentYear}년입니다. {TARGET_YEAR}년 지원사업 정보는 추후 공개될 예정입니다.
            </p>
            <Link
              to="/personal"
              className="inline-flex items-center gap-2 px-4 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-colors"
              style={{ fontSize: '0.875rem' }}
            >
              <ArrowLeft className="w-4 h-4" />
              개인용 지원정보로 돌아가기
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
}
