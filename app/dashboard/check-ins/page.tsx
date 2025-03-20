'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import { format } from 'date-fns'

interface CheckIn {
  id: string
  status: 'PENDING' | 'COMPLETED' | 'MISSED'
  scheduledFor: string
  completedAt: string | null
  location: string | null
  missedReason: string | null
  lovedOne: {
    id: string
    name: string
  }
}

export default function CheckIns() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [checkIns, setCheckIns] = useState<CheckIn[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed' | 'missed'>('upcoming')

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  useEffect(() => {
    const fetchCheckIns = async () => {
      try {
        const response = await fetch('/api/check-ins')
        if (!response.ok) {
          throw new Error('Failed to fetch check-ins')
        }
        const data = await response.json()
        setCheckIns(data)
      } catch (error) {
        toast.error('Failed to load check-ins')
      } finally {
        setIsLoading(false)
      }
    }

    if (status === 'authenticated') {
      fetchCheckIns()
    }
  }, [status])

  const handleCompleteCheckIn = async (checkInId: string) => {
    try {
      const response = await fetch(`/api/check-ins/${checkInId}/complete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          location: 'Home', // In a real app, this would come from GPS
          latitude: 0,
          longitude: 0,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to complete check-in')
      }

      const updatedCheckIn = await response.json()
      setCheckIns((prev) =>
        prev.map((checkIn) =>
          checkIn.id === checkInId ? updatedCheckIn : checkIn
        )
      )
      toast.success('Check-in completed successfully')
    } catch (error) {
      toast.error('Failed to complete check-in')
    }
  }

  const handleMissCheckIn = async (checkInId: string) => {
    try {
      const response = await fetch(`/api/check-ins/${checkInId}/miss`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reason: 'Unable to check in at this time',
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to mark check-in as missed')
      }

      const updatedCheckIn = await response.json()
      setCheckIns((prev) =>
        prev.map((checkIn) =>
          checkIn.id === checkInId ? updatedCheckIn : checkIn
        )
      )
      toast.success('Check-in marked as missed')
    } catch (error) {
      toast.error('Failed to mark check-in as missed')
    }
  }

  const filteredCheckIns = checkIns.filter((checkIn) => {
    switch (activeTab) {
      case 'upcoming':
        return checkIn.status === 'PENDING'
      case 'completed':
        return checkIn.status === 'COMPLETED'
      case 'missed':
        return checkIn.status === 'MISSED'
      default:
        return true
    }
  })

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen bg-secondary flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-secondary py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h1 className="text-3xl font-bold text-primary mb-8">Check-ins</h1>

          {/* Tabs */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="-mb-px flex space-x-8">
              {(['upcoming', 'completed', 'missed'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`${
                    activeTab === tab
                      ? 'border-primary text-primary'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm capitalize`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          {/* Check-ins List */}
          <div className="space-y-4">
            {filteredCheckIns.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                No {activeTab} check-ins found.
              </p>
            ) : (
              filteredCheckIns.map((checkIn) => (
                <div
                  key={checkIn.id}
                  className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {checkIn.lovedOne.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Scheduled for: {format(new Date(checkIn.scheduledFor), 'PPP p')}
                      </p>
                      {checkIn.completedAt && (
                        <p className="text-sm text-gray-500">
                          Completed at: {format(new Date(checkIn.completedAt), 'PPP p')}
                        </p>
                      )}
                      {checkIn.location && (
                        <p className="text-sm text-gray-500">
                          Location: {checkIn.location}
                        </p>
                      )}
                      {checkIn.missedReason && (
                        <p className="text-sm text-red-500">
                          Reason: {checkIn.missedReason}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          checkIn.status === 'PENDING'
                            ? 'bg-yellow-100 text-yellow-800'
                            : checkIn.status === 'COMPLETED'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {checkIn.status.charAt(0).toUpperCase() + checkIn.status.slice(1).toLowerCase()}
                      </span>
                      {checkIn.status === 'PENDING' && (
                        <>
                          <button
                            onClick={() => handleCompleteCheckIn(checkIn.id)}
                            className="text-green-600 hover:text-green-800"
                          >
                            Complete
                          </button>
                          <button
                            onClick={() => handleMissCheckIn(checkIn.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            Miss
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 