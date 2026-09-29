'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PropertyCard } from '@/components/ui/PropertyCard';
import { FilterBar, FilterBarFilters } from '@/components/ui/FilterBar';
import { MOCK_PROPERTIES } from '@/lib/mockData';
import { Building2, ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';

const DISTRICT_OPTIONS = [
  { label: 'Downtown', value: 'Downtown' },
  { label: 'Midtown', value: 'Midtown' },
  { label: 'Northshore', value: 'Northshore' },
  { label: 'Heritage Quarter', value: 'Heritage Quarter' },
  { label: 'Central Business', value: 'Central Business' },
  { label: 'Beachfront', value: 'Beachfront' },
];

export default function PropertiesPage() {
  const [filters, setFilters] = useState<FilterBarFilters>({});

  const filtered = MOCK_PROPERTIES.filter((p) => {
    if (filters.type && p.type !== filters.type) return false;
    if (filters.status && p.status !== filters.status) return false;
    if (filters.district && p.district !== filters.district) return false;
    if (filters.search) {
      const q = filters.search.toLowerCase();
      return (
        p.title.toLowerCase().includes(q) ||
        p.address.toLowerCase().includes(q) ||
        p.city.toLowerCase().includes(q)
      );
    }
    if (filters.cost) {
      const [minStr, maxStr] = filters.cost.split('-');
      const min = Number(minStr);
      const max = maxStr ? Number(maxStr) : Infinity;
      if (p.price < min || p.price > max) return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-[#F6F4F1]">
      {/* Simple nav */}
      <nav className="bg-white/80 backdrop-blur-xl border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-[#161616] rounded-lg flex items-center justify-center">
              <Building2 size={16} className="text-[#E7B98C]" />
            </div>
            <span className="font-bold text-[#161616] text-lg tracking-tight">EstateFlow</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors">Sign In</Link>
            <Link href="/register" className="bg-[#161616] text-white text-sm font-medium px-5 py-2 rounded-full hover:bg-gray-800 transition-colors">Get Started</Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-black text-[#161616]">Property Listings</h1>
          <p className="text-gray-400 mt-1">
            {filtered.length} {filtered.length === 1 ? 'property' : 'properties'} available
          </p>
        </div>

        {/* Filter bar */}
        <FilterBar
          filters={filters}
          onFilterChange={setFilters}
          districtOptions={DISTRICT_OPTIONS}
          className="mb-6"
        />

        {/* Listing type tabs */}
        <div className="flex items-center gap-2 mb-6">
          {['ALL', 'FOR_SALE', 'FOR_RENT'].map((type) => (
            <button
              key={type}
              onClick={() => {
                // Quick listing type filter
                setFilters((prev) => ({ ...prev, search: prev.search }));
              }}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
                type === 'ALL'
                  ? 'bg-[#161616] text-white'
                  : 'bg-white text-gray-500 hover:bg-gray-100'
              }`}
            >
              {type === 'ALL' ? 'All' : type === 'FOR_SALE' ? 'For Sale' : 'For Rent'}
            </button>
          ))}
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        ) : (
          <div className="py-24 text-center">
            <Building2 size={48} className="text-gray-200 mx-auto mb-4" />
            <p className="text-xl font-bold text-gray-400">No properties found</p>
            <p className="text-sm text-gray-300 mt-1">Try adjusting your filters</p>
            <button
              onClick={() => setFilters({})}
              className="mt-4 text-sm font-semibold text-[#161616] hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
