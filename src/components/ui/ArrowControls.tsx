import { ArrowLeft, ArrowRight } from 'lucide-react'

type Props = { onPrev: () => void; onNext: () => void; disablePrev?: boolean; disableNext?: boolean; tone?: 'dark' | 'light' }

export default function ArrowControls({ onPrev, onNext, disablePrev, disableNext, tone = 'dark' }: Props) {
  const cls = tone === 'dark'
    ? 'border-white/30 text-white hover:border-brand hover:bg-brand'
    : 'border-ink/20 text-ink hover:border-brand hover:bg-brand hover:text-white'
  return (
    <div className="flex gap-3">
      <button className={`icon-btn ${cls}`} onClick={onPrev} disabled={disablePrev} aria-label="Previous"><ArrowLeft className="h-4 w-4" /></button>
      <button className={`icon-btn ${cls}`} onClick={onNext} disabled={disableNext} aria-label="Next"><ArrowRight className="h-4 w-4" /></button>
    </div>
  )
}
