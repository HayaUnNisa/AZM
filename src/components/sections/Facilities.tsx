import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { facilities } from '../../data/site'
import { ease } from '../../lib/motion'
import ArrowControls from '../ui/ArrowControls'
import SectionHeading from '../ui/SectionHeading'
import { useCarousel } from '../ui/useCarousel'

export default function Facilities() {
  const c = useCarousel<HTMLDivElement>()
  return (
    <section className="relative overflow-hidden bg-ink py-20 lg:py-24">
      <div className="container-site grid items-center gap-10 lg:grid-cols-[minmax(0,300px)_minmax(0,1fr)] lg:gap-10">
        <div>
          <SectionHeading eyebrow="Our facilities" lines={['Everything you need', 'in one place']}>
            Train in a modern, spacious environment designed for all fitness levels.
          </SectionHeading>
          <div className="mt-8">
            <ArrowControls onPrev={c.prev} onNext={c.next} disablePrev={c.atStart} disableNext={c.atEnd} />
          </div>
        </div>
        <div ref={c.ref} className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 pb-2 sm:-mx-8 sm:scroll-px-8 sm:px-8 lg:mx-0 lg:scroll-px-0 lg:px-0">
          {facilities.map((f, i) => (
            <motion.article
              key={f.slug}
              data-slide
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease, delay: Math.min(i, 4) * 0.09 }}
              className="group relative w-[74%] shrink-0 snap-start overflow-hidden rounded-xl border border-white/10 bg-ink-800 transition-colors duration-500 hover:border-brand/60 sm:w-[44%] xl:w-[calc(25%-12px)]"
            >
              <Link to={`/facilities#${f.slug}`} className="block">
                <div className="aspect-[4/3.3] overflow-hidden">
                  <img src={f.image} alt={f.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110" />
                </div>
                <div className="flex items-end justify-between gap-2 p-4">
                  <div>
                    <h3 className="text-[14px] font-bold leading-tight">{f.title}</h3>
                    <p className="mt-1 text-xs leading-snug text-white/55">{f.short}</p>
                  </div>
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/40 transition-all duration-500 group-hover:-rotate-45 group-hover:border-brand group-hover:bg-brand">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
                <span className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-brand transition-transform duration-500 group-hover:scale-x-100" />
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
