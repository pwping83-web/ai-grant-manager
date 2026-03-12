import { useState } from 'react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import { Search, SlidersHorizontal, Clock, TrendingUp, Sparkles, ChevronRight, Bookmark, BookmarkCheck, AlertCircle, ArrowUpRight } from 'lucide-react';
import { mockGrants, mockUser, mockScrapedGrants } from '../data/mockData';

const categories = ['전체', '창업지원', '교육/멘토링', '디지털전환', '성장지원', '글로벌', '특화지원'];
const sortOptions = ['매칭률순', '마감임박순', '지원금액순'];

export function Dashboard() {
  const [activeCategory, setActiveCategory] = useState('전체');
  const [activeSort, setActiveSort] = useState('매칭률순');
  const [searchQuery, setSearchQuery] = useState('');
  const [scrapped, setScrapped] = useState<string[]>(mockScrapedGrants);
  const [showSortMenu, setShowSortMenu] = useState(false);

  const filtered = mockGrants
    .filter((g) => activeCategory === '전체' || g.category === activeCategory)
    .filter((g) => g.title.includes(searchQuery) || g.organization.includes(searchQuery))
    .sort((a, b) => {
      if (activeSort === '매칭률순') return b.matchRate - a.matchRate;
      if (activeSort === '마감임박순') return a.dDay - b.dDay;
      if (activeSort === '지원금액순') return b.maxAmountNum - a.maxAmountNum;
      return 0;
    });

  const toggleScrap = (id: string) => {
    setScrapped((prev) => prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]);
  };

  const urgentGrants = mockGrants.filter((g) => g.dDay <= 14);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-8">
      {/* Welcome */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-5 sm:mb-8"
      >
        <h1 style={{ fontSize: 'clamp(1.25rem, 3vw, 1.75rem)', fontWeight: 700 }} className="mb-0.5 sm:mb-1">
          {mockUser.name}님, 안녕하세요!
        </h1>
        <p className="text-muted-foreground" style={{ fontSize: '0.8125rem' }}>
          지원 가능한 <span className="text-primary" style={{ fontWeight: 600 }}>{mockGrants.filter(g => g.status !== 'closed').length}개</span> 맞춤 지원금
        </p>
      </motion.div>

      {/* Urgent Alert */}
      {urgentGrants.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          whileHover={{ scale: 1.01, boxShadow: '0 8px 25px rgba(239,68,68,0.08)' }}
          style={{ boxShadow: '0 0px 0px rgba(239,68,68,0)' }}
          className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-100 rounded-xl sm:rounded-2xl p-3.5 sm:p-5 mb-4 sm:mb-6 transition-all duration-300"
        >
          <div className="flex items-start gap-2.5 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-100 rounded-lg sm:rounded-xl flex items-center justify-center shrink-0">
              <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 style={{ fontSize: '0.8125rem', fontWeight: 600 }} className="text-red-800 mb-1">마감 임박!</h3>
              <div className="space-y-0.5 sm:space-y-1">
                {urgentGrants.map((g) => (
                  <Link
                    key={g.id}
                    to={`/grant/${g.id}`}
                    className="flex items-center gap-1.5 sm:gap-2 text-red-700 hover:text-red-900 transition-colors"
                    style={{ fontSize: '0.75rem' }}
                  >
                    <Clock className="w-3 h-3 shrink-0" />
                    <span className="truncate">{g.title}</span>
                    <span className="bg-red-100 text-red-600 px-1.5 py-0.5 rounded-full shrink-0" style={{ fontSize: '0.625rem', fontWeight: 600 }}>D-{g.dDay}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-5 sm:mb-8">
        {[
          { label: '전체 매칭', value: mockGrants.length, icon: TrendingUp, color: 'bg-blue-50 text-blue-600' },
          { label: '마감 임박', value: urgentGrants.length, icon: Clock, color: 'bg-red-50 text-red-600' },
          { label: '스크랩', value: scrapped.length, icon: Bookmark, color: 'bg-amber-50 text-amber-600' },
          { label: 'AI 작성', value: 4, icon: Sparkles, color: 'bg-purple-50 text-purple-600' },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -4, boxShadow: '0 12px 30px rgba(0,0,0,0.06)' }}
              style={{ boxShadow: '0 0px 0px rgba(0,0,0,0)' }}
              className="bg-white rounded-xl sm:rounded-2xl p-3.5 sm:p-5 border border-border hover:border-primary/20 transition-all duration-300 cursor-default"
            >
              <motion.div
                className={`w-8 h-8 sm:w-10 sm:h-10 ${stat.color} rounded-lg sm:rounded-xl flex items-center justify-center mb-2 sm:mb-3`}
                whileHover={{ scale: 1.15, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.div>
              <div style={{ fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)', fontWeight: 700 }}>{stat.value}</div>
              <div className="text-muted-foreground" style={{ fontSize: '0.6875rem' }}>{stat.label}</div>
            </motion.div>
          );
        })}
      </div>

      {/* Search & Sort */}
      <div className="flex gap-2 sm:gap-3 mb-4 sm:mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="지원금 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 sm:pl-11 pr-3 sm:pr-4 py-2.5 sm:py-3 bg-white border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
            style={{ fontSize: '0.8125rem' }}
          />
        </div>
        <div className="relative sm:hidden">
          <button
            onClick={() => setShowSortMenu(!showSortMenu)}
            className="h-full px-3 bg-white border border-border rounded-xl flex items-center gap-1.5 hover:border-primary/30 transition-colors"
          >
            <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
          </button>
          {showSortMenu && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setShowSortMenu(false)} />
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute right-0 top-full mt-1 bg-white border border-border rounded-xl shadow-xl z-20 py-1 w-32"
              >
                {sortOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => { setActiveSort(opt); setShowSortMenu(false); }}
                    className={`w-full text-left px-3.5 py-2.5 transition-colors ${
                      activeSort === opt ? 'text-primary bg-accent' : 'text-foreground hover:bg-secondary'
                    }`}
                    style={{ fontSize: '0.8125rem', fontWeight: activeSort === opt ? 600 : 400 }}
                  >
                    {opt}
                  </button>
                ))}
              </motion.div>
            </>
          )}
        </div>
        <div className="hidden sm:flex gap-2">
          {sortOptions.map((opt) => (
            <motion.button
              key={opt}
              onClick={() => setActiveSort(opt)}
              className={`px-4 py-3 rounded-xl border transition-all duration-200 whitespace-nowrap ${
                activeSort === opt
                  ? 'bg-gradient-to-r from-primary to-blue-600 text-white border-primary'
                  : 'bg-white border-border text-muted-foreground hover:border-primary/30'
              }`}
              style={activeSort === opt ? { fontSize: '0.8125rem', fontWeight: 500, boxShadow: '0 4px 6px -1px rgba(49,130,246,0.15)' } : { fontSize: '0.8125rem', fontWeight: 500 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              {opt}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-3 sm:pb-4 mb-4 sm:mb-6 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
        {categories.map((cat) => (
          <motion.button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full whitespace-nowrap transition-all duration-200 ${
              activeCategory === cat
                ? 'bg-gradient-to-r from-primary to-blue-600 text-white'
                : 'bg-white border border-border text-muted-foreground hover:bg-secondary'
            }`}
            style={activeCategory === cat ? { fontSize: '0.75rem', fontWeight: 500, boxShadow: '0 4px 6px -1px rgba(49,130,246,0.15)' } : { fontSize: '0.75rem', fontWeight: 500 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {cat}
          </motion.button>
        ))}
      </div>

      {/* Grant Cards */}
      <div className="space-y-3 sm:space-y-4">
        {filtered.map((grant, i) => (
          <motion.div
            key={grant.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
          >
            <motion.div
              className="bg-white rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 transition-all duration-300 group"
              style={{ boxShadow: '0 0px 0px rgba(0,0,0,0)' }}
              whileHover={{ y: -3, boxShadow: '0 16px 40px rgba(0,0,0,0.06)', borderColor: 'rgba(49,130,246,0.15)' }}
            >
              {/* Top */}
              <div className="flex items-start justify-between mb-3 sm:mb-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2 flex-wrap">
                    <span className="bg-secondary text-secondary-foreground px-2 py-0.5 rounded-md" style={{ fontSize: '0.6875rem', fontWeight: 500 }}>
                      {grant.category}
                    </span>
                    <span className="text-muted-foreground hidden sm:inline" style={{ fontSize: '0.75rem' }}>{grant.organization}</span>
                    {grant.status === 'closing' && (
                      <motion.span
                        className="bg-red-50 text-red-600 px-2 py-0.5 rounded-md"
                        style={{ fontSize: '0.6875rem', fontWeight: 600 }}
                        animate={{ opacity: [1, 0.6, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        마감임박
                      </motion.span>
                    )}
                  </div>
                  <Link to={`/grant/${grant.id}`}>
                    <h3 className="text-foreground hover:text-primary transition-colors truncate" style={{ fontSize: 'clamp(0.9375rem, 2vw, 1.125rem)', fontWeight: 600 }}>
                      {grant.title}
                    </h3>
                  </Link>
                  <p className="text-muted-foreground sm:hidden mt-0.5" style={{ fontSize: '0.6875rem' }}>{grant.organization}</p>
                </div>
                <motion.button
                  onClick={() => toggleScrap(grant.id)}
                  className="p-1.5 sm:p-2 rounded-lg hover:bg-secondary transition-colors shrink-0 ml-2"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.85 }}
                >
                  {scrapped.includes(grant.id)
                    ? <BookmarkCheck className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                    : <Bookmark className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
                  }
                </motion.button>
              </div>

              {/* Match Rate */}
              <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-muted-foreground" style={{ fontSize: '0.6875rem' }}>매칭률</span>
                    <span className="text-primary" style={{ fontSize: '0.8125rem', fontWeight: 700 }}>{grant.matchRate}%</span>
                  </div>
                  <div className="h-1.5 sm:h-2 bg-secondary rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full ${
                        grant.matchRate >= 80 ? 'bg-gradient-to-r from-primary to-blue-400' : grant.matchRate >= 60 ? 'bg-blue-400' : 'bg-blue-300'
                      }`}
                      initial={{ width: 0 }}
                      animate={{ width: `${grant.matchRate}%` }}
                      transition={{ duration: 0.8, delay: 0.2 + i * 0.05, ease: 'easeOut' }}
                    />
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-muted-foreground" style={{ fontSize: '0.625rem' }}>지원 금액</div>
                  <div style={{ fontSize: '0.875rem', fontWeight: 700 }}>{grant.maxAmount}</div>
                </div>
              </div>

              {/* Match Reasons */}
              <div className="flex gap-1.5 sm:gap-2 overflow-x-auto scrollbar-none mb-3 sm:mb-4 -mx-1 px-1">
                {grant.matchReasons.slice(0, 3).map((reason) => (
                  <span key={reason} className="bg-accent text-accent-foreground px-2 sm:px-3 py-0.5 sm:py-1 rounded-md sm:rounded-lg whitespace-nowrap shrink-0" style={{ fontSize: '0.625rem' }}>
                    ✓ {reason}
                  </span>
                ))}
              </div>

              {/* Bottom */}
              <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-border">
                <div className="flex items-center gap-1.5 sm:gap-2 text-muted-foreground" style={{ fontSize: '0.6875rem' }}>
                  <Clock className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">마감</span> <span>{grant.deadline.slice(5)}</span>
                  <span className={`px-1.5 sm:px-2 py-0.5 rounded-full ${
                    grant.dDay <= 14 ? 'bg-red-50 text-red-600' : grant.dDay <= 30 ? 'bg-amber-50 text-amber-600' : 'bg-green-50 text-green-600'
                  }`} style={{ fontSize: '0.625rem', fontWeight: 600 }}>
                    D-{grant.dDay}
                  </span>
                </div>
                <motion.div whileHover={{ x: 3 }} transition={{ type: 'spring', stiffness: 400, damping: 17 }}>
                  <Link
                    to={`/grant/${grant.id}`}
                    className="flex items-center gap-0.5 sm:gap-1 text-primary hover:underline"
                    style={{ fontSize: '0.75rem', fontWeight: 500 }}
                  >
                    자세히 보기
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}