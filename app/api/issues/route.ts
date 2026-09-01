import { NextResponse } from 'next/server'
import { createIssue, getIssues } from '@/lib/issues'

export async function GET() {
  const issues = await getIssues()
  return NextResponse.json({ issues })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const issue = await createIssue({
      title: body.title,
      description: body.description,
      category: body.category,
      department: body.department,
      pin: body.pin,
      locality: body.locality,
      status: body.status,
      priority: body.priority,
      officer: body.officer,
      hub: body.hub,
    })

    return NextResponse.json(issue, { status: 201 })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to create issue'
    return NextResponse.json({ error: message }, { status: 400 })
  }
}
