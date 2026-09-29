'use client';

import { TopNav } from '@/components/layout/TopNav';
import { DataTable, Column } from '@/components/ui/DataTable';
import { StatusPill } from '@/components/ui/StatusPill';
import { useAuth } from '@/contexts/AuthContext';
import { MOCK_INQUIRIES } from '@/lib/mockData';
import { formatDate, formatRelative, getUser } from '@/lib/utils';
import { User, Inquiry } from '@/types';
import { MessageSquare, Building2 } from 'lucide-react';

type InquiryRow = Inquiry;

const customerColumns: Column<InquiryRow>[] = [
  {
    key: 'propertyTitle',
    header: 'Property',
    render: (row) => (
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 bg-[#E7B98C]/20 rounded-xl flex items-center justify-center flex-shrink-0">
          <Building2 size={16} className="text-[#D4A070]" />
        </div>
        <div>
          <p className="font-semibold text-gray-800 text-sm">{row.propertyTitle}</p>
          <p className="text-xs text-gray-400 truncate max-w-[160px]">{row.propertyAddress}</p>
        </div>
      </div>
    ),
  },
  {
    key: 'message',
    header: 'Your Message',
    render: (row) => (
      <p className="text-sm text-gray-600 max-w-[220px] truncate">{row.message}</p>
    ),
  },
  {
    key: 'agentName',
    header: 'Agent',
    render: (row) => row.agentName || <span className="text-gray-300">Unassigned</span>,
  },
  {
    key: 'status',
    header: 'Status',
    render: (row) => <StatusPill status={row.status} />,
  },
  {
    key: 'createdAt',
    header: 'Sent',
    render: (row) => <span className="text-xs text-gray-400">{formatRelative(row.createdAt)}</span>,
  },
  {
    key: 'response',
    header: 'Response',
    render: (row) =>
      row.response ? (
        <p className="text-xs text-gray-600 max-w-[200px] truncate">{row.response}</p>
      ) : (
        <span className="text-xs text-gray-300 italic">Awaiting response</span>
      ),
  },
];

export default function CustomerInquiriesPage() {
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

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-8 space-y-6">
        <div>
          <h1 className="text-2xl font-black text-[#161616]">My Inquiries</h1>
          <p className="text-sm text-gray-400 mt-0.5">Track your property inquiries and agent responses</p>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Total Sent', count: MOCK_INQUIRIES.length, color: 'bg-gray-50 text-gray-700' },
            { label: 'Open', count: 0, color: 'bg-blue-50 text-blue-700' },
            { label: 'In Progress', count: 1, color: 'bg-amber-50 text-amber-700' },
            { label: 'Responded', count: 1, color: 'bg-green-50 text-green-700' },
          ].map((s) => (
            <div key={s.label} className={`rounded-2xl p-4 ${s.color}`}>
              <p className="text-2xl font-black">{s.count}</p>
              <p className="text-xs font-semibold mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        <DataTable
          data={MOCK_INQUIRIES as unknown as Record<string, unknown>[]}
          columns={customerColumns as unknown as Column<Record<string, unknown>>[]}
          keyField="id"
          emptyMessage="You haven't sent any inquiries yet."
        />
      </div>
    </div>
  );
}
