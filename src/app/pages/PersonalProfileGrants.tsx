import { useParams, Link } from 'react-router';
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Sparkles, Bell, Eye } from 'lucide-react';
import { getProfileById } from '../data/personalProfiles';
import { useGrants } from '@/lib/useGrants';
import type { Grant } from '../data/mockData';

const STORAGE_KEY = (profileId: string) => `personal_viewed_${profileId}`;

function getViewedIds(profileId: string): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY(profileId));
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function markAsViewed(profileId: string, grantId: string) {
  const ids = getViewedIds(profileId);
  if (!ids.includes(grantId)) {
    ids.push(grantId);
    localStorage.setItem(STORAGE_KEY(profileId), JSON.stringify(ids));
  }
}

function formatKoreanAmount(num: number): string {
  if (num >= 100000000) {
    const eok = Math.floor(num / 100000000);
    const man = Math.floor((num % 100000000) / 10000);
    return man > 0 ? `${eok}억 ${man}만` : `${eok}억`;
  }
  if (num >= 10000) return `${Math.floor(num / 10000)}만`;
  return num.toLocaleString();
}

export function PersonalProfileGrants() {
  const { profileId } = useParams<{ profileId: string }>();
  const profile = profileId ? getProfileById(profileId) : null;
  const { grants, loading } = useGrants();
  const [viewedIds, setViewedIds] = useState<string[]>([]);

  useEffect(() => {
    if (profileId) setViewedIds(getViewedIds(profileId));
  }, [profileId]);

  const handleGrantClick = (grantId: string) => {
    if (profileId) {
      markAsViewed(profileId, grantId);
      setViewedIds((prev) => (prev.includes(grantId) ? prev : [...prev, grantId]));
    }
  };

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">프로필을 찾을 수 없습니다.</p>
        <Link to="/personal" className="text-primary ml-2">← 돌아가기</Link>
      </div>
    );
  }

  const unviewedGrants = grants.filter((g) => !viewedIds.includes(g.id));
  const unviewedCount = unviewedGrants.length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F7F8FA] to-white">
      <div className="max-w-lg mx-auto px-4 pt-12 pb-12">
        <Link
          to="/personal"
          className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-primary mb-6"
          style={{ fontSize: '0.8125rem' }}
        >
          <ArrowLeft className="w-4 h-4" />
          프로필 목록
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-foreground font-semibold" style={{ fontSize: '1.125rem' }}>
            {profile.name} 사장님 지원정보
          </h1>
          <p className="text-muted-foreground mt-1" style={{ fontSize: '0.8125rem' }}>
            {profile.businessName} · {profile.region} {profile.subRegion}
          </p>
        </motion.div>

        {unviewedCount > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-xl p-3 mb-6"
          >
            <Bell className="w-4 h-4 text-amber-600 shrink-0" />
            <span style={{ fontSize: '0.8125rem', fontWeight: 500 }}>
              확인 안 한 지원정보 <span className="text-amber-600 font-bold">{unviewedCount}건</span> 있습니다.
            </span>
          </motion.div>
        )}

        {loading ? (
          <div className="text-center py-12 text-muted-foreground" style={{ fontSize: '0.875rem' }}>
            지원정보 불러오는 중...
          </div>
        ) : (
          <div className="space-y-3">
            {grants
              .filter((g) => g.status !== 'closed')
              .sort((a, b) => a.dDay - b.dDay)
              .map((grant, i) => {
                const isNew = !viewedIds.includes(grant.id);
                return (
                  <motion.div
                    key={grant.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      to={`/grant/${grant.id}`}
                      onClick={() => handleGrantClick(grant.id)}
                    >
                      <motion.div
                        className={`rounded-xl p-4 flex items-center justify-between cursor-pointer transition-colors border ${
                          isNew ? 'bg-primary/5 border-primary/20' : 'bg-white border-border'
                        }`}
                        whileHover={{ scale: 1.01, x: 4 }}
                      >
                        <div className="flex items-center gap-3 min-w-0 flex-1">
                          <div className="w-10 h-10 rounded-lg bg-white border flex items-center justify-center shrink-0">
                            <span className="text-primary" style={{ fontSize: '0.75rem', fontWeight: 700 }}>
                              {grant.matchRate}%
                            </span>
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="truncate font-medium" style={{ fontSize: '0.875rem' }}>
                                {grant.title}
                              </span>
                              {isNew && (
                                <span className="bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded text-xs shrink-0 flex items-center gap-0.5">
                                  <Eye className="w-3 h-3" />
                                  NEW
                                </span>
                              )}
                            </div>
                            <div className="text-muted-foreground" style={{ fontSize: '0.75rem' }}>
                              {grant.maxAmount} · {grant.organization}
                            </div>
                          </div>
                        </div>
                        <span
                          className={`shrink-0 ml-2 px-2 py-0.5 rounded-full text-xs font-medium ${
                            grant.dDay <= 14 ? 'bg-red-50 text-red-600' : 'bg-accent text-primary'
                          }`}
                        >
                          D-{grant.dDay}
                        </span>
                      </motion.div>
                    </Link>
                  </motion.div>
                );
              })}
          </div>
        )}

        {!loading && grants.length === 0 && (
          <div className="text-center py-12 text-muted-foreground" style={{ fontSize: '0.875rem' }}>
            아직 지원정보가 없습니다. 크롤러가 데이터를 수집하면 표시됩니다.
          </div>
        )}
      </div>
    </div>
  );
}
