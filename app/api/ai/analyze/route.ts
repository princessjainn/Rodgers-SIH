import { NextResponse } from 'next/server'
import { analyzeComplaintWithGroq } from '@/lib/ai'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const text = String(body?.text ?? '').trim()
    const language = String(body?.language ?? 'Auto Detect')

    if (!text) {
      return NextResponse.json({ error: 'Text is required.' }, { status: 400 })
    }

    const result = await analyzeComplaintWithGroq(text, language)
    return NextResponse.json(result)
  } catch (error) {
    console.error('AI analyze route error:', error)
    return NextResponse.json({ error: 'Unable to analyze complaint.' }, { status: 500 })
  }
}
