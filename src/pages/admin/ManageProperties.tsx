import { useEffect, useState } from 'react'
import {
    getAllProperties,
    deleteProperty,
} from '../../api/propertyApi'

import type {
    Property,
    PropertyStatus,
} from '../../types/property'
import DashboardLayout from '../../components/common/DashboardLayout'

function ManageProperties() {

    const [properties, setProperties] = useState<Property[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const loadProperties = async () => {
        try {
            setLoading(true)
            setError('')

            const data = await getAllProperties()
            setProperties(data)

        } catch (error) {
            console.error(error)
            setError('Failed to load properties.')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadProperties()
    }, [])

    const handleDelete = async (id: number) => {

        const confirmed = window.confirm(
            'Are you sure you want to delete this property?'
        )

        if (!confirmed) {
            return
        }

        try {

            await deleteProperty(id)

            setProperties((currentProperties) =>
                currentProperties.filter(
                    (property) => property.id !== id
                )
            )

        } catch (error) {

            console.error(error)
            alert('Failed to delete property.')

        }
    }

    const getStatusClass = (
        status: PropertyStatus
    ) => {

        switch (status) {

            case 'AVAILABLE':
                return 'bg-emerald-500/10 text-emerald-400'

            case 'SOLD':
                return 'bg-red-500/10 text-red-400'

            case 'RENTED':
                return 'bg-blue-500/10 text-blue-400'

            case 'PENDING':
                return 'bg-slate-500/10 text-slate-400'

            default:
                return 'bg-slate-500/10 text-slate-400'
        }
    }

    if (loading) {

        return (
            <div className="min-h-screen bg-slate-950 p-8 text-white">
                <p className="text-slate-400">
                    Loading properties...
                </p>
            </div>
        )
    }

    return (
        <DashboardLayout>
            <div className="min-h-screen bg-slate-950 p-8 text-white">

                <div className="mb-8">

                    <h1 className="text-3xl font-bold">
                        Manage Properties
                    </h1>

                    <p className="mt-2 text-slate-400">
                        Monitor and manage all properties in the system.
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
                            Total Properties
                        </p>

                        <p className="mt-2 text-3xl font-bold text-white">
                            {properties.length}
                        </p>

                    </div>

                    <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">

                        <p className="text-sm text-slate-400">
                            Available
                        </p>

                        <p className="mt-2 text-3xl font-bold text-emerald-400">
                            {
                                properties.filter(
                                    (property) =>
                                        property.status === 'AVAILABLE'
                                ).length
                            }
                        </p>

                    </div>

                    <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">

                        <p className="text-sm text-slate-400">
                            Sold / Rented
                        </p>

                        <p className="mt-2 text-3xl font-bold text-blue-400">
                            {
                                properties.filter(
                                    (property) =>
                                        property.status === 'SOLD' ||
                                        property.status === 'RENTED'
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
                                        Location
                                    </th>

                                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                                        Price
                                    </th>

                                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                                        Type
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

                                {properties.map((property) => (

                                    <tr
                                        key={property.id}
                                        className="transition hover:bg-slate-800/50"
                                    >

                                        <td className="px-6 py-4 text-sm text-slate-400">
                                            #{property.id}
                                        </td>

                                        <td className="px-6 py-4">

                                            <div className="font-medium text-white">
                                                {property.title}
                                            </div>

                                            <div className="text-sm text-slate-500">
                                                {/* {property.bedrooms} beds ·{' '}
                      {property.bathrooms} baths */}
                                            </div>

                                        </td>

                                        <td className="px-6 py-4 text-sm text-slate-300">
                                            {property.location}
                                        </td>

                                        <td className="px-6 py-4 text-sm font-medium text-white">
                                            Rs. {property.price.toLocaleString()}
                                        </td>

                                        <td className="px-6 py-4">

                                            <span className="text-sm text-slate-300">
                                                {property.type}
                                            </span>

                                        </td>

                                        <td className="px-6 py-4">

                                            <span
                                                className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusClass(
                                                    property.status
                                                )}`}
                                            >
                                                {property.status}
                                            </span>

                                        </td>

                                        <td className="px-6 py-4">

                                            <button
                                                onClick={() =>
                                                    handleDelete(property.id)
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

                    {properties.length === 0 && (

                        <div className="px-6 py-12 text-center text-slate-500">
                            No properties found.
                        </div>

                    )}

                </div>

            </div>
        </DashboardLayout>
    )
}

export default ManageProperties