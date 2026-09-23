import type { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

interface DashboardLayoutProps {
    children: ReactNode;
}

function DashboardLayout({ children }: DashboardLayoutProps) {

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            <Sidebar />

            <div className="ml-64">
                <Navbar />
                <main className="p-6">
                    {children}
                </main>
            </div>

        </div>
    )
}

export default DashboardLayout