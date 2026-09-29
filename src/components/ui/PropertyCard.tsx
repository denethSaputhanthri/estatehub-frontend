'use client';

import { Property } from '@/types';
import { formatCurrency } from '@/lib/utils';
import { StatusPill } from './StatusPill';
import { Heart, Expand, BedDouble, Bath, Car, Maximize2 } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface PropertyCardProps {
  property: Property;
  className?: string;
  compact?: boolean;
}

export function PropertyCard({ property, className, compact = false }: PropertyCardProps) {
  const [saved, setSaved] = useState(false);
  const primaryImage = property.images?.[0]?.url;

  return (
    <div
      className={cn(
        'bg-white rounded-[20px] overflow-hidden shadow-[0_2px_16px_rgba(22,22,22,0.06)]',
        'transition-all duration-200 hover:shadow-[0_8px_32px_rgba(22,22,22,0.12)] hover:-translate-y-1',
        'group animate-scale-in',
        className
      )}
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ height: compact ? 180 : 220 }}>
        <img
          src={primaryImage || `https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600`}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Overlay icons */}
        <div className="absolute top-3 right-3 flex gap-2">
          <button
            onClick={() => setSaved(!saved)}
            className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-colors"
            aria-label="Save property"
          >
            <Heart
              size={14}
              className={saved ? 'fill-rose-500 text-rose-500' : 'text-gray-600'}
            />
          </button>
          <Link
            href={`/properties/${property.id}`}
            className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-colors"
            aria-label="View property details"
          >
            <Expand size={14} className="text-gray-600" />
          </Link>
        </div>
        {/* Status + Rating */}
        <div className="absolute bottom-3 left-3 flex gap-2 items-center">
          <StatusPill status={property.listingType} />
          <span className="bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-semibold px-2 py-0.5 rounded-full">
            ★ {property.rating}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className={cn('p-4', compact ? 'p-3' : 'p-5')}>
        <Link href={`/properties/${property.id}`}>
          <h3 className="font-semibold text-[#161616] text-base leading-snug hover:text-gray-600 transition-colors truncate">
            {property.title}
          </h3>
        </Link>
        <p className="text-xs text-gray-400 mt-0.5 truncate">{property.address}</p>

        <div className="mt-3 flex items-center justify-between">
          <p className="text-lg font-bold text-[#161616]">
            {formatCurrency(property.price)}
            {property.listingType === 'FOR_RENT' && (
              <span className="text-xs font-normal text-gray-400">/mo</span>
            )}
          </p>
        </div>

        {/* Feature icons */}
        <div className="mt-3 pt-3 border-t border-gray-50 flex items-center gap-3 text-gray-400 text-xs">
          {property.bedrooms > 0 && (
            <span className="flex items-center gap-1">
              <BedDouble size={13} />
              {property.bedrooms}
            </span>
          )}
          <span className="flex items-center gap-1">
            <Bath size={13} />
            {property.bathrooms}
          </span>
          {property.garages > 0 && (
            <span className="flex items-center gap-1">
              <Car size={13} />
              {property.garages}
            </span>
          )}
          <span className="flex items-center gap-1 ml-auto">
            <Maximize2 size={13} />
            {property.areaM2} m²
          </span>
        </div>
      </div>
    </div>
  );
}
