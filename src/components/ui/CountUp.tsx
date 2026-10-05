import { animate, useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

export default function CountUp({ to, suffix = '', duration = 1.8 }: { to: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isIn = useInView(ref, { once: true, amount: 0.6 })
  const reduce = useReducedMotion()
  const [val, setVal] = useState(reduce ? to : 0)
  useEffect(() => {
    if (!isIn || reduce) return
    const c = animate(0, to, { duration, ease: [0.16, 1, 0.3, 1], onUpdate: (v) => setVal(Math.round(v)) })
    return () => c.stop()
  }, [isIn, to, duration, reduce])
  return (
    <span ref={ref} className="tabular-nums">
      {val.toLocaleString('en-US')}
      {suffix}
    </span>
  )
}
