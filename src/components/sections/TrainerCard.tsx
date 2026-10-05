import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import type { Trainer } from '../../data/site'
import { ease } from '../../lib/motion'

/** Slanted-top trainer card from the design; click opens the profile. */
export default function TrainerCard({ t, i, onOpen, className = '' }: { t: Trainer; i: number; onOpen: () => void; className?: string }) {
  return (
    <motion.button
      data-slide
      onClick={onOpen}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, ease, delay: i * 0.12 }}
      className={`group relative block aspect-[3/4.25] w-full overflow-hidden rounded-xl bg-ink text-left [clip-path:polygon(0_9%,100%_0,100%_100%,0_100%)] ${className}`}
      aria-label={`View ${t.name}'s profile`}
    >
      <img src={t.image} alt={t.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-[1.2s] ease-out group-hover:scale-[1.07]" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
      <div className="absolute inset-0 bg-brand/0 mix-blend-multiply transition-colors duration-500 group-hover:bg-brand/20" />
      <div className="absolute inset-x-0 bottom-0 p-5">
        <h3 className="text-lg font-bold text-white">{t.name}</h3>
        <p className="text-xs font-medium text-white/75">{t.role}</p>
        <div className="grid grid-rows-[0fr] transition-all duration-500 group-hover:grid-rows-[1fr]">
          <ul className="flex flex-wrap gap-1.5 overflow-hidden pt-0 group-hover:pt-3">
            {t.specialties.map((s) => (
              <li key={s} className="rounded-full border border-white/20 bg-black/30 px-2.5 py-1 text-[10px] font-semibold text-white/85 backdrop-blur">{s}</li>
            ))}
          </ul>
        </div>
      </div>
      <span className="absolute right-4 top-[14%] grid h-9 w-9 place-items-center rounded-full bg-brand text-white opacity-0 transition-all duration-500 group-hover:rotate-90 group-hover:opacity-100">
        <Plus className="h-4 w-4" />
      </span>
    </motion.button>
  )
}
