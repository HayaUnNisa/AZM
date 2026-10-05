import { motion, useInView, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { images } from '../../data/images'
import { ease, fadeUp } from '../../lib/motion'
import SectionHeading from '../ui/SectionHeading'

export default function AboutBanner() {
  const ref = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const reduce = useReducedMotion()
  const inView = useInView(ref, { amount: 0.1 })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [40, -40])

  // Loops continuously while on screen; pauses off screen to save battery/data
  useEffect(() => {
    const v = videoRef.current
    if (!v || reduce) return
    if (inView) v.play().catch(() => {})
    else v.pause()
  }, [inView, reduce])

  return (
    <section ref={ref} className="relative overflow-hidden border-y border-white/[0.04] bg-ink-800 py-20 lg:py-28">
      {/* soft red glow behind the video */}
      <div className="pointer-events-none absolute right-[-10%] top-1/2 h-[520px] w-[620px] -translate-y-1/2 rounded-full bg-brand/15 blur-[140px]" />

      <div className="container-site relative grid items-center gap-14 lg:grid-cols-[minmax(0,440px)_minmax(0,1fr)] lg:gap-16">
        <div>
          <SectionHeading eyebrow="About AZM Gym" lines={['More than', 'just a gym']} size="lg">
            At AZM Gym, we believe fitness is a lifestyle. Our mission is to create a space where everyone — from beginners to athletes — can train, grow, and become the best version of themselves.
          </SectionHeading>
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={4} className="mt-8">
            <Link to="/about" className="btn btn-primary group !px-5 !py-3">
              Learn More <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        <motion.div
          style={{ y }}
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.1, ease }}
          className="relative"
        >
          {/* offset red outline frame */}
          <div className="absolute -right-3 -top-3 h-full w-full rounded-2xl border-2 border-brand/70 sm:-right-5 sm:-top-5" />
          <div className="relative aspect-video overflow-hidden rounded-2xl bg-ink-700 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] ring-1 ring-white/10">
            <video
              ref={videoRef}
              src={images.video}
              muted
              loop
              playsInline
              preload="metadata"
              aria-hidden="true"
              className="h-full w-full object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}