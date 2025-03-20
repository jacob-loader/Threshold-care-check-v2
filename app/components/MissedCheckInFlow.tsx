'use client'

import { useState, useEffect } from "react"
import { useAuth } from "../context/AuthContext"

interface MissedCheckInFlowProps {
  visible: boolean
  onClose: () => void
  checkInTime: string
  onCheckIn: () => void
}

export function MissedCheckInFlow({ visible, onClose, checkInTime, onCheckIn }: MissedCheckInFlowProps) {
  const { user } = useAuth()
  const [stage, setStage] = useState<"initial" | "calling" | "connected" | "failed">("initial")
  const [countdown, setCountdown] = useState(30)

  useEffect(() => {
    if (visible && stage === "initial") {
      // If user has premium with AI calls enabled, start the calling process after a delay
      if (user?.isPremium && user?.aiCallEnabled) {
        const timer = setTimeout(() => {
          setStage("calling")

          // Simulate AI calling process
          setTimeout(() => {
            // In a real app, this would be based on whether the call was answered
            const callAnswered = Math.random() > 0.3 // 70% chance of success for demo

            if (callAnswered) {
              setStage("connected")
            } else {
              setStage("failed")
            }
          }, 5000)
        }, 3000)

        return () => clearTimeout(timer)
      }
    }
  }, [visible, stage, user])

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined

    if (visible && stage === "initial") {
      interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [visible, stage])

  const handleManualCheckIn = () => {
    onCheckIn()
    onClose()
  }

  if (!visible) return null

  const renderContent = () => {
    switch (stage) {
      case "initial":
        return (
          <>
            <div className="flex justify-center mb-4">
              <svg className="w-12 h-12 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">Missed Check-in</h2>
            <p className="text-gray-600 mb-4 text-center">You missed your scheduled check-in at {checkInTime}</p>
            <p className="text-gray-700 mb-4 text-center leading-relaxed">
              Please confirm you're okay by checking in now, or our system will initiate the verification process.
            </p>
            <div className="bg-gray-50 py-2 px-4 rounded-lg mb-4">
              <p className="text-gray-600 text-sm">
                AI call will begin in: <span className="font-bold text-amber-500">{countdown}s</span>
              </p>
            </div>
            <button
              onClick={handleManualCheckIn}
              className="w-full bg-gray-900 text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors"
            >
              I'm OK - Check In Now
            </button>
          </>
        )
      case "calling":
        return (
          <>
            <div className="flex justify-center mb-4">
              <svg className="w-12 h-12 text-blue-500 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">Initiating AI Call</h2>
            <p className="text-gray-600 mb-4 text-center">Please wait while we connect to your loved one...</p>
          </>
        )
      case "connected":
        return (
          <>
            <div className="flex justify-center mb-4">
              <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">Connected</h2>
            <p className="text-gray-600 mb-4 text-center">Successfully connected with your loved one.</p>
            <button
              onClick={handleManualCheckIn}
              className="w-full bg-gray-900 text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Complete Check-in
            </button>
          </>
        )
      case "failed":
        return (
          <>
            <div className="flex justify-center mb-4">
              <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">Connection Failed</h2>
            <p className="text-gray-600 mb-4 text-center">Unable to connect with your loved one.</p>
            <button
              onClick={handleManualCheckIn}
              className="w-full bg-gray-900 text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Check In Manually
            </button>
          </>
        )
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        {renderContent()}
      </div>
    </div>
  )
} 