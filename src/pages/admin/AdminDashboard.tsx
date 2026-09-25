import DashboardLayout from '../../components/common/DashboardLayout'
import { useAuth } from '../../context/AuthContext'

function AdminDashboard() {
  const { user } = useAuth()

  return (
    <DashboardLayout>
    <div className="min-h-screen bg-slate-950 text-white">
      

      {/* Main */}
      <main className="mx-auto max-w-7xl px-6 py-10">
        {/* Welcome */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold">
            Welcome back, {user?.name} 👋
          </h2>

          <p className="mt-2 text-slate-400">
            Manage users, properties, inquiries and system operations.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">
              Total Users
            </p>

            <p className="mt-3 text-3xl font-bold">
              0
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">
              Properties
            </p>

            <p className="mt-3 text-3xl font-bold">
              0
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">
              Inquiries
            </p>

            <p className="mt-3 text-3xl font-bold">
              0
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">
              Bookings
            </p>

            <p className="mt-3 text-3xl font-bold">
              0
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-10">
          <h3 className="mb-4 text-xl font-semibold">
            Quick Actions
          </h3>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <button
              type="button"
              className="rounded-xl border border-slate-800 bg-slate-900 p-5 text-left transition hover:border-blue-500 hover:bg-slate-800"
            >
              <h4 className="font-semibold">
                Manage Users
              </h4>

              <p className="mt-1 text-sm text-slate-400">
                View and manage system users.
              </p>
            </button>

            <button
              type="button"
              className="rounded-xl border border-slate-800 bg-slate-900 p-5 text-left transition hover:border-blue-500 hover:bg-slate-800"
            >
              <h4 className="font-semibold">
                Manage Properties
              </h4>

              <p className="mt-1 text-sm text-slate-400">
                Review and manage properties.
              </p>
            </button>

            <button
              type="button"
              className="rounded-xl border border-slate-800 bg-slate-900 p-5 text-left transition hover:border-blue-500 hover:bg-slate-800"
            >
              <h4 className="font-semibold">
                Manage Inquiries
              </h4>

              <p className="mt-1 text-sm text-slate-400">
                Monitor customer inquiries.
              </p>
            </button>

            <button
              type="button"
              className="rounded-xl border border-slate-800 bg-slate-900 p-5 text-left transition hover:border-blue-500 hover:bg-slate-800"
            >
              <h4 className="font-semibold">
                Manage Bookings
              </h4>

              <p className="mt-1 text-sm text-slate-400">
                Monitor property visit bookings.
              </p>
            </button>
          </div>
        </div>
      </main>
    </div>

    </DashboardLayout>
  )
}

export default AdminDashboard