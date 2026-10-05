import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { ArrowRight, Clock, Dumbbell, HeartHandshake, Play, UsersRound } from 'lucide-react'
import { useRef, useState } from 'react'
import { useUI } from '../../context/UIContext'
import { contact } from '../../data/site'
import { images } from '../../data/images'
import { ease, lineReveal } from '../../lib/motion'

const perks = [
  { icon: Dumbbell, label: ['Modern', 'Equipment'] },
  { icon: UsersRound, label: ['Expert', 'Trainers'] },
  { icon: HeartHandshake, label: ['Supportive', 'Community'] },
]

export default function Hero() {
  // Longer delays on first load so the intro plays after the preloader; short on return visits.
  const [D] = useState(() => (performance.now() < 2500 ? 1.2 : 0.2))
  const { openJoin, openVideo } = useUI()
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()

  // Pointer parallax on the athlete image
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 60, damping: 20 })
  const sy = useSpring(my, { stiffness: 60, damping: 20 })
  const imgX = useTransform(sx, (v) => v * -14)
  const imgY = useTransform(sy, (v) => v * -10)
  const ringX = useTransform(sx, (v) => v * 22)
  const ringY = useTransform(sy, (v) => v * 16)

  // Scroll: image drifts and content fades as the hero leaves
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const drift = useTransform(scrollYProgress, [0, 1], [0, 120])
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  const onMove = (e: React.MouseEvent) => {
    if (reduce) return
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }

  return (
    <section ref={ref} onMouseMove={onMove} className="grain relative min-h-[100svh] overflow-hidden bg-ink">
      {/* ambient glow */}
      <div className="pointer-events-none absolute -left-40 top-1/3 h-[420px] w-[420px] rounded-full bg-brand/10 blur-[120px]" />

      {/* Athlete image (desktop: right side, bleeding to the edge) */}
      <motion.div style={{ y: drift }} className="pointer-events-none absolute right-0 top-0 hidden h-full w-[56%] lg:block">
        <motion.div style={{ x: imgX, y: imgY }} className="absolute right-[-2%] top-0 aspect-[1100/1064] h-[106%] max-w-none [mask-image:linear-gradient(to_bottom,black_82%,transparent)]">
          <motion.img
            src={images.heroAthlete}
            alt="Athlete training with a 20 kg dumbbell at AZM Gym"
            initial={{ opacity: 0, scale: 1.08, x: 60 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1.4, ease, delay: D + 0.1 }}
            className="h-full w-full object-contain object-right-top"
            fetchPriority="high"
          />
          <HeroRing delay={D + 0.3} style={{ x: ringX, y: ringY }} />
        </motion.div>
      </motion.div>

      <motion.div style={{ opacity: fade }} className="container-site relative flex min-h-[100svh] flex-col justify-center pb-16 pt-28 lg:pb-20">
        <div className="max-w-[600px]">
          <motion.p initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: D + 0.25, duration: 0.6, ease }} className="eyebrow text-white/75">
            Build a stronger you
          </motion.p>
          <motion.h1 initial="hidden" animate="show" className="display mt-5 text-[3.1rem] leading-[0.95] sm:text-7xl lg:text-[4rem] xl:text-[4.3rem]">
            <span className="block overflow-hidden pb-1"><motion.span variants={lineReveal} custom={(D + 0.2) / 0.12} className="inline-block">Train harder</motion.span></span>
            <span className="block overflow-hidden pb-1"><motion.span variants={lineReveal} custom={(D + 0.32) / 0.12} className="inline-block text-brand">Live better</motion.span></span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: D + 0.75, duration: 0.7, ease }} className="mt-6 max-w-[430px] text-[15px] leading-relaxed text-white/75">
            Modern facilities, expert trainers, and a supportive community to help you reach your fitness goals in Riyadh.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: D + 0.9, duration: 0.7, ease }} className="mt-9 flex flex-wrap gap-4">
            <button onClick={() => openJoin()} className="btn btn-primary group min-w-[170px]">
              Join Now <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button onClick={openVideo} className="btn btn-ghost group min-w-[170px]">
              <span className="grid h-7 w-7 place-items-center rounded-full border border-white/70 transition group-hover:border-brand group-hover:bg-brand">
                <Play className="h-3 w-3 translate-x-[1px] fill-current" />
              </span>
              Watch Video
            </button>
          </motion.div>
          <motion.ul initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.1, delayChildren: D + 1.1 } } }} className="mt-12 flex flex-wrap gap-y-5">
            {perks.map(({ icon: I, label }, i) => (
              <motion.li key={label[1]} variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } }} className={`flex items-center gap-3 pr-6 ${i ? 'border-l border-white/10 pl-6' : ''}`}>
                <I className="h-7 w-7 text-brand" strokeWidth={1.75} />
                <span className="text-xs font-semibold leading-tight text-white/85">{label[0]}<br />{label[1]}</span>
              </motion.li>
            ))}
          </motion.ul>
        </div>

        {/* Mobile image */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: D + 0.4, duration: 1, ease }} className="relative -mr-5 mt-12 sm:-mr-8 lg:hidden">
          <img src={images.heroAthlete} alt="Athlete training with a 20 kg dumbbell at AZM Gym" className="ml-auto w-[92%]" />
        </motion.div>

        {/* Open-hours chip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: D + 1.4, duration: 0.7, ease }}
          className="absolute bottom-10 right-8 hidden items-center gap-3 rounded-xl border border-white/10 bg-ink/70 px-4 py-3 backdrop-blur-md xl:flex"
        >
          <span className="relative grid h-9 w-9 place-items-center rounded-lg bg-brand/15 text-brand">
            <Clock className="h-4 w-4" />
            <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-ink" />
          </span>
          <span className="text-xs leading-tight">
            <span className="block font-bold">Open 7 days a week</span>
            <span className="text-white/55">{contact.hours[0].days}: {contact.hours[0].time}</span>
          </span>
        </motion.div>
      </motion.div>

      {/* scroll cue */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: D + 1.6 }} className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 lg:block" aria-hidden="true">
        <div className="flex h-10 w-6 justify-center rounded-full border border-white/25 pt-2">
          <motion.span animate={{ y: [0, 10, 0], opacity: [1, 0.2, 1] }} transition={{ repeat: Infinity, duration: 1.8 }} className="h-2 w-[3px] rounded-full bg-brand" />
        </div>
      </motion.div>
    </section>
  )
}

/** The red arc that frames the athlete, drawn in on load. Geometry matches the photo's circular crop. */
function HeroRing({ style, delay }: { style: React.ComponentProps<typeof motion.svg>['style']; delay: number }) {
  return (
    <motion.svg style={style} viewBox="0 0 1100 1064" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
      <motion.circle
        cx="868" cy="686" r="706" fill="none" stroke="#F92B3E" strokeWidth="3.5"
        initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 2, ease, delay }}
        style={{ rotate: 150, filter: 'drop-shadow(0 0 10px rgba(249,43,62,.7))' }}
      />
      <motion.circle
        cx="868" cy="686" r="740" fill="none" stroke="rgba(255,255,255,.12)" strokeWidth="1.2" strokeDasharray="4 14"
        animate={{ rotate: 360 }} transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
        style={{ originX: '868px', originY: '686px' }}
      />
    </motion.svg>
  )
}
