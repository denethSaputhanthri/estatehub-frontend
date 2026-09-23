import { useAuth } from '../../context/AuthContext'

function Navbar() {
  const { user, logout } = useAuth()

  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-800 bg-slate-900 px-6">
      <div>
        <h2 className="text-lg font-semibold text-white">
          Dashboard
        </h2>

        <p className="text-xs text-slate-400">
          Welcome back
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-sm font-medium text-white">
            {user?.name}
          </p>

          <p className="text-xs text-slate-400">
            {user?.role}
          </p>
        </div>

        <button
          onClick={logout}
          className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-500"
        >
          Logout
        </button>
      </div>
    </header>
  )
}

export default Navbar
