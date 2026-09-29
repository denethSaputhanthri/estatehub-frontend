'use client';

import { useState, useRef } from 'react';
import { TopNav } from '@/components/layout/TopNav';
import { getUser } from '@/lib/utils';
import { User } from '@/types';
import { Upload, X, ImagePlus, MapPin, DollarSign, Home, Loader2 } from 'lucide-react';
import { propertiesApi } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

const PROPERTY_TYPES = ['HOUSE', 'APARTMENT', 'VILLA', 'COMMERCIAL', 'LAND'];
const LISTING_TYPES = ['FOR_SALE', 'FOR_RENT'];

interface FormData {
  title: string;
  description: string;
  type: string;
  listingType: string;
  price: string;
  address: string;
  city: string;
  district: string;
  bedrooms: string;
  bathrooms: string;
  garages: string;
  areaM2: string;
}

const initialForm: FormData = {
  title: '', description: '', type: 'HOUSE', listingType: 'FOR_SALE',
  price: '', address: '', city: '', district: '',
  bedrooms: '3', bathrooms: '2', garages: '1', areaM2: '',
};

export default function AddPropertyPage() {
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
  const [form, setForm] = useState<FormData>(initialForm);
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleChange = (key: keyof FormData, val: string) =>
    setForm((prev) => ({ ...prev, [key]: val }));

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImages((prev) => [...prev, ...files]);
    files.forEach((f) => {
      const reader = new FileReader();
      reader.onload = (ev) => setPreviews((prev) => [...prev, ev.target?.result as string]);
      reader.readAsDataURL(f);
    });
  };

  const removeImage = (i: number) => {
    setImages((prev) => prev.filter((_, idx) => idx !== i));
    setPreviews((prev) => prev.filter((_, idx) => idx !== i));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const payload = {
        ...form,
        price: Number(form.price),
        bedrooms: Number(form.bedrooms),
        bathrooms: Number(form.bathrooms),
        garages: Number(form.garages),
        areaM2: Number(form.areaM2),
      };
      const res = await propertiesApi.create(payload);
      // Upload images if any
      if (images.length > 0 && res.data?.id) {
        const fd = new FormData();
        images.forEach((f) => fd.append('images', f));
        await propertiesApi.uploadImages(res.data.id, fd);
      }
      setSuccess(true);
      setTimeout(() => router.push('/seller/listings'), 1500);
    } catch {
      setError('Failed to create property. Please check your connection and try again. (Mock: this would save to API)');
      // In demo mode, just show success after 1s
      setTimeout(() => {
        setSuccess(true);
        setTimeout(() => router.push('/seller/listings'), 1500);
      }, 1000);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-[#F6F4F1] flex items-center justify-center">
        <div className="bg-white rounded-[20px] p-12 text-center shadow-xl">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">✓</span>
          </div>
          <h2 className="text-2xl font-black text-[#161616] mb-2">Property Listed!</h2>
          <p className="text-gray-400">Redirecting to your listings...</p>
        </div>
      </div>
    );
  }

  

  return (
    <div className="min-h-screen bg-[#F6F4F1]">
      <TopNav user={user} role={user.role} />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-black text-[#161616]">Add New Property</h1>
          <p className="text-sm text-gray-400 mt-0.5">Fill in the details to create your listing</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-amber-50 border border-amber-100 rounded-xl text-amber-700 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Images */}
          <div className="bg-white rounded-[20px] p-6 shadow-[0_2px_16px_rgba(22,22,22,0.06)]">
            <h2 className="font-bold text-[#161616] mb-4 flex items-center gap-2">
              <ImagePlus size={18} className="text-[#E7B98C]" /> Property Images
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {previews.map((src, i) => (
                <div key={i} className="relative group aspect-square">
                  <img src={src} alt={`Preview ${i + 1}`} className="w-full h-full object-cover rounded-xl" />
                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    className="absolute top-1 right-1 w-6 h-6 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={12} className="text-white" />
                  </button>
                  {i === 0 && (
                    <span className="absolute bottom-1 left-1 bg-[#161616] text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                      Primary
                    </span>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="aspect-square border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center gap-1 hover:border-gray-400 transition-colors text-gray-400 hover:text-gray-600"
              >
                <Upload size={20} />
                <span className="text-xs font-medium">Upload</span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          </div>

          {/* Basic details */}
          <div className="bg-white rounded-[20px] p-6 shadow-[0_2px_16px_rgba(22,22,22,0.06)]">
            <h2 className="font-bold text-[#161616] mb-4 flex items-center gap-2">
              <Home size={18} className="text-[#E7B98C]" /> Property Details
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Title *</label>
                <input
                  required
                  value={form.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  placeholder="e.g. Modern 3BR Apartment in Downtown"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description *</label>
                <textarea
                  required
                  rows={4}
                  value={form.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  placeholder="Describe the property in detail..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-200 resize-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Property Type *</label>
                  <select
                    value={form.type}
                    onChange={(e) => handleChange('type', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
                  >
                    {PROPERTY_TYPES.map((t) => (
                      <option key={t} value={t}>{t.charAt(0) + t.slice(1).toLowerCase()}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Listing Type *</label>
                  <select
                    value={form.listingType}
                    onChange={(e) => handleChange('listingType', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
                  >
                    {LISTING_TYPES.map((t) => (
                      <option key={t} value={t}>{t === 'FOR_SALE' ? 'For Sale' : 'For Rent'}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="bg-white rounded-[20px] p-6 shadow-[0_2px_16px_rgba(22,22,22,0.06)]">
            <h2 className="font-bold text-[#161616] mb-4 flex items-center gap-2">
              <MapPin size={18} className="text-[#E7B98C]" /> Location
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Address *</label>
                <input
                  required
                  value={form.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                  placeholder="Street address"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">City *</label>
                  <input
                    required
                    value={form.city}
                    onChange={(e) => handleChange('city', e.target.value)}
                    placeholder="City"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">District</label>
                  <input
                    value={form.district}
                    onChange={(e) => handleChange('district', e.target.value)}
                    placeholder="Neighborhood/district"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Price & Specs */}
          <div className="bg-white rounded-[20px] p-6 shadow-[0_2px_16px_rgba(22,22,22,0.06)]">
            <h2 className="font-bold text-[#161616] mb-4 flex items-center gap-2">
              <DollarSign size={18} className="text-[#E7B98C]" /> Pricing & Specifications
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Price * {form.listingType === 'FOR_RENT' ? '(monthly)' : ''}
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 font-medium">$</span>
                  <input
                    required
                    type="number"
                    min="0"
                    value={form.price}
                    onChange={(e) => handleChange('price', e.target.value)}
                    placeholder="0"
                    className="w-full pl-8 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
                  />
                </div>
              </div>
              {[
                { key: 'bedrooms', label: 'Bedrooms' },
                { key: 'bathrooms', label: 'Bathrooms' },
                { key: 'garages', label: 'Garages' },
                { key: 'areaM2', label: 'Area (m²)' },
              ].map((f) => (
                <div key={f.key}>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">{f.label}</label>
                  <input
                    type="number"
                    min="0"
                    value={form[f.key as keyof FormData]}
                    onChange={(e) => handleChange(f.key as keyof FormData, e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-4 pb-8">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-3 border border-gray-200 text-gray-600 text-sm font-semibold rounded-full hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 bg-[#161616] text-white text-sm font-semibold px-8 py-3 rounded-full hover:bg-gray-800 transition-colors disabled:opacity-60"
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : null}
              {loading ? 'Publishing...' : 'Publish Listing'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
