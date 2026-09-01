export type ComplaintAnalysis = {
  language: string
  category: string
  issue: string
  location: string
  department: string
  priority: 'Critical' | 'High' | 'Moderate' | 'Low'
  confidence: number
  summary: string
  duplicateIssue?: {
    title: string
    pin: string
    status: string
    chaiHeat: number
    reports: number
    supporters: number
  }
  duplicateIssueId?: string
  duplicateIssueFound?: boolean
}

const defaultDuplicates = [
  {
    title: 'Streetlights not working on Station Road',
    pin: '401208',
    status: 'Assigned',
    chaiHeat: 86,
    reports: 52,
    supporters: 1842,
  },
  {
    title: 'Garbage overflow near market square',
    pin: '401209',
    status: 'In Progress',
    chaiHeat: 73,
    reports: 31,
    supporters: 1280,
  },
]

function normalizePriority(value: string | undefined): ComplaintAnalysis['priority'] {
  const normalized = (value ?? 'Moderate').toLowerCase()
  if (normalized.includes('critical')) return 'Critical'
  if (normalized.includes('high')) return 'High'
  if (normalized.includes('low')) return 'Low'
  return 'Moderate'
}

export function analyzeComplaint(input: string, detectedLanguage = 'Auto Detect'): ComplaintAnalysis {
  const normalized = input.trim()
  if (!normalized) {
    return {
      language: detectedLanguage === 'Auto Detect' ? 'Hinglish' : detectedLanguage,
      category: 'General civic issue',
      issue: 'Civic service request',
      location: 'PIN 401208',
      department: 'Municipal Operations',
      priority: 'Moderate',
      confidence: 0,
      summary: 'Complaint is empty. Please describe the issue.',
    }
  }

  const lower = normalized.toLowerCase()

  const hasLighting = /light|streetlight|bulb|electric|power|lamp/i.test(lower)
  const hasGarbage = /garbage|trash|waste|dump|bin|sanitation/i.test(lower)
  const hasPothole = /pothole|road|broken|crack|drain|water|traffic/i.test(lower)

  let category = 'General civic issue'
  let department = 'Municipal Operations'
  let issue = 'Civic service request'
  let location = 'PIN 401208'
  let priority: ComplaintAnalysis['priority'] = 'Moderate'

  if (hasLighting) {
    category = 'Public Lighting'
    department = 'Municipal Public Lighting'
    issue = 'Streetlight outage'
    location = 'PIN 401208 · Station Road'
    priority = 'High'
  } else if (hasGarbage) {
    category = 'Sanitation'
    department = 'Solid Waste Management'
    issue = 'Garbage overflow'
    location = 'PIN 401209 · Market Square'
    priority = 'Moderate'
  } else if (hasPothole) {
    category = 'Roads & Potholes'
    department = 'PWD — Roads Division'
    issue = 'Road deterioration'
    location = 'PIN 401208 · School Boundary Road'
    priority = 'Critical'
  }

  const isDuplicate = /same|already|before|previous|again|same issue|repeat|already reported/i.test(lower)
  const duplicateIssue = isDuplicate ? defaultDuplicates[0] : undefined

  if (lower.includes('water') || lower.includes('drain')) {
    category = 'Water Supply'
    department = 'Water Works Department'
    issue = 'Water supply disruption'
    location = 'PIN 401211 · Residency Lane'
    priority = 'High'
  }

  const confidence = Math.min(96, Math.max(74, 72 + normalized.length / 18))
  const roundedConfidence = Math.round(confidence)

  return {
    language: detectedLanguage === 'Auto Detect' ? 'Hinglish' : detectedLanguage,
    category,
    issue,
    location,
    department,
    priority,
    confidence: roundedConfidence,
    summary: `${issue} reported in ${location}. Department routed to ${department}.`,
    duplicateIssue,
    duplicateIssueId: duplicateIssue ? 'CC-401208-2026-0001842' : undefined,
    duplicateIssueFound: Boolean(duplicateIssue),
  }
}

export async function analyzeComplaintRequest(input: string, detectedLanguage = 'Auto Detect'): Promise<ComplaintAnalysis> {
  const trimmed = input.trim()
  if (!trimmed) return analyzeComplaint(trimmed, detectedLanguage)

  try {
    const response = await fetch('/api/ai/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: trimmed, language: detectedLanguage }),
    })

    if (!response.ok) {
      return analyzeComplaint(trimmed, detectedLanguage)
    }

    const data = (await response.json()) as Partial<ComplaintAnalysis>
    const analysis = analyzeComplaint(trimmed, detectedLanguage)

    return {
      ...analysis,
      language: data.language ?? analysis.language,
      category: data.category ?? analysis.category,
      issue: data.issue ?? analysis.issue,
      location: data.location ?? analysis.location,
      department: data.department ?? analysis.department,
      priority: normalizePriority(data.priority ?? analysis.priority),
      confidence: typeof data.confidence === 'number' ? data.confidence : analysis.confidence,
      summary: data.summary ?? analysis.summary,
      duplicateIssueFound: Boolean(data.duplicateIssueFound ?? data.duplicateIssue),
      duplicateIssue: data.duplicateIssue ?? analysis.duplicateIssue,
      duplicateIssueId: data.duplicateIssueId ?? analysis.duplicateIssueId,
    }
  } catch (error) {
    console.error('Groq analysis failed, using fallback logic.', error)
    return analyzeComplaint(trimmed, detectedLanguage)
  }
}

export async function analyzeComplaintWithGroq(
  input: string,
  detectedLanguage = 'Auto Detect',
): Promise<ComplaintAnalysis> {
  const trimmed = input.trim()
  if (!trimmed) return analyzeComplaint(trimmed, detectedLanguage)

  const apiKey = process.env.GROQ_API_KEY
  const model = process.env.GROQ_MODEL ?? 'llama-3.3-70b-versatile'

  if (!apiKey) {
    return analyzeComplaint(trimmed, detectedLanguage)
  }

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages: [
          {
            role: 'system',
            content:
              'You are CivicChai AI. Return valid JSON only. Analyze citizen complaint text for Indian civic issues. Output fields: language, category, issue, location, department, priority, confidence, summary, duplicateIssueFound, duplicateIssueTitle, duplicateIssuePin, duplicateIssueStatus, duplicateIssueReports, duplicateIssueSupporters.',
          },
          {
            role: 'user',
            content: `Complaint text: ${trimmed}\nDetected language: ${detectedLanguage}`,
          },
        ],
        temperature: 0.2,
        max_tokens: 350,
        response_format: { type: 'json_object' },
      }),
    })

    if (!response.ok) {
      const errorBody = await response.text()
      console.error('Groq AI call failed', response.status, errorBody)
      return analyzeComplaint(trimmed, detectedLanguage)
    }

    const data = await response.json()
    const messageContent = data?.choices?.[0]?.message?.content ?? '{}'
    const parsed = JSON.parse(messageContent)

    const fallback = analyzeComplaint(trimmed, detectedLanguage)

    const duplicateIssue = parsed.duplicateIssueFound
      ? {
          title: parsed.duplicateIssueTitle ?? fallback.duplicateIssue?.title ?? 'Similar civic issue found',
          pin: parsed.duplicateIssuePin ?? fallback.duplicateIssue?.pin ?? '401208',
          status: parsed.duplicateIssueStatus ?? fallback.duplicateIssue?.status ?? 'Assigned',
          chaiHeat: Number(parsed.duplicateIssueHeat ?? fallback.duplicateIssue?.chaiHeat ?? 86),
          reports: Number(parsed.duplicateIssueReports ?? fallback.duplicateIssue?.reports ?? 52),
          supporters: Number(parsed.duplicateIssueSupporters ?? fallback.duplicateIssue?.supporters ?? 1842),
        }
      : fallback.duplicateIssue

    return {
      language: String(parsed.language ?? detectedLanguage === 'Auto Detect' ? 'Hinglish' : detectedLanguage),
      category: String(parsed.category ?? fallback.category),
      issue: String(parsed.issue ?? fallback.issue),
      location: String(parsed.location ?? fallback.location),
      department: String(parsed.department ?? fallback.department),
      priority: normalizePriority(String(parsed.priority ?? fallback.priority)),
      confidence: Number(parsed.confidence ?? fallback.confidence),
      summary: String(parsed.summary ?? fallback.summary),
      duplicateIssue,
      duplicateIssueId: parsed.duplicateIssueId ?? fallback.duplicateIssueId,
      duplicateIssueFound: Boolean(parsed.duplicateIssueFound ?? duplicateIssue),
    }
  } catch (error) {
    console.error('Groq parsing failed', error)
    return analyzeComplaint(trimmed, detectedLanguage)
  }
}
