'use client';

import { TopNav } from '@/components/layout/TopNav';
import { SectionTitle } from '@/components/layout/PageWrapper';
import { MOCK_SALES_CHART, MOCK_AGENT_PERFORMANCE, MOCK_PROPERTIES } from '@/lib/mockData';
import { formatCurrency, formatNumber, getUser } from '@/lib/utils';
import { User } from '@/types';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  CartesianGrid,
  Legend,
} from 'recharts';
import { StatCard } from '@/components/ui/StatCard';
import { DataTable, Column } from '@/components/ui/DataTable';
import { AgentPerformance } from '@/types';
import { TrendingUp, DollarSign, Building2, Users as UsersIcon } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const PIE_COLORS = ['#161616', '#E7B98C', '#6B7280', '#D1D5DB', '#374151'];

const inquiryData = [
  { month: 'Jan', total: 45, open: 12, responded: 33 },
  { month: 'Feb', total: 62, open: 18, responded: 44 },
  { month: 'Mar', total: 58, open: 15, responded: 43 },
  { month: 'Apr', total: 71, open: 20, responded: 51 },
  { month: 'May', total: 84, open: 22, responded: 62 },
  { month: 'Jun', total: 95, open: 25, responded: 70 },
];

const propertyTypeData = [
  { name: 'Apartment', value: 38 },
  { name: 'House', value: 27 },
  { name: 'Villa', value: 18 },
  { name: 'Commercial', value: 11 },
  { name: 'Land', value: 6 },
];

const agentColumns: Column<AgentPerformance>[] = [
  {
    key: 'agentName',
    header: 'Agent',
    render: (row) => (
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 bg-[#E7B98C]/20 rounded-full flex items-center justify-center">
          <span className="text-xs font-bold text-[#D4A070]">
            {row.agentName.split(' ').map((n: string) => n[0]).join('')}
          </span>
        </div>
        <span className="font-medium text-gray-800">{row.agentName}</span>
      </div>
    ),
  },
  { key: 'totalDeals', header: 'Deals', sortable: true },
  {
    key: 'totalRevenue',
    header: 'Revenue',
    sortable: true,
    render: (row) => <span className="font-semibold">{formatCurrency(row.totalRevenue)}</span>,
  },
  {
    key: 'averageRating',
    header: 'Rating',
    sortable: true,
    render: (row) => (
      <span className="flex items-center gap-1 font-semibold">
        ★ {row.averageRating}
      </span>
    ),
  },
  { key: 'activeListings', header: 'Active Listings', sortable: true },
];

export default function AdminReportsPage() {
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

  return (
    <div className="min-h-screen bg-[#F6F4F1]">
      <TopNav user={user} role={user.role} />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-8 space-y-8">
        <div>
          <h1 className="text-2xl font-black text-[#161616]">Reports & Analytics</h1>
          <p className="text-sm text-gray-400 mt-0.5">Platform performance overview</p>
        </div>

        {/* Summary stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <StatCard title="Total Revenue" value={4850000} isCurrency growth={12.5} icon={<DollarSign size={20} className="text-gray-500" />} />
          <StatCard title="Properties Sold" value={34} growth={8.3} icon={<Building2 size={20} className="text-gray-500" />} />
          <StatCard title="Active Agents" value={12} growth={2.1} icon={<UsersIcon size={20} className="text-gray-500" />} />
          <StatCard title="Avg. Sale Value" value={94118} isCurrency growth={5.2} icon={<TrendingUp size={20} className="text-gray-500" />} />
        </div>

        {/* Sales + Inquiries */}
        <div className="grid lg:grid-cols-2 gap-5">
          {/* Sales chart */}
          <div className="bg-white rounded-[20px] p-6 shadow-[0_2px_16px_rgba(22,22,22,0.06)]">
            <SectionTitle title="Sales Revenue" subtitle="Monthly trend" />
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={MOCK_SALES_CHART}>
                <defs>
                  <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#161616" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#161616" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`} />
                <Tooltip formatter={(v: number) => formatCurrency(v)} contentStyle={{ background: '#fff', border: 'none', borderRadius: 12, fontSize: 12, boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
                <Area type="monotone" dataKey="totalRevenue" stroke="#161616" strokeWidth={2} fill="url(#salesGrad)" name="Revenue" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Inquiries chart */}
          <div className="bg-white rounded-[20px] p-6 shadow-[0_2px_16px_rgba(22,22,22,0.06)]">
            <SectionTitle title="Inquiry Volume" subtitle="Open vs Responded" />
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={inquiryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: '#fff', border: 'none', borderRadius: 12, fontSize: 12, boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
                <Legend iconType="circle" iconSize={8} />
                <Line type="monotone" dataKey="total" stroke="#161616" strokeWidth={2} dot={false} name="Total" />
                <Line type="monotone" dataKey="responded" stroke="#E7B98C" strokeWidth={2} dot={false} name="Responded" />
                <Line type="monotone" dataKey="open" stroke="#D1D5DB" strokeWidth={2} dot={false} name="Open" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Property type + Deals bar */}
        <div className="grid lg:grid-cols-[360px_1fr] gap-5">
          {/* Property type pie */}
          <div className="bg-white rounded-[20px] p-6 shadow-[0_2px_16px_rgba(22,22,22,0.06)]">
            <SectionTitle title="Property Types" subtitle="Distribution by type" />
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={propertyTypeData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} innerRadius={45}>
                  {propertyTypeData.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: '#fff', border: 'none', borderRadius: 12, fontSize: 12, boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
                <Legend iconType="circle" iconSize={8} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Deals by month bar */}
          <div className="bg-white rounded-[20px] p-6 shadow-[0_2px_16px_rgba(22,22,22,0.06)]">
            <SectionTitle title="Deals Closed" subtitle="Monthly completed transactions" />
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={MOCK_SALES_CHART} barSize={16}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: '#fff', border: 'none', borderRadius: 12, fontSize: 12, boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
                <Bar dataKey="totalSales" fill="#161616" radius={[4, 4, 0, 0]} name="Deals" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Agent performance table */}
        <div>
          <SectionTitle title="Agent Performance" subtitle="Top performing agents this quarter" />
          <DataTable
            data={MOCK_AGENT_PERFORMANCE as unknown as Record<string, unknown>[]}
            columns={agentColumns as Column<Record<string, unknown>>[]}
            keyField="agentId"
          />
        </div>
      </div>
    </div>
  );
}
