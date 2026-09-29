'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Building2, Eye, EyeOff, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';
import { getRoleDashboard } from '@/lib/auth';
import type { Metadata } from 'next';

const ROLE_OPTIONS = [
  { value: 'CUSTOMER', label: 'Buyer / Renter', desc: 'Looking to buy or rent property' },
  { value: 'SELLER', label: 'Property Owner', desc: 'List and sell my properties' },
  { value: 'AGENT', label: 'Real Estate Agent', desc: 'Managing client deals' },
];

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    role: 'CUSTOMER',
  });
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleChange = (key: string, val: string) =>
    setFormData((prev) => ({ ...prev, [key]: val }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      
      // Register then auto-login
      const { authApi } = await import('@/lib/api');
     // await authApi.register(formData);
      await login({ email: formData.email, password: formData.password });
      const fresh = JSON.parse(localStorage.getItem('user') || '{}');
      router.push(getRoleDashboard(fresh.role));
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { message?: string } } };
      setError(axiosErr?.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F4F1] flex">
      {/* Left panel */}
      <div className="hidden lg:flex flex-col justify-between w-2/5 bg-[#161616] p-12 relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200"
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
        <div className="relative z-10 space-y-4">
          {['Browse 10,000+ premium listings', 'Connect with top-rated agents', 'Secure and transparent deals'].map((f) => (
            <div key={f} className="flex items-center gap-3">
              <CheckCircle2 size={18} className="text-[#E7B98C] flex-shrink-0" />
              <span className="text-white/80 text-sm">{f}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md animate-fade-in">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-8 lg:hidden">
              <div className="w-8 h-8 bg-[#161616] rounded-lg flex items-center justify-center">
                <Building2 size={16} className="text-[#E7B98C]" />
              </div>
              <span className="font-bold text-[#161616] text-lg">EstateFlow</span>
            </div>
            <h1 className="text-3xl font-black text-[#161616] mb-2">Create your account</h1>
            <p className="text-gray-400">Join thousands of real estate professionals</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-rose-50 border border-rose-100 rounded-xl text-rose-700 text-sm font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Role selector */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">I am a...</label>
              <div className="grid grid-cols-3 gap-2">
                {ROLE_OPTIONS.map((r) => (
                  <button
                    key={r.value}
                    type="button"
                    onClick={() => handleChange('role', r.value)}
                    className={`p-3 rounded-xl border-2 text-left transition-all ${
                      formData.role === r.value
                        ? 'border-[#161616] bg-[#161616] text-white'
                        : 'border-gray-100 bg-white text-gray-600 hover:border-gray-200'
                    }`}
                  >
                    <p className="text-xs font-bold">{r.label}</p>
                    <p className="text-[10px] opacity-70 mt-0.5 leading-tight">{r.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">Full name</label>
              <input
                id="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm
                  focus:outline-none focus:ring-2 focus:ring-gray-200 placeholder:text-gray-300 transition-all"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label htmlFor="reg-email" className="block text-sm font-semibold text-gray-700 mb-2">Email address</label>
              <input
                id="reg-email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm
                  focus:outline-none focus:ring-2 focus:ring-gray-200 placeholder:text-gray-300 transition-all"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">Phone (optional)</label>
              <input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm
                  focus:outline-none focus:ring-2 focus:ring-gray-200 placeholder:text-gray-300 transition-all"
                placeholder="+1 555-0000"
              />
            </div>

            <div>
              <label htmlFor="reg-password" className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
              <div className="relative">
                <input
                  id="reg-password"
                  type={showPw ? 'text' : 'password'}
                  required
                  minLength={8}
                  value={formData.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  className="w-full px-4 py-3 pr-12 bg-white border border-gray-200 rounded-xl text-sm
                    focus:outline-none focus:ring-2 focus:ring-gray-200 placeholder:text-gray-300 transition-all"
                  placeholder="Min. 8 characters"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPw ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              id="register-submit"
              className="w-full flex items-center justify-center gap-2 bg-[#161616] text-white
                font-semibold py-3.5 rounded-full hover:bg-gray-800 transition-all
                disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <>
                  Create Account <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-400">
            Already have an account?{' '}
            <Link href="/login" className="text-[#161616] font-semibold hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
