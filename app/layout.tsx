import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Manrope, Noto_Sans_Devanagari } from 'next/font/google'
import { PwaRegister } from '@/components/pwa-register'
import { StreeChat } from '@/components/stree-chat'
import { LanguageProvider } from '@/components/language-provider'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
})

const notoDeva = Noto_Sans_Devanagari({
  subsets: ['devanagari'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-noto-deva',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'CivicChai — India mein har ek Charcha Chai Pe hoti hai',
  description:
    'CivicChai turns everyday civic problems into community discussions. Report karo, charcha karo, vote karo — aur dekho tumhari awaaz kahan tak pahunchti hai.',
  generator: 'v0.app',
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    title: 'CivicChai',
    statusBarStyle: 'default',
  },
}

export const viewport: Viewport = {
  themeColor: '#6b3f24',
  colorScheme: 'light',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${manrope.variable} ${notoDeva.variable} bg-background`}
    >
      <body className="antialiased">
        <LanguageProvider>
          <PwaRegister />
          {children}
          <StreeChat />
          {process.env.NODE_ENV === 'production' && <Analytics />}
        </LanguageProvider>
      </body>
    </html>
  )
}
