'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FaSms, FaMapMarkerAlt, FaUsers, FaCalendarAlt, FaHeart, FaGift } from 'react-icons/fa'

const features = [
  {
    icon: <FaSms className="w-8 h-8" />,
    title: 'SMS Check-ins',
    description: 'Simple, reliable SMS-based check-ins that work on any phone without requiring app installation.',
    color: 'bg-blue-100 text-blue-600',
  },
  {
    icon: <FaMapMarkerAlt className="w-8 h-8" />,
    title: 'Location Tracking',
    description: 'Know your loved one\'s location at check-in time for added peace of mind.',
    color: 'bg-green-100 text-green-600',
  },
  {
    icon: <FaUsers className="w-8 h-8" />,
    title: 'Circle of Care',
    description: 'Invite family members and healthcare providers to stay informed and involved.',
    color: 'bg-purple-100 text-purple-600',
  },
  {
    icon: <FaCalendarAlt className="w-8 h-8" />,
    title: 'Smart Scheduling',
    description: 'Set up flexible check-in schedules and receive reminders for upcoming check-ins.',
    color: 'bg-orange-100 text-orange-600',
  },
  {
    icon: <FaHeart className="w-8 h-8" />,
    title: 'Positive Affirmations',
    description: 'Send encouraging messages and special occasion reminders to show your care.',
    color: 'bg-red-100 text-red-600',
  },
  {
    icon: <FaGift className="w-8 h-8" />,
    title: 'Gift Marketplace',
    description: 'Access a curated marketplace to send flowers, gifts, and care packages.',
    color: 'bg-pink-100 text-pink-600',
  },
]

export default function Preview() {
  const [activeFeature, setActiveFeature] = useState(0)

  return (
    <div className="min-h-screen bg-secondary">
      {/* Hero Section */}
      <section className="relative bg-primary text-white py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/90 to-primary/70" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Threshold Care Check
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              A free SMS-based check-in system that helps caregivers stay connected with their loved ones through simple, reliable communication.
            </p>
            <div className="space-x-4">
              <Link href="/register" className="btn-secondary">
                Get Started Free
              </Link>
              <Link href="/about" className="btn-primary">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-primary mb-4">
              Features That Matter
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to stay connected with your loved ones, all in one place.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className={`card transform transition-all duration-300 hover:scale-105 cursor-pointer ${
                  activeFeature === index ? 'ring-2 ring-accent' : ''
                }`}
                onClick={() => setActiveFeature(index)}
              >
                <div className={`${feature.color} w-16 h-16 rounded-full flex items-center justify-center mb-4`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-primary mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-primary mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Simple steps to start caring for your loved ones
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-accent text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold text-primary mb-2">
                Create Your Account
              </h3>
              <p className="text-gray-600">
                Sign up for free and add your loved ones to your care circle
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-accent text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold text-primary mb-2">
                Set Up Check-ins
              </h3>
              <p className="text-gray-600">
                Configure check-in schedules and customize your preferences
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-accent text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold text-primary mb-2">
                Stay Connected
              </h3>
              <p className="text-gray-600">
                Receive updates and maintain peace of mind through regular check-ins
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary text-white rounded-2xl p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of caregivers who trust Threshold Care Check to stay connected with their loved ones.
            </p>
            <Link href="/register" className="btn-secondary">
              Create Your Free Account
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
} 