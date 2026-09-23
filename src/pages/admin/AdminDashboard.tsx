import { useAuth } from '../../context/AuthContext'

function AdminDashboard() {
  const { user, logout } = useAuth()

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-slate-800 bg-slate-900">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-xl font-bold">Real Estate</h1>
            <p className="text-sm text-slate-400">
              Admin Dashboard
            </p>
          </div>

          <button
            onClick={logout}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium hover:bg-red-500"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10">
        <h2 className="text-3xl font-bold">
          Welcome, {user?.name}
        </h2>

        <p className="mt-2 text-slate-400">
          Manage users and the real estate platform.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-4">
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
            <h3 className="font-semibold">Users</h3>
            <p className="mt-2 text-sm text-slate-400">
              Manage system users.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
            <h3 className="font-semibold">Properties</h3>
            <p className="mt-2 text-sm text-slate-400">
              Manage all properties.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
            <h3 className="font-semibold">Transactions</h3>
            <p className="mt-2 text-sm text-slate-400">
              Monitor transactions.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
            <h3 className="font-semibold">Reports</h3>
            <p className="mt-2 text-sm text-slate-400">
              View system reports.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}

export default AdminDashboard