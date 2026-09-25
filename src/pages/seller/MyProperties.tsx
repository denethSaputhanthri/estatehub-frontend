import { useEffect, useState } from 'react'
import { deleteProperty, getAllProperties } from '../../api/propertyApi'
import type { Property } from '../../types/property'
import { useNavigate } from 'react-router-dom'

function MyProperties() {
    const navigate = useNavigate()

    const [properties, setProperties] = useState<Property[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')


    const handleDelete = async (id: number) => {
  const confirmed = window.confirm(
    'Are you sure you want to delete this property?'
  )

  if (!confirmed) {
    return
  }

  try {
    await deleteProperty(id)

    setProperties((previous) =>
      previous.filter((property) => property.id !== id)
    )
  } catch (error) {
    console.error(error)
    setError('Failed to delete property.')
  }
}
    useEffect(() => {
        const fetchProperties = async () => {
            try {
                setLoading(true)
                const data = await getAllProperties()
                setProperties(data)
            } catch (error) {
                console.error(error)
                setError('Failed to load properties.')
            } finally {
                setLoading(false)
            }
        }

        fetchProperties()
    }, [])

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
                <p className="text-slate-400">
                    Loading properties...
                </p>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-slate-950 text-white">

            {/* Header */}
            <header className="border-b border-slate-800 bg-slate-900">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                    <div>
                        <h1 className="text-xl font-bold">
                            My Properties
                        </h1>

                        <p className="text-sm text-slate-400">
                            Manage your property listings
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() => navigate('/seller/add-property')}
                        className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium transition hover:bg-blue-500"
                    >
                        + Add Property
                    </button>
                </div>
            </header>

            {/* Content */}
            <main className="mx-auto max-w-7xl px-6 py-8">

                {error && (
                    <div className="mb-6 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-red-400">
                        {error}
                    </div>
                )}

                {!error && properties.length === 0 && (
                    <div className="rounded-xl border border-slate-800 bg-slate-900 p-10 text-center">
                        <h2 className="text-xl font-semibold">
                            No properties found
                        </h2>

                        <p className="mt-2 text-slate-400">
                            You haven't added any properties yet.
                        </p>
                    </div>
                )}

                {/* Property Grid */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

                    {properties.map((property) => (
                        <div
                            key={property.id}
                            className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900 transition hover:border-slate-700"
                        >

                            {/* Image */}
                            <div className="h-48 bg-slate-800">
                                {property.imageUrls.length > 0 ? (
                                    <img
                                        src={property.imageUrls[0]}
                                        alt={property.title}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <div className="flex h-full items-center justify-center text-slate-500">
                                        No Image
                                    </div>
                                )}
                            </div>

                            {/* Details */}
                            <div className="p-5">

                                <div className="mb-3 flex items-start justify-between gap-3">
                                    <h2 className="text-lg font-semibold">
                                        {property.title}
                                    </h2>

                                    <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400">
                                        {property.status}
                                    </span>
                                </div>

                                <p className="mb-3 text-sm text-slate-400">
                                    {property.location}
                                </p>

                                <p className="mb-4 text-xl font-bold text-blue-400">
                                    ${property.price.toLocaleString()}
                                </p>

                                <div className="mb-5 grid grid-cols-3 gap-2 text-center text-sm">
                                    <div className="rounded-lg bg-slate-800 p-2">
                                        <p className="font-semibold">

                                        </p>
                                        <p className="text-xs text-slate-400">
                                            Beds
                                        </p>
                                    </div>

                                    <div className="rounded-lg bg-slate-800 p-2">
                                        <p className="font-semibold">

                                        </p>
                                        <p className="text-xs text-slate-400">
                                            Baths
                                        </p>
                                    </div>

                                    <div className="rounded-lg bg-slate-800 p-2">
                                        <p className="font-semibold">
                                            {property.size}
                                        </p>
                                        <p className="text-xs text-slate-400">
                                            Area
                                        </p>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-3">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            navigate(`/seller/edit-property?id=${property.id}`)
                                        }}
                                        className="flex-1 rounded-lg border border-slate-700 px-4 py-2 text-sm font-medium transition hover:bg-slate-800"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleDelete(property.id)}
                                        className="flex-1 rounded-lg border border-red-500/30 px-4 py-2 text-sm font-medium text-red-400 transition hover:bg-red-500/10"
                                    >
                                        Delete
                                    </button>
                                </div>

                            </div>
                        </div>
                    ))}

                </div>
            </main>
        </div>
    )
}

export default MyProperties