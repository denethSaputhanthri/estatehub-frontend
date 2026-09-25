import { useEffect, useState } from 'react'
import {
  getAllBookings,
  updateBooking,
  deleteBooking,
} from '../../api/bookingApi'

import type {
  Booking,
  BookingStatus,
} from '../../types/booking'

function SellerBookings() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true)
        setError('')

        const data = await getAllBookings()

        setBookings(data)
      } catch (error) {
        console.error(error)
        setError('Failed to load bookings.')
      } finally {
        setLoading(false)
      }
    }

    fetchBookings()
  }, [])

  const handleStatusChange = async (
    booking: Booking,
    status: BookingStatus
  ) => {
    try {
      const updatedBooking = await updateBooking(
        booking.id,
        {
          inquiryId: booking.inquiryId,
          visitDate: booking.visitDate,
        
        }
      )

      setBookings((previous) =>
        previous.map((item) =>
          item.id === booking.id
            ? updatedBooking
            : item
        )
      )
    } catch (error) {
      console.error(error)
      setError('Failed to update booking.')
    }
  }

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this booking?'
    )

    if (!confirmed) {
      return
    }

    try {
      await deleteBooking(id)

      setBookings((previous) =>
        previous.filter(
          (booking) => booking.id !== id
        )
      )
    } catch (error) {
      console.error(error)
      setError('Failed to delete booking.')
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        <p className="text-slate-400">
          Loading bookings...
        </p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-slate-800 bg-slate-900">
        <div className="mx-auto max-w-7xl px-6 py-5">
          <h1 className="text-2xl font-bold">
            Seller Bookings
          </h1>

          <p className="mt-1 text-sm text-slate-400">
            Manage property visit bookings.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10">
        {error && (
          <div className="mb-6 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}

        {bookings.length === 0 ? (
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-10 text-center">
            <h2 className="text-xl font-semibold">
              No bookings found
            </h2>

            <p className="mt-2 text-sm text-slate-400">
              There are currently no property visit bookings.
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-lg"
              >
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                  <div className="flex-1">
                    <div className="mb-5 flex items-center justify-between">
                      <div>
                        <h2 className="text-lg font-semibold">
                          Booking #{booking.id}
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                          Created:{' '}
                          {new Date(
                            booking.createdAt
                          ).toLocaleString()}
                        </p>
                      </div>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          booking.status === 'SCHEDULED'
                            ? 'bg-blue-500/10 text-blue-400'
                            : booking.status === 'COMPLETED'
                              ? 'bg-green-500/10 text-green-400'
                              : 'bg-red-500/10 text-red-400'
                        }`}
                      >
                        {booking.status}
                      </span>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                      <div className="rounded-lg bg-slate-800/60 p-4">
                        <p className="text-xs text-slate-500">
                          Inquiry ID
                        </p>

                        <p className="mt-1 font-medium">
                          #{booking.inquiryId}
                        </p>
                      </div>

                      <div className="rounded-lg bg-slate-800/60 p-4">
                        <p className="text-xs text-slate-500">
                          Property ID
                        </p>

                        <p className="mt-1 font-medium">
                          #{booking.propertyId}
                        </p>
                      </div>

                      <div className="rounded-lg bg-slate-800/60 p-4">
                        <p className="text-xs text-slate-500">
                          Customer ID
                        </p>

                        <p className="mt-1 font-medium">
                          #{booking.customerId}
                        </p>
                      </div>

                      <div className="rounded-lg bg-slate-800/60 p-4">
                        <p className="text-xs text-slate-500">
                          Agent ID
                        </p>

                        <p className="mt-1 font-medium">
                          {booking.agentId
                            ? `#${booking.agentId}`
                            : 'Not assigned'}
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 rounded-lg border border-slate-800 bg-slate-950/50 p-4">
                      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                        Visit Date
                      </p>

                      <p className="mt-2 text-sm text-slate-300">
                        {new Date(
                          booking.visitDate
                        ).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="w-full lg:w-64">
                    <label
                      htmlFor={`status-${booking.id}`}
                      className="mb-2 block text-sm font-medium text-slate-300"
                    >
                      Update Status
                    </label>

                    <select
                      id={`status-${booking.id}`}
                      value={booking.status}
                      onChange={(event) =>
                        handleStatusChange(
                          booking,
                          event.target.value as BookingStatus
                        )
                      }
                      className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-white outline-none transition focus:border-blue-500"
                    >
                      <option value="SCHEDULED">
                        SCHEDULED
                      </option>

                      <option value="COMPLETED">
                        COMPLETED
                      </option>

                      <option value="CANCELLED">
                        CANCELLED
                      </option>
                    </select>

                    <button
                      type="button"
                      onClick={() =>
                        handleDelete(booking.id)
                      }
                      className="mt-4 w-full rounded-lg border border-red-500/30 px-4 py-3 text-sm font-medium text-red-400 transition hover:bg-red-500/10"
                    >
                      Delete Booking
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

export default SellerBookings