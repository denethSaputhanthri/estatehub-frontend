import { AuthenticatedUser, UserRole } from '@/types';

const TOKEN_KEY = 'token';
const ROLE_KEY = 'userRole';
const USER_KEY = 'authUser';

export function getToken(): string | null {
  if (typeof window === 'undefined') {
    return null;
  }

  return localStorage.getItem('token');
}

export function getUserRole(): UserRole | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const role = localStorage.getItem('userRole');

  if (!role) {
    return null;
  }

  return role as UserRole;
}
export function getAuthenticatedUser(): AuthenticatedUser | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const user = localStorage.getItem(USER_KEY);

  if (!user) {
    return null;
  }

  try {
    return JSON.parse(user) as AuthenticatedUser;
  } catch {
    return null;
  }
}


export function setAuth(authenticatedUser: AuthenticatedUser): void {
  if (typeof window === 'undefined') {
    return;
  }

  localStorage.setItem('token', authenticatedUser.token);
  localStorage.setItem('userRole', authenticatedUser.role);
  localStorage.setItem(USER_KEY, JSON.stringify(authenticatedUser));
}

export function clearAuth(): void {
  if (typeof window === 'undefined') {
    return;
  }

  localStorage.removeItem('token');
  localStorage.removeItem('userRole');
  localStorage.removeItem(USER_KEY);
}

export function isAuthenticated(): boolean {
  return !!getToken();
}

export function hasRole(role: UserRole): boolean {
  const userRole = getUserRole();

  return userRole === role;
}

export function getRoleDashboard(role: UserRole): string {
  const dashboardMap: Record<UserRole, string> = {
    ADMIN: '/admin/dashboard',
    AGENT: '/agent/inquiries',
    SELLER: '/seller/listings',
    CUSTOMER: '/customer/inquiries',
  };

  return dashboardMap[role];
}