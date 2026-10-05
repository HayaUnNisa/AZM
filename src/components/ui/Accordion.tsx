import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { ease } from '../../lib/motion'

export default function Accordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <div className="divide-y divide-white/10 border-y border-white/10">
      {items.map((it, i) => {
        const on = open === i
        return (
          <div key={it.q}>
            <button onClick={() => setOpen(on ? null : i)} aria-expanded={on} className="flex w-full items-center justify-between gap-6 py-5 text-left">
              <span className={`text-[15px] font-bold transition-colors ${on ? 'text-brand' : ''}`}>{it.q}</span>
              <motion.span animate={{ rotate: on ? 45 : 0 }} transition={{ duration: 0.3 }} className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border ${on ? 'border-brand bg-brand' : 'border-white/20'}`}>
                <Plus className="h-4 w-4" />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {on && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease }} className="overflow-hidden">
                  <p className="max-w-2xl pb-6 text-sm leading-relaxed text-white/65">{it.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
