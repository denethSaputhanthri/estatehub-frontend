import { useEffect, useState } from 'react'
import {
  getAllInquiries,
  updateInquiry,
  deleteInquiry,
} from '../../api/inquiryApi'

import type {
  Inquiry,
  InquiryStatus,
} from '../../types/inquiry'

function SellerInquiries() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        setLoading(true)
        setError('')

        const data = await getAllInquiries()

        setInquiries(data)
      } catch (error) {
        console.error(error)
        setError('Failed to load inquiries.')
      } finally {
        setLoading(false)
      }
    }

    fetchInquiries()
  }, [])

  const handleStatusChange = async (
    inquiry: Inquiry,
    status: InquiryStatus
  ) => {
    try {
      const updatedInquiry = await updateInquiry(
        inquiry.id,
        {
          message: inquiry.message,
          status,
          agentId: inquiry.agentId,
        }
      )

      setInquiries((previous) =>
        previous.map((item) =>
          item.id === inquiry.id
            ? updatedInquiry
            : item
        )
      )
    } catch (error) {
      console.error(error)
      setError('Failed to update inquiry.')
    }
  }

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this inquiry?'
    )

    if (!confirmed) {
      return
    }

    try {
      await deleteInquiry(id)

      setInquiries((previous) =>
        previous.filter(
          (inquiry) => inquiry.id !== id
        )
      )
    } catch (error) {
      console.error(error)
      setError('Failed to delete inquiry.')
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        <p className="text-slate-400">
          Loading inquiries...
        </p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-slate-800 bg-slate-900">
        <div className="mx-auto max-w-7xl px-6 py-5">
          <h1 className="text-2xl font-bold">
            Seller Inquiries
          </h1>

          <p className="mt-1 text-sm text-slate-400">
            Manage customer inquiries for your properties.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10">
        {error && (
          <div className="mb-6 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}

        {inquiries.length === 0 ? (
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-10 text-center">
            <h2 className="text-xl font-semibold">
              No inquiries found
            </h2>

            <p className="mt-2 text-sm text-slate-400">
              There are currently no customer inquiries.
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {inquiries.map((inquiry) => (
              <div
                key={inquiry.id}
                className="rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-lg"
              >
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                  <div className="flex-1">
                    <div className="mb-5 flex items-center justify-between">
                      <div>
                        <h2 className="text-lg font-semibold">
                          Inquiry #{inquiry.id}
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                          Created:{' '}
                          {new Date(
                            inquiry.createdAt
                          ).toLocaleString()}
                        </p>
                      </div>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          inquiry.status === 'NEW'
                            ? 'bg-blue-500/10 text-blue-400'
                            : inquiry.status === 'RESPONDED'
                              ? 'bg-green-500/10 text-green-400'
                              : 'bg-slate-700 text-slate-300'
                        }`}
                      >
                        {inquiry.status}
                      </span>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-3">
                      <div className="rounded-lg bg-slate-800/60 p-4">
                        <p className="text-xs text-slate-500">
                          Property ID
                        </p>

                        <p className="mt-1 font-medium">
                          #{inquiry.propertyId}
                        </p>
                      </div>

                      <div className="rounded-lg bg-slate-800/60 p-4">
                        <p className="text-xs text-slate-500">
                          Customer ID
                        </p>

                        <p className="mt-1 font-medium">
                          #{inquiry.customerId}
                        </p>
                      </div>

                      <div className="rounded-lg bg-slate-800/60 p-4">
                        <p className="text-xs text-slate-500">
                          Agent ID
                        </p>

                        <p className="mt-1 font-medium">
                          {inquiry.agentId
                            ? `#${inquiry.agentId}`
                            : 'Not assigned'}
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 rounded-lg border border-slate-800 bg-slate-950/50 p-4">
                      <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-500">
                        Customer Message
                      </p>

                      <p className="text-sm leading-6 text-slate-300">
                        {inquiry.message}
                      </p>
                    </div>
                  </div>

                  <div className="w-full lg:w-64">
                    <label
                      htmlFor={`status-${inquiry.id}`}
                      className="mb-2 block text-sm font-medium text-slate-300"
                    >
                      Update Status
                    </label>

                    <select
                      id={`status-${inquiry.id}`}
                      value={inquiry.status}
                      onChange={(event) =>
                        handleStatusChange(
                          inquiry,
                          event.target.value as InquiryStatus
                        )
                      }
                      className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-white outline-none transition focus:border-blue-500"
                    >
                      <option value="NEW">
                        NEW
                      </option>

                      <option value="RESPONDED">
                        RESPONDED
                      </option>

                      <option value="CLOSED">
                        CLOSED
                      </option>
                    </select>

                    <button
                      type="button"
                      onClick={() =>
                        handleDelete(inquiry.id)
                      }
                      className="mt-4 w-full rounded-lg border border-red-500/30 px-4 py-3 text-sm font-medium text-red-400 transition hover:bg-red-500/10"
                    >
                      Delete Inquiry
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

export default SellerInquiries