import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { useRef } from 'react'
import { useUI } from '../../context/UIContext'
import type { Plan } from '../../data/site'
import { ease } from '../../lib/motion'

/** Pricing card with a cursor-following spotlight. */
export default function PlanCard({ plan, i }: { plan: Plan; i: number }) {
  const { openJoin } = useUI()
  const ref = useRef<HTMLDivElement>(null)
  const onMove = (e: React.MouseEvent) => {
    const r = ref.current!.getBoundingClientRect()
    ref.current!.style.setProperty('--mx', `${e.clientX - r.left}px`)
    ref.current!.style.setProperty('--my', `${e.clientY - r.top}px`)
  }
  const pop = plan.popular
  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease, delay: i * 0.12 }}
      whileHover={{ y: -8 }}
      className={`group relative flex flex-col overflow-hidden rounded-xl border p-6 sm:p-7 ${
        pop ? 'border-brand bg-gradient-to-b from-brand/[0.16] to-ink-800 shadow-[0_30px_80px_-30px_rgba(249,43,62,0.55)] lg:-my-4 lg:py-10' : 'border-white/10 bg-ink-800'
      }`}
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: 'radial-gradient(320px circle at var(--mx) var(--my), rgba(249,43,62,0.13), transparent 70%)' }} />
      {pop && (
        <span className="absolute right-0 top-0 rounded-bl-lg bg-brand px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider">Most popular</span>
      )}
      <h3 className={`text-sm font-bold ${pop ? 'text-brand-soft' : 'text-white'}`}>{plan.name}</h3>
      <p className="mt-2 flex items-baseline gap-1.5">
        <span className="text-[13px] font-bold">SAR</span>
        <span className="text-4xl font-extrabold tracking-tight">{plan.price}</span>
        <span className="text-xs font-medium text-brand">/ month</span>
      </p>
      <p className="mt-2 text-xs text-white/50">{plan.blurb}</p>
      <ul className="mt-6 flex-1 space-y-3">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-[13px] text-white/80">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" strokeWidth={2.5} />{f}
          </li>
        ))}
      </ul>
      <button onClick={() => openJoin(plan.id)} className={`btn mt-8 w-full ${pop ? 'btn-primary' : 'btn-ghost'}`}>
        Get Started
      </button>
    </motion.div>
  )
}
