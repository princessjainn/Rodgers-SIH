import { NextResponse } from 'next/server'
import { getIssueById } from '@/lib/issues'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  const issue = await getIssueById(id)

  if (!issue) {
    return NextResponse.json({ error: 'Issue not found' }, { status: 404 })
  }

  return NextResponse.json(issue)
}
