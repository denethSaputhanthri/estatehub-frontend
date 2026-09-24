import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import DashboardLayout from '../../components/common/DashboardLayout'
import { getPropertyById } from '../../api/propertyApi'
import { createInquiry } from '../../api/inquiryApi'

import type { Property } from '../../types/property'

function PropertyDetails() {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()

    const [message, setMessage] = useState('')
    const [submitting, setSubmitting] = useState(false)
    const [inquirySuccess, setInquirySuccess] = useState('')
    const [inquiryError, setInquiryError] = useState('')

    const [property, setProperty] = useState<Property | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [selectedImage, setSelectedImage] = useState(0)

    const handleSubmitInquiry = async () => {
        if (!property) return

        if (!message.trim()) {
            setInquiryError('Please enter a message.')
            return
        }

        try {
            setSubmitting(true)
            setInquirySuccess('')
            setInquiryError('')

            await createInquiry({
                propertyId: property.id,
                message: message.trim(),
            })

            setMessage('')
            setInquirySuccess('Your inquiry has been submitted successfully.')
        } catch (error) {
            console.error(error)
            setInquiryError('Failed to submit inquiry. Please try again.')
        } finally {
            setSubmitting(false)
        }
    }

    useEffect(() => {
        const fetchProperty = async () => {
            if (!id) {
                setError('Property ID is missing.')
                setLoading(false)
                return
            }

            try {
                setLoading(true)

                const data = await getPropertyById(Number(id))

                setProperty(data)
            } catch (error) {
                console.error(error)
                setError('Failed to load property.')
            } finally {
                setLoading(false)
            }
        }

        fetchProperty()
    }, [id])

    if (loading) {
        return (
            <DashboardLayout>
                <p className="text-slate-400">
                    Loading property...
                </p>
            </DashboardLayout>
        )
    }

    if (error || !property) {
        return (
            <DashboardLayout>
                <div className="rounded-xl border border-red-800 bg-red-950 p-6">
                    <p className="text-red-400">
                        {error || 'Property not found.'}
                    </p>

                    <button
                        onClick={() => navigate('/customer/properties')}
                        className="mt-4 rounded-lg bg-slate-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-600"
                    >
                        Back to Properties
                    </button>
                </div>
            </DashboardLayout>
        )
    }

    return (
        <DashboardLayout>
            <div>
                <button
                    onClick={() => navigate('/customer/properties')}
                    className="mb-6 text-sm text-blue-400 transition hover:text-blue-300"
                >
                    ← Back to Properties
                </button>

                <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900">
                    {property.imageUrls.length > 0 ? (
                        <div>
                            <img
                                src={property.imageUrls[selectedImage]}
                                alt={property.title}
                                className="h-96 w-full object-cover"
                            />

                            {property.imageUrls.length > 1 && (
                                <div className="flex gap-3 overflow-x-auto bg-slate-950 p-4">
                                    {property.imageUrls.map((imageUrl, index) => (
                                        <button
                                            key={imageUrl}
                                            type="button"
                                            onClick={() => setSelectedImage(index)}
                                            className={`h-20 w-24 flex-shrink-0 overflow-hidden rounded-lg border-2 transition ${selectedImage === index
                                                ? 'border-blue-500'
                                                : 'border-slate-700 hover:border-slate-500'
                                                }`}
                                        >
                                            <img
                                                src={imageUrl}
                                                alt={`${property.title} ${index + 1}`}
                                                className="h-full w-full object-cover"
                                            />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="flex h-96 items-center justify-center bg-slate-800">
                            <span className="text-slate-500">
                                No Image Available
                            </span>
                        </div>
                    )}

                    <div className="p-8">
                        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                            <div>
                                <h1 className="text-3xl font-bold text-white">
                                    {property.title}
                                </h1>

                                <p className="mt-2 text-slate-400">
                                    {property.location}
                                </p>
                            </div>

                            <span className="w-fit rounded-full bg-green-950 px-4 py-2 text-sm font-medium text-green-400">
                                {property.status}
                            </span>
                        </div>

                        <div className="mt-8 grid gap-6 md:grid-cols-3">
                            <div className="rounded-lg bg-slate-800 p-5">
                                <p className="text-sm text-slate-400">
                                    Price
                                </p>

                                <p className="mt-2 text-xl font-bold text-white">
                                    Rs. {property.price.toLocaleString()}
                                </p>
                            </div>

                            <div className="rounded-lg bg-slate-800 p-5">
                                <p className="text-sm text-slate-400">
                                    Property Type
                                </p>

                                <p className="mt-2 text-xl font-bold text-white">
                                    {property.type}
                                </p>
                            </div>

                            <div className="rounded-lg bg-slate-800 p-5">
                                <p className="text-sm text-slate-400">
                                    Size
                                </p>

                                <p className="mt-2 text-xl font-bold text-white">
                                    {property.size !== null
                                        ? `${property.size} sq.ft`
                                        : 'Not specified'}
                                </p>
                            </div>
                        </div>
                        <div className="mt-8 rounded-xl border border-slate-800 bg-slate-900 p-6">
                            <h2 className="text-xl font-semibold text-white">
                                Send an Inquiry
                            </h2>

                            <p className="mt-1 text-sm text-slate-400">
                                Interested in this property? Send a message to the property team.
                            </p>

                            <div className="mt-5">
                                <textarea
                                    value={message}
                                    onChange={(event) => {
                                        setMessage(event.target.value)
                                        setInquiryError('')
                                        setInquirySuccess('')
                                    }}
                                    placeholder="Write your inquiry..."
                                    rows={5}
                                    maxLength={2000}
                                    className="w-full resize-none rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500"
                                />

                                <div className="mt-2 flex justify-between text-xs text-slate-500">
                                    <span>Maximum 2000 characters</span>
                                    <span>{message.length}/2000</span>
                                </div>
                            </div>

                            {inquiryError && (
                                <p className="mt-4 rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-400">
                                    {inquiryError}
                                </p>
                            )}

                            {inquirySuccess && (
                                <p className="mt-4 rounded-lg bg-green-500/10 px-4 py-3 text-sm text-green-400">
                                    {inquirySuccess}
                                </p>
                            )}

                            <button
                                onClick={handleSubmitInquiry}
                                disabled={submitting}
                                className="mt-5 rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {submitting ? 'Sending...' : 'Send Inquiry'}
                            </button>
                        </div>

                        <div className="mt-8">
                            <h2 className="text-xl font-semibold text-white">
                                Description
                            </h2>

                            <p className="mt-3 leading-7 text-slate-400">
                                {property.description ||
                                    'No description available.'}
                            </p>
                        </div>

                        <div className="mt-8 grid gap-4 border-t border-slate-800 pt-6 md:grid-cols-2">
                            <div>
                                <p className="text-sm text-slate-500">
                                    Owner ID
                                </p>

                                <p className="mt-1 text-white">
                                    {property.ownerId}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-slate-500">
                                    Agent ID
                                </p>

                                <p className="mt-1 text-white">
                                    {property.agentId ?? 'Not assigned'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}

export default PropertyDetails