import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { ease } from '../../lib/motion'
import { LogoMark } from '../ui/Logo'

/** Brief branded intro on first load only. */
export default function Preloader() {
  const [show, setShow] = useState(true)
  useEffect(() => {
    const t = setTimeout(() => setShow(false), 1500)
    return () => clearTimeout(t)
  }, [])
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] grid place-items-center bg-ink"
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 0.8, ease }}
          aria-hidden="true"
        >
          <div className="flex flex-col items-center gap-5">
            <motion.div initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.6, ease }}>
              <LogoMark className="h-14 w-auto" />
            </motion.div>
            <div className="overflow-hidden">
              <motion.p initial={{ y: '100%' }} animate={{ y: 0 }} transition={{ delay: 0.25, duration: 0.6, ease }} className="display text-3xl tracking-[0.2em]">
                AZM <span className="text-brand">GYM</span>
              </motion.p>
            </div>
            <div className="h-[2px] w-40 overflow-hidden rounded bg-white/10">
              <motion.div className="h-full bg-brand" initial={{ x: '-100%' }} animate={{ x: '0%' }} transition={{ duration: 1.2, ease }} />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
