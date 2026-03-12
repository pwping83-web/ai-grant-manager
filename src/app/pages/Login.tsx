import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router';
import { motion } from 'motion/react';
import { Sparkles, Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export function Login() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirect') || '/dashboard';

  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    if (!email.trim() || !password.trim()) {
      setError('이메일과 비밀번호를 입력해 주세요.');
      return;
    }
    if (password.length < 6) {
      setError('비밀번호는 6자 이상이어야 합니다.');
      return;
    }

    setLoading(true);
    try {
      if (mode === 'signup') {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email: email.trim(),
          password,
        });
        if (signUpError) throw signUpError;
        if (data.user && !data.session) {
          setSuccessMsg('가입 확인 이메일을 발송했습니다. 이메일의 링크를 클릭해 주세요.');
        } else {
          navigate(redirectTo);
        }
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });
        if (signInError) throw signInError;
        navigate(redirectTo);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="p-4 sm:p-6">
        <Link to="/" className="inline-flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="text-foreground" style={{ fontSize: '1rem', fontWeight: 600 }}>지원금 AI 매니저</span>
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="bg-white border border-border rounded-2xl p-6 sm:p-8 shadow-lg shadow-black/5">
            <h1 style={{ fontSize: '1.5rem', fontWeight: 700 }} className="mb-2">
              {mode === 'login' ? '로그인' : '회원가입'}
            </h1>
            <p className="text-muted-foreground mb-6" style={{ fontSize: '0.875rem' }}>
              {mode === 'login'
                ? '이메일과 비밀번호로 로그인해 주세요.'
                : '지원금 맞춤 조회와 AI 작성 서비스를 이용하세요.'}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">이메일</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@email.com"
                    className="w-full pl-10 pr-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    style={{ fontSize: '0.9375rem' }}
                    autoComplete="email"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">비밀번호</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={mode === 'signup' ? '6자 이상' : '비밀번호'}
                    className="w-full pl-10 pr-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    style={{ fontSize: '0.9375rem' }}
                    autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
                  />
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-100 rounded-xl text-red-700" style={{ fontSize: '0.8125rem' }}>
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {error}
                </div>
              )}

              {successMsg && (
                <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-100 rounded-xl text-green-700" style={{ fontSize: '0.8125rem' }}>
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {successMsg}
                </div>
              )}

              <motion.button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-primary to-blue-600 text-white rounded-xl font-semibold disabled:opacity-50 transition-all"
                style={{ fontSize: '0.9375rem' }}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                {loading ? '처리 중...' : mode === 'login' ? '로그인' : '회원가입'}
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </form>

            <p className="mt-6 text-center text-muted-foreground" style={{ fontSize: '0.8125rem' }}>
              {mode === 'login' ? (
                <>
                  계정이 없으신가요?{' '}
                  <button
                    type="button"
                    onClick={() => { setMode('signup'); setError(''); setSuccessMsg(''); }}
                    className="text-primary font-medium hover:underline"
                  >
                    회원가입
                  </button>
                </>
              ) : (
                <>
                  이미 계정이 있으신가요?{' '}
                  <button
                    type="button"
                    onClick={() => { setMode('login'); setError(''); setSuccessMsg(''); }}
                    className="text-primary font-medium hover:underline"
                  >
                    로그인
                  </button>
                </>
              )}
            </p>
          </div>

          <p className="mt-6 text-center">
            <Link to="/" className="text-muted-foreground hover:text-foreground" style={{ fontSize: '0.8125rem' }}>
              ← 홈으로
            </Link>
          </p>
        </motion.div>
      </main>
    </div>
  );
}
