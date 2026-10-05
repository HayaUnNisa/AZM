import { AnimatePresence, motion } from 'framer-motion'
import { Expand } from 'lucide-react'
import { useMemo, useState } from 'react'
import PageHero from '../components/layout/PageHero'
import Lightbox from '../components/ui/Lightbox'
import { images } from '../data/images'
import { gallery } from '../data/site'
import { ease } from '../lib/motion'

const filters = ['All', 'Facilities', 'Training', 'Equipment'] as const

export default function GalleryPage() {
  const [filter, setFilter] = useState<(typeof filters)[number]>('All')
  const [idx, setIdx] = useState<number | null>(null)
  const items = useMemo(() => (filter === 'All' ? gallery : gallery.filter((g) => g.category === filter)), [filter])

  return (
    <>
      <PageHero crumb="Gallery" eyebrow="Our gallery" lines={['Inside', 'AZM Gym']} image={images.gallery[0]}
        text="Take a look at our facilities, members, and the energy that makes AZM Gym special." />
      <section className="bg-mist py-16 text-ink lg:py-24">
        <div className="container-site">
          <div role="tablist" aria-label="Filter photos" className="no-scrollbar flex gap-1 overflow-x-auto">
            {filters.map((f) => (
              <button key={f} role="tab" aria-selected={filter === f} onClick={() => setFilter(f)} className={`relative shrink-0 rounded-full px-5 py-2.5 text-sm font-bold transition-colors ${filter === f ? 'text-white' : 'text-ink/60 hover:text-ink'}`}>
                {filter === f && <motion.span layoutId="gal-pill" className="absolute inset-0 rounded-full bg-ink" transition={{ type: 'spring', stiffness: 380, damping: 30 }} />}
                <span className="relative">{f} <span className="text-xs opacity-60">{f === 'All' ? gallery.length : gallery.filter((g) => g.category === f).length}</span></span>
              </button>
            ))}
          </div>
          <motion.div layout className="mt-10 grid auto-rows-[200px] grid-cols-2 gap-3 sm:auto-rows-[240px] lg:grid-cols-4">
            <AnimatePresence mode="popLayout">
              {items.map((g, i) => (
                <motion.button
                  layout
                  key={g.src + g.alt}
                  onClick={() => setIdx(i)}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, ease }}
                  className={`group relative overflow-hidden rounded-xl ${g.wide ? 'col-span-2' : ''}`}
                  aria-label={`Open photo: ${g.alt}`}
                >
                  <img src={g.src} alt={g.alt} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1.1s] group-hover:scale-110" />
                  <span className="absolute inset-0 flex items-end justify-between bg-gradient-to-t from-ink/80 via-transparent p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <span className="text-left text-sm font-bold text-white">{g.alt}<span className="block text-xs font-medium text-white/60">{g.category}</span></span>
                    <Expand className="h-5 w-5 text-white" />
                  </span>
                </motion.button>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
      <Lightbox items={items} index={idx} onChange={setIdx} onClose={() => setIdx(null)} />
    </>
  )
}
