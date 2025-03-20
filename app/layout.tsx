import './globals.css'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Threshold Care Check',
  description: 'A free SMS-based check-in system for caregivers and their loved ones',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-secondary min-h-screen`}>
        <Toaster position="top-right" />
        <nav className="bg-primary text-white p-4">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold">Threshold Care Check</h1>
            <div className="space-x-4">
              <a href="/login" className="hover:text-accent">Login</a>
              <a href="/register" className="hover:text-accent">Register</a>
            </div>
          </div>
        </nav>
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
        <footer className="bg-primary text-white p-4 mt-auto">
          <div className="container mx-auto text-center">
            <p>© 2024 Threshold Care Check. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  )
} 