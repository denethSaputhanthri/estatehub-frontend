import axios from 'axios';
import { AuthResponse, LoginPayload } from '@/types';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// ─── Request interceptor: attach JWT ────────────────────────────────────────
apiClient.interceptors.request.use(
  (config) => {
    const token =
      typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ─── Response interceptor: handle 401 ───────────────────────────────────────
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      typeof window !== 'undefined' &&
      error.response?.status === 401
    ) {
      localStorage.removeItem('token');
      localStorage.removeItem('userRole');
      localStorage.removeItem('authUser');

      document.cookie =
        'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';

      document.cookie =
        'role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';

      window.location.href = '/login';

      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;

// ─── Auth API ────────────────────────────────────────────────────────────────

export const authApi = {
  login: (request: LoginPayload) => {
    return apiClient.post<AuthResponse>('/auth/login', request);
  },
};


//   register: (data: {
//     name: string;
//     email: string;
//     password: string;
//     phone?: string;
//     role?: string;
//   }) => apiClient.post<AuthResponse>('/auth/register', data),
// };

// ─── Properties API ──────────────────────────────────────────────────────────
export const propertiesApi = {
  getAll: (params?: Record<string, unknown>) =>
    apiClient.get('/properties', { params }),
  getById: (id: number) => apiClient.get(`/properties/${id}`),
  create: (data: FormData | Record<string, unknown>) =>
    apiClient.post('/properties', data),
  update: (id: number, data: FormData | Record<string, unknown>) =>
    apiClient.put(`/properties/${id}`, data),
  delete: (id: number) => apiClient.delete(`/properties/${id}`),
  uploadImages: (id: number, formData: FormData) =>
    apiClient.post(`/properties/${id}/images`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
};

// ─── Inquiries API ───────────────────────────────────────────────────────────
export const inquiriesApi = {
  getMy: () => apiClient.get('/inquiries/my'),
  getAssigned: () => apiClient.get('/inquiries/assigned'),
  respond: (id: number, response: string) =>
    apiClient.put(`/inquiries/${id}/respond`, { response }),
};

// ─── Bookings API ────────────────────────────────────────────────────────────
export const bookingsApi = {
  create: (data: Record<string, unknown>) => apiClient.post('/bookings', data),
  updateStatus: (id: number, status: string) =>
    apiClient.put(`/bookings/${id}/status`, { status }),
  getAgentBookings: () => apiClient.get('/bookings/agent'),
};

// ─── Admin API ───────────────────────────────────────────────────────────────
export const adminApi = {
  getUsers: (params?: Record<string, unknown>) =>
    apiClient.get('/admin/users', { params }),
  updateUserStatus: (id: number, status: string) =>
    apiClient.put(`/admin/users/${id}/status`, { status }),
};

// ─── Reports API ─────────────────────────────────────────────────────────────
export const reportsApi = {
  properties: () => apiClient.get('/reports/properties'),
  sales: () => apiClient.get('/reports/sales'),
  inquiries: () => apiClient.get('/reports/inquiries'),
  agentPerformance: () => apiClient.get('/reports/agent-performance'),
};
