'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { analyzeComplaintRequest } from '@/lib/ai'
import { ChaiHeatMeter } from '@/components/brand/chai-heat-meter'
import {
  X,
  Mic,
  Camera,
  MapPin,
  Phone,
  Sparkles,
  Flame,
  Check,
  Loader2,
} from 'lucide-react'

type Step = 'compose' | 'analyzing' | 'result' | 'duplicate' | 'done'

const LANGS = ['Auto Detect', 'English', 'हिन्दी', 'मराठी']

export function Composer({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState<Step>('compose')
  const [text, setText] = useState('')
  const [lang, setLang] = useState('Auto Detect')
  const [analysis, setAnalysis] = useState<Awaited<ReturnType<typeof analyzeComplaintRequest>> | null>(null)
  const [isListening, setIsListening] = useState(false)
  const recognitionRef = useRef<any>(null)

  const documentId = useMemo(
    () => `CC-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(Math.random() * 9000 + 1000)}`,
    [],
  )

  useEffect(() => {
    if (typeof window === 'undefined') return

    const SpeechRecognition = (window as any).SpeechRecognition ?? (window as any).webkitSpeechRecognition
    if (!SpeechRecognition) return

    const recognition = new SpeechRecognition()
    recognition.lang = lang === 'Auto Detect' ? 'en-IN' : 'en-IN'
    recognition.interimResults = true
    recognition.continuous = false

    recognition.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((result: any) => result[0]?.transcript ?? '')
        .join(' ')
        .trim()

      if (transcript) {
        setText((current) => (current ? `${current} ${transcript}` : transcript))
      }
    }

    recognition.onend = () => setIsListening(false)
    recognition.onerror = () => setIsListening(false)

    recognitionRef.current = recognition

    return () => {
      recognition.stop()
    }
  }, [lang])

  async function analyze() {
    if (!text.trim()) return
    setStep('analyzing')
    const result = await analyzeComplaintRequest(text, lang)
    setAnalysis(result)
    setStep(result.duplicateIssueFound ? 'duplicate' : 'result')
  }

  function toggleVoice() {
    const SpeechRecognition = (window as any).SpeechRecognition ?? (window as any).webkitSpeechRecognition
    if (!SpeechRecognition || !recognitionRef.current) {
      setText((current) => current || 'Voice input is not supported in this browser. Please type your complaint.')
      return
    }

    if (isListening) {
      recognitionRef.current.stop()
      setIsListening(false)
      return
    }

    recognitionRef.current.start()
    setIsListening(true)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-charcoal/50 p-0 backdrop-blur-sm sm:items-center sm:p-4">
      <div className="max-h-[92dvh] w-full max-w-lg overflow-y-auto rounded-t-3xl border border-border bg-background shadow-xl sm:rounded-3xl">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-background/95 px-5 py-4 backdrop-blur">
          <div>
            <h2 className="font-display text-lg font-extrabold text-charcoal">
              Batao, kya problem hai?
            </h2>
            <p className="text-xs text-charcoal/60">Type karo ya bolke batao.</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close composer"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-charcoal/60 hover:bg-muted"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-5">
          {(step === 'compose' || step === 'analyzing') && (
            <div className="space-y-4">
              <button
                onClick={toggleVoice}
                className={cn(
                  'flex w-full flex-col items-center gap-2 rounded-2xl border border-dashed py-6 text-terracotta transition-colors',
                  isListening
                    ? 'border-terracotta bg-terracotta/15'
                    : 'border-terracotta/50 bg-terracotta/5 hover:bg-terracotta/10',
                )}
                aria-label="Record your complaint by voice"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-terracotta text-cream shadow-sm">
                  <Mic className={cn('h-6 w-6', isListening && 'animate-pulse')} />
                </span>
                <span className="text-sm font-semibold">
                  {isListening ? 'Listening… speak now' : 'Tap to record'}
                </span>
              </button>

              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={3}
                placeholder="e.g. Station road ki light 15 din se band hai..."
                className="w-full resize-none rounded-xl border border-border bg-card p-3 text-sm text-charcoal outline-none placeholder:text-charcoal/40 focus:border-terracotta focus:ring-2 focus:ring-terracotta/20"
              />

              <div className="flex flex-wrap gap-2">
                {LANGS.map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={cn(
                      'rounded-full border px-3 py-1 text-xs font-medium transition-colors',
                      lang === l
                        ? 'border-chai bg-chai text-cream'
                        : 'border-border bg-card text-charcoal/70',
                      l === 'हिन्दी' || l === 'मराठी' ? 'font-deva' : '',
                    )}
                  >
                    {l}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-2">
                {[
                  [Camera, 'Add Proof'],
                  [MapPin, 'Location'],
                  [Phone, 'Call CivicChai'],
                ].map(([Icon, label], i) => {
                  const I = Icon as React.ElementType
                  return (
                    <button
                      key={i}
                      className="flex flex-col items-center gap-1 rounded-xl border border-border bg-card py-3 text-xs font-medium text-charcoal/70 hover:border-chai/40"
                    >
                      <I className="h-4 w-4 text-chai" />
                      {label as string}
                    </button>
                  )
                })}
              </div>

              <button
                onClick={analyze}
                disabled={step === 'analyzing' || (!text && step === 'compose')}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-chai px-4 py-3 text-sm font-semibold text-cream disabled:opacity-50"
              >
                {step === 'analyzing' ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    AI samajh raha hai...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    Understand my complaint
                  </>
                )}
              </button>
              <p className="text-center text-xs text-charcoal/50">
                Offline? Draft &amp; voice save as &ldquo;Pending sync&rdquo; — not yet
                officially submitted.
              </p>
            </div>
          )}

          {step === 'result' && analysis && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-chai">
                <Sparkles className="h-4 w-4" />
                AI ne problem samajh li
              </div>
              <dl className="rounded-2xl border border-border bg-card p-4 text-sm">
                {[
                  ['Language', analysis.language],
                  ['Category', analysis.category],
                  ['Issue', analysis.issue],
                  ['Location', analysis.location],
                  ['Department', analysis.department],
                  ['Priority', analysis.priority],
                ].map(([k, v]) => (
                  <div
                    key={k}
                    className="flex items-center justify-between border-b border-border py-2 last:border-0"
                  >
                    <dt className="text-charcoal/60">{k}</dt>
                    <dd className="font-semibold text-charcoal">{v}</dd>
                  </div>
                ))}
                <div className="flex items-center justify-between pt-2">
                  <dt className="text-charcoal/60">Report confidence</dt>
                  <dd className="rounded-md bg-leaf/15 px-2 py-0.5 font-semibold text-leaf">
                    {analysis.confidence}%
                  </dd>
                </div>
              </dl>
              <button
                onClick={() => setStep('done')}
                className="w-full rounded-xl bg-chai px-4 py-3 text-sm font-semibold text-cream"
              >
                Create report
              </button>
            </div>
          )}

          {step === 'duplicate' && analysis?.duplicateIssue && (
            <div className="space-y-4">
              <div className="rounded-2xl border border-gold/40 bg-gold/10 p-4">
                <p className="font-display font-bold text-charcoal">
                  Arre, yeh Chai pehle se chal rahi hai!
                </p>
                <p className="mt-1 text-sm text-charcoal/70">
                  We found a similar civic issue nearby.
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-card p-4">
                <p className="font-display font-bold text-charcoal">
                  {analysis.duplicateIssue.title}
                </p>
                <p className="text-xs text-charcoal/60">
                  PIN {analysis.duplicateIssue.pin} &middot; {analysis.duplicateIssue.status}
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <ChaiHeatMeter heat={analysis.duplicateIssue.chaiHeat} size="sm" />
                  <span className="text-xs text-charcoal/60">
                    {analysis.duplicateIssue.reports} reports &middot; {analysis.duplicateIssue.supporters} supporters
                  </span>
                </div>
              </div>
              <button
                onClick={() => setStep('done')}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-heat px-4 py-3 text-sm font-semibold text-heat-foreground"
              >
                <Flame className="h-4 w-4" />
                Is Charcha ko Support Karo
              </button>
              <button
                onClick={() => setStep('done')}
                className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm font-semibold text-charcoal"
              >
                Yeh alag problem hai
              </button>
            </div>
          )}

          {step === 'done' && (
            <div className="space-y-4 py-6 text-center">
              <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-leaf/15 text-leaf">
                <Check className="h-8 w-8" />
              </span>
              <div>
                <p className="font-display text-lg font-extrabold text-charcoal">
                  Charcha shuru ho gayi!
                </p>
                <p className="mt-1 text-sm text-charcoal/60">
                  {analysis ? analysis.summary : 'Your support was added. Track it in My Charcha.'}
                </p>
              </div>
              <p className="font-mono text-sm font-semibold text-chai">
                {documentId}
              </p>
              <button
                onClick={onClose}
                className="w-full rounded-xl bg-chai px-4 py-3 text-sm font-semibold text-cream"
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
