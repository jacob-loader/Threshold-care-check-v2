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
              <div className="relative w-24 h-24">
                <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-primary rounded-full animate-ping"></div>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">AI Assistant Calling</h2>
            <p className="text-gray-700 mb-4 text-center">Our AI assistant is calling your phone to verify you're okay.</p>
            <p className="text-gray-900 font-medium mb-6 text-center">Please answer your phone</p>
            <button
              onClick={handleManualCheckIn}
              className="w-full border-2 border-gray-900 text-gray-900 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel and Check In
            </button>
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
            <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">Call Verified</h2>
            <p className="text-gray-700 mb-4 text-center">
              You've successfully verified your well-being through our AI assistant call.
            </p>
            <p className="text-green-600 font-medium mb-6 text-center">
              Your circle of care has been notified that you're okay.
            </p>
            <button
              onClick={onClose}
              className="w-full bg-gray-900 text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Close
            </button>
          </>
        )

      case "failed":
        return (
          <>
            <div className="flex justify-center mb-4">
              <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">Call Not Answered</h2>
            <p className="text-gray-700 mb-4 text-center">
              You didn't answer our AI verification call. Your circle of care has been notified.
            </p>
            <p className="text-red-600 font-medium mb-6 text-center">
              If you're seeing this and you're okay, please check in immediately to let your caregivers know.
            </p>
            <button
              onClick={handleManualCheckIn}
              className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
            >
              I'm OK - Check In Now
            </button>
          </>
        )
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        {renderContent()}
      </div>
    </div>
  )
} 