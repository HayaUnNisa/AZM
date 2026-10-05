import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { ease } from '../../lib/motion'

const curtain = (delayIn: number, delayOut: number) => ({
  initial: { scaleY: 1, originY: 0 },
  animate: { scaleY: 0, originY: 0, transition: { duration: 0.65, ease, delay: delayIn } },
  exit: { scaleY: 1, originY: 1, transition: { duration: 0.5, ease, delay: delayOut, originY: { duration: 0 } } },
})

/** Route wrapper: a red + black curtain wipes up on leave and away on enter. */
export default function PageTransition({ children }: { children: ReactNode }) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.4, delay: 0.3 } }}
        exit={{ opacity: 1, transition: { duration: 0.6 } }}
      >
        {children}
      </motion.div>
      <motion.div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[90] bg-brand" {...curtain(0.18, 0)} />
      <motion.div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[91] bg-ink" {...curtain(0.05, 0.12)} />
    </>
  )
}
