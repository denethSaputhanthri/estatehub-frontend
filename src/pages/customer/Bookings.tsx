import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import DashboardLayout from '../../components/common/DashboardLayout'
import { getAllBookings } from '../../api/bookingApi'
import { useAuth } from '../../context/AuthContext'

import type { Booking } from '../../types/booking'

function Bookings() {
  const { user } = useAuth()
  const navigate = useNavigate()

  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true)
        setError('')

        const data = await getAllBookings()

        const customerBookings = data.filter(
          (booking) => booking.customerId === user?.id
        )

        setBookings(customerBookings)
      } catch (err) {
        console.error('Error fetching bookings:', err)
        setError('Failed to load bookings.')
      } finally {
        setLoading(false)
      }
    }

    if (user?.id) {
      fetchBookings()
    }
  }, [user?.id])

  const getStatusClass = (status: Booking['status']) => {
    switch (status) {
      case 'SCHEDULED':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20'

      case 'COMPLETED':
        return 'bg-green-500/10 text-green-400 border-green-500/20'

      case 'CANCELLED':
        return 'bg-red-500/10 text-red-400 border-red-500/20'

      default:
        return 'bg-slate-500/10 text-slate-400 border-slate-500/20'
    }
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString()
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">

        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-white">
            My Bookings
          </h1>

          <p className="mt-1 text-sm text-slate-400">
            View and manage your property visit bookings.
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-8 text-center">
            <p className="text-slate-400">
              Loading bookings...
            </p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-6">
            <p className="text-red-400">
              {error}
            </p>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && bookings.length === 0 && (
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-10 text-center">
            <h2 className="text-lg font-semibold text-white">
              No bookings found
            </h2>

            <p className="mt-2 text-sm text-slate-400">
              You haven't booked any property visits yet.
            </p>

            <button
              onClick={() => navigate('/customer/properties')}
              className="mt-6 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-500"
            >
              Browse Properties
            </button>
          </div>
        )}

        {/* Booking Cards */}
        {!loading && !error && bookings.length > 0 && (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="rounded-xl border border-slate-800 bg-slate-900 p-6 transition hover:border-slate-700"
              >
                {/* Booking Header */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-slate-500">
                      Booking
                    </p>

                    <h2 className="mt-1 text-lg font-semibold text-white">
                      #{booking.id}
                    </h2>
                  </div>

                  <span
                    className={`rounded-full border px-3 py-1 text-xs font-medium ${getStatusClass(
                      booking.status
                    )}`}
                  >
                    {booking.status}
                  </span>
                </div>

                {/* Details */}
                <div className="mt-6 space-y-4">

                  <div>
                    <p className="text-xs text-slate-500">
                      Property ID
                    </p>

                    <p className="mt-1 text-sm font-medium text-white">
                      #{booking.propertyId}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-500">
                      Inquiry ID
                    </p>

                    <p className="mt-1 text-sm font-medium text-white">
                      #{booking.inquiryId}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-500">
                      Visit Date
                    </p>

                    <p className="mt-1 text-sm font-medium text-white">
                      {formatDate(booking.visitDate)}
                    </p>
                  </div>

                  {booking.agentId && (
                    <div>
                      <p className="text-xs text-slate-500">
                        Agent ID
                      </p>

                      <p className="mt-1 text-sm font-medium text-white">
                        #{booking.agentId}
                      </p>
                    </div>
                  )}

                  <div>
                    <p className="text-xs text-slate-500">
                      Created
                    </p>

                    <p className="mt-1 text-sm text-slate-300">
                      {formatDate(booking.createdAt)}
                    </p>
                  </div>

                </div>

                {/* Actions */}
                <div className="mt-6 border-t border-slate-800 pt-4">
                  <button
                    onClick={() =>
                      navigate(
                        `/customer/properties/${booking.propertyId}`
                      )
                    }
                    className="w-full rounded-lg border border-slate-700 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
                  >
                    View Property
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </DashboardLayout>
  )
}

export default Bookings