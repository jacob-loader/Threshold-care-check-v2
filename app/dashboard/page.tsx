'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { toast } from 'react-hot-toast'

interface LovedOne {
  id: string
  name: string
  phoneNumber: string
  lastCheckIn: string | null
  nextCheckIn: string | null
}

interface CheckIn {
  id: string
  lovedOneId: string
  status: 'pending' | 'completed' | 'missed'
  scheduledFor: string
  completedAt: string | null
}

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [lovedOnes, setLovedOnes] = useState<LovedOne[]>([])
  const [upcomingCheckIns, setUpcomingCheckIns] = useState<CheckIn[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [lovedOnesResponse, checkInsResponse] = await Promise.all([
          fetch('/api/loved-ones'),
          fetch('/api/check-ins/upcoming'),
        ])

        if (!lovedOnesResponse.ok || !checkInsResponse.ok) {
          throw new Error('Failed to fetch dashboard data')
        }

        const [lovedOnesData, checkInsData] = await Promise.all([
          lovedOnesResponse.json(),
          checkInsResponse.json(),
        ])

        setLovedOnes(lovedOnesData)
        setUpcomingCheckIns(checkInsData)
      } catch (error) {
        toast.error('Failed to load dashboard data')
      } finally {
        setIsLoading(false)
      }
    }

    if (status === 'authenticated') {
      fetchDashboardData()
    }
  }, [status])

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen bg-secondary flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-secondary">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-primary">Dashboard</h1>
            <Link
              href="/loved-ones/new"
              className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Add Loved One
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Loved Ones Section */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Loved Ones</h2>
              {lovedOnes.length === 0 ? (
                <p className="text-gray-500">No loved ones added yet.</p>
              ) : (
                <div className="space-y-4">
                  {lovedOnes.map((lovedOne) => (
                    <div
                      key={lovedOne.id}
                      className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-gray-900">{lovedOne.name}</h3>
                          <p className="text-sm text-gray-500">{lovedOne.phoneNumber}</p>
                        </div>
                        <Link
                          href={`/loved-ones/${lovedOne.id}`}
                          className="text-primary hover:text-primary/80 text-sm"
                        >
                          View Details
                        </Link>
                      </div>
                      <div className="mt-2 text-sm text-gray-500">
                        <p>Last Check-in: {lovedOne.lastCheckIn || 'Never'}</p>
                        <p>Next Check-in: {lovedOne.nextCheckIn || 'Not scheduled'}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Upcoming Check-ins Section */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Check-ins</h2>
              {upcomingCheckIns.length === 0 ? (
                <p className="text-gray-500">No upcoming check-ins.</p>
              ) : (
                <div className="space-y-4">
                  {upcomingCheckIns.map((checkIn) => (
                    <div
                      key={checkIn.id}
                      className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-gray-900">
                            {lovedOnes.find((lo) => lo.id === checkIn.lovedOneId)?.name}
                          </h3>
                          <p className="text-sm text-gray-500">
                            Scheduled for: {new Date(checkIn.scheduledFor).toLocaleString()}
                          </p>
                        </div>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            checkIn.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : checkIn.status === 'completed'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {checkIn.status.charAt(0).toUpperCase() + checkIn.status.slice(1)}
                        </span>
                      </div>
                      {checkIn.status === 'pending' && (
                        <div className="mt-2">
                          <Link
                            href={`/check-ins/${checkIn.id}`}
                            className="text-primary hover:text-primary/80 text-sm"
                          >
                            Complete Check-in
                          </Link>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 