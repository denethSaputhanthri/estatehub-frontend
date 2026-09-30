'use client';

import { useState } from 'react';
import { TopNav } from '@/components/layout/TopNav';
import { SectionTitle } from '@/components/layout/PageWrapper';
import { PropertyCard } from '@/components/ui/PropertyCard';
import { FilterBar, FilterBarFilters } from '@/components/ui/FilterBar';
import { MOCK_PROPERTIES } from '@/lib/mockData';
import Link from 'next/link';
import { Plus, Grid3X3, List } from 'lucide-react';
import { DataTable, Column } from '@/components/ui/DataTable';
import { StatusPill } from '@/components/ui/StatusPill';
import { formatCurrency } from '@/lib/utils';
import { Property } from '@/types';
import { useAuth } from '@/contexts/AuthContext';

type PropertyRow = {
  id: number;
  title: string;
  address: string;
  imageUrl: string;
  type: string;
  status: string;
  listingType: string;
  price: number;
  agentName: string;
  views: number;
};

const columns: Column<PropertyRow>[] = [
  {
    key: 'title',
    header: 'Property',
    render: (row) => (
      <div className="flex items-center gap-3">
        <img src={row.imageUrl} alt={row.title} className="w-11 h-11 rounded-xl object-cover flex-shrink-0" />
        <div>
          <p className="font-semibold text-gray-800 text-sm">{row.title}</p>
          <p className="text-xs text-gray-400 truncate max-w-[180px]">{row.address}</p>
        </div>
      </div>
    ),
  },
  { key: 'type', header: 'Type', sortable: true },
  { key: 'listingType', header: 'Listing', render: (row) => <StatusPill status={row.listingType} /> },
  { key: 'price', header: 'Price', sortable: true, render: (row) => <span className="font-semibold">{formatCurrency(row.price)}</span> },
  { key: 'status', header: 'Status', render: (row) => <StatusPill status={row.status} /> },
  {
    key: 'id',
    header: 'Action',
    render: (row) => (
      <div className="flex items-center gap-2">
        <Link href={`/admin/properties/${row.id}/edit`} className="text-xs font-semibold text-gray-500 hover:text-gray-700 px-3 py-1.5 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
          Edit
        </Link>
        <Link href={`/properties/${row.id}`} className="text-xs font-semibold text-gray-500 hover:text-gray-700 px-3 py-1.5 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
          View
        </Link>
      </div>
    ),
  },
];

export default function AdminPropertiesPage() {
  const { user, loading } = useAuth();
  const [filters, setFilters] = useState<FilterBarFilters>({});
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
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
  


  const filtered = MOCK_PROPERTIES.filter((p) => {
    if (filters.type && p.type !== filters.type) return false;
    if (filters.status && p.status !== filters.status) return false;
    if (filters.search) {
      const q = filters.search.toLowerCase();
      return p.title.toLowerCase().includes(q) || p.address.toLowerCase().includes(q);
    }
    return true;
  });

  const tableData: PropertyRow[] = filtered.map((p) => ({
    id: p.id,
    title: p.title,
    address: p.address,
    imageUrl: p.images[0]?.url || '',
    type: p.type.charAt(0) + p.type.slice(1).toLowerCase(),
    status: p.status,
    listingType: p.listingType,
    price: p.price,
    agentName: p.agentName || '—',
    views: p.views,
  }));

  return (
    <div className="min-h-screen bg-[#F6F4F1]">
      <TopNav user={user} role={user.role} />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-8 space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-black text-[#161616]">Manage Properties</h1>
            <p className="text-sm text-gray-400 mt-0.5">{MOCK_PROPERTIES.length} total listings</p>
          </div>
          <div className="flex items-center gap-3">
            {/* View toggle */}
            <div className="flex items-center bg-white rounded-xl shadow-sm p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${viewMode === 'grid' ? 'bg-[#161616] text-white' : 'text-gray-400 hover:text-gray-700'}`}
              >
                <Grid3X3 size={15} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${viewMode === 'list' ? 'bg-[#161616] text-white' : 'text-gray-400 hover:text-gray-700'}`}
              >
                <List size={15} />
              </button>
            </div>
            <Link
              href="/admin/properties/new"
              className="flex items-center gap-2 bg-[#161616] text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-gray-800 transition-colors"
            >
              <Plus size={16} /> Add Property
            </Link>
          </div>
        </div>

        <FilterBar filters={filters} onFilterChange={setFilters} />

        {viewMode === 'grid' ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
            {filtered.length === 0 && (
              <div className="col-span-3 py-16 text-center text-gray-400">No properties match your filters.</div>
            )}
          </div>
        ) : (
          <DataTable
            data={tableData as unknown as Record<string, unknown>[]}
            columns={columns as Column<Record<string, unknown>>[]}
            keyField="id"
          />
        )}
      </div>
    </div>
  );
}
