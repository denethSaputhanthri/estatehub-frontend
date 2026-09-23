
import DashboardLayout from '../../components/common/DashboardLayout'

function CustomerDashboard() {
  return (
    <DashboardLayout>
      <div>
        <h1 className="text-3xl font-bold">
          Customer Dashboard
        </h1>

        <p className="mt-2 text-slate-400">
          Welcome to your real estate dashboard.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-3">

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-lg font-semibold">
              Properties
            </h2>

            <p className="mt-2 text-sm text-slate-400">
              Browse available properties.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-lg font-semibold">
              Inquiries
            </h2>

            <p className="mt-2 text-sm text-slate-400">
              View your property inquiries.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-lg font-semibold">
              Bookings
            </h2>

            <p className="mt-2 text-sm text-slate-400">
              Manage your property bookings.
            </p>
          </div>

        </div>
      </div>
    </DashboardLayout>
  )
}

export default CustomerDashboard
