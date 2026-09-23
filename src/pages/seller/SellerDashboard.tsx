import { useAuth } from '../../context/AuthContext'

function SellerDashboard() {
  const { user, logout } = useAuth()

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-slate-800 bg-slate-900">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-xl font-bold">Real Estate</h1>
            <p className="text-sm text-slate-400">
              Seller Dashboard
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
          Manage your properties and customer inquiries.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
            <h3 className="font-semibold">My Properties</h3>
            <p className="mt-2 text-sm text-slate-400">
              Manage your listed properties.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
            <h3 className="font-semibold">Inquiries</h3>
            <p className="mt-2 text-sm text-slate-400">
              View customer inquiries.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
            <h3 className="font-semibold">Property Management</h3>
            <p className="mt-2 text-sm text-slate-400">
              Add and update property listings.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}

export default SellerDashboard