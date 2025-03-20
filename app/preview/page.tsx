'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FaBell, FaUserFriends, FaMapMarkerAlt, FaShieldAlt, FaMobileAlt, FaChartLine } from 'react-icons/fa'

const features = [
  {
    icon: FaBell,
    title: 'Automated Check-ins',
    description: 'Set up regular check-ins with your loved ones and receive notifications when they need attention.',
    color: 'text-blue-500',
  },
  {
    icon: FaUserFriends,
    title: 'Family Management',
    description: 'Easily manage multiple loved ones and their check-in schedules in one place.',
    color: 'text-green-500',
  },
  {
    icon: FaMapMarkerAlt,
    title: 'Location Tracking',
    description: 'Know where your loved ones are during check-ins with secure location sharing.',
    color: 'text-purple-500',
  },
  {
    icon: FaShieldAlt,
    title: 'Privacy First',
    description: 'Your data is encrypted and secure. We never share your information with third parties.',
    color: 'text-red-500',
  },
  {
    icon: FaMobileAlt,
    title: 'Mobile Friendly',
    description: 'Access Threshold Care from any device with our responsive mobile-first design.',
    color: 'text-yellow-500',
  },
  {
    icon: FaChartLine,
    title: 'Health Insights',
    description: 'Track patterns and get insights about your loved ones\' well-being over time.',
    color: 'text-indigo-500',
  },
]

const PreviewPage = () => {
  const [activeFeature, setActiveFeature] = useState(0)

  return (
    <div className="min-h-screen bg-secondary">
      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Peace of Mind for</span>
              <span className="block text-primary">Your Loved Ones</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Threshold Care helps you stay connected with your loved ones through automated check-ins and real-time updates.
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md shadow">
                <Link
                  href="/register"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary-dark md:py-4 md:text-lg md:px-10"
                >
                  Get Started
                </Link>
              </div>
              <div className="mt-3 sm:mt-0 sm:ml-3">
                <Link
                  href="/login"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-primary font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to stay connected
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className={`cursor-pointer p-6 rounded-lg border-2 transition-all ${
                    activeFeature === index
                      ? 'border-primary bg-primary/5'
                      : 'border-gray-200 hover:border-primary/50'
                  }`}
                  onClick={() => setActiveFeature(index)}
                >
                  <feature.icon className={`h-8 w-8 ${feature.color} mb-4`} />
                  <h3 className="text-lg font-medium text-gray-900">{feature.title}</h3>
                  <p className="mt-2 text-base text-gray-500">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-primary font-semibold tracking-wide uppercase">How It Works</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Simple and effective
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                  1
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Create an account</p>
                <p className="mt-2 ml-16 text-base text-gray-500">
                  Sign up and add your loved ones to your account.
                </p>
              </div>

              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                  2
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Set up check-ins</p>
                <p className="mt-2 ml-16 text-base text-gray-500">
                  Configure check-in schedules for each loved one.
                </p>
              </div>

              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                  3
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Stay connected</p>
                <p className="mt-2 ml-16 text-base text-gray-500">
                  Receive notifications and updates about your loved ones.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to get started?</span>
            <span className="block text-primary-light">Create your free account today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link
                href="/register"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-white hover:bg-primary-light"
              >
                Get started
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PreviewPage 