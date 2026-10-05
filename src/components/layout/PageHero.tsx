import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ease, lineReveal } from '../../lib/motion'

type Props = { eyebrow: string; lines: [string, string]; text: string; image?: string; crumb: string }

/** Header for inner pages, styled like the home hero. */
export default function PageHero({ eyebrow, lines, text, image, crumb }: Props) {
  return (
    <section className="grain relative overflow-hidden bg-ink pb-20 pt-40 sm:pt-44">
      {image && (
        <motion.img
          src={image} alt="" aria-hidden="true"
          initial={{ scale: 1.15, opacity: 0 }} animate={{ scale: 1, opacity: 0.35 }} transition={{ duration: 1.6, ease }}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/40" />
      <div className="absolute -right-40 top-10 h-[480px] w-[480px] rounded-full bg-brand/20 blur-[120px]" />
      <div className="container-site relative">
        <motion.nav aria-label="Breadcrumb" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mb-8 flex items-center gap-2 text-xs font-semibold text-white/50">
          <Link to="/" className="hover:text-white">Home</Link><ChevronRight className="h-3.5 w-3.5" /><span className="text-brand">{crumb}</span>
        </motion.nav>
        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.6 }} className="eyebrow text-white/70">{eyebrow}</motion.p>
        <motion.h1 initial="hidden" animate="show" className="display mt-5 text-[2.8rem] sm:text-6xl lg:text-7xl">
          {lines.map((l, i) => (
            <span key={l} className="block overflow-hidden pb-1">
              <motion.span variants={lineReveal} custom={i + 2} className={`inline-block ${i === 1 ? 'text-brand' : ''}`}>{l}</motion.span>
            </span>
          ))}
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75, duration: 0.7, ease }} className="mt-6 max-w-lg text-[15px] leading-relaxed text-white/70">
          {text}
        </motion.p>
      </div>
    </section>
  )
}
