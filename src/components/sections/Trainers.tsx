import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { trainers, type Trainer } from '../../data/site'
import { fadeUp } from '../../lib/motion'
import TrainerModal from '../modals/TrainerModal'
import ArrowControls from '../ui/ArrowControls'
import SectionHeading from '../ui/SectionHeading'
import { useCarousel } from '../ui/useCarousel'
import TrainerCard from './TrainerCard'

export default function Trainers() {
  const ref = useRef<HTMLElement>(null)
  const c = useCarousel<HTMLDivElement>()
  const [active, setActive] = useState<Trainer | null>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const x = useTransform(scrollYProgress, [0, 1], ['8%', '-18%'])

  return (
    <section ref={ref} className="relative overflow-hidden bg-mist py-20 text-ink lg:py-24">
      <motion.p style={{ x }} aria-hidden="true" className="display pointer-events-none absolute left-0 top-10 select-none whitespace-nowrap text-[9rem] text-ink/[0.045] sm:text-[13rem]">
        Experts · Coaches · Experts
      </motion.p>
      <div className="container-site relative grid items-center gap-12 lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)]">
        <div>
          <SectionHeading tone="light" eyebrow="Our trainers" lines={['Learn from', 'the best']}>
            Our certified trainers are here to guide you with personalized workout plans, proper technique, and continuous support.
          </SectionHeading>
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={4} className="mt-8 flex flex-col items-start gap-6">
            <Link to="/trainers" className="btn btn-outline-dark group !py-3">
              Meet Our Trainers <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <div className="lg:hidden">
              <ArrowControls tone="light" onPrev={c.prev} onNext={c.next} disablePrev={c.atStart} disableNext={c.atEnd} />
            </div>
          </motion.div>
        </div>
        <div ref={c.ref} className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 pb-2 sm:-mx-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-3 lg:overflow-visible lg:px-0">
          {trainers.map((t, i) => (
            <div key={t.name} className="w-[72%] shrink-0 snap-start sm:w-[44%] lg:w-auto">
              <TrainerCard t={t} i={i} onOpen={() => setActive(t)} />
            </div>
          ))}
        </div>
      </div>
      <TrainerModal trainer={active} onClose={() => setActive(null)} />
    </section>
  )
}
