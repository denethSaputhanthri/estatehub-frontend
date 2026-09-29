import Link from 'next/link';
import { ShieldX, ArrowLeft } from 'lucide-react';

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-[#F6F4F1] flex items-center justify-center p-6">
      <div className="bg-white rounded-[20px] p-12 text-center shadow-[0_8px_32px_rgba(22,22,22,0.12)] max-w-md w-full animate-scale-in">
        <div className="w-16 h-16 bg-rose-50 rounded-2xl flex items-center justify-center mx-auto mb-5">
          <ShieldX size={32} className="text-rose-500" />
        </div>
        <h1 className="text-2xl font-black text-[#161616] mb-2">Access Denied</h1>
        <p className="text-gray-400 mb-6 leading-relaxed">
          You don't have permission to view this page. Please log in with the correct account role.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link
            href="/login"
            className="flex items-center gap-2 bg-[#161616] text-white text-sm font-semibold px-6 py-3 rounded-full hover:bg-gray-800 transition-colors"
          >
            <ArrowLeft size={16} /> Go to Login
          </Link>
          <Link
            href="/"
            className="text-sm font-semibold text-gray-500 hover:text-gray-700 px-6 py-3 bg-gray-50 rounded-full hover:bg-gray-100 transition-colors"
          >
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}
