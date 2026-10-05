import type { Variants } from 'framer-motion'

export const ease = [0.22, 1, 0.36, 1] as const

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.8, ease, delay: i * 0.08 } }),
}

export const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
}

export const lineReveal: Variants = {
  hidden: { y: '110%' },
  show: (i: number = 0) => ({ y: '0%', transition: { duration: 0.9, ease, delay: 0.15 + i * 0.12 } }),
}

export const inView = { initial: 'hidden', whileInView: 'show', viewport: { once: true, amount: 0.25 } } as const
