'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export default function NewLovedOne() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    dateOfBirth: '',
    checkInSchedule: {
      time: '',
      days: [] as string[],
    },
  })

  const daysOfWeek = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      // TODO: Implement API call to create loved one
      toast.success('Loved one added successfully!')
      router.push('/dashboard')
    } catch (error) {
      toast.error('Failed to add loved one. Please try again.')
    }
  }

  const toggleDay = (day: string) => {
    setFormData((prev) => ({
      ...prev,
      checkInSchedule: {
        ...prev.checkInSchedule,
        days: prev.checkInSchedule.days.includes(day)
          ? prev.checkInSchedule.days.filter((d) => d !== day)
          : [...prev.checkInSchedule.days, day],
      },
    }))
  }

  return (
    <div className="min-h-screen bg-secondary py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold text-primary mb-6">Add New Loved One</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent sm:text-sm"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent sm:text-sm"
                value={formData.phoneNumber}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">
                Date of Birth
              </label>
              <input
                type="date"
                id="dateOfBirth"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent sm:text-sm"
                value={formData.dateOfBirth}
                onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Check-in Schedule
              </label>
              <div className="space-y-4">
                <div>
                  <label htmlFor="checkInTime" className="block text-sm text-gray-600">
                    Check-in Time
                  </label>
                  <input
                    type="time"
                    id="checkInTime"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent sm:text-sm"
                    value={formData.checkInSchedule.time}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        checkInSchedule: {
                          ...formData.checkInSchedule,
                          time: e.target.value,
                        },
                      })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-2">Check-in Days</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {daysOfWeek.map((day) => (
                      <label
                        key={day}
                        className="flex items-center space-x-2 p-2 border rounded-md cursor-pointer hover:bg-gray-50"
                      >
                        <input
                          type="checkbox"
                          checked={formData.checkInSchedule.days.includes(day)}
                          onChange={() => toggleDay(day)}
                          className="rounded border-gray-300 text-accent focus:ring-accent"
                        />
                        <span className="text-sm text-gray-700">{day}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button type="submit" className="btn-primary">
                Add Loved One
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
} 