import { useEffect, useState, type FormEvent } from 'react'
import { useSearchParams } from 'react-router-dom'

import {
  getPropertyById,
  updateProperty,
} from '../../api/propertyApi'

import type {
  CreatePropertyRequest,
  PropertyType,
} from '../../types/property'

function EditProperty() {
  const [searchParams] = useSearchParams()
  const propertyId = Number(searchParams.get('id'))

  const [formData, setFormData] =
    useState<CreatePropertyRequest | null>(null)

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    const fetchProperty = async () => {
      if (!propertyId) {
        setError('Invalid property ID.')
        setLoading(false)
        return
      }

      try {
        const property = await getPropertyById(propertyId)

        setFormData({
          title: property.title,
          //description: property.description,
          location: property.location,
          price: property.price,
          propertyType: property.type,
          size: property.size ?? 0,
          ownerId: property.ownerId,
          agentId: property.agentId ?? 0,
          propertyStatus: property.status,
          imageUrls: property.imageUrls ?? '',
        })
      } catch (error) {
        console.error(error)
        setError('Failed to load property.')
      } finally {
        setLoading(false)
      }
    }

    fetchProperty()
  }, [propertyId])

  const handleChange = (
    field: keyof CreatePropertyRequest,
    value: string | number
  ) => {
    setFormData((previous) =>
      previous
        ? {
            ...previous,
            [field]: value,
          }
        : previous
    )
  }

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()

    if (!formData || !propertyId) {
      return
    }

    setError('')
    setSuccess('')
    setSaving(true)

    try {
      await updateProperty(propertyId, formData)

      setSuccess('Property updated successfully.')
    } catch (error) {
      console.error(error)
      setError('Failed to update property.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        <p className="text-slate-400">
          Loading property...
        </p>
      </div>
    )
  }

  if (!formData) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        <p className="text-red-400">
          {error || 'Property not found.'}
        </p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      <header className="border-b border-slate-800 bg-slate-900">
        <div className="mx-auto max-w-5xl px-6 py-5">
          <h1 className="text-2xl font-bold">
            Edit Property
          </h1>

          <p className="mt-1 text-sm text-slate-400">
            Update your property listing
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-8">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl md:p-8">

          {error && (
            <div className="mb-6 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-6 rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-400">
              {success}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            {/* Title */}
            <div>
              <label
                htmlFor="title"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Property Title
              </label>

              <input
                id="title"
                type="text"
                value={formData.title}
                onChange={(event) =>
                  handleChange('title', event.target.value)
                }
                required
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-blue-500"
              />
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Description
              </label>

              <textarea
                id="description"
                value={formData.description}
                onChange={(event) =>
                  handleChange(
                    'description',
                    event.target.value
                  )
                }
                rows={5}
                required
                className="w-full resize-none rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-blue-500"
              />
            </div>

            {/* Location */}
            <div>
              <label
                htmlFor="location"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Location
              </label>

              <input
                id="location"
                type="text"
                value={formData.location}
                onChange={(event) =>
                  handleChange(
                    'location',
                    event.target.value
                  )
                }
                required
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-blue-500"
              />
            </div>

            {/* Price + Type */}
            <div className="grid gap-6 md:grid-cols-2">

              <div>
                <label
                  htmlFor="price"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Price
                </label>

                <input
                  id="price"
                  type="number"
                  min="0"
                  value={formData.price}
                  onChange={(event) =>
                    handleChange(
                      'price',
                      Number(event.target.value)
                    )
                  }
                  required
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="propertyType"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Property Type
                </label>

                <select
                  id="propertyType"
                  value={formData.propertyType}
                  onChange={(event) =>
                    handleChange(
                      'propertyType',
                      event.target.value as PropertyType
                    )
                  }
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-blue-500"
                >
                  <option value="HOUSE">House</option>
                  <option value="APARTMENT">
                    Apartment
                  </option>
                  <option value="LAND">Land</option>
                  <option value="COMMERCIAL">
                    Commercial
                  </option>
                </select>
              </div>

            </div>

            {/* Bedrooms / Bathrooms / Area */}
            <div className="grid gap-6 md:grid-cols-3">

              <div>
                <label
                  htmlFor="bedrooms"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Bedrooms
                </label>

                {/* <input
                  id="bedrooms"
                  type="number"
                  min="0"
                  value={formData.bedroom}
                  onChange={(event) =>
                    handleChange(
                      'bedrooms',
                      Number(event.target.value)
                    )
                  }
                  required
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-blue-500"
                /> */}
              </div>

              <div>
                <label
                  htmlFor="bathrooms"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Bathrooms
                </label>

               
              </div>

              <div>
                <label
                  htmlFor="area"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Area
                </label>

                <input
                  id="area"
                  type="number"
                  min="0"
                  value={formData.size}
                  onChange={(event) =>
                    handleChange(
                      'size',
                      Number(event.target.value)
                    )
                  }
                  required
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-blue-500"
                />
              </div>

            </div>

            {/* Image URL */}
            <div>
              <label
                htmlFor="imageUrl"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Image URL
              </label>

              <input
                id="imageUrl"
                type="url"
                value={formData.imageUrls ?? ''}
                onChange={(event) =>
                  handleChange(
                    'imageUrls',
                    event.target.value
                  )
                }
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving
                ? 'Updating Property...'
                : 'Update Property'}
            </button>

          </form>
        </div>
      </main>
    </div>
  )
}

export default EditProperty