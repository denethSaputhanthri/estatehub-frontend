'use client';

import { useState } from 'react';
import { TopNav } from '@/components/layout/TopNav';
import { DataTable, Column } from '@/components/ui/DataTable';
import { StatusPill } from '@/components/ui/StatusPill';
import { MOCK_INQUIRIES } from '@/lib/mockData';
import { formatRelative} from '@/lib/utils';
import { MessageSquare, Send, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Inquiry } from '@/types';

interface RespondModalProps {
  inquiry: Inquiry;
  onClose: () => void;
  onSend: (id: number, response: string) => void;
}

function RespondModal({ inquiry, onClose, onSend }: RespondModalProps) {
  const [response, setResponse] = useState('');

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-[20px] shadow-2xl w-full max-w-lg animate-scale-in">
        <div className="p-6 border-b border-gray-50">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-[#161616]">Respond to Inquiry</h3>
            <button onClick={onClose} className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors">
              <X size={15} />
            </button>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-xs text-gray-400 font-medium mb-1">Customer: {inquiry.customerName}</p>
            <p className="text-sm text-gray-700">{inquiry.message}</p>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Your Response</label>
            <textarea
              rows={5}
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              placeholder="Type your professional response here..."
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-200 resize-none"
            />
          </div>
        </div>
        <div className="p-6 pt-0 flex items-center justify-end gap-3">
          <button onClick={onClose} className="px-5 py-2.5 border border-gray-200 text-gray-600 text-sm font-semibold rounded-full hover:bg-gray-50 transition-colors">
            Cancel
          </button>
          <button
            onClick={() => { onSend(inquiry.id, response); onClose(); }}
            disabled={!response.trim()}
            className="flex items-center gap-2 bg-[#161616] text-white text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-gray-800 transition-colors disabled:opacity-50"
          >
            <Send size={14} /> Send Response
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AgentInquiriesPage() {
  const { user, loading } = useAuth();
  const [inquiries, setInquiries] = useState(MOCK_INQUIRIES);
  const [responding, setResponding] = useState<Inquiry | null>(null);

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

  const handleSend = (id: number, response: string) => {
    setInquiries((prev) =>
      prev.map((i) => i.id === id ? { ...i, status: 'RESPONDED' as const, response, respondedAt: new Date().toISOString() } : i)
    );
  };

  const columns: Column<Inquiry>[] = [
    {
      key: 'customerName',
      header: 'Customer',
      render: (row) => (
        <div>
          <p className="font-semibold text-gray-800 text-sm">{row.customerName}</p>
          <p className="text-xs text-gray-400">{row.customerEmail}</p>
        </div>
      ),
    },
    {
      key: 'propertyTitle',
      header: 'Property',
      render: (row) => (
        <div>
          <p className="font-medium text-gray-700 text-sm">{row.propertyTitle}</p>
          <p className="text-xs text-gray-400 truncate max-w-[140px]">{row.propertyAddress}</p>
        </div>
      ),
    },
    { key: 'message', header: 'Inquiry', render: (row) => <p className="text-sm text-gray-600 max-w-[200px] truncate">{row.message}</p> },
    { key: 'status', header: 'Status', render: (row) => <StatusPill status={row.status} /> },
    { key: 'createdAt', header: 'Received', render: (row) => <span className="text-xs text-gray-400">{formatRelative(row.createdAt)}</span> },
    {
      key: 'id',
      header: 'Action',
      render: (row) =>
        row.status !== 'RESPONDED' ? (
          <button
            onClick={() => setResponding(row)}
            className="flex items-center gap-1.5 bg-[#161616] text-white text-xs font-semibold px-4 py-2 rounded-full hover:bg-gray-800 transition-colors"
          >
            <MessageSquare size={12} /> Respond
          </button>
        ) : (
          <span className="text-xs text-green-600 font-semibold">✓ Responded</span>
        ),
    },
  ];

  return (
    <div className="min-h-screen bg-[#F6F4F1]">
      <TopNav user={user} role={user.role} />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-8 space-y-6">
        <div>
          <h1 className="text-2xl font-black text-[#161616]">Assigned Inquiries</h1>
          <p className="text-sm text-gray-400 mt-0.5">Customer inquiries assigned to you</p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Open', count: inquiries.filter((i) => i.status === 'OPEN').length, bg: 'bg-blue-50 text-blue-700' },
            { label: 'In Progress', count: inquiries.filter((i) => i.status === 'IN_PROGRESS').length, bg: 'bg-amber-50 text-amber-700' },
            { label: 'Responded', count: inquiries.filter((i) => i.status === 'RESPONDED').length, bg: 'bg-green-50 text-green-700' },
          ].map((s) => (
            <div key={s.label} className={`rounded-2xl p-4 ${s.bg}`}>
              <p className="text-2xl font-black">{s.count}</p>
              <p className="text-xs font-semibold">{s.label}</p>
            </div>
          ))}
        </div>

        <DataTable
          data={inquiries}
          columns={columns}
          keyField="id"
        />
      </div>

      {responding && (
        <RespondModal
          inquiry={responding}
          onClose={() => setResponding(null)}
          onSend={handleSend}
        />
      )}
    </div>
  );
}
