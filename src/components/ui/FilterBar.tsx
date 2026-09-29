'use client';

import { cn } from '@/lib/utils';
import { Search, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export interface FilterOption {
  label: string;
  value: string;
}

interface FilterSelectProps {
  label: string;
  options: FilterOption[];
  value: string;
  onChange: (value: string) => void;
}

function FilterSelect({ label, options, value, onChange }: FilterSelectProps) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none bg-white border border-gray-100 text-sm text-gray-700 font-medium
          pl-3 pr-8 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-200
          cursor-pointer hover:border-gray-200 transition-colors min-w-[120px]"
        aria-label={label}
      >
        <option value="">{label}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <ChevronDown
        size={14}
        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
      />
    </div>
  );
}

export interface FilterBarFilters {
  district?: string;
  type?: string;
  status?: string;
  cost?: string;
  search?: string;
}

interface FilterBarProps {
  filters: FilterBarFilters;
  onFilterChange: (filters: FilterBarFilters) => void;
  districtOptions?: FilterOption[];
  typeOptions?: FilterOption[];
  statusOptions?: FilterOption[];
  costOptions?: FilterOption[];
  className?: string;
}

const DEFAULT_TYPE_OPTIONS: FilterOption[] = [
  { label: 'House', value: 'HOUSE' },
  { label: 'Apartment', value: 'APARTMENT' },
  { label: 'Villa', value: 'VILLA' },
  { label: 'Commercial', value: 'COMMERCIAL' },
  { label: 'Land', value: 'LAND' },
];

const DEFAULT_STATUS_OPTIONS: FilterOption[] = [
  { label: 'Available', value: 'AVAILABLE' },
  { label: 'Pending', value: 'PENDING' },
  { label: 'Sold', value: 'SOLD' },
  { label: 'Rented', value: 'RENTED' },
];

const DEFAULT_COST_OPTIONS: FilterOption[] = [
  { label: 'Under $500K', value: '0-500000' },
  { label: '$500K–$1M', value: '500000-1000000' },
  { label: '$1M–$2M', value: '1000000-2000000' },
  { label: 'Over $2M', value: '2000000-' },
];

export function FilterBar({
  filters,
  onFilterChange,
  districtOptions = [],
  typeOptions = DEFAULT_TYPE_OPTIONS,
  statusOptions = DEFAULT_STATUS_OPTIONS,
  costOptions = DEFAULT_COST_OPTIONS,
  className,
}: FilterBarProps) {
  const update = (key: keyof FilterBarFilters, val: string) =>
    onFilterChange({ ...filters, [key]: val });

  return (
    <div
      className={cn(
        'flex flex-wrap items-center gap-3 bg-white rounded-2xl p-4',
        'shadow-[0_2px_16px_rgba(22,22,22,0.06)]',
        className
      )}
    >
      {districtOptions.length > 0 && (
        <FilterSelect
          label="District"
          options={districtOptions}
          value={filters.district || ''}
          onChange={(v) => update('district', v)}
        />
      )}
      <FilterSelect
        label="Type"
        options={typeOptions}
        value={filters.type || ''}
        onChange={(v) => update('type', v)}
      />
      <FilterSelect
        label="Status"
        options={statusOptions}
        value={filters.status || ''}
        onChange={(v) => update('status', v)}
      />
      <FilterSelect
        label="Price"
        options={costOptions}
        value={filters.cost || ''}
        onChange={(v) => update('cost', v)}
      />

      {/* Search */}
      <div className="relative flex-1 min-w-[180px]">
        <Search
          size={15}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          placeholder="Search properties..."
          value={filters.search || ''}
          onChange={(e) => update('search', e.target.value)}
          className="w-full pl-9 pr-4 py-2 bg-gray-50 rounded-xl text-sm border border-gray-100
            focus:outline-none focus:ring-2 focus:ring-gray-200 text-gray-700 placeholder:text-gray-400"
        />
      </div>

      {/* Sort/Filter icon button */}
      <button
        className="w-9 h-9 bg-[#161616] text-white rounded-xl flex items-center justify-center
          hover:bg-gray-800 transition-colors flex-shrink-0"
        aria-label="Advanced filters"
      >
        <SlidersHorizontal size={16} />
      </button>
    </div>
  );
}
