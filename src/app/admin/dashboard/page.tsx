'use client';

import { useEffect, useState } from 'react';
import { TopNav } from '@/components/layout/TopNav';
import { PageWrapper, SectionTitle } from '@/components/layout/PageWrapper';
import { StatCard } from '@/components/ui/StatCard';
import { PropertyCard } from '@/components/ui/PropertyCard';
import { FilterBar, FilterBarFilters } from '@/components/ui/FilterBar';
import { DataTable, Column } from '@/components/ui/DataTable';
import { StatusPill } from '@/components/ui/StatusPill';
import {
  MOCK_DASHBOARD_STATS,
  MOCK_SALES_CHART,
  MOCK_PROPERTIES,
} from '@/lib/mockData';
import {
  DollarSign,
  TrendingUp,
  Building2,
  Users,
  Heart,
  Expand,
  MoreHorizontal,
  BedDouble,
  Bath,
  Car,
  Maximize2,
  MapPin,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';
import { formatCurrency, formatNumber } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import { cn } from '@/lib/utils';

// Mock featured property
const FEATURED_PROPERTY = MOCK_PROPERTIES[1]; // Lakeside Villa

function HeroCard() {
  const [saved, setSaved] = useState(false);
  const soldPct = Math.round(
    (MOCK_DASHBOARD_STATS.soldRevenue /
      (MOCK_DASHBOARD_STATS.soldRevenue + MOCK_DASHBOARD_STATS.rentRevenue)) *
    100
  );

  return (
    <div className="grid lg:grid-cols-2 gap-5">
      {/* Metrics card */}
      <div className="bg-white rounded-[20px] p-7 shadow-[0_2px_16px_rgba(22,22,22,0.06)]">
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-6">
          Revenue Breakdown
        </h3>
        <div className="space-y-5">
          <div>
            <p className="text-xs text-gray-400 font-medium mb-1">Properties Sold</p>
            <p className="text-3xl font-black text-[#161616]">
              {formatCurrency(MOCK_DASHBOARD_STATS.soldRevenue)}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              {MOCK_DASHBOARD_STATS.propertiesSold} properties
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-400 font-medium mb-1">Properties Rented</p>
            <p className="text-3xl font-black text-[#161616]">
              {formatCurrency(MOCK_DASHBOARD_STATS.rentRevenue)}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              {MOCK_DASHBOARD_STATS.propertiesRented} properties
            </p>
          </div>
        </div>

        {/* Two-segment progress bar */}
        <div className="mt-6">
          <div className="flex rounded-full overflow-hidden h-3 bg-gray-100">
            <div
              className="h-full bg-[#161616] transition-all duration-700"
              style={{ width: `${soldPct}%` }}
            />
            <div
              className="h-full bg-[#E7B98C] transition-all duration-700"
              style={{ width: `${100 - soldPct}%` }}
            />
          </div>
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#161616]" />
              <span className="text-xs text-gray-500">
                Sold ({soldPct}%)
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E7B98C]" />
              <span className="text-xs text-gray-500">
                Rented ({100 - soldPct}%)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Featured property hero image */}
      <div className="relative rounded-[20px] overflow-hidden shadow-[0_2px_16px_rgba(22,22,22,0.06)]" style={{ minHeight: 280 }}>
        <img
          src={FEATURED_PROPERTY.images[0]?.url || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200'}
          alt={FEATURED_PROPERTY.title}
          className="w-full h-full object-cover absolute inset-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        {/* Top-right icons */}
        <div className="absolute top-4 right-4 flex gap-2">
          <button
            onClick={() => setSaved(!saved)}
            className="w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow hover:bg-white transition-colors"
          >
            <Heart
              size={16}
              className={saved ? 'fill-rose-500 text-rose-500' : 'text-gray-600'}
            />
          </button>
          <Link
            href={`/properties/${FEATURED_PROPERTY.id}`}
            className="w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow hover:bg-white transition-colors"
          >
            <Expand size={16} className="text-gray-600" />
          </Link>
        </div>
        {/* Bottom info */}
        <div className="absolute bottom-5 left-5 right-5">
          <div className="flex items-center gap-2 mb-2">
            <StatusPill status={FEATURED_PROPERTY.listingType} />
            <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-2 py-0.5 rounded-full">
              ★ {FEATURED_PROPERTY.rating}
            </span>
          </div>
          <h3 className="text-white font-bold text-lg leading-snug">{FEATURED_PROPERTY.title}</h3>
          <p className="text-white/70 text-sm flex items-center gap-1 mt-1">
            <MapPin size={12} /> {FEATURED_PROPERTY.address}
          </p>
          <p className="text-white font-black text-2xl mt-2">
            {formatCurrency(FEATURED_PROPERTY.price)}
          </p>
        </div>
      </div>
    </div>
  );
}

// Property table row type
interface PropertyRow {
  id: number;
  title: string;
  address: string;
  imageUrl: string;
  type: string;
  agentName: string;
  price: number;
  views: number;
  status: string;
}

const propertyColumns: Column<PropertyRow>[] = [
  {
    key: 'title',
    header: 'Property',
    render: (row) => (
      <div className="flex items-center gap-3">
        <img
          src={row.imageUrl}
          alt={row.title}
          className="w-11 h-11 rounded-xl object-cover flex-shrink-0"
        />
        <div>
          <p className="font-semibold text-gray-800 text-sm">{row.title}</p>
          <p className="text-xs text-gray-400 truncate max-w-[180px]">{row.address}</p>
        </div>
      </div>
    ),
  },
  { key: 'type', header: 'Type', sortable: true },
  { key: 'agentName', header: 'Agent', sortable: true },
  {
    key: 'price',
    header: 'Price',
    sortable: true,
    render: (row) => (
      <span className="font-semibold">{formatCurrency(row.price)}</span>
    ),
  },
  {
    key: 'views',
    header: 'Views',
    sortable: true,
    render: (row) => formatNumber(row.views),
  },
  {
    key: 'status',
    header: 'Status',
    render: (row) => <StatusPill status={row.status} />,
  },
  {
    key: 'id',
    header: 'Action',
    render: (row) => (
      <Link
        href={`/admin/properties/${row.id}`}
        className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
      >
        <MoreHorizontal size={15} className="text-gray-600" />
      </Link>
    ),
  },
];

// Static map placeholder component
function MapPlaceholder() {
  const neighborhoods = [
    { name: 'Downtown', x: 42, y: 35, price: '$1.2M', active: true },
    { name: 'Midtown', x: 62, y: 55, price: '$850K' },
    { name: 'Northshore', x: 30, y: 20, price: '$2.1M', active: true },
    { name: 'Heritage', x: 70, y: 75, price: '$950K' },
    { name: 'Central', x: 50, y: 65, price: '$680K' },
  ];

  return (
    <div className="bg-white rounded-[20px] p-5 shadow-[0_2px_16px_rgba(22,22,22,0.06)] h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-[#161616]">Property Map</h3>
        <span className="text-xs text-gray-400">Price by neighborhood</span>
      </div>
      <div
        className="relative rounded-xl overflow-hidden bg-gradient-to-br from-[#e8f4e8] via-[#d4e8d4] to-[#c8dcc8]"
        style={{ height: 320 }}
      >
        {/* Fake map grid */}
        <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#333" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
        {/* "Roads" */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <line x1="0%" y1="50%" x2="100%" y2="50%" stroke="#fff" strokeWidth="6" opacity="0.4" />
          <line x1="50%" y1="0%" x2="50%" y2="100%" stroke="#fff" strokeWidth="6" opacity="0.4" />
          <line x1="0%" y1="30%" x2="100%" y2="70%" stroke="#fff" strokeWidth="3" opacity="0.25" />
          <line x1="30%" y1="0%" x2="70%" y2="100%" stroke="#fff" strokeWidth="3" opacity="0.25" />
        </svg>
        {/* Price bubbles */}
        {neighborhoods.map((n) => (
          <div
            key={n.name}
            className="absolute flex flex-col items-center"
            style={{
              left: `${n.x}%`,
              top: `${n.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div
              className={cn(
                'px-3 py-1.5 rounded-full text-xs font-bold shadow-lg cursor-pointer',
                'hover:scale-110 transition-transform',
                n.active
                  ? 'bg-[#161616] text-white'
                  : 'bg-white text-gray-700 border border-gray-200'
              )}
            >
              {n.price}
            </div>
            <div
              className={cn(
                'w-2 h-2 rounded-full mt-1',
                n.active ? 'bg-[#161616]' : 'bg-gray-400'
              )}
            />
            <span className="text-[10px] text-gray-600 font-medium mt-0.5">{n.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AdminDashboardPage() {
  const { user, loading } = useAuth();
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

  const [filters, setFilters] = useState<FilterBarFilters>({});

  // Filter and transform properties for the table
  const tableData: PropertyRow[] = MOCK_PROPERTIES.filter((p) => {
    if (filters.type && p.type !== filters.type) return false;
    if (filters.status && p.status !== filters.status) return false;
    if (filters.search) {
      const q = filters.search.toLowerCase();
      if (!p.title.toLowerCase().includes(q) && !p.address.toLowerCase().includes(q)) return false;
    }
    return true;
  }).map((p) => ({
    id: p.id,
    title: p.title,
    address: p.address,
    imageUrl: p.images[0]?.url || '',
    type: p.type.charAt(0) + p.type.slice(1).toLowerCase(),
    agentName: p.agentName || '—',
    price: p.price,
    views: p.views,
    status: p.status,
  }));

  const sparklineData = MOCK_SALES_CHART.slice(-6).map((d) => ({
    month: d.month,
    revenue: d.totalRevenue,
    deals: d.totalSales,
  }));

  return (
    <div className="min-h-screen bg-[#F6F4F1]">
      <TopNav user={user} role={user.role} />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Page heading */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-[#161616]">Dashboard</h1>
            <p className="text-sm text-gray-400 mt-0.5">
              Welcome back, {user.name.split(' ')[0]} 👋
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-400 bg-white px-3 py-1.5 rounded-full shadow-sm">
            <span className="w-2 h-2 bg-green-500 rounded-full" />
            Live data · Mock mode
          </div>
        </div>

        {/* Hero row */}
        <HeroCard />

        {/* Stats row */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Total Revenue */}
          <StatCard
            title="Total Revenue"
            value={MOCK_DASHBOARD_STATS.totalRevenue}
            isCurrency
            growth={MOCK_DASHBOARD_STATS.revenueGrowth}
            icon={<DollarSign size={20} className="text-gray-500" />}
            footer={
              <div className="h-16">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={sparklineData}>
                    <defs>
                      <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#161616" stopOpacity={0.15} />
                        <stop offset="95%" stopColor="#161616" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="#161616"
                      strokeWidth={2}
                      fill="url(#revGrad)"
                      dot={false}
                    />
                    <Tooltip
                      formatter={(v: number) => formatCurrency(v)}
                      contentStyle={{
                        background: '#fff',
                        border: 'none',
                        borderRadius: 12,
                        fontSize: 12,
                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                      }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            }
          />

          {/* Average Sale Value */}
          <StatCard
            title="Avg. Sale Value"
            value={MOCK_DASHBOARD_STATS.averageSaleValue}
            isCurrency
            growth={5.2}
            icon={<TrendingUp size={20} className="text-gray-500" />}
            footer={
              <div className="space-y-1.5 mt-1">
                {[
                  { label: 'Apartments', pct: 68, change: '+3.2%' },
                  { label: 'Villas', pct: 85, change: '+7.8%' },
                  { label: 'Commercial', pct: 52, change: '-1.1%' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2">
                    <span className="text-xs text-gray-400 w-20">{item.label}</span>
                    <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#E7B98C] rounded-full"
                        style={{ width: `${item.pct}%` }}
                      />
                    </div>
                    <span
                      className={`text-xs font-semibold ${item.change.startsWith('+') ? 'text-green-600' : 'text-rose-500'
                        }`}
                    >
                      {item.change}
                    </span>
                  </div>
                ))}
              </div>
            }
          />

          {/* Completed Deals */}
          <StatCard
            title="Completed Deals"
            value={MOCK_DASHBOARD_STATS.completedDeals}
            growth={MOCK_DASHBOARD_STATS.dealsGrowth}
            growthLabel="this month"
            icon={<Building2 size={20} className="text-gray-500" />}
            footer={
              <div className="h-16">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={sparklineData} barSize={6}>
                    <Bar dataKey="deals" fill="#161616" radius={[3, 3, 0, 0]} />
                    <Tooltip
                      formatter={(v: number) => [v, 'Deals']}
                      contentStyle={{
                        background: '#fff',
                        border: 'none',
                        borderRadius: 12,
                        fontSize: 12,
                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                      }}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            }
          />
        </div>

        {/* Property cards strip */}
        <div>
          <SectionTitle
            title="Featured Listings"
            subtitle="Latest property objects"
            action={
              <Link
                href="/admin/properties"
                className="text-sm font-semibold text-gray-500 hover:text-gray-700 transition-colors"
              >
                View all →
              </Link>
            }
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {MOCK_PROPERTIES.slice(0, 3).map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        </div>

        {/* Filter bar + table + map */}
        <div>
          <SectionTitle title="All Properties" subtitle="Manage your portfolio" />
          <FilterBar filters={filters} onFilterChange={setFilters} className="mb-4" />

          <div className="grid lg:grid-cols-[1fr_380px] gap-5">
            <DataTable
              data={tableData as Record<string, unknown>[]}
              columns={propertyColumns as Column<Record<string, unknown>>[]}
              keyField="id"
              pageSize={6}
            />
            <MapPlaceholder />
          </div>
        </div>
      </div>
    </div>
  );
}
