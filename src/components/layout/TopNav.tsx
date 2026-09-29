'use client';

import { cn, getInitial } from '@/lib/utils';
import { AuthenticatedUser, UserRole } from '@/types';
import Link from 'next/link';
import { usePathname,} from 'next/navigation';
import {
  LayoutDashboard,
  Building2,
  CalendarDays,
  MessageSquare,
  Users,
  BarChart3,
  LogOut,
  Bell,
  Settings,
  Search,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';


interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

function getNavItems(role: UserRole): NavItem[] {
  const base: NavItem[] = [
    { label: 'Dashboard', href: '/admin/dashboard', icon: <LayoutDashboard size={16} /> },
    { label: 'Listings', href: '/admin/properties', icon: <Building2 size={16} /> },
    { label: 'Appointments', href: '/admin/bookings', icon: <CalendarDays size={16} /> },
    { label: 'Messages', href: '/admin/inquiries', icon: <MessageSquare size={16} /> },
  ];

  const roleNav: Record<UserRole, NavItem[]> = {
    ADMIN: [
      ...base,
      { label: 'Users', href: '/admin/users', icon: <Users size={16} /> },
      { label: 'Reports', href: '/admin/reports', icon: <BarChart3 size={16} /> },
    ],
    AGENT: [
      { label: 'Inquiries', href: '/agent/inquiries', icon: <MessageSquare size={16} /> },
      { label: 'Bookings', href: '/agent/bookings', icon: <CalendarDays size={16} /> },
    ],
    SELLER: [
      { label: 'My Listings', href: '/seller/listings', icon: <Building2 size={16} /> },
      { label: 'Add Property', href: '/seller/listings/new', icon: <Building2 size={16} /> },
    ],
    CUSTOMER: [
      { label: 'Browse', href: '/properties', icon: <Building2 size={16} /> },
      { label: 'My Inquiries', href: '/customer/inquiries', icon: <MessageSquare size={16} /> },
    ],
  };

  return roleNav[role] || base;
}

interface TopNavProps {
  user: AuthenticatedUser;
  role: UserRole;
}

export function TopNav({ user, role }: TopNavProps) {
  const pathname = usePathname();
  const navItems = getNavItems(role);
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
      <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center gap-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 flex-shrink-0 mr-4">
          <div className="w-8 h-8 bg-[#161616] rounded-lg flex items-center justify-center">
            <Building2 size={16} className="text-[#E7B98C]" />
          </div>
          <span className="font-bold text-[#161616] text-lg tracking-tight">EstateFlow</span>
        </Link>

        {/* Pill nav (center) */}
        <div className="hidden md:flex items-center gap-1 bg-gray-50 rounded-full p-1 flex-1 max-w-md mx-auto">
          {navItems.slice(0, 4).map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'bg-[#161616] text-white shadow-sm'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-white'
                )}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Right side icons */}
        <div className="flex items-center gap-3 ml-auto">
          <button
            className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center hover:bg-gray-100 transition-colors"
            aria-label="Search"
          >
            <Search size={16} className="text-gray-500" />
          </button>
          <button
            className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center hover:bg-gray-100 transition-colors relative"
            aria-label="Notifications"
          >
            <Bell size={16} className="text-gray-500" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full" />
          </button>
          <Link
            href="/settings"
            className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center hover:bg-gray-100 transition-colors"
            aria-label="Settings"
          >
            <Settings size={16} className="text-gray-500" />
          </Link>

          {/* Avatar dropdown */}
          <div className="relative group">
            <button
              className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full bg-gray-50 hover:bg-gray-100 transition-colors"
              aria-label="User menu"
            >
              <div className="w-7 h-7 bg-[#E7B98C] rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-white">{getInitial({ name: user.name })}</span>
              </div>
              <span className="text-sm font-medium text-gray-700 hidden sm:block max-w-[100px] truncate">
                {user.name.split(' ')[0]}
              </span>
            </button>
            {/* Dropdown */}
            <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <div className="px-4 py-2 border-b border-gray-50">
                <p className="font-semibold text-sm text-gray-800 truncate">{user.name}</p>
                <p className="text-xs text-gray-400 truncate">{user.email}</p>
                <span className="text-xs text-[#E7B98C] font-medium capitalize">{user.role.toLowerCase()}</span>
              </div>
              <Link href="/settings" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                <Settings size={15} /> Settings
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-sm text-rose-500 hover:bg-rose-50 transition-colors w-full text-left"
              >
                <LogOut size={15} /> Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
