import { Link } from 'react-router';
import { motion } from 'motion/react';
import { User, Store, MapPin, ChevronRight, Sparkles } from 'lucide-react';
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
                            <span className="text-muted-foreground/70">· {profile.birthYear % 100}년생 {profile.gender}{!profile.isYouth && ' · 청년 아님'}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 text-muted-foreground mt-2" style={{ fontSize: '0.75rem' }}>
                        <MapPin className="w-3.5 h-3.5 shrink-0" />
                        {profile.region} {profile.subRegion}
                      </div>
                      <p className="text-muted-foreground mt-3 line-clamp-2" style={{ fontSize: '0.8125rem', lineHeight: 1.5 }}>
                        {profile.description}
                      </p>
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
