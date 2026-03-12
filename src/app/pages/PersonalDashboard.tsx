import { Link } from 'react-router';
import { motion } from 'motion/react';
import { User, Store, ChevronRight, Sparkles } from 'lucide-react';
import { personalProfiles } from '../data/personalProfiles';

export function PersonalDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F7F8FA] to-white">
      <div className="max-w-lg mx-auto px-4 pt-16 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 mb-8"
        >
          <Sparkles className="w-5 h-5 text-primary" />
          <h1 className="text-foreground" style={{ fontSize: '1.125rem', fontWeight: 600 }}>
            개인용 지원정보
          </h1>
        </motion.div>

        <p className="text-muted-foreground mb-6" style={{ fontSize: '0.875rem', lineHeight: 1.6 }}>
          사장님을 클릭하면 새로 업데이트된 지원정보와 확인 안 한 지원정보를 볼 수 있습니다.
        </p>

        <Link to="/personal/2026">
          <motion.div
            className="mb-6 flex items-center justify-between gap-3 p-4 rounded-2xl bg-gradient-to-r from-primary/10 to-blue-50 border border-primary/20 hover:border-primary/40 transition-all cursor-pointer"
            whileHover={{ scale: 1.01, y: -2 }}
            whileTap={{ scale: 0.99 }}
          >
            <span className="font-semibold text-primary" style={{ fontSize: '0.9375rem' }}>
              2026 지원사업 바로가기
            </span>
            <ChevronRight className="w-5 h-5 text-primary shrink-0" />
          </motion.div>
        </Link>

        <div className="space-y-4">
          {personalProfiles.map((profile, i) => (
            <motion.div
              key={profile.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link to={`/personal/${profile.id}`}>
                <motion.div
                  className="bg-white rounded-2xl p-5 sm:p-6 border border-border shadow-sm hover:shadow-md hover:border-primary/20 transition-all cursor-pointer"
                  whileHover={{ scale: 1.01, y: -2 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                          <User className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h2 className="text-foreground font-semibold" style={{ fontSize: '1rem' }}>
                            {profile.name} 사장님 지원정보
                          </h2>
                          <div className="flex items-center gap-1.5 text-muted-foreground" style={{ fontSize: '0.75rem' }}>
                            <Store className="w-3.5 h-3.5" />
                            {profile.businessName}
                          </div>
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground shrink-0 mt-1" />
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>

        <Link
          to="/"
          className="block mt-8 text-center text-muted-foreground hover:text-primary transition-colors"
          style={{ fontSize: '0.8125rem' }}
        >
          ← 메인으로 돌아가기
        </Link>
      </div>
    </div>
  );
}
