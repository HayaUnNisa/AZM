import { motion, useReducedMotion } from 'framer-motion'
import { ChevronLeft, Quote } from 'lucide-react'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { testimonials } from '../../data/site'
import { ease } from '../../lib/motion'
import ArrowControls from '../ui/ArrowControls'
import SectionHeading from '../ui/SectionHeading'
import Stars from '../ui/Stars'

function initials(n: string) {
  return n.split(' ').map((p) => p[0]).join('').replace('.', '')
}

export default function Testimonials() {
  const [active, setActive] = useState(0)
  const [offset, setOffset] = useState(0)
  const [paused, setPaused] = useState(false)
  const track = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const n = testimonials.length
  const go = (d: number) => setActive((a) => (a + d + n) % n)

  useLayoutEffect(() => {
    const measure = () => {
      const el = track.current?.children[active] as HTMLElement | undefined
      if (el) setOffset(el.offsetLeft)
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [active])

  useEffect(() => {
    if (paused || reduce) return
    const t = setInterval(() => go(1), 6000)
    return () => clearInterval(t)
  }, [paused, reduce])

  return (
    <section className="relative overflow-hidden bg-ink py-20 lg:py-24">
      <div className="container-site grid items-center gap-12 lg:grid-cols-[minmax(0,300px)_minmax(0,1fr)]">
        <div>
          <SectionHeading eyebrow="Members testimonials" lines={['Real stories', 'real results']}>
            Join a growing community of people who have transformed their lives at AZM Gym.
          </SectionHeading>
          <div className="mt-8"><ArrowControls onPrev={() => go(-1)} onNext={() => go(1)} /></div>
        </div>

        <div className="relative" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
          <button onClick={() => go(-1)} aria-label="Previous testimonial" className="absolute -left-2 top-1/2 z-10 hidden -translate-y-1/2 text-white/50 transition hover:text-brand xl:-left-9 xl:block"><ChevronLeft className="h-7 w-7" /></button>
          <div className="overflow-hidden [mask-image:linear-gradient(to_right,black_75%,transparent)]">
            <motion.div
              ref={track}
              className="flex cursor-grab gap-5 active:cursor-grabbing"
              animate={{ x: -offset }}
              transition={{ duration: 0.8, ease }}
              drag="x"
              dragConstraints={{ left: -offset, right: -offset }}
              dragElastic={0.25}
              onDragEnd={(_, i) => { if (i.offset.x < -60) go(1); else if (i.offset.x > 60) go(-1) }}
            >
              {testimonials.map((t, i) => (
                <motion.figure
                  key={t.name}
                  animate={{ opacity: i === active ? 1 : 0.35, scale: i === active ? 1 : 0.94 }}
                  transition={{ duration: 0.6, ease }}
                  className="relative w-[88%] shrink-0 select-none rounded-xl border border-white/10 bg-ink-800 p-6 sm:w-[64%] sm:p-8"
                  aria-hidden={i !== active}
                >
                  <Quote className="absolute left-5 top-5 h-7 w-7 fill-white/10 text-white/10" />
                  <figcaption className="flex items-center gap-4 pl-8">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand to-[#7a0d18] text-sm font-extrabold ring-2 ring-white/10">{initials(t.name)}</span>
                    <span>
                      <span className="block text-sm font-bold">{t.name}</span>
                      <Stars n={t.rating} />
                    </span>
                  </figcaption>
                  <blockquote className="mt-5 text-[14px] leading-relaxed text-white/80">“{t.text}”</blockquote>
                  <Quote className="absolute bottom-5 right-5 h-7 w-7 rotate-180 fill-white/10 text-white/10" />
                </motion.figure>
              ))}
            </motion.div>
          </div>
          <div className="mt-7 flex justify-center gap-2 sm:justify-start sm:pl-[30%]" role="tablist" aria-label="Choose testimonial">
            {testimonials.map((t, i) => (
              <button key={t.name} role="tab" aria-selected={i === active} aria-label={`Testimonial ${i + 1}`} onClick={() => setActive(i)} className="grid h-6 place-items-center px-0.5">
                <span className={`block h-1.5 rounded-full transition-all duration-500 ${i === active ? 'w-6 bg-brand' : 'w-1.5 bg-white/30 hover:bg-white/60'}`} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
