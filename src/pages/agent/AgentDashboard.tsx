import DashboardLayout from "../../components/common/DashboardLayout";
import { useAuth } from '../../context/AuthContext'

function AgentDashboard() {
  const { user } = useAuth()
  return (
    <DashboardLayout>
      <div className="min-h-screen bg-slate-950 text-white">
        {/* Header */}
        <header className="border-b border-slate-800 bg-slate-900">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
            <div>
              <h1 className="text-xl font-bold">
                Real Estate Management
              </h1>

              <p className="text-sm text-slate-400">
                Agent Dashboard
              </p>
            </div>

            <div className="text-right">
              <p className="font-medium">
                {user?.name}
              </p>

              <p className="text-sm text-slate-400">
                {user?.email}
              </p>
            </div>
          </div>
        </header>

        {/* Main */}
        <main className="mx-auto max-w-7xl px-6 py-10">
          {/* Welcome */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold">
              Welcome back, {user?.name} 👋
            </h2>

            <p className="mt-2 text-slate-400">
              Manage customer inquiries and property visit bookings.
            </p>
          </div>

          {/* Statistics */}
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
              <p className="text-sm text-slate-400">
                Inquiries
              </p>

              <p className="mt-3 text-3xl font-bold">
                0
              </p>

              <p className="mt-2 text-xs text-slate-500">
                Assigned customer inquiries
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
              <p className="text-sm text-slate-400">
                Scheduled Bookings
              </p>

              <p className="mt-3 text-3xl font-bold">
                0
              </p>

              <p className="mt-2 text-xs text-slate-500">
                Upcoming property visits
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
              <p className="text-sm text-slate-400">
                Completed Visits
              </p>

              <p className="mt-3 text-3xl font-bold">
                0
              </p>

              <p className="mt-2 text-xs text-slate-500">
                Completed property visits
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-10">
            <h3 className="mb-4 text-xl font-semibold">
              Quick Actions
            </h3>

            <div className="grid gap-4 md:grid-cols-2">
              <button
                type="button"
                className="rounded-xl border border-slate-800 bg-slate-900 p-5 text-left transition hover:border-blue-500 hover:bg-slate-800"
              >
                <h4 className="font-semibold">
                  View Inquiries
                </h4>

                <p className="mt-1 text-sm text-slate-400">
                  Review and manage customer inquiries.
                </p>
              </button>

              <button
                type="button"
                className="rounded-xl border border-slate-800 bg-slate-900 p-5 text-left transition hover:border-blue-500 hover:bg-slate-800"
              >
                <h4 className="font-semibold">
                  View Bookings
                </h4>

                <p className="mt-1 text-sm text-slate-400">
                  Manage scheduled property visits.
                </p>
              </button>
            </div>
          </div>
        </main>
      </div>
    </DashboardLayout>
  );
}
export default AgentDashboard;