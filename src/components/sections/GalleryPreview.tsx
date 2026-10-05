import { motion } from 'framer-motion'
import { ArrowRight, Expand } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { gallery } from '../../data/site'
import { ease, fadeUp } from '../../lib/motion'
import Lightbox from '../ui/Lightbox'
import SectionHeading from '../ui/SectionHeading'

const items = gallery.slice(0, 6)
// Mirrors the design: wide-narrow-narrow / narrow-wide-narrow
const spans = ['col-span-2 sm:col-span-5', 'col-span-1 sm:col-span-4', 'col-span-1 sm:col-span-3', 'col-span-1 sm:col-span-3', 'col-span-1 sm:col-span-5', 'col-span-2 sm:col-span-4']

export default function GalleryPreview() {
  const [idx, setIdx] = useState<number | null>(null)
  return (
    <section className="bg-mist py-20 text-ink lg:py-24">
      <div className="container-site grid items-center gap-12 lg:grid-cols-[minmax(0,300px)_minmax(0,1fr)]">
        <div>
          <SectionHeading tone="light" eyebrow="Our gallery" lines={['Inside', 'AZM Gym']}>
            Take a look at our facilities, members, and the energy that makes AZM Gym special.
          </SectionHeading>
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={4} className="mt-8">
            <Link to="/gallery" className="btn btn-outline-dark group !py-3">View More <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link>
          </motion.div>
        </div>
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-12">
          {items.map((g, i) => (
            <motion.button
              key={i}
              onClick={() => setIdx(i)}
              initial={{ opacity: 0, clipPath: 'inset(18% 18% 18% 18% round 10px)' }}
              whileInView={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0% round 10px)' }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1, ease, delay: i * 0.07 }}
              className={`group relative h-36 overflow-hidden rounded-[10px] sm:h-44 ${spans[i]}`}
              aria-label={`Open photo: ${g.alt}`}
            >
              <img src={g.src} alt={g.alt} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1.1s] ease-out group-hover:scale-110" />
              <span className="absolute inset-0 grid place-items-center bg-ink/0 transition-colors duration-500 group-hover:bg-ink/50">
                <Expand className="h-6 w-6 scale-50 text-white opacity-0 transition-all duration-500 group-hover:scale-100 group-hover:opacity-100" />
              </span>
            </motion.button>
          ))}
        </div>
      </div>
      <Lightbox items={items} index={idx} onChange={setIdx} onClose={() => setIdx(null)} />
    </section>
  )
}
