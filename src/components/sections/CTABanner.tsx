import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useUI } from '../../context/UIContext'
import { images } from '../../data/images'
import { fadeUp } from '../../lib/motion'
import SectionHeading from '../ui/SectionHeading'

export default function CTABanner() {
  const { openJoin } = useUI()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1.15, 1])

  return (
    <section ref={ref} className="relative overflow-hidden border-t-2 border-brand bg-ink">
      <motion.img style={{ y, scale }} src={images.ctaPullup} alt="Athlete doing pull-ups at AZM Gym" loading="lazy" className="absolute inset-0 h-[120%] w-full -translate-y-[10%] object-cover object-[70%_center] sm:object-center" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/0 sm:via-ink/60" />
      <div className="container-site relative py-24 lg:py-28">
        <div className="max-w-xl">
          <SectionHeading eyebrow="Ready to start?" lines={['Your stronger', 'self starts here']} size="lg">
            Join AZM Gym today and take the first step towards a healthier, happier you.
          </SectionHeading>
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={4} className="mt-9 flex flex-wrap gap-4">
            <button onClick={() => openJoin()} className="btn btn-primary group min-w-[160px]">Join Now <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></button>
            <Link to="/contact" className="btn btn-ghost min-w-[160px] bg-ink/40 backdrop-blur">Contact Us</Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
