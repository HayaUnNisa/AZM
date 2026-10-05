import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from 'framer-motion'
import { ArrowUp, MessageCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { contact } from '../../data/site'

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  return <motion.div style={{ scaleX }} className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-brand" />
}

export function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior }) }, [pathname])
  return null
}

/** Floating WhatsApp + back-to-top buttons. */
export function FloatingActions() {
  const { scrollY } = useScroll()
  const [show, setShow] = useState(false)
  useMotionValueEvent(scrollY, 'change', (y) => setShow(y > 700))
  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-center gap-3" style={{ marginBottom: 'env(safe-area-inset-bottom, 0px)' }}>
      <AnimatePresence>
        {show && (
          <motion.button
            initial={{ opacity: 0, y: 12, scale: 0.8 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-ink-700/90 text-white backdrop-blur transition hover:border-brand hover:bg-brand"
            aria-label="Back to top"
          >
            <ArrowUp className="h-4 w-4" />
          </motion.button>
        )}
      </AnimatePresence>
      <a
        href={`https://wa.me/${contact.whatsapp}`}
        target="_blank" rel="noopener noreferrer"
        className="group relative grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-8px_rgba(37,211,102,0.6)] transition hover:scale-105"
        aria-label="Chat on WhatsApp"
      >
        <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-20" />
        <MessageCircle className="relative h-6 w-6" />
      </a>
    </div>
  )
}
