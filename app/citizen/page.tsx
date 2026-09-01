import type { Metadata } from 'next'
import { CitizenApp } from '@/components/citizen/citizen-app'

export const metadata: Metadata = {
  title: 'Local Chai — CivicChai',
  description: 'Your locality civic feed. Report, discuss and support issues.',
}

export default function CitizenPage() {
  return <CitizenApp />
}
