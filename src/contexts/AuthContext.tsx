'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';

import { AuthenticatedUser, LoginPayload } from '@/types';

import {
  getUserRole,
  getToken,
  getAuthenticatedUser,
  setAuth,
  clearAuth,
} from '@/lib/auth';

import { authApi } from '@/lib/api';

import { useRouter } from 'next/navigation';

interface AuthContextValue {
  user: AuthenticatedUser | null;
  token: string | null;
  loading: boolean;
  login: (data: LoginPayload) => Promise<AuthenticatedUser>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] = useState<AuthenticatedUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const storedToken = getToken();
    const storedRole = getUserRole();
    const storedUser = getAuthenticatedUser();

    if (storedToken && storedRole && storedUser) {
      setToken(storedToken);
      setUser(storedUser);
    }

    setLoading(false);
  }, []);

  const login = async (
    data: LoginPayload
  ): Promise<AuthenticatedUser> => {
    const response = await authApi.login(data);

    const authenticatedUser: AuthenticatedUser = {
      token: response.data.token,
      userId: response.data.userId,
      name: response.data.name,
      email: response.data.email,
      role: response.data.role,
    };

    setAuth(authenticatedUser);

    // Store authentication information for Next.js middleware
    document.cookie = `token=${authenticatedUser.token}; path=/; max-age=86400`;
    document.cookie = `role=${authenticatedUser.role}; path=/; max-age=86400`;

    setUser(authenticatedUser);
    setToken(authenticatedUser.token);

    return authenticatedUser;
  };

  const logout = () => {
    clearAuth();

    document.cookie =
      'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';

    document.cookie =
      'role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';

    setUser(null);
    setToken(null);

    router.push('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      'useAuth must be used within AuthProvider'
    );
  }

  return context;
}