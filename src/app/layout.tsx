
import type { Metadata } from 'next'
import './globals.css'
import { GlobalProvider } from '@/context/GlobalContext'


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
      <body> <GlobalProvider>
        {children}
      </GlobalProvider></body>
    </html>
  )
}
