import { motion } from 'framer-motion'
import { ease } from '../../lib/motion'

/** Image revealed by a red-then-dark panel sliding off, with a slow zoom settle. */
export default function RevealImage({ src, alt, from = 'left', className = '' }: { src: string; alt: string; from?: 'left' | 'right'; className?: string }) {
  const origin = from === 'left' ? 'right' : 'left'
  return (
    <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} className={`group relative overflow-hidden rounded-[14px] ${className}`}>
      <motion.img
        src={src} alt={alt} loading="lazy"
        variants={{ hidden: { scale: 1.25 }, show: { scale: 1, transition: { duration: 1.6, ease } } }}
        className="h-full w-full object-cover"
      />
      <motion.span aria-hidden="true" style={{ originX: origin === 'right' ? 1 : 0 }} className="absolute inset-0 bg-brand"
        variants={{ hidden: { scaleX: 1 }, show: { scaleX: 0, transition: { duration: 0.9, ease, delay: 0.25 } } }} />
      <motion.span aria-hidden="true" style={{ originX: origin === 'right' ? 1 : 0 }} className="absolute inset-0 bg-ink"
        variants={{ hidden: { scaleX: 1 }, show: { scaleX: 0, transition: { duration: 0.9, ease } } }} />
    </motion.div>
  )
}
