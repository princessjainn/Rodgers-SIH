import { NextResponse } from 'next/server'
import { getSupabaseClient } from '@/lib/supabase'

export async function GET() {
  const supabase = getSupabaseClient()

  return NextResponse.json({
    status: 'ok',
    supabaseConfigured: Boolean(supabase),
    timestamp: new Date().toISOString(),
  })
}
