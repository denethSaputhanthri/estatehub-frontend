'use client';

import { cn, formatCurrency, formatNumber } from '@/lib/utils';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { ReactNode } from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  isCurrency?: boolean;
  growth?: number;
  growthLabel?: string;
  icon?: ReactNode;
  iconBg?: string;
  footer?: ReactNode;
  className?: string;
}

export function StatCard({
  title,
  value,
  isCurrency = false,
  growth,
  growthLabel = 'vs last month',
  icon,
  iconBg = 'bg-gray-100',
  footer,
  className,
}: StatCardProps) {
  const displayValue =
    typeof value === 'number'
      ? isCurrency
        ? formatCurrency(value)
        : formatNumber(value)
      : value;

  const isPositive = growth !== undefined && growth > 0;
  const isNegative = growth !== undefined && growth < 0;

  return (
    <div
      className={cn(
        'bg-white rounded-[20px] p-6 shadow-[0_2px_16px_rgba(22,22,22,0.06)]',
        'transition-all duration-200 hover:shadow-[0_8px_32px_rgba(22,22,22,0.10)]',
        'animate-fade-in',
        className
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
          <p className="text-3xl font-bold text-[#161616] tracking-tight leading-none">
            {displayValue}
          </p>
        </div>
        {icon && (
          <div className={cn('w-11 h-11 rounded-xl flex items-center justify-center', iconBg)}>
            {icon}
          </div>
        )}
      </div>

      {growth !== undefined && (
        <div className="flex items-center gap-1.5 mb-3">
          <span
            className={cn(
              'inline-flex items-center gap-0.5 text-xs font-semibold px-2 py-0.5 rounded-full',
              isPositive && 'bg-green-100 text-green-700',
              isNegative && 'bg-rose-100 text-rose-700',
              !isPositive && !isNegative && 'bg-gray-100 text-gray-600'
            )}
          >
            {isPositive ? (
              <TrendingUp size={11} />
            ) : isNegative ? (
              <TrendingDown size={11} />
            ) : (
              <Minus size={11} />
            )}
            {Math.abs(growth)}%
          </span>
          <span className="text-xs text-gray-400">{growthLabel}</span>
        </div>
      )}

      {footer && <div className="mt-2">{footer}</div>}
    </div>
  );
}
