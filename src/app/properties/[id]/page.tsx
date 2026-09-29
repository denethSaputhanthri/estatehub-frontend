'use client';

import { useState } from 'react';
import Link from 'next/link';
import { use } from 'react';
import { MOCK_PROPERTIES } from '@/lib/mockData';
import { formatCurrency, formatDate } from '@/lib/utils';
import { StatusPill } from '@/components/ui/StatusPill';
import { PropertyCard } from '@/components/ui/PropertyCard';
import {
  Building2, Heart, Share2, MapPin, BedDouble, Bath, Car, Maximize2,
  Star, ChevronLeft, ChevronRight, Send, Loader2, Phone, Mail
} from 'lucide-react';
import { inquiriesApi } from '@/lib/api';

interface Props {
  params: Promise<{ id: string }>;
}

export default function PropertyDetailPage({ params }: Props) {
  const { id } = use(params);
  const property = MOCK_PROPERTIES.find((p) => p.id === Number(id)) || MOCK_PROPERTIES[0];
  const related = MOCK_PROPERTIES.filter((p) => p.id !== property.id && p.type === property.type).slice(0, 3);

  const [currentImg, setCurrentImg] = useState(0);
  const [saved, setSaved] = useState(false);
  const [inquiry, setInquiry] = useState({ name: '', email: '', phone: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const images = property.images.length > 0 ? property.images : [
    { id: 0, url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200', isPrimary: true },
  ];

  const handleInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      // In real app: await inquiriesApi.create({ propertyId: property.id, ...inquiry })
      await new Promise((r) => setTimeout(r, 1000)); // mock delay
      setSent(true);
    } catch {
      setSent(true); // mock success anyway
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F4F1]">
      {/* Minimal nav */}
      <nav className="bg-white/80 backdrop-blur-xl border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-[#161616] rounded-lg flex items-center justify-center">
              <Building2 size={16} className="text-[#E7B98C]" />
            </div>
            <span className="font-bold text-[#161616] text-lg tracking-tight">EstateFlow</span>
          </Link>
          <Link href="/properties" className="flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-gray-800">
            <ChevronLeft size={16} /> Back to Listings
          </Link>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-[1fr_380px] gap-8">
          {/* Left — main content */}
          <div className="space-y-6">
            {/* Gallery */}
            <div className="relative rounded-[20px] overflow-hidden" style={{ height: 440 }}>
              <img
                src={images[currentImg]?.url}
                alt={property.title}
                className="w-full h-full object-cover"
              />
              {/* Nav arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={() => setCurrentImg((i) => (i === 0 ? images.length - 1 : i - 1))}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow hover:bg-white"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={() => setCurrentImg((i) => (i + 1) % images.length)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow hover:bg-white"
                  >
                    <ChevronRight size={18} />
                  </button>
                </>
              )}
              {/* Top-right actions */}
              <div className="absolute top-4 right-4 flex gap-2">
                <button
                  onClick={() => setSaved(!saved)}
                  className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow"
                >
                  <Heart size={16} className={saved ? 'fill-rose-500 text-rose-500' : 'text-gray-600'} />
                </button>
                <button className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow">
                  <Share2 size={16} className="text-gray-600" />
                </button>
              </div>
              {/* Status pills */}
              <div className="absolute bottom-4 left-4 flex gap-2">
                <StatusPill status={property.listingType} size="md" />
                <StatusPill status={property.status} size="md" />
              </div>
              {/* Thumbnail strip */}
              {images.length > 1 && (
                <div className="absolute bottom-4 right-4 flex gap-1.5">
                  {images.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentImg(i)}
                      className={`w-2 h-2 rounded-full transition-all ${i === currentImg ? 'bg-white w-5' : 'bg-white/50'}`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Title & address */}
            <div className="bg-white rounded-[20px] p-6 shadow-[0_2px_16px_rgba(22,22,22,0.06)]">
              <div className="flex items-start justify-between flex-wrap gap-4">
                <div>
                  <h1 className="text-2xl font-black text-[#161616] mb-1">{property.title}</h1>
                  <p className="flex items-center gap-1.5 text-gray-400 text-sm">
                    <MapPin size={14} /> {property.address}, {property.city}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <Star size={14} className="fill-amber-400 text-amber-400" />
                    <span className="font-semibold text-gray-700">{property.rating}</span>
                    <span className="text-gray-300">·</span>
                    <span className="text-gray-400 text-sm">{property.views.toLocaleString()} views</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-black text-[#161616]">
                    {formatCurrency(property.price)}
                    {property.listingType === 'FOR_RENT' && (
                      <span className="text-base font-normal text-gray-400">/mo</span>
                    )}
                  </p>
                  <p className="text-sm text-gray-400 mt-0.5">Listed {formatDate(property.createdAt)}</p>
                </div>
              </div>

              {/* Feature icons */}
              <div className="mt-5 pt-5 border-t border-gray-50 grid grid-cols-4 gap-4">
                {property.bedrooms > 0 && (
                  <div className="text-center">
                    <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center mx-auto mb-1.5">
                      <BedDouble size={18} className="text-gray-500" />
                    </div>
                    <p className="font-bold text-[#161616]">{property.bedrooms}</p>
                    <p className="text-xs text-gray-400">Bedrooms</p>
                  </div>
                )}
                <div className="text-center">
                  <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center mx-auto mb-1.5">
                    <Bath size={18} className="text-gray-500" />
                  </div>
                  <p className="font-bold text-[#161616]">{property.bathrooms}</p>
                  <p className="text-xs text-gray-400">Bathrooms</p>
                </div>
                {property.garages > 0 && (
                  <div className="text-center">
                    <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center mx-auto mb-1.5">
                      <Car size={18} className="text-gray-500" />
                    </div>
                    <p className="font-bold text-[#161616]">{property.garages}</p>
                    <p className="text-xs text-gray-400">Garages</p>
                  </div>
                )}
                <div className="text-center">
                  <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center mx-auto mb-1.5">
                    <Maximize2 size={18} className="text-gray-500" />
                  </div>
                  <p className="font-bold text-[#161616]">{property.areaM2}</p>
                  <p className="text-xs text-gray-400">m²</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-[20px] p-6 shadow-[0_2px_16px_rgba(22,22,22,0.06)]">
              <h2 className="font-bold text-[#161616] mb-3">About This Property</h2>
              <p className="text-gray-500 leading-relaxed">{property.description}</p>
            </div>

            {/* Related */}
            {related.length > 0 && (
              <div>
                <h2 className="font-bold text-[#161616] mb-4">Similar Properties</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {related.map((p) => (
                    <PropertyCard key={p.id} property={p} compact />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right — sticky panel */}
          <div className="space-y-5 lg:sticky lg:top-24 self-start">
            {/* Agent card */}
            <div className="bg-white rounded-[20px] p-6 shadow-[0_2px_16px_rgba(22,22,22,0.06)]">
              <h3 className="font-bold text-[#161616] mb-4">Listed By</h3>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-[#E7B98C]/20 rounded-full flex items-center justify-center">
                  <span className="font-bold text-[#D4A070]">
                    {property.agentName?.split(' ').map((n) => n[0]).join('') || 'A'}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{property.agentName || 'EstateFlow Agent'}</p>
                  <p className="text-xs text-gray-400">Licensed Real Estate Agent</p>
                </div>
              </div>
              <div className="space-y-2">
                <button className="w-full flex items-center justify-center gap-2 bg-gray-50 text-gray-700 text-sm font-semibold py-2.5 rounded-xl hover:bg-gray-100 transition-colors">
                  <Phone size={15} /> Call Agent
                </button>
                <button className="w-full flex items-center justify-center gap-2 bg-gray-50 text-gray-700 text-sm font-semibold py-2.5 rounded-xl hover:bg-gray-100 transition-colors">
                  <Mail size={15} /> Email Agent
                </button>
              </div>
            </div>

            {/* Inquiry form */}
            <div className="bg-white rounded-[20px] p-6 shadow-[0_2px_16px_rgba(22,22,22,0.06)]">
              <h3 className="font-bold text-[#161616] mb-4">Send an Inquiry</h3>

              {sent ? (
                <div className="py-8 text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">✓</span>
                  </div>
                  <p className="font-bold text-[#161616] mb-1">Inquiry Sent!</p>
                  <p className="text-sm text-gray-400">The agent will respond within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleInquiry} className="space-y-3">
                  <input
                    required
                    type="text"
                    placeholder="Your name"
                    value={inquiry.name}
                    onChange={(e) => setInquiry((p) => ({ ...p, name: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-gray-100 bg-gray-50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
                  />
                  <input
                    required
                    type="email"
                    placeholder="Email address"
                    value={inquiry.email}
                    onChange={(e) => setInquiry((p) => ({ ...p, email: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-gray-100 bg-gray-50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
                  />
                  <input
                    type="tel"
                    placeholder="Phone (optional)"
                    value={inquiry.phone}
                    onChange={(e) => setInquiry((p) => ({ ...p, phone: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-gray-100 bg-gray-50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
                  />
                  <textarea
                    required
                    rows={4}
                    placeholder={`I'm interested in ${property.title}. Please contact me with more details.`}
                    value={inquiry.message}
                    onChange={(e) => setInquiry((p) => ({ ...p, message: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-gray-100 bg-gray-50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-200 resize-none"
                  />
                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full flex items-center justify-center gap-2 bg-[#161616] text-white font-semibold py-3 rounded-full hover:bg-gray-800 transition-colors disabled:opacity-60"
                  >
                    {sending ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                    {sending ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
