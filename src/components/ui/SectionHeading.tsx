import { motion } from 'framer-motion'
import { fadeUp, inView, lineReveal } from '../../lib/motion'

type Props = {
  eyebrow: string
  lines: [string, string]
  tone?: 'dark' | 'light'
  align?: 'left' | 'center'
  inline?: boolean
  size?: 'md' | 'lg'
  children?: React.ReactNode
}

/** Eyebrow + two-tone headline (second line in brand red), matching the AZM design. */
export default function SectionHeading({ eyebrow, lines, tone = 'dark', align = 'left', inline, size = 'md', children }: Props) {
  const base = tone === 'dark' ? 'text-white' : 'text-ink'
  const sizes = size === 'lg' ? 'text-[2.5rem] sm:text-[3.2rem] lg:text-[3.1rem] xl:text-[3.4rem]' : 'text-[1.95rem] sm:text-[2.3rem] lg:text-[2.35rem]'
  return (
    <motion.div {...inView} className={align === 'center' ? 'text-center' : ''}>
      <motion.p variants={fadeUp} className={`eyebrow ${tone === 'dark' ? 'text-white/70' : 'text-ink/60'}`}>
        {eyebrow}
      </motion.p>
      <h2 className={`display mt-4 ${sizes} ${base}`}>
        {inline ? (
          <span className="block overflow-hidden pb-1">
            <motion.span variants={lineReveal} className="inline-block">
              {lines[0]} <span className="text-brand">{lines[1]}</span>
            </motion.span>
          </span>
        ) : (
          lines.map((l, i) => (
            <span key={l} className="block overflow-hidden pb-1">
              <motion.span variants={lineReveal} custom={i} className={`inline-block ${i === 1 ? 'text-brand' : ''}`}>
                {l}
              </motion.span>
            </span>
          ))
        )}
      </h2>
      {children && (
        <motion.div variants={fadeUp} custom={3} className={`mt-5 max-w-md text-[15px] leading-relaxed ${tone === 'dark' ? 'text-white/70' : 'text-ink/65'} ${align === 'center' ? 'mx-auto' : ''}`}>
          {children}
        </motion.div>
      )}
    </motion.div>
  )
}
