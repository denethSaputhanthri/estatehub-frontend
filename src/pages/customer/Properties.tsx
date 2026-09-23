import { useEffect, useState } from "react"
import DashboardLayout from "../../components/common/DashboardLayout"
import { getAllProperties, searchProperties } from "../../api/propertyApi"
import type { Property } from "../../types/property"
import { useNavigate } from "react-router-dom"

function Properties() {
    const navigate = useNavigate()

    const [location, setLocation] = useState('')
    const [type, setType] = useState<Property['type'] | ''>('')
    const [status, setStatus] = useState<Property['status'] | ''>('')
    const [minPrice, setMinPrice] = useState('')
    const [maxPrice, setMaxPrice] = useState('')


    const [properties, setProperties] = useState<Property[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>('')
    const handleSearch = async () => {
        try {
            setLoading(true)
            const data = await searchProperties({
                location: location || undefined,
                type: type || undefined,
                status: status || undefined,
                minPrice: minPrice ? Number(minPrice) : undefined,
                maxPrice: maxPrice ? Number(maxPrice) : undefined
            })
            setProperties(data)
        } catch (error) {
            console.error("Error searching properties:", error)
            setError("Failed to search properties. Please try again later.")

        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {


        const fetchProperties = async () => {

            try {
                setLoading(true)
                const data = await getAllProperties()
                setProperties(data)
            } catch (error) {
                console.error("Error fetching properties:", error)
                setError("Failed to fetch properties. Please try again later.")
            } finally {
                setLoading(false)
            }
        }
        fetchProperties()
    }, [])

    return (
        <DashboardLayout>
            <div>
                <div>
                    <h1 className="text-3xl font-bold text-white">
                        Properties
                    </h1>

                    <p className="mt-2 text-slate-400">
                        Browse and search available properties.
                    </p>

                    <div className="mt-6 rounded-xl border border-slate-800 bg-slate-900 p-6">
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">

                            {/* Location */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-300">
                                    Location
                                </label>

                                <input
                                    type="text"
                                    value={location}
                                    onChange={(event) =>
                                        setLocation(event.target.value)
                                    }
                                    placeholder="e.g. Colombo"
                                    className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2.5 text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500"
                                />
                            </div>

                            {/* Property Type */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-300">
                                    Property Type
                                </label>

                                <select
                                    value={type}
                                    onChange={(event) =>
                                        setType(
                                            event.target.value as Property['type'] | ''
                                        )
                                    }
                                    className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2.5 text-white outline-none focus:border-blue-500"
                                >
                                    <option value="">All Types</option>
                                    <option value="HOUSE">House</option>
                                    <option value="APARTMENT">Apartment</option>
                                    <option value="LAND">Land</option>
                                    <option value="COMMERCIAL">Commercial</option>
                                </select>
                            </div>

                            {/* Status */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-300">
                                    Status
                                </label>

                                <select
                                    value={status}
                                    onChange={(event) =>
                                        setStatus(
                                            event.target.value as Property['status'] | ''
                                        )
                                    }
                                    className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2.5 text-white outline-none focus:border-blue-500"
                                >
                                    <option value="">All Statuses</option>
                                    <option value="AVAILABLE">Available</option>
                                    <option value="PENDING">Pending</option>
                                    <option value="SOLD">Sold</option>
                                    <option value="RENTED">Rented</option>
                                </select>
                            </div>

                            {/* Minimum Price */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-300">
                                    Min Price
                                </label>

                                <input
                                    type="number"
                                    value={minPrice}
                                    onChange={(event) =>
                                        setMinPrice(event.target.value)
                                    }
                                    placeholder="Minimum"
                                    min="0"
                                    className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2.5 text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500"
                                />
                            </div>

                            {/* Maximum Price */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-300">
                                    Max Price
                                </label>

                                <input
                                    type="number"
                                    value={maxPrice}
                                    onChange={(event) =>
                                        setMaxPrice(event.target.value)
                                    }
                                    placeholder="Maximum"
                                    min="0"
                                    className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2.5 text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500"
                                />
                            </div>
                        </div>

                        <div className="mt-5 flex gap-3">
                            <button
                                type="button"
                                onClick={handleSearch}
                                disabled={loading}
                                className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {loading ? 'Searching...' : 'Search'}
                            </button>

                            <button
                                type="button"
                                onClick={() => {
                                    setLocation('')
                                    setType('')
                                    setStatus('')
                                    setMinPrice('')
                                    setMaxPrice('')

                                    const fetchProperties = async () => {
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

                                    fetchProperties()
                                }}
                                className="rounded-lg border border-slate-700 px-5 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white"
                            >
                                Clear Filters
                            </button>
                        </div>
                    </div>
                </div>

                {loading && (
                    <p className="mt-8 text-slate-400">
                        Loading properties...
                    </p>
                )}

                {error && (
                    <div className="mt-8 rounded-lg border border-red-800 bg-red-950 p-4 text-red-400">
                        {error}
                    </div>
                )}

                {!loading && !error && properties.length === 0 && (
                    <div className="mt-8 rounded-xl border border-slate-800 bg-slate-900 p-8 text-center">
                        <p className="text-slate-400">
                            No properties available.
                        </p>
                    </div>
                )}

                {!loading && !error && properties.length > 0 && (
                    <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {properties.map((property) => (
                            <button
                                key={property.id}
                                type="button"
                                onClick={() =>
                                    navigate(`/customer/properties/${property.id}`)
                                }
                                className="w-full overflow-hidden rounded-xl border border-slate-800 bg-slate-900 text-left transition hover:-translate-y-1 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/10"
                            >
                                {property.imageUrls.length > 0 ? (
                                    <img
                                        src={property.imageUrls[0]}
                                        alt={property.title}
                                        className="h-48 w-full object-cover"
                                    />
                                ) : (
                                    <div className="flex h-48 items-center justify-center bg-slate-800">
                                        <span className="text-slate-500">
                                            No Image
                                        </span>
                                    </div>
                                )}

                                <div className="p-6">
                                    <div className="flex items-start justify-between gap-4">
                                        <h2 className="text-lg font-semibold text-white">
                                            {property.title}
                                        </h2>

                                        <span className="rounded-full bg-green-950 px-3 py-1 text-xs font-medium text-green-400">
                                            {property.status}
                                        </span>
                                    </div>

                                    <p className="mt-2 text-sm text-slate-400">
                                        {property.location}
                                    </p>

                                    <p className="mt-4 text-xl font-bold text-white">
                                        Rs. {property.price.toLocaleString()}
                                    </p>

                                    <div className="mt-4 flex gap-4 text-sm text-slate-400">
                                        <span>{property.type}</span>

                                        {property.size !== null && (
                                            <span>{property.size} sq.ft</span>
                                        )}
                                    </div>

                                    {property.description && (
                                        <p className="mt-4 line-clamp-2 text-sm text-slate-400">
                                            {property.description}
                                        </p>
                                    )}
                                </div>
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </DashboardLayout>
    )
}
export default Properties