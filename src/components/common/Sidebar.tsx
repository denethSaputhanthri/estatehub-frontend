import { NavLink } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext';
import type { UserRole } from '../../types/auth';


interface NavigationItem {
    label: string;
    path: string;
}

const navigationByRole: Record<UserRole, NavigationItem[]> = {

    CUSTOMER: [
        {
            label: 'Dashboard',
            path: '/customer/dashboard',
        },
        {
            label: 'Properties',
            path: '/customer/properties',
        },
        {
            label: 'My Inquiries',
            path: '/customer/inquiries',
        },
        {
            label: 'My Bookings',
            path: '/customer/bookings',
        },
        {
            label: 'My Transactions',
            path: '/customer/transactions',
        },
    ],
    SELLER: [
        {
            label: 'Dashboard',
            path: '/seller/dashboard',
        },
        {
            label: 'My Properties',
            path: '/seller/properties',
        },
        {
            label: 'Inquiries',
            path: '/seller/inquiries',
        },
        {
            label: 'Transactions',
            path: '/seller/transactions',
        },
    ],
    AGENT: [
        {
            label: 'Dashboard',
            path: '/agent/dashboard',
        },
        {
            label: 'Properties',
            path: '/agent/properties',
        },
        {
            label: 'Inquiries',
            path: '/agent/inquiries',
        },
        {
            label: 'Bookings',
            path: '/agent/bookings',
        },
        {
            label: 'Transactions',
            path: '/agent/transactions',
        },
    ],
    ADMIN: [
        {
            label: 'Dashboard',
            path: '/admin/dashboard',
        },
        {
            label: 'Users',
            path: '/admin/users',
        },
        {
            label: 'Properties',
            path: '/admin/properties',
        },
        {
            label: 'Transactions',
            path: '/admin/transactions',
        },
        {
            label: 'Reports',
            path: '/admin/reports',
        },
    ],

}

function Sidebar() {
    const { user } = useAuth();
    if (!user) {
        return null; // or a loading spinner, or redirect to login
    }

    const navigationItems = navigationByRole[user.role]

    return (
        <aside className="fixed left-0 top-0 h-screen w-64 border-r border-slate-800 bg-slate-900">
            <div className="border-b border-slate-800 px-6 py-5">
                <h1 className="text-xl font-bold text-white">
                    Real Estate
                </h1>

                <p className="mt-1 text-xs text-slate-400">
                    Management System
                </p>
            </div>

            <nav className="space-y-2 p-4">
                {navigationItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `block rounded-lg px-4 py-3 text-sm font-medium transition ${isActive
                                ? 'bg-blue-600 text-white'
                                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                            }`
                        }
                    >
                        {item.label}
                    </NavLink>
                ))}

            </nav>
        </aside>
    )
}

export default Sidebar