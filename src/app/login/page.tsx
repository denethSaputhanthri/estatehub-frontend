'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Building2, Eye, EyeOff, ArrowRight, Loader2 } from 'lucide-react';
import { getRoleDashboard } from '@/lib/auth';



export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, user } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const authenticatedUser = await login({ email, password });
      const dashboard = getRoleDashboard(authenticatedUser.role);
      router.push(dashboard);
      
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { message?: string } } };
      setError(
        axiosErr?.response?.data?.message ||
          'Invalid credentials. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F4F1] flex">
      {/* Left panel — image */}
      <div className="hidden lg:flex flex-col justify-between w-2/5 bg-[#161616] p-12 relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200"
          alt="Featured property"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="relative z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center">
              <Building2 size={18} className="text-[#E7B98C]" />
            </div>
            <span className="font-bold text-white text-xl tracking-tight">EstateFlow</span>
          </div>
        </div>
        <div className="relative z-10">
          <blockquote className="text-white/80 text-lg leading-relaxed font-light mb-4">
            "The platform that transformed how we manage and sell premium real estate."
          </blockquote>
          <p className="text-white/60 text-sm">Sarah Mitchell, Senior Agent</p>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md animate-fade-in">
          <div className="mb-10">
            {/* Mobile logo */}
            <div className="flex items-center gap-2 mb-8 lg:hidden">
              <div className="w-8 h-8 bg-[#161616] rounded-lg flex items-center justify-center">
                <Building2 size={16} className="text-[#E7B98C]" />
              </div>
              <span className="font-bold text-[#161616] text-lg">EstateFlow</span>
            </div>
            <h1 className="text-3xl font-black text-[#161616] mb-2">Welcome back</h1>
            <p className="text-gray-400">Sign in to your EstateFlow account</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-rose-50 border border-rose-100 rounded-xl text-rose-700 text-sm font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email address
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm
                  focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent
                  placeholder:text-gray-300 transition-all"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPw ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 bg-white border border-gray-200 rounded-xl text-sm
                    focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent
                    placeholder:text-gray-300 transition-all"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  aria-label={showPw ? 'Hide password' : 'Show password'}
                >
                  {showPw ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-[#161616] text-white
                font-semibold py-3.5 rounded-full hover:bg-gray-800 transition-all
                disabled:opacity-60 disabled:cursor-not-allowed"
              id="login-submit"
            >
              {loading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <>
                  Sign In <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-400">
            Don't have an account?{' '}
            <Link href="/register" className="text-[#161616] font-semibold hover:underline">
              Create account
            </Link>
          </p>

          {/* Demo credentials hint */}
          <div className="mt-6 p-4 bg-amber-50 border border-amber-100 rounded-xl">
            <p className="text-xs font-semibold text-amber-800 mb-1">Demo Credentials</p>
            <p className="text-xs text-amber-700">Email: admin@estateflow.com</p>
            <p className="text-xs text-amber-700">Password: any value (mock mode)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
