'use client';

import { useState } from 'react';
import { TopNav } from '@/components/layout/TopNav';
import { SectionTitle } from '@/components/layout/PageWrapper';
import { DataTable, Column } from '@/components/ui/DataTable';
import { StatusPill } from '@/components/ui/StatusPill';
import { MOCK_USERS } from '@/lib/mockData';
import { formatDate, getUser, getInitials } from '@/lib/utils';
import { User } from '@/types';
import { Search, UserPlus, Shield } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

type UserRow = User & { id: number };

const userColumns: Column<UserRow>[] = [
  {
    key: 'name',
    header: 'User',
    render: (row) => (
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 bg-[#E7B98C]/20 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-xs font-bold text-[#D4A070]">{getInitials({ name: row.name })}</span>
        </div>
        <div>
          <p className="font-semibold text-gray-800 text-sm">{row.name}</p>
          <p className="text-xs text-gray-400">{row.email}</p>
        </div>
      </div>
    ),
  },
  {
    key: 'role',
    header: 'Role',
    sortable: true,
    render: (row) => (
      <span className="inline-flex items-center gap-1 text-xs font-semibold text-gray-600 bg-gray-100 px-2.5 py-0.5 rounded-full capitalize">
        <Shield size={11} />
        {row.role.toLowerCase()}
      </span>
    ),
  },
  { key: 'phone', header: 'Phone', render: (row) => row.phone || '—' },
  {
    key: 'status',
    header: 'Status',
    render: (row) => <StatusPill status={row.status} />,
  },
  {
    key: 'createdAt',
    header: 'Joined',
    sortable: true,
    render: (row) => <span className="text-gray-400 text-xs">{formatDate(row.createdAt)}</span>,
  },
  {
    key: 'id',
    header: 'Action',
    render: (row) => (
      <button
        className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-colors ${row.status === 'ACTIVE'
            ? 'bg-rose-50 text-rose-600 hover:bg-rose-100'
            : 'bg-green-50 text-green-600 hover:bg-green-100'
          }`}
        onClick={() => alert(`Toggle status for user ${row.id} — connect to PUT /admin/users/${row.id}/status`)}
      >
        {row.status === 'ACTIVE' ? 'Disable' : 'Enable'}
      </button>
    ),
  },
];

export default function AdminUsersPage() {
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
  const [search, setSearch] = useState('');

  const filtered = MOCK_USERS.filter((u) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || u.role.toLowerCase().includes(q);
  });

  return (
    <div className="min-h-screen bg-[#F6F4F1]">
      <TopNav user={user} role={user.role} />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-8 space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-black text-[#161616]">Manage Users</h1>
            <p className="text-sm text-gray-400 mt-0.5">{MOCK_USERS.length} registered users</p>
          </div>
          <button className="flex items-center gap-2 bg-[#161616] text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-gray-800 transition-colors">
            <UserPlus size={16} /> Invite User
          </button>
        </div>

        {/* Search */}
        <div className="bg-white rounded-2xl p-4 shadow-[0_2px_16px_rgba(22,22,22,0.06)] flex items-center gap-3">
          <Search size={16} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, email, or role..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 text-sm focus:outline-none text-gray-700 placeholder:text-gray-300"
          />
        </div>

        {/* Summary pills */}
        <div className="flex flex-wrap gap-3">
          {['ALL', 'ADMIN', 'AGENT', 'SELLER', 'CUSTOMER'].map((role) => {
            const count = role === 'ALL' ? MOCK_USERS.length : MOCK_USERS.filter((u) => u.role === role).length;
            return (
              <button
                key={role}
                className="flex items-center gap-1.5 bg-white text-xs font-semibold text-gray-600 px-4 py-2 rounded-full shadow-sm hover:shadow-md transition-all"
              >
                <span className="text-gray-400">{role === 'ALL' ? 'All' : role.charAt(0) + role.slice(1).toLowerCase()}</span>
                <span className="bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded-full text-xs">{count}</span>
              </button>
            );
          })}
        </div>

        <DataTable
          data={filtered as unknown as Record<string, unknown>[]}
          columns={userColumns as Column<Record<string, unknown>>[]}
          keyField="id"
          pageSize={8}
          emptyMessage="No users found."
        />
      </div>
    </div>
  );
}
