"use client"

import { useState, useEffect } from "react"
import { View, Text, StyleSheet, Modal, Image } from "react-native"
import { Button } from "react-native-paper"
import { Ionicons } from "@expo/vector-icons"
import { useAuth } from "../context/AuthContext"

export function MissedCheckInFlow({ visible, onClose, checkInTime, onCheckIn }) {
  const { user } = useAuth()
  const [stage, setStage] = useState("initial") // initial, calling, connected, failed
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
    let interval

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

    return () => clearInterval(interval)
  }, [visible, stage])

  const handleManualCheckIn = () => {
    onCheckIn()
    onClose()
  }

  const renderContent = () => {
    switch (stage) {
      case "initial":
        return (
          <>
            <View style={styles.iconContainer}>
              <Ionicons name="alert-circle" size={48} color="#f59e0b" />
            </View>
            <Text style={styles.title}>Missed Check-in</Text>
            <Text style={styles.time}>You missed your scheduled check-in at {checkInTime}</Text>
            <Text style={styles.description}>
              Please confirm you're okay by checking in now, or our system will initiate the verification process.
            </Text>
            <View style={styles.countdownContainer}>
              <Text style={styles.countdownText}>
                AI call will begin in: <Text style={styles.countdown}>{countdown}s</Text>
              </Text>
            </View>
            <Button mode="contained" style={styles.checkInButton} onPress={handleManualCheckIn}>
              I'm OK - Check In Now
            </Button>
          </>
        )

      case "calling":
        return (
          <>
            <View style={styles.callingAnimation}>
              <Image source={require("../assets/calling-animation.gif")} style={styles.callingImage} />
            </View>
            <Text style={styles.title}>AI Assistant Calling</Text>
            <Text style={styles.description}>Our AI assistant is calling your phone to verify you're okay.</Text>
            <Text style={styles.callingText}>Please answer your phone</Text>
            <Button mode="outlined" style={styles.cancelButton} onPress={handleManualCheckIn}>
              Cancel and Check In
            </Button>
          </>
        )

      case "connected":
        return (
          <>
            <View style={styles.iconContainer}>
              <Ionicons name="checkmark-circle" size={48} color="#10b981" />
            </View>
            <Text style={styles.title}>Call Verified</Text>
            <Text style={styles.description}>
              You've successfully verified your well-being through our AI assistant call.
            </Text>
            <Text style={styles.successText}>Your circle of care has been notified that you're okay.</Text>
            <Button mode="contained" style={styles.closeButton} onPress={onClose}>
              Close
            </Button>
          </>
        )

      case "failed":
        return (
          <>
            <View style={styles.iconContainer}>
              <Ionicons name="warning" size={48} color="#ef4444" />
            </View>
            <Text style={styles.title}>Call Not Answered</Text>
            <Text style={styles.description}>
              You didn't answer our AI verification call. Your circle of care has been notified.
            </Text>
            <Text style={styles.warningText}>
              If you're seeing this and you're okay, please check in immediately to let your caregivers know.
            </Text>
            <Button mode="contained" style={styles.emergencyCheckInButton} onPress={handleManualCheckIn}>
              I'm OK - Check In Now
            </Button>
          </>
        )
    }
  }

  return (
    <Modal visible={visible} transparent={true} animationType="fade" onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>{renderContent()}</View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "85%",
    backgroundColor: "white",
    borderRadius: 12,
    padding: 24,
    alignItems: "center",
  },
  iconContainer: {
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0f172a",
    marginBottom: 8,
    textAlign: "center",
  },
  time: {
    fontSize: 16,
    color: "#64748b",
    marginBottom: 16,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: "#334155",
    marginBottom: 16,
    textAlign: "center",
    lineHeight: 22,
  },
  countdownContainer: {
    backgroundColor: "#f1f5f9",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  countdownText: {
    fontSize: 14,
    color: "#64748b",
  },
  countdown: {
    fontWeight: "bold",
    color: "#f59e0b",
  },
  checkInButton: {
    backgroundColor: "#0f172a",
    width: "100%",
  },
  callingAnimation: {
    width: 120,
    height: 120,
    marginBottom: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  callingImage: {
    width: 120,
    height: 120,
  },
  callingText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#0f172a",
    marginBottom: 24,
  },
  cancelButton: {
    borderColor: "#0f172a",
    width: "100%",
  },
  successText: {
    fontSize: 16,
    color: "#10b981",
    fontWeight: "500",
    marginBottom: 24,
    textAlign: "center",
  },
  closeButton: {
    backgroundColor: "#0f172a",
    width: "100%",
  },
  warningText: {
    fontSize: 16,
    color: "#ef4444",
    fontWeight: "500",
    marginBottom: 24,
    textAlign: "center",
  },
  emergencyCheckInButton: {
    backgroundColor: "#ef4444",
    width: "100%",
  },
})

