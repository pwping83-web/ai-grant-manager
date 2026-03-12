import { useState } from 'react';
import { Search, MoreHorizontal, Mail, Crown, User, Shield, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { adminUsers, kanbanData } from '../../data/mockData';

const kanbanStages = [
  { key: 'paid', label: '결제 완료', color: 'bg-blue-500' },
  { key: 'ai_draft', label: 'AI 초안 생성 중', color: 'bg-purple-500' },
  { key: 'review', label: '전문가 검수 중', color: 'bg-amber-500' },
  { key: 'done', label: '최종 전달 완료', color: 'bg-green-500' },
];

export function AdminMembers() {
  const [searchQuery, setSearchQuery] = useState('');
  const [planFilter, setPlanFilter] = useState('all');
  const [activeView, setActiveView] = useState<'members' | 'kanban'>('members');

  const filtered = adminUsers
    .filter((u) => planFilter === 'all' || u.plan === planFilter)
    .filter((u) => u.name.includes(searchQuery) || u.email.includes(searchQuery));

  const getPlanBadge = (plan: string) => {
    switch (plan) {
      case '프로':
        return <span className="flex items-center gap-1 bg-primary/10 text-primary px-2.5 py-1 rounded-lg" style={{ fontSize: '0.75rem', fontWeight: 600 }}><Crown className="w-3 h-3" /> 프로</span>;
      case '엔터프라이즈':
        return <span className="flex items-center gap-1 bg-purple-50 text-purple-600 px-2.5 py-1 rounded-lg" style={{ fontSize: '0.75rem', fontWeight: 600 }}><Shield className="w-3 h-3" /> 엔터프라이즈</span>;
      default:
        return <span className="flex items-center gap-1 bg-secondary text-muted-foreground px-2.5 py-1 rounded-lg" style={{ fontSize: '0.75rem', fontWeight: 600 }}><User className="w-3 h-3" /> 무료</span>;
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700 }}>회원 & 신청 관리</h1>
        <p className="text-muted-foreground" style={{ fontSize: '0.875rem' }}>유저 정보 조회 및 대행 현황 추적</p>
      </div>

      {/* View Toggle */}
      <div className="flex gap-1 bg-white rounded-xl border border-border p-1 mb-6 max-w-xs">
        {[
          { key: 'members' as const, label: '회원 목록' },
          { key: 'kanban' as const, label: '대행 관리 보드' },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveView(tab.key)}
            className={`flex-1 py-2.5 rounded-lg transition-all ${
              activeView === tab.key
                ? 'bg-primary text-white'
                : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
            }`}
            style={{ fontSize: '0.8125rem', fontWeight: 500 }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeView === 'members' && (
        <>
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {[
              { label: '전체 회원', value: '12,847', color: 'text-foreground' },
              { label: '프로 회원', value: '3,421', color: 'text-primary' },
              { label: '엔터프라이즈', value: '156', color: 'text-purple-600' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white rounded-2xl border border-border p-5 text-center">
                <div className={stat.color} style={{ fontSize: '1.5rem', fontWeight: 700 }}>{stat.value}</div>
                <div className="text-muted-foreground" style={{ fontSize: '0.75rem' }}>{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Search & Filter */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="이름 또는 이메일로 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
            <div className="flex gap-2">
              {['all', '무료', '프로', '엔터프라이즈'].map((plan) => (
                <button
                  key={plan}
                  onClick={() => setPlanFilter(plan)}
                  className={`px-4 py-3 rounded-xl border transition-colors whitespace-nowrap ${
                    planFilter === plan
                      ? 'bg-primary text-white border-primary'
                      : 'bg-white border-border text-muted-foreground hover:border-primary/30'
                  }`}
                  style={{ fontSize: '0.8125rem', fontWeight: 500 }}
                >
                  {plan === 'all' ? '전체' : plan}
                </button>
              ))}
            </div>
          </div>

          {/* Members Table */}
          <div className="bg-white rounded-2xl border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#F7F8FA] border-b border-border">
                    <th className="text-left px-5 py-3 text-muted-foreground" style={{ fontSize: '0.75rem', fontWeight: 500 }}>회원</th>
                    <th className="text-left px-5 py-3 text-muted-foreground" style={{ fontSize: '0.75rem', fontWeight: 500 }}>사업자 유형</th>
                    <th className="text-left px-5 py-3 text-muted-foreground" style={{ fontSize: '0.75rem', fontWeight: 500 }}>플랜</th>
                    <th className="text-left px-5 py-3 text-muted-foreground" style={{ fontSize: '0.75rem', fontWeight: 500 }}>가입일</th>
                    <th className="text-left px-5 py-3 text-muted-foreground" style={{ fontSize: '0.75rem', fontWeight: 500 }}>최근 활동</th>
                    <th className="text-left px-5 py-3 text-muted-foreground" style={{ fontSize: '0.75rem', fontWeight: 500 }}>지원서</th>
                    <th className="text-right px-5 py-3 text-muted-foreground" style={{ fontSize: '0.75rem', fontWeight: 500 }}>관리</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((user) => (
                    <tr key={user.id} className="border-b border-border last:border-0 hover:bg-[#FAFBFC] transition-colors">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 bg-primary/10 rounded-full flex items-center justify-center">
                            <span className="text-primary" style={{ fontSize: '0.75rem', fontWeight: 600 }}>{user.name[0]}</span>
                          </div>
                          <div>
                            <div style={{ fontSize: '0.8125rem', fontWeight: 500 }}>{user.name}</div>
                            <div className="text-muted-foreground" style={{ fontSize: '0.6875rem' }}>{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span className="bg-secondary text-muted-foreground px-2 py-0.5 rounded-md" style={{ fontSize: '0.6875rem' }}>
                          {user.businessType}
                        </span>
                      </td>
                      <td className="px-5 py-4">{getPlanBadge(user.plan)}</td>
                      <td className="px-5 py-4 text-muted-foreground" style={{ fontSize: '0.75rem' }}>{user.joinDate}</td>
                      <td className="px-5 py-4 text-muted-foreground" style={{ fontSize: '0.75rem' }}>{user.lastActive}</td>
                      <td className="px-5 py-4" style={{ fontSize: '0.8125rem', fontWeight: 500 }}>{user.grants}건</td>
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-1">
                          <button className="p-2 rounded-lg hover:bg-secondary transition-colors" title="이메일">
                            <Mail className="w-4 h-4 text-muted-foreground" />
                          </button>
                          <button className="p-2 rounded-lg hover:bg-secondary transition-colors" title="더보기">
                            <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* Kanban Board */}
      {activeView === 'kanban' && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {kanbanStages.map(stage => {
            const cards = kanbanData.filter(k => k.stage === stage.key);
            return (
              <div key={stage.key} className="bg-[#F7F8FA] rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-4">
                  <div className={`w-2.5 h-2.5 rounded-full ${stage.color}`} />
                  <span style={{ fontSize: '0.8125rem', fontWeight: 600 }}>{stage.label}</span>
                  <span className="bg-white text-muted-foreground px-2 py-0.5 rounded-full ml-auto" style={{ fontSize: '0.6875rem', fontWeight: 600 }}>
                    {cards.length}
                  </span>
                </div>
                <div className="space-y-3">
                  {cards.map(card => (
                    <div key={card.id} className="bg-white rounded-xl border border-border p-4 hover:shadow-lg hover:shadow-black/5 hover:border-primary/15 transition-all duration-300 cursor-pointer">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-7 h-7 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-primary" style={{ fontSize: '0.625rem', fontWeight: 600 }}>{card.userName[0]}</span>
                        </div>
                        <span style={{ fontSize: '0.8125rem', fontWeight: 500 }}>{card.userName}</span>
                      </div>
                      <p style={{ fontSize: '0.75rem' }} className="text-muted-foreground mb-2">{card.grantTitle}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground" style={{ fontSize: '0.6875rem' }}>{card.date}</span>
                        <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
                      </div>
                    </div>
                  ))}
                  {cards.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground" style={{ fontSize: '0.8125rem' }}>
                      아직 없어요
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}