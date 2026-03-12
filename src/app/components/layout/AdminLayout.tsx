import { Outlet, Link, useLocation } from 'react-router';
import { LayoutDashboard, Database, Users, FileCode, ArrowLeft, Sparkles, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const adminNav = [
  { path: '/admin', label: '대시보드', icon: LayoutDashboard, exact: true },
  { path: '/admin/grants', label: '지원금 관리', icon: Database },
  { path: '/admin/members', label: '회원 관리', icon: Users },
  { path: '/admin/templates', label: 'AI 템플릿', icon: FileCode },
];

export function AdminLayout() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F7F8FA] flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex w-64 bg-white border-r border-border flex-col fixed h-full">
        <div className="p-5 border-b border-border">
          <motion.div
            className="flex items-center gap-2"
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-[#191F28] to-gray-700 rounded-xl flex items-center justify-center shadow-lg">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <div style={{ fontSize: '0.875rem', fontWeight: 600 }} className="text-foreground">Admin</div>
              <div style={{ fontSize: '0.75rem' }} className="text-muted-foreground">지원금 AI</div>
            </div>
          </motion.div>
        </div>
        <nav className="flex-1 p-3">
          {adminNav.map((item) => {
            const Icon = item.icon;
            const isActive = item.exact
              ? location.pathname === item.path
              : location.pathname.startsWith(item.path) && !item.exact;
            return (
              <motion.div
                key={item.path}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl mb-1 transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-[#191F28] to-gray-700 text-white shadow-lg shadow-black/10'
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
        <div className="p-3 border-t border-border">
          <motion.div whileHover={{ x: -3 }} transition={{ type: 'spring', stiffness: 400, damping: 17 }}>
            <Link
              to="/dashboard"
              className="flex items-center gap-2 px-3 py-2.5 text-muted-foreground hover:text-foreground rounded-lg hover:bg-secondary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span style={{ fontSize: '0.875rem' }}>유저 페이지로</span>
            </Link>
          </motion.div>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-white/90 backdrop-blur-xl border-b border-border/50 z-50 flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <motion.button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            whileTap={{ scale: 0.9 }}
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </motion.button>
          <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>Admin</span>
        </div>
        <Link to="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors" style={{ fontSize: '0.75rem' }}>
          유저 페이지
        </Link>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              className="lg:hidden fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              className="lg:hidden fixed left-0 top-0 w-64 bg-white h-full z-50 pt-14 p-3 shadow-2xl"
              initial={{ x: -264 }}
              animate={{ x: 0 }}
              exit={{ x: -264 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              {adminNav.map((item) => {
                const Icon = item.icon;
                const isActive = item.exact ? location.pathname === item.path : location.pathname.startsWith(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl mb-1 transition-all ${
                      isActive ? 'bg-gradient-to-r from-[#191F28] to-gray-700 text-white shadow-lg' : 'text-muted-foreground hover:bg-secondary'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>{item.label}</span>
                  </Link>
                );
              })}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 lg:ml-64">
        <main className="p-4 sm:p-6 lg:p-8 lg:pt-8 pt-18">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
