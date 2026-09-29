'use client';

import { cn } from '@/lib/utils';

type StatusType =
  | 'AVAILABLE'
  | 'PENDING'
  | 'SOLD'
  | 'RENTED'
  | 'ACTIVE'
  | 'DISABLED'
  | 'OPEN'
  | 'IN_PROGRESS'
  | 'RESPONDED'
  | 'CLOSED'
  | 'CONFIRMED'
  | 'CANCELLED'
  | 'COMPLETED'
  | 'FOR_SALE'
  | 'FOR_RENT';

const STATUS_CONFIG: Record<
  StatusType,
  { label: string; className: string }
> = {
  AVAILABLE: { label: 'Available', className: 'bg-green-100 text-green-700' },
  ACTIVE: { label: 'Active', className: 'bg-green-100 text-green-700' },
  RESPONDED: { label: 'Responded', className: 'bg-green-100 text-green-700' },
  CONFIRMED: { label: 'Confirmed', className: 'bg-green-100 text-green-700' },
  COMPLETED: { label: 'Completed', className: 'bg-green-100 text-green-700' },
  PENDING: { label: 'Pending', className: 'bg-amber-100 text-amber-700' },
  IN_PROGRESS: { label: 'In Progress', className: 'bg-amber-100 text-amber-700' },
  OPEN: { label: 'Open', className: 'bg-blue-100 text-blue-700' },
  SOLD: { label: 'Sold', className: 'bg-rose-100 text-rose-700' },
  DISABLED: { label: 'Disabled', className: 'bg-rose-100 text-rose-700' },
  CLOSED: { label: 'Closed', className: 'bg-gray-100 text-gray-600' },
  CANCELLED: { label: 'Cancelled', className: 'bg-rose-100 text-rose-700' },
  RENTED: { label: 'Rented', className: 'bg-purple-100 text-purple-700' },
  FOR_SALE: { label: 'For Sale', className: 'bg-sky-100 text-sky-700' },
  FOR_RENT: { label: 'For Rent', className: 'bg-indigo-100 text-indigo-700' },
};

interface StatusPillProps {
  status: StatusType | string;
  className?: string;
  size?: 'sm' | 'md';
}

export function StatusPill({ status, className, size = 'sm' }: StatusPillProps) {
  const config = STATUS_CONFIG[status as StatusType] ?? {
    label: status,
    className: 'bg-gray-100 text-gray-600',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-semibold',
        size === 'sm' ? 'px-2.5 py-0.5 text-xs' : 'px-3 py-1 text-sm',
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
}
