import { useState } from 'react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import { User, Building2, MapPin, Calendar, Users, TrendingUp, Bookmark, FileText, Edit3, ChevronRight, Sparkles, Clock, Crown } from 'lucide-react';
import { mockUser, mockGrants, mockScrapedGrants, mockDrafts, mockSubscription, planConfig } from '../data/mockData';

type Tab = 'profile' | 'scraps' | 'drafts';

export function MyPage() {
  const [activeTab, setActiveTab] = useState<Tab>('profile');
  const scrapedGrants = mockGrants.filter((g) => mockScrapedGrants.includes(g.id));

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-5 sm:py-8">
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl sm:rounded-2xl border border-border p-4 sm:p-8 mb-4 sm:mb-6 hover:shadow-lg hover:shadow-black/3 transition-shadow duration-400"
      >
        <div className="flex items-start sm:items-center justify-between flex-col sm:flex-row gap-3 sm:gap-4">
          <div className="flex items-center gap-3 sm:gap-4">
            <motion.div
              className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-primary/10 to-blue-100 rounded-xl sm:rounded-2xl flex items-center justify-center"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent" style={{ fontSize: 'clamp(1rem, 2.5vw, 1.5rem)', fontWeight: 700 }}>김</span>
            </motion.div>
            <div>
              <div className="flex items-center gap-2 mb-0.5 sm:mb-1">
                <h1 style={{ fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', fontWeight: 700 }}>{mockUser.name}</h1>
                <Link to="/pricing">
                  <motion.span
                    className={`px-2 py-0.5 rounded-md flex items-center gap-1 ${
                      mockSubscription.plan === 'premium'
                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white'
                        : mockSubscription.plan === 'standard'
                          ? 'bg-gradient-to-r from-primary to-blue-600 text-white'
                          : 'bg-secondary text-muted-foreground'
                    }`}
                    style={{ fontSize: '0.5625rem', fontWeight: 600 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <Crown className="w-2.5 h-2.5" /> {planConfig[mockSubscription.plan].label.toUpperCase()}
                  </motion.span>
                </Link>
              </div>
              <p className="text-muted-foreground" style={{ fontSize: '0.75rem' }}>{mockUser.businessName} · {mockUser.businessType}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link to="/pricing">
              <motion.button
                className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-gradient-to-r from-primary to-blue-600 text-white rounded-lg sm:rounded-xl hover:shadow-lg transition-all w-full sm:w-auto justify-center"
                style={{ fontSize: '0.8125rem', fontWeight: 500 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Crown className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                요금제 변경
              </motion.button>
            </Link>
            <motion.button
              className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 border border-border rounded-lg sm:rounded-xl hover:bg-secondary hover:border-primary/20 transition-all duration-200 w-full sm:w-auto justify-center sm:justify-start"
              style={{ fontSize: '0.8125rem', fontWeight: 500 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Edit3 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              프로필 수정
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-0.5 sm:gap-1 bg-white rounded-lg sm:rounded-xl border border-border p-0.5 sm:p-1 mb-4 sm:mb-6">
        {([
          { key: 'profile' as Tab, label: '기업 정보', shortLabel: '기업 정보', icon: Building2 },
          { key: 'scraps' as Tab, label: `스크랩 (${scrapedGrants.length})`, shortLabel: `스크랩`, icon: Bookmark },
          { key: 'drafts' as Tab, label: `작성 중 (${mockDrafts.length})`, shortLabel: `작성 중`, icon: FileText },
        ]).map((tab) => {
          const Icon = tab.icon;
          return (
            <motion.button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 flex items-center justify-center gap-1.5 sm:gap-2 py-2.5 sm:py-3 rounded-md sm:rounded-lg transition-all duration-200 ${
                activeTab === tab.key
                  ? 'bg-gradient-to-r from-primary to-blue-600 text-white'
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
              }`}
              style={activeTab === tab.key ? { fontSize: '0.75rem', fontWeight: 500, boxShadow: '0 4px 6px -1px rgba(49,130,246,0.15)' } : { fontSize: '0.75rem', fontWeight: 500 }}
              whileHover={{ scale: activeTab === tab.key ? 1 : 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="sm:hidden">{tab.shortLabel}</span>
              <span className="hidden sm:inline">{tab.label}</span>
            </motion.button>
          );
        })}
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === 'profile' && (
          <div className="bg-white rounded-xl sm:rounded-2xl border border-border p-4 sm:p-8">
            <h3 style={{ fontSize: '0.9375rem', fontWeight: 600 }} className="mb-4 sm:mb-6">기업 정보</h3>
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 sm:gap-6">
              {[
                { icon: Building2, label: '사업자 유형', value: mockUser.businessType },
                { icon: MapPin, label: '소재지', value: `${mockUser.region} ${mockUser.subRegion}` },
                { icon: Calendar, label: '사업 경력', value: `${mockUser.yearsInBusiness}년` },
                { icon: Users, label: '직원 수', value: `${mockUser.employees}명` },
                { icon: TrendingUp, label: '연매출', value: mockUser.annualRevenue },
                { icon: Sparkles, label: '업종', value: mockUser.industry },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.label}
                    className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-[#F7F8FA] rounded-lg sm:rounded-xl hover:bg-accent/50 transition-colors duration-200"
                    whileHover={{ scale: 1.02, x: 3 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                  >
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-lg flex items-center justify-center shadow-sm shrink-0">
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-muted-foreground" style={{ fontSize: '0.625rem' }}>{item.label}</div>
                      <div className="truncate" style={{ fontSize: 'clamp(0.75rem, 2vw, 0.9375rem)', fontWeight: 500 }}>{item.value}</div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              className="mt-6 sm:mt-8 p-4 sm:p-5 bg-gradient-to-r from-accent to-blue-50 rounded-lg sm:rounded-xl border border-primary/5"
              whileHover={{ scale: 1.01, boxShadow: '0 8px 25px rgba(49,130,246,0.06)' }}
            >
              <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                <span className="text-primary" style={{ fontSize: '0.8125rem', fontWeight: 600 }}>AI 추천 현황</span>
              </div>
              <p className="text-primary/70" style={{ fontSize: '0.75rem', lineHeight: 1.7 }}>
                현재 프로필 기준 {mockGrants.filter(g => g.matchRate >= 60).length}개 지원금이 60% 이상 매칭
              </p>
              {mockSubscription.aiGenerationsLimit !== -1 && (
                <p className="text-primary/70 mt-2" style={{ fontSize: '0.75rem' }}>
                  이번 달 AI 작성 {mockSubscription.aiGenerationsUsed}/{mockSubscription.aiGenerationsLimit}회 사용
                  <Link to="/pricing" className="ml-1 text-primary hover:underline font-medium">업그레이드</Link>
                </p>
              )}
            </motion.div>
          </div>
        )}

        {activeTab === 'scraps' && (
          <div className="space-y-3 sm:space-y-4">
            {scrapedGrants.map((grant, i) => (
              <motion.div
                key={grant.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -3, boxShadow: '0 12px 30px rgba(0,0,0,0.06)' }}
              >
                <Link
                  to={`/grant/${grant.id}`}
                  className="block bg-white rounded-xl sm:rounded-2xl border border-border p-4 sm:p-5 hover:border-primary/15 transition-all duration-300"
                >
                  <div className="flex items-start justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                        <span className="bg-secondary text-secondary-foreground px-2 py-0.5 rounded-md" style={{ fontSize: '0.6875rem', fontWeight: 500 }}>
                          {grant.category}
                        </span>
                        {grant.status === 'closing' && (
                          <span className="bg-red-50 text-red-600 px-1.5 py-0.5 rounded-md" style={{ fontSize: '0.625rem', fontWeight: 600 }}>마감임박</span>
                        )}
                      </div>
                      <h3 className="truncate mb-0.5" style={{ fontSize: '0.875rem', fontWeight: 600 }}>{grant.title}</h3>
                      <p className="text-muted-foreground" style={{ fontSize: '0.6875rem' }}>{grant.organization}</p>
                    </div>
                    <div className="text-right shrink-0 ml-3 sm:ml-4">
                      <div className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent" style={{ fontSize: '1rem', fontWeight: 700 }}>{grant.matchRate}%</div>
                      <div className="flex items-center gap-1 text-muted-foreground" style={{ fontSize: '0.625rem' }}>
                        <Clock className="w-3 h-3" /> D-{grant.dDay}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === 'drafts' && (
          <div className="space-y-3 sm:space-y-4">
            {mockDrafts.map((draft, i) => (
              <motion.div
                key={draft.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -3, boxShadow: '0 12px 30px rgba(0,0,0,0.06)' }}
              >
                <Link
                  to={`/ai-writer?grantId=${draft.grantId}`}
                  className="block bg-white rounded-xl sm:rounded-2xl border border-border p-4 sm:p-5 hover:border-primary/15 transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                      <motion.div
                        className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-accent to-blue-50 rounded-lg sm:rounded-xl flex items-center justify-center shrink-0"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                      </motion.div>
                      <div className="min-w-0">
                        <h3 className="truncate" style={{ fontSize: '0.875rem', fontWeight: 600 }}>{draft.grantTitle}</h3>
                        <p className="text-muted-foreground" style={{ fontSize: '0.6875rem' }}>
                          최종 수정: {draft.lastEdited}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 sm:gap-4 shrink-0 ml-2">
                      <div className="text-right">
                        <div style={{ fontSize: '0.75rem', fontWeight: 600 }}>{draft.progress}%</div>
                        <div className="w-14 sm:w-20 h-1.5 sm:h-2 bg-secondary rounded-full overflow-hidden mt-0.5 sm:mt-1">
                          <motion.div
                            className="h-full bg-gradient-to-r from-primary to-blue-400 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${draft.progress}%` }}
                            transition={{ duration: 0.8, delay: 0.2 + i * 0.1 }}
                          />
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}

            <div className="text-center py-4 sm:py-6">
              <motion.div whileHover={{ scale: 1.05 }}>
                <Link
                  to="/dashboard"
                  className="inline-flex items-center gap-2 text-primary hover:underline"
                  style={{ fontSize: '0.8125rem', fontWeight: 500 }}
                >
                  <Sparkles className="w-4 h-4" />
                  새로운 지원서 작성하기
                </Link>
              </motion.div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}