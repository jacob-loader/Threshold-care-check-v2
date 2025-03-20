'use client'

import { useState } from 'react'
import { MissedCheckInFlow } from '../components/MissedCheckInFlow'

export default function Demo() {
  const [showFlow, setShowFlow] = useState(false)

  const handleCheckIn = () => {
    console.log('Check-in successful')
    setShowFlow(false)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-primary mb-8">Missed Check-in Flow Demo</h1>
      
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Test the Missed Check-in Flow</h2>
        <p className="text-gray-600 mb-6">
          Click the button below to simulate a missed check-in scenario. The flow will show different states
          based on whether the user has premium features enabled.
        </p>
        
        <button
          onClick={() => setShowFlow(true)}
          className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
        >
          Show Missed Check-in Flow
        </button>
      </div>

      <MissedCheckInFlow
        visible={showFlow}
        onClose={() => setShowFlow(false)}
        checkInTime="2:00 PM"
        onCheckIn={handleCheckIn}
      />
    </div>
  )
} 