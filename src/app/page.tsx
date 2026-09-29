import Link from 'next/link';
import { Building2, ArrowRight, Star, TrendingUp, Shield } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'EstateFlow — Find Your Dream Property',
  description: 'Discover premium real estate listings. Buy, sell, or rent with EstateFlow.',
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#F6F4F1]">
      {/* Nav */}
      <nav className="bg-white/80 backdrop-blur-xl border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-[#161616] rounded-lg flex items-center justify-center">
              <Building2 size={16} className="text-[#E7B98C]" />
            </div>
            <span className="font-bold text-[#161616] text-lg tracking-tight">EstateFlow</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/properties" className="text-gray-500 hover:text-gray-800 text-sm font-medium transition-colors">
              Browse Properties
            </Link>
            <Link href="/login" className="text-gray-500 hover:text-gray-800 text-sm font-medium transition-colors">
              Sign In
            </Link>
            <Link
              href="/register"
              className="bg-[#161616] text-white text-sm font-medium px-5 py-2 rounded-full hover:bg-gray-800 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-1.5 text-xs font-semibold text-gray-600 mb-6 shadow-sm border border-gray-100">
              <span className="w-2 h-2 bg-green-500 rounded-full" />
              142 Active Listings
            </div>
            <h1 className="text-5xl lg:text-6xl font-black text-[#161616] leading-[1.1] tracking-tight mb-6">
              Find Your{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E7B98C] to-[#D4A070]">
                Perfect
              </span>
              <br />
              Dream Home
            </h1>
            <p className="text-gray-500 text-lg leading-relaxed mb-8 max-w-lg">
              Discover thousands of premium properties. Whether buying, renting, or investing — 
              EstateFlow connects you to the right deal at the right price.
            </p>
            <div className="flex items-center gap-4 flex-wrap">
              <Link
                href="/properties"
                className="flex items-center gap-2 bg-[#161616] text-white font-semibold px-7 py-3.5 rounded-full hover:bg-gray-800 transition-all hover:shadow-lg"
              >
                Browse Listings <ArrowRight size={18} />
              </Link>
              <Link
                href="/register"
                className="flex items-center gap-2 bg-white text-gray-700 font-semibold px-7 py-3.5 rounded-full hover:bg-gray-50 transition-all border border-gray-200"
              >
                List a Property
              </Link>
            </div>
            {/* Stats row */}
            <div className="mt-12 flex items-center gap-8 flex-wrap">
              {[
                { label: 'Properties Listed', value: '10,000+' },
                { label: 'Deals Closed', value: '4,800+' },
                { label: 'Happy Clients', value: '12,500+' },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-bold text-[#161616]">{stat.value}</p>
                  <p className="text-xs text-gray-400 font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Hero image grid */}
          <div className="relative hidden lg:block animate-scale-in">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img
                  src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600"
                  alt="Luxury villa"
                  className="w-full h-56 object-cover rounded-3xl shadow-lg"
                />
                <img
                  src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600"
                  alt="Modern apartment"
                  className="w-full h-36 object-cover rounded-3xl shadow-lg"
                />
              </div>
              <div className="space-y-4 mt-8">
                <img
                  src="https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600"
                  alt="Townhouse"
                  className="w-full h-36 object-cover rounded-3xl shadow-lg"
                />
                <img
                  src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600"
                  alt="City penthouse"
                  className="w-full h-56 object-cover rounded-3xl shadow-lg"
                />
              </div>
            </div>
            {/* Floating card */}
            <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-xl">
              <p className="text-xs text-gray-400 font-medium mb-1">Average Sale Value</p>
              <p className="text-2xl font-black text-[#161616]">$94,118</p>
              <p className="text-xs text-green-600 font-semibold flex items-center gap-1 mt-1">
                <TrendingUp size={11} /> +12.5% this quarter
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: <Building2 size={22} className="text-[#E7B98C]" />,
              title: 'Premium Listings',
              desc: 'Curated properties from verified sellers and agencies across all neighborhoods.',
            },
            {
              icon: <Star size={22} className="text-[#E7B98C]" />,
              title: 'Expert Agents',
              desc: 'Connect with top-rated agents who know the market inside out.',
            },
            {
              icon: <Shield size={22} className="text-[#E7B98C]" />,
              title: 'Secure Transactions',
              desc: 'Verified listings, secure inquiries, and transparent pricing — no surprises.',
            },
          ].map((f) => (
            <div
              key={f.title}
              className="bg-white rounded-[20px] p-6 shadow-[0_2px_16px_rgba(22,22,22,0.06)] hover:shadow-[0_8px_32px_rgba(22,22,22,0.10)] transition-all"
            >
              <div className="w-11 h-11 bg-[#F6F4F1] rounded-xl flex items-center justify-center mb-4">
                {f.icon}
              </div>
              <h3 className="font-bold text-[#161616] mb-2">{f.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-white py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[#161616] rounded flex items-center justify-center">
              <Building2 size={12} className="text-[#E7B98C]" />
            </div>
            <span className="font-bold text-[#161616] text-sm">EstateFlow</span>
          </div>
          <p className="text-xs text-gray-400">© 2024 EstateFlow. All rights reserved. Mock placeholder data — for demonstration only.</p>
          <div className="flex items-center gap-6">
            <Link href="/properties" className="text-xs text-gray-400 hover:text-gray-600">Browse</Link>
            <Link href="/login" className="text-xs text-gray-400 hover:text-gray-600">Sign In</Link>
            <Link href="/register" className="text-xs text-gray-400 hover:text-gray-600">Register</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
