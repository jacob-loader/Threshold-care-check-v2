import Link from 'next/link'

export default function Home() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-20">
        <h1 className="text-5xl font-bold text-primary mb-6">
          Threshold Care Check
        </h1>
        <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
          A free SMS-based check-in system that helps caregivers stay connected with their loved ones through simple, reliable communication.
        </p>
        <div className="space-x-4">
          <Link href="/register" className="btn-primary">
            Get Started Free
          </Link>
          <Link href="/about" className="btn-secondary">
            Learn More
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-8">
        <div className="card">
          <h3 className="text-xl font-semibold text-primary mb-4">SMS Check-ins</h3>
          <p className="text-gray-600">
            Simple, reliable SMS-based check-ins that work on any phone without requiring app installation.
          </p>
        </div>
        <div className="card">
          <h3 className="text-xl font-semibold text-primary mb-4">Location Tracking</h3>
          <p className="text-gray-600">
            Know your loved one's location at check-in time for added peace of mind.
          </p>
        </div>
        <div className="card">
          <h3 className="text-xl font-semibold text-primary mb-4">Circle of Care</h3>
          <p className="text-gray-600">
            Invite family members and healthcare providers to stay informed and involved.
          </p>
        </div>
        <div className="card">
          <h3 className="text-xl font-semibold text-primary mb-4">Smart Scheduling</h3>
          <p className="text-gray-600">
            Set up flexible check-in schedules and receive reminders for upcoming check-ins.
          </p>
        </div>
        <div className="card">
          <h3 className="text-xl font-semibold text-primary mb-4">Positive Affirmations</h3>
          <p className="text-gray-600">
            Send encouraging messages and special occasion reminders to show your care.
          </p>
        </div>
        <div className="card">
          <h3 className="text-xl font-semibold text-primary mb-4">Gift Marketplace</h3>
          <p className="text-gray-600">
            Access a curated marketplace to send flowers, gifts, and care packages.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center py-16 bg-primary text-white rounded-lg">
        <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="mb-8 max-w-2xl mx-auto">
          Join thousands of caregivers who trust Threshold Care Check to stay connected with their loved ones.
        </p>
        <Link href="/register" className="btn-secondary">
          Create Your Free Account
        </Link>
      </section>
    </div>
  )
} 