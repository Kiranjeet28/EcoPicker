
import type { Metadata } from 'next'
import './globals.css'
import { GlobalProvider } from '@/context/GlobalContext'
import Navbar from '@/components/UI/Navbar'


export const metadata: Metadata = {
  title: 'EcoPicker',
  description: 'Get update of World economic data',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body >
        <GlobalProvider>
        <div className='bg-gradient-to-b from-[#3c274e] via-[#95509a] to-[#3c274e]'>

          <Navbar />

          {children}
        </div>
      </GlobalProvider></body>
    </html>
  )
}
