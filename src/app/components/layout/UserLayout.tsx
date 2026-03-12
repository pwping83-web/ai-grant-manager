import { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate, Navigate } from 'react-router';
import { LayoutDashboard, FileText, User, Sparkles, LogOut } from 'lucide-react';
import { motion } from 'motion/react';
import { supabase } from '@/lib/supabase';

const navItems = [
  { path: '/dashboard', label: '대시보드', icon: LayoutDashboard },
  { path: '/ai-writer', label: 'AI 작성실', icon: Sparkles },
  { path: '/mypage', label: '마이페이지', icon: User },
];

export function UserLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [session, setSession] = useState<{ user: { email?: string } } | null>(null);
  const [loading, setLoading] = useState(true);
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session: s } }) => {
      setSession(s);
      setLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, s) => setSession(s));
    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F8FA] flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (!session) {
    return <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname)}`} replace />;
  }

  return (
    <div className="min-h-screen bg-[#F7F8FA] pb-[calc(env(safe-area-inset-bottom)+64px)] md:pb-0">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-2xl border-b border-border/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 md:h-16">
            <motion.div whileHover={{ scale: 1.02 }} transition={{ type: 'spring', stiffness: 400, damping: 17 }}>
              <Link to="/" className="flex items-center gap-2">
                <div className="w-7 h-7 md:w-8 md:h-8 bg-gradient-to-br from-primary to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                  <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-white" />
                </div>
                <span className="text-[#191F28]" style={{ fontSize: '1rem', fontWeight: 600 }}>지원금 AI</span>
              </Link>
            </motion.div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname.startsWith(item.path);
                return (
                  <motion.div
                    key={item.path}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Link
                      to={item.path}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                        isActive
                          ? 'bg-gradient-to-r from-accent to-blue-50 text-primary shadow-sm'
                          : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>{item.label}</span>
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            <div className="flex items-center gap-3">
              <Link
                to="/pricing"
                className="hidden md:flex items-center gap-1.5 text-primary hover:underline px-3 py-1.5 rounded-lg hover:bg-accent/50 transition-colors"
                style={{ fontSize: '0.8125rem', fontWeight: 500 }}
              >
                요금제
              </Link>
              <div className="relative">
                <motion.button
                  type="button"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/10 to-blue-100 flex items-center justify-center overflow-hidden"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent" style={{ fontSize: '0.75rem', fontWeight: 600 }}>
                    {session.user?.email?.[0]?.toUpperCase() || '김'}
                  </span>
                </motion.button>
                {showUserMenu && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setShowUserMenu(false)} />
                    <div className="absolute right-0 top-full mt-1 z-50">
                      <button
                        onClick={() => { handleLogout(); setShowUserMenu(false); }}
                        className="flex items-center gap-2 w-full px-3 py-2 bg-white border border-border rounded-lg shadow-lg text-muted-foreground hover:text-foreground hover:bg-secondary"
                        style={{ fontSize: '0.8125rem' }}
                      >
                        <LogOut className="w-4 h-4" />
                        로그아웃
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <Outlet />
      </main>

      {/* 관리자 링크 - 눈에 띄지 않게 */}
      <Link
        to="/admin"
        className="fixed bottom-20 left-2 z-40 text-muted-foreground/30 hover:text-muted-foreground/70 transition-colors"
        style={{ fontSize: '9px' }}
      >
        admin
      </Link>

      {/* Mobile Bottom Tab Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-t border-border/50" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
        <div className="flex items-center justify-around h-16 px-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center justify-center gap-0.5 min-w-[64px] py-1.5 rounded-lg transition-all duration-200 ${
                  isActive ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                <motion.div
                  animate={isActive ? { scale: [1, 1.2, 1] } : {}}
                  transition={{ duration: 0.3 }}
                >
                  <Icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 2} />
                </motion.div>
                <span style={{ fontSize: '0.625rem', fontWeight: isActive ? 600 : 400 }}>
                  {item.label}
                </span>
                {isActive && (
                  <motion.div
                    className="w-1 h-1 rounded-full bg-primary mt-0.5"
                    layoutId="bottomTabIndicator"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
