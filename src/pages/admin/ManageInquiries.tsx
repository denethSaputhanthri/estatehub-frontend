import { useEffect, useState } from 'react'

import {
  getAllInquiries,
  deleteInquiry,
} from '../../api/inquiryApi'

import type {
  Inquiry,
  InquiryStatus,
} from '../../types/inquiry'
import DashboardLayout from '../../components/common/DashboardLayout'

function ManageInquiries() {

  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadInquiries = async () => {
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

  useEffect(() => {
    loadInquiries()
  }, [])

  const handleDelete = async (id: number) => {

    const confirmed = window.confirm(
      'Are you sure you want to delete this inquiry?'
    )

    if (!confirmed) {
      return
    }

    try {

      await deleteInquiry(id)

      setInquiries((currentInquiries) =>
        currentInquiries.filter(
          (inquiry) => inquiry.id !== id
        )
      )

    } catch (error) {

      console.error(error)
      alert('Failed to delete inquiry.')

    }
  }

  const getStatusClass = (
    status: InquiryStatus
  ) => {

    switch (status) {

      case 'NEW':
        return 'bg-blue-500/10 text-blue-400'

      case 'RESPONDED':
        return 'bg-emerald-500/10 text-emerald-400'

      case 'CLOSED':
        return 'bg-slate-500/10 text-slate-400'

      default:
        return 'bg-slate-500/10 text-slate-400'
    }
  }

  if (loading) {

    return (
      <div className="min-h-screen bg-slate-950 p-8 text-white">
        <p className="text-slate-400">
          Loading inquiries...
        </p>
      </div>
    )
  }

  return (
    <DashboardLayout>
    <div className="min-h-screen bg-slate-950 p-8 text-white">

      <div className="mb-8">

        <h1 className="text-3xl font-bold">
          Manage Inquiries
        </h1>

        <p className="mt-2 text-slate-400">
          Monitor and manage all property inquiries.
        </p>

      </div>

      {error && (
        <div className="mb-6 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-red-400">
          {error}
        </div>
      )}

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">

        <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">

          <p className="text-sm text-slate-400">
            Total Inquiries
          </p>

          <p className="mt-2 text-3xl font-bold text-white">
            {inquiries.length}
          </p>

        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">

          <p className="text-sm text-slate-400">
            New
          </p>

          <p className="mt-2 text-3xl font-bold text-blue-400">
            {
              inquiries.filter(
                (inquiry) => inquiry.status === 'NEW'
              ).length
            }
          </p>

        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">

          <p className="text-sm text-slate-400">
            Responded
          </p>

          <p className="mt-2 text-3xl font-bold text-emerald-400">
            {
              inquiries.filter(
                (inquiry) =>
                  inquiry.status === 'RESPONDED'
              ).length
            }
          </p>

        </div>

      </div>

      <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900">

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="border-b border-slate-800">

              <tr>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                  ID
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                  Property
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                  Customer
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                  Agent
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                  Message
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                  Status
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                  Action
                </th>

              </tr>

            </thead>

            <tbody className="divide-y divide-slate-800">

              {inquiries.map((inquiry) => (

                <tr
                  key={inquiry.id}
                  className="transition hover:bg-slate-800/50"
                >

                  <td className="px-6 py-4 text-sm text-slate-400">
                    #{inquiry.id}
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-300">
                    #{inquiry.propertyId}
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-300">
                    #{inquiry.customerId}
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-300">
                    {inquiry.agentId
                      ? `#${inquiry.agentId}`
                      : 'Unassigned'}
                  </td>

                  <td className="max-w-xs px-6 py-4">

                    <p className="truncate text-sm text-slate-300">
                      {inquiry.message}
                    </p>

                  </td>

                  <td className="px-6 py-4">

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusClass(
                        inquiry.status
                      )}`}
                    >
                      {inquiry.status}
                    </span>

                  </td>

                  <td className="px-6 py-4">

                    <button
                      onClick={() =>
                        handleDelete(inquiry.id)
                      }
                      className="rounded-lg bg-red-600/10 px-4 py-2 text-sm font-medium text-red-400 transition hover:bg-red-600 hover:text-white"
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        {inquiries.length === 0 && (

          <div className="px-6 py-12 text-center text-slate-500">
            No inquiries found.
          </div>

        )}

      </div>

    </div>
    </DashboardLayout>
  )
}

export default ManageInquiries