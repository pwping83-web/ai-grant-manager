import { motion } from 'motion/react';
import { Users, FileText, Sparkles, TrendingUp, ArrowUpRight, ArrowDownRight, DollarSign, Clock, AlertCircle, CheckCircle, Bell, ChevronRight, RefreshCw, CreditCard } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid, PieChart, Pie, Cell } from 'recharts';
import { adminStats, adminAlerts } from '../../data/mockData';

const weeklyData = [
  { day: '월', users: 420, aiUsage: 890 },
  { day: '화', users: 510, aiUsage: 1020 },
  { day: '수', users: 480, aiUsage: 960 },
  { day: '목', users: 590, aiUsage: 1150 },
  { day: '금', users: 650, aiUsage: 1320 },
  { day: '토', users: 320, aiUsage: 650 },
  { day: '일', users: 280, aiUsage: 540 },
];

const monthlyGrowth = [
  { month: '10월', users: 8200, revenue: 28500000 },
  { month: '11월', users: 9100, revenue: 32100000 },
  { month: '12월', users: 10300, revenue: 38200000 },
  { month: '1월', users: 11200, revenue: 41600000 },
  { month: '2월', users: 11900, revenue: 44300000 },
  { month: '3월', users: 12847, revenue: 48750000 },
];

const regionDistribution = [
  { name: '서울', value: 32 },
  { name: '경기', value: 28 },
  { name: '부산', value: 12 },
  { name: '대구', value: 8 },
  { name: '기타', value: 20 },
];

const industryDistribution = [
  { name: 'IT/SW', value: 35 },
  { name: '제조업', value: 18 },
  { name: 'F&B', value: 15 },
  { name: '유통', value: 12 },
  { name: '기타', value: 20 },
];

const COLORS = ['#3182F6', '#60A5FA', '#93C5FD', '#BFDBFE', '#E5E8EB'];

const popularGrants = [
  { title: '초기창업패키지', views: 4523, applies: 892 },
  { title: '청년창업사관학교', views: 3210, applies: 654 },
  { title: 'K-스타트업 그랜드챌린지', views: 2890, applies: 534 },
  { title: '소상공인 디지털전환', views: 2340, applies: 421 },
  { title: '혁신형 소상공인 육성', views: 1890, applies: 312 },
];

function formatRevenue(num: number): string {
  if (num >= 100000000) return `${(num / 100000000).toFixed(1)}억`;
  if (num >= 10000) return `${Math.floor(num / 10000).toLocaleString()}만`;
  return num.toLocaleString();
}

export function AdminDashboard() {
  return (
    <div>
      <div className="flex items-start justify-between mb-6 sm:mb-8 flex-col sm:flex-row gap-3">
        <div>
          <h1 style={{ fontSize: 'clamp(1.125rem, 3vw, 1.5rem)', fontWeight: 700 }}>대시보드</h1>
          <p className="text-muted-foreground" style={{ fontSize: '0.8125rem' }}>서비스 현황을 한눈에</p>
        </div>
        <motion.button
          className="flex items-center gap-2 px-4 py-2.5 bg-white border border-border rounded-xl hover:bg-secondary hover:border-primary/20 transition-all duration-200"
          style={{ fontSize: '0.8125rem', fontWeight: 500 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <RefreshCw className="w-3.5 h-3.5" />
          새로고침
        </motion.button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4 mb-6 sm:mb-8">
        {[
          { label: '전체 가입자', value: adminStats.totalUsers.toLocaleString(), change: '+12%', up: true, icon: Users, color: 'bg-blue-50 text-blue-600' },
          { label: '활성 유저', value: adminStats.activeUsers.toLocaleString(), change: '+8%', up: true, icon: TrendingUp, color: 'bg-green-50 text-green-600' },
          { label: 'AI 사용', value: adminStats.aiUsageToday.toLocaleString(), change: '+23%', up: true, icon: Sparkles, color: 'bg-purple-50 text-purple-600' },
          { label: '전환율', value: `${adminStats.conversionRate}%`, change: '+2.1%p', up: true, icon: CreditCard, color: 'bg-amber-50 text-amber-600' },
          { label: '월 수익', value: formatRevenue(adminStats.monthlyRevenue), change: '+10%', up: true, icon: DollarSign, color: 'bg-emerald-50 text-emerald-600' },
          { label: '마감임박', value: `${adminStats.closingGrantsThisWeek}건`, change: '이번 주', up: false, icon: Clock, color: 'bg-red-50 text-red-600' },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              whileHover={{ y: -4, boxShadow: '0 12px 30px rgba(0,0,0,0.06)' }}
              className="bg-white rounded-2xl border border-border p-4 hover:border-primary/15 transition-all duration-300 cursor-default"
            >
              <div className="flex items-center justify-between mb-2">
                <div className={`w-8 h-8 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <Icon className="w-4 h-4" />
                </div>
                {stat.label !== '마감임박' && (
                  <div className={`flex items-center gap-0.5 ${stat.up ? 'text-green-600' : 'text-red-500'}`} style={{ fontSize: '0.6875rem', fontWeight: 600 }}>
                    {stat.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {stat.change}
                  </div>
                )}
              </div>
              <div style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', fontWeight: 700 }}>{stat.value}</div>
              <div className="text-muted-foreground" style={{ fontSize: '0.625rem' }}>{stat.label}</div>
            </motion.div>
          );
        })}
      </div>

      {/* Alert Panel + Charts Row */}
      <div className="grid lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {/* Alert Panel */}
        <div className="bg-white rounded-2xl border border-border p-5 lg:col-span-1">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-primary" />
              <span style={{ fontSize: '0.9375rem', fontWeight: 600 }}>알림</span>
            </div>
            <span className="bg-red-50 text-red-600 px-2 py-0.5 rounded-full" style={{ fontSize: '0.6875rem', fontWeight: 600 }}>
              {adminAlerts.filter(a => a.urgent).length}건 긴급
            </span>
          </div>
          <div className="space-y-3">
            {adminAlerts.map((alert) => (
              <div key={alert.id} className={`flex items-start gap-3 p-3 rounded-xl ${alert.urgent ? 'bg-red-50/60' : 'bg-[#F7F8FA]'}`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                  alert.urgent ? 'bg-red-100' : 'bg-secondary'
                }`}>
                  {alert.type === 'crawl' ? <RefreshCw className="w-3 h-3 text-muted-foreground" /> :
                   alert.type === 'cs' ? <AlertCircle className="w-3 h-3 text-red-500" /> :
                   alert.type === 'deadline' ? <Clock className="w-3 h-3 text-red-500" /> :
                   alert.type === 'payment' ? <DollarSign className="w-3 h-3 text-green-500" /> :
                   <CheckCircle className="w-3 h-3 text-green-500" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={alert.urgent ? 'text-red-800' : 'text-foreground'} style={{ fontSize: '0.75rem', lineHeight: 1.5 }}>
                    {alert.message}
                  </p>
                  <span className="text-muted-foreground" style={{ fontSize: '0.6875rem' }}>{alert.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Growth + Revenue Chart */}
        <div className="bg-white rounded-2xl border border-border p-6 lg:col-span-2">
          <h3 style={{ fontSize: '0.9375rem', fontWeight: 600 }} className="mb-6">가입자 성장 & 월간 수익 추이</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={monthlyGrowth}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E8EB" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="#8B95A1" />
              <YAxis yAxisId="left" tick={{ fontSize: 11 }} stroke="#8B95A1" />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11 }} stroke="#8B95A1"
                tickFormatter={(v) => `${(v / 10000).toLocaleString()}만`} />
              <Tooltip
                contentStyle={{ borderRadius: '12px', border: '1px solid #E5E8EB', fontSize: '12px' }}
                formatter={(value: number, name: string) => {
                  if (name === 'revenue') return [`${formatRevenue(value)}원`, '수익'];
                  return [value.toLocaleString(), '가입자'];
                }}
              />
              <Line yAxisId="left" type="monotone" dataKey="users" stroke="#3182F6" strokeWidth={2.5} dot={{ fill: '#3182F6', r: 4 }} name="users" />
              <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={2} dot={{ fill: '#10B981', r: 3 }} strokeDasharray="5 5" name="revenue" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {/* Weekly Activity */}
        <div className="bg-white rounded-2xl border border-border p-6">
          <h3 style={{ fontSize: '0.9375rem', fontWeight: 600 }} className="mb-6">주간 활동량</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E8EB" />
              <XAxis dataKey="day" tick={{ fontSize: 11 }} stroke="#8B95A1" />
              <YAxis tick={{ fontSize: 11 }} stroke="#8B95A1" />
              <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #E5E8EB', fontSize: '12px' }} />
              <Bar dataKey="users" fill="#3182F6" radius={[4, 4, 0, 0]} name="접속자" />
              <Bar dataKey="aiUsage" fill="#E8F1FD" radius={[4, 4, 0, 0]} name="AI 사용" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Region Distribution */}
        <div className="bg-white rounded-2xl border border-border p-6">
          <h3 style={{ fontSize: '0.9375rem', fontWeight: 600 }} className="mb-4">지역별 유저 분포</h3>
          <div className="flex items-center">
            <ResponsiveContainer width="50%" height={180}>
              <PieChart>
                <Pie data={regionDistribution} dataKey="value" cx="50%" cy="50%" innerRadius={40} outerRadius={70}>
                  {regionDistribution.map((_, i) => (
                    <Cell key={i} fill={COLORS[i]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-2">
              {regionDistribution.map((item, i) => (
                <div key={item.name} className="flex items-center justify-between" style={{ fontSize: '0.75rem' }}>
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                    <span>{item.name}</span>
                  </div>
                  <span style={{ fontWeight: 600 }}>{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Industry Distribution */}
        <div className="bg-white rounded-2xl border border-border p-6">
          <h3 style={{ fontSize: '0.9375rem', fontWeight: 600 }} className="mb-4">업종별 유저 분포</h3>
          <div className="flex items-center">
            <ResponsiveContainer width="50%" height={180}>
              <PieChart>
                <Pie data={industryDistribution} dataKey="value" cx="50%" cy="50%" innerRadius={40} outerRadius={70}>
                  {industryDistribution.map((_, i) => (
                    <Cell key={i} fill={COLORS[i]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-2">
              {industryDistribution.map((item, i) => (
                <div key={item.name} className="flex items-center justify-between" style={{ fontSize: '0.75rem' }}>
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                    <span>{item.name}</span>
                  </div>
                  <span style={{ fontWeight: 600 }}>{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Popular Grants */}
      <div className="bg-white rounded-2xl border border-border p-6">
        <h3 style={{ fontSize: '0.9375rem', fontWeight: 600 }} className="mb-6">인기 지원금 공고 TOP 5</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 text-muted-foreground" style={{ fontSize: '0.75rem', fontWeight: 500 }}>순위</th>
                <th className="text-left py-3 text-muted-foreground" style={{ fontSize: '0.75rem', fontWeight: 500 }}>공고명</th>
                <th className="text-right py-3 text-muted-foreground" style={{ fontSize: '0.75rem', fontWeight: 500 }}>조회수</th>
                <th className="text-right py-3 text-muted-foreground" style={{ fontSize: '0.75rem', fontWeight: 500 }}>지원 클릭</th>
                <th className="text-right py-3 text-muted-foreground" style={{ fontSize: '0.75rem', fontWeight: 500 }}>전환율</th>
              </tr>
            </thead>
            <tbody>
              {popularGrants.map((grant, i) => (
                <tr key={grant.title} className="border-b border-border last:border-0">
                  <td className="py-3">
                    <span className={`w-6 h-6 inline-flex items-center justify-center rounded-md ${
                      i === 0 ? 'bg-primary text-white' : 'bg-secondary text-muted-foreground'
                    }`} style={{ fontSize: '0.6875rem', fontWeight: 600 }}>
                      {i + 1}
                    </span>
                  </td>
                  <td className="py-3" style={{ fontSize: '0.8125rem', fontWeight: 500 }}>{grant.title}</td>
                  <td className="py-3 text-right text-muted-foreground" style={{ fontSize: '0.8125rem' }}>{grant.views.toLocaleString()}</td>
                  <td className="py-3 text-right text-muted-foreground" style={{ fontSize: '0.8125rem' }}>{grant.applies.toLocaleString()}</td>
                  <td className="py-3 text-right" style={{ fontSize: '0.8125rem', fontWeight: 600 }}>
                    {((grant.applies / grant.views) * 100).toFixed(1)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}