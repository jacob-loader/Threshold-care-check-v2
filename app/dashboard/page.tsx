'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export default function Dashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('overview')

  // Mock data - replace with actual data from API
  const lovedOnes = [
    {
      id: 1,
      name: 'John Doe',
      lastCheckIn: '2024-02-20T10:30:00Z',
      nextCheckIn: '2024-02-20T15:00:00Z',
      status: 'active',
    },
    {
      id: 2,
      name: 'Jane Smith',
      lastCheckIn: '2024-02-20T09:15:00Z',
      nextCheckIn: '2024-02-20T14:00:00Z',
      status: 'active',
    },
  ]

  const handleAddLovedOne = () => {
    router.push('/dashboard/loved-ones/new')
  }

  return (
    <div className="min-h-screen bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-primary">Dashboard</h1>
          <button
            onClick={handleAddLovedOne}
            className="btn-primary"
          >
            Add Loved One
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            {['overview', 'loved-ones', 'check-ins', 'circle-of-care', 'gifts'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`${
                  activeTab === tab
                    ? 'border-accent text-accent'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm capitalize`}
              >
                {tab.replace('-', ' ')}
              </button>
            ))}
          </nav>
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-lg shadow p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-primary">Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="card">
                  <h3 className="text-lg font-medium text-primary mb-2">Active Loved Ones</h3>
                  <p className="text-3xl font-bold text-accent">{lovedOnes.length}</p>
                </div>
                <div className="card">
                  <h3 className="text-lg font-medium text-primary mb-2">Pending Check-ins</h3>
                  <p className="text-3xl font-bold text-accent">2</p>
                </div>
                <div className="card">
                  <h3 className="text-lg font-medium text-primary mb-2">Circle Members</h3>
                  <p className="text-3xl font-bold text-accent">5</p>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-semibold text-primary mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {lovedOnes.map((lovedOne) => (
                    <div
                      key={lovedOne.id}
                      className="flex items-center justify-between p-4 bg-secondary rounded-lg"
                    >
                      <div>
                        <h4 className="font-medium text-primary">{lovedOne.name}</h4>
                        <p className="text-sm text-gray-600">
                          Last check-in: {new Date(lovedOne.lastCheckIn).toLocaleString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">
                          Next check-in: {new Date(lovedOne.nextCheckIn).toLocaleString()}
                        </p>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Active
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'loved-ones' && (
            <div>
              <h2 className="text-2xl font-semibold text-primary mb-6">Loved Ones</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {lovedOnes.map((lovedOne) => (
                  <div key={lovedOne.id} className="card">
                    <h3 className="text-xl font-semibold text-primary mb-2">{lovedOne.name}</h3>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600">
                        Last check-in: {new Date(lovedOne.lastCheckIn).toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-600">
                        Next check-in: {new Date(lovedOne.nextCheckIn).toLocaleString()}
                      </p>
                    </div>
                    <div className="mt-4 flex space-x-2">
                      <button className="btn-secondary text-sm">Edit</button>
                      <button className="btn-primary text-sm">View Details</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'check-ins' && (
            <div>
              <h2 className="text-2xl font-semibold text-primary mb-6">Check-ins</h2>
              <div className="space-y-4">
                {/* Add check-in history and management interface */}
                <p className="text-gray-600">Check-in history and management interface coming soon...</p>
              </div>
            </div>
          )}

          {activeTab === 'circle-of-care' && (
            <div>
              <h2 className="text-2xl font-semibold text-primary mb-6">Circle of Care</h2>
              <div className="space-y-4">
                {/* Add circle of care management interface */}
                <p className="text-gray-600">Circle of care management interface coming soon...</p>
              </div>
            </div>
          )}

          {activeTab === 'gifts' && (
            <div>
              <h2 className="text-2xl font-semibold text-primary mb-6">Gift Marketplace</h2>
              <div className="space-y-4">
                {/* Add gift marketplace interface */}
                <p className="text-gray-600">Gift marketplace interface coming soon...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 