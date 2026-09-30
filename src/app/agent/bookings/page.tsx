'use client';

import { useState } from 'react';
import { TopNav } from '@/components/layout/TopNav';
import { DataTable, Column } from '@/components/ui/DataTable';
import { StatusPill } from '@/components/ui/StatusPill';
import { MOCK_BOOKINGS } from '@/lib/mockData';
import { formatDate, formatRelative} from '@/lib/utils';
import { Booking, BookingStatus } from '@/types';
import { CalendarDays, Clock, MapPin } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const STATUS_ACTIONS: Record<string, { next: BookingStatus; label: string; style: string }> = {
  PENDING: { next: 'CONFIRMED', label: 'Confirm', style: 'bg-green-50 text-green-700 hover:bg-green-100' },
  CONFIRMED: { next: 'COMPLETED', label: 'Complete', style: 'bg-blue-50 text-blue-700 hover:bg-blue-100' },
};

export default function AgentBookingsPage() {
  const { user, loading } = useAuth();
  const [bookings, setBookings] = useState(MOCK_BOOKINGS);

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


  const updateStatus = (id: number, status: BookingStatus) => {
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));
  };

  const columns: Column<Booking>[] = [
    {
      key: 'propertyTitle',
      header: 'Property',
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-[#E7B98C]/20 rounded-xl flex items-center justify-center flex-shrink-0">
            <MapPin size={15} className="text-[#D4A070]" />
          </div>
          <div>
            <p className="font-semibold text-gray-800 text-sm">{row.propertyTitle}</p>
            <p className="text-xs text-gray-400 truncate max-w-[150px]">{row.propertyAddress}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'customerName',
      header: 'Client',
      render: (row) => (
        <div>
          <p className="font-medium text-gray-800 text-sm">{row.customerName}</p>
        </div>
      ),
    },
    {
      key: 'scheduledAt',
      header: 'Scheduled',
      sortable: true,
      render: (row) => (
        <div className="flex items-center gap-1.5 text-sm text-gray-600">
          <CalendarDays size={14} className="text-gray-400" />
          {new Date(row.scheduledAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          {' '}
          <Clock size={12} className="text-gray-300" />
          {new Date(row.scheduledAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
        </div>
      ),
    },
    { key: 'status', header: 'Status', render: (row) => <StatusPill status={row.status} /> },
    {
      key: 'notes',
      header: 'Notes',
      render: (row) => (
        <span className="text-xs text-gray-400">{row.notes || '—'}</span>
      ),
    },
    {
      key: 'id',
      header: 'Action',
      render: (row) => {
        const action = STATUS_ACTIONS[row.status];
        if (!action) return <span className="text-xs text-gray-300">—</span>;
        return (
          <button
            onClick={() => updateStatus(row.id, action.next)}
            className={`text-xs font-semibold px-4 py-1.5 rounded-full transition-colors ${action.style}`}
          >
            {action.label}
          </button>
        );
      },
    },
  ];

  const pending = bookings.filter((b) => b.status === 'PENDING').length;
  const confirmed = bookings.filter((b) => b.status === 'CONFIRMED').length;
  const completed = bookings.filter((b) => b.status === 'COMPLETED').length;

  return (
    <div className="min-h-screen bg-[#F6F4F1]">
      <TopNav user={user} role={user.role} />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-8 space-y-6">
        <div>
          <h1 className="text-2xl font-black text-[#161616]">Bookings</h1>
          <p className="text-sm text-gray-400 mt-0.5">Manage your property viewing appointments</p>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
          {[
            { label: 'Total', count: bookings.length, bg: 'bg-white text-gray-700' },
            { label: 'Pending', count: pending, bg: 'bg-amber-50 text-amber-700' },
            { label: 'Confirmed', count: confirmed, bg: 'bg-green-50 text-green-700' },
            { label: 'Completed', count: completed, bg: 'bg-blue-50 text-blue-700' },
          ].map((s) => (
            <div key={s.label} className={`rounded-2xl p-4 shadow-sm ${s.bg}`}>
              <p className="text-2xl font-black">{s.count}</p>
              <p className="text-xs font-semibold">{s.label}</p>
            </div>
          ))}
        </div>

        <DataTable
          data={bookings}
          columns={columns}
          keyField="id"
        />
      </div>
    </div>
  );
}
