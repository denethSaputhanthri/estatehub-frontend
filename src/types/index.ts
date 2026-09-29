// ─── Auth ────────────────────────────────────────────────────────────────────
export type UserRole = 'ADMIN' | 'AGENT' | 'SELLER' | 'CUSTOMER';

export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  status: 'ACTIVE' | 'DISABLED';
  createdAt: string;
  avatarUrl?: string;
}

export interface AuthResponse {
  token: string;
  tokenType: string;
  userId: number;
  name: string;
  email: string;
  role: UserRole;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  phone?: string;
  role?: UserRole;
}

export interface AuthenticatedUser {  
  userId:number;
  name: string
  email: string
  role: UserRole
  token:string
}

// ─── Property ────────────────────────────────────────────────────────────────
export type PropertyType = 'HOUSE' | 'APARTMENT' | 'VILLA' | 'COMMERCIAL' | 'LAND';
export type PropertyStatus = 'AVAILABLE' | 'PENDING' | 'SOLD' | 'RENTED';
export type ListingType = 'FOR_SALE' | 'FOR_RENT';

export interface PropertyImage {
  id: number;
  url: string;
  isPrimary: boolean;
}

export interface Property {
  id: number;
  title: string;
  description: string;
  type: PropertyType;
  status: PropertyStatus;
  listingType: ListingType;
  price: number;
  address: string;
  city: string;
  district: string;
  latitude?: number;
  longitude?: number;
  bedrooms: number;
  bathrooms: number;
  garages: number;
  areaM2: number;
  views: number;
  rating: number;
  images: PropertyImage[];
  agentId?: number;
  agentName?: string;
  sellerId?: number;
  sellerName?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PropertyFilters {
  location?: string;
  type?: PropertyType;
  status?: PropertyStatus;
  listingType?: ListingType;
  district?: string;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  size?: number;
}

export interface PagedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}

// ─── Inquiry ─────────────────────────────────────────────────────────────────
export type InquiryStatus = 'OPEN' | 'IN_PROGRESS' | 'RESPONDED' | 'CLOSED';

export interface Inquiry {
  id: number;
  propertyId: number;
  propertyTitle: string;
  propertyAddress: string;
  customerId: number;
  customerName: string;
  customerEmail: string;
  agentId?: number;
  agentName?: string;
  message: string;
  response?: string;
  status: InquiryStatus;
  createdAt: string;
  respondedAt?: string;
}

// ─── Booking ─────────────────────────────────────────────────────────────────
export type BookingStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';

export interface Booking {
  id: number;
  propertyId: number;
  propertyTitle: string;
  propertyAddress: string;
  customerId: number;
  customerName: string;
  agentId?: number;
  agentName?: string;
  scheduledAt: string;
  status: BookingStatus;
  notes?: string;
  createdAt: string;
}

// ─── Reports ─────────────────────────────────────────────────────────────────
export interface SalesReport {
  month: string;
  totalSales: number;
  totalRevenue: number;
  averageSaleValue: number;
}

export interface PropertyReport {
  type: PropertyType;
  count: number;
  availableCount: number;
  soldCount: number;
  rentedCount: number;
}

export interface InquiryReport {
  month: string;
  totalInquiries: number;
  openInquiries: number;
  respondedInquiries: number;
  responseRate: number;
}

export interface AgentPerformance {
  agentId: number;
  agentName: string;
  totalDeals: number;
  totalRevenue: number;
  averageRating: number;
  activeListings: number;
}

export interface DashboardStats {
  totalRevenue: number;
  revenueGrowth: number;
  propertiesSold: number;
  soldRevenue: number;
  propertiesRented: number;
  rentRevenue: number;
  averageSaleValue: number;
  completedDeals: number;
  dealsGrowth: number;
  activeListings: number;
  totalUsers: number;
}
