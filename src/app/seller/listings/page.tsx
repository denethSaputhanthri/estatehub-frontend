'use client';

import { TopNav } from '@/components/layout/TopNav';
import { PropertyCard } from '@/components/ui/PropertyCard';
import { FilterBar, FilterBarFilters } from '@/components/ui/FilterBar';
import { MOCK_PROPERTIES } from '@/lib/mockData';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export default function SellerListingsPage() {
   const { user, loading } = useAuth();
   const [filters, setFilters] = useState<FilterBarFilters>({});

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F6F4F1]">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }


  // Simulate seller's own properties (first 3)
  const myProperties = MOCK_PROPERTIES.slice(0, 4);

  const filtered = myProperties.filter((p) => {
    if (filters.type && p.type !== filters.type) return false;
    if (filters.status && p.status !== filters.status) return false;
    if (filters.search) {
      const q = filters.search.toLowerCase();
      return p.title.toLowerCase().includes(q) || p.address.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-[#F6F4F1]">
      <TopNav user={user} role={user.role} />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-8 space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-black text-[#161616]">My Listings</h1>
            <p className="text-sm text-gray-400 mt-0.5">{myProperties.length} properties listed</p>
          </div>
          <Link
            href="/seller/listings/new"
            className="flex items-center gap-2 bg-[#161616] text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-gray-800 transition-colors"
          >
            <Plus size={16} /> New Listing
          </Link>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Active', count: 2, color: 'text-green-700 bg-green-50' },
            { label: 'Pending', count: 1, color: 'text-amber-700 bg-amber-50' },
            { label: 'Sold', count: 1, color: 'text-rose-700 bg-rose-50' },
            { label: 'Total Views', count: '8,729', color: 'text-blue-700 bg-blue-50' },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-[16px] p-4 shadow-sm">
              <p className="text-2xl font-black text-[#161616]">{s.count}</p>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${s.color}`}>
                {s.label}
              </span>
            </div>
          ))}
        </div>

        <FilterBar filters={filters} onFilterChange={setFilters} />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filtered.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
          {filtered.length === 0 && (
            <div className="col-span-4 py-16 text-center text-gray-400">
              No properties match your filters.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
