import { AnimatePresence, motion } from 'framer-motion'
import { Clock, MapPin, UserRound } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import PageHero from '../components/layout/PageHero'
import Icon from '../components/ui/Icon'
import RevealImage from '../components/ui/RevealImage'
import SectionHeading from '../components/ui/SectionHeading'
import { images } from '../data/images'
import { facilities, schedule } from '../data/site'
import { ease } from '../lib/motion'

const days = Object.keys(schedule)
const todayKey = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][new Date().getDay()]

export default function FacilitiesPage() {
  const { hash } = useLocation()
  const [day, setDay] = useState(days.includes(todayKey) ? todayKey : days[0])

  useEffect(() => {
    if (!hash) return
    const t = setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 900)
    return () => clearTimeout(t)
  }, [hash])

  return (
    <>
      <PageHero crumb="Facilities" eyebrow="Our facilities" lines={['Everything you need', 'in one place']} image={images.facilityFunctional}
        text="Train in a modern, spacious environment designed for all fitness levels — from heavy lifting to recovery." />

      <section className="bg-ink py-20 lg:py-28">
        <div className="container-site space-y-20 lg:space-y-28">
          {facilities.map((f, i) => (
            <article id={f.slug} key={f.slug} className="grid scroll-mt-28 items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <div className={i % 2 ? 'lg:order-2' : ''}>
                <RevealImage src={f.image} alt={f.title} from={i % 2 ? 'right' : 'left'} className="aspect-[4/3]" />
              </div>
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.9, ease, delay: 0.15 }}>
                <span className="grid h-14 w-14 place-items-center rounded-xl bg-brand/15 text-brand"><Icon name={f.icon} className="h-7 w-7" /></span>
                <h2 className="display mt-6 text-4xl sm:text-5xl">{f.title}</h2>
                <p className="mt-2 text-sm font-semibold text-brand-soft">{f.short}</p>
                <p className="mt-5 max-w-md text-[15px] leading-relaxed text-white/70">{f.long}</p>
              </motion.div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-mist py-20 text-ink lg:py-28">
        <div className="container-site">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <SectionHeading tone="light" eyebrow="Class timetable" lines={['Weekly', 'classes']}>
              Group classes are included with Pro and Elite memberships.
            </SectionHeading>
            <div role="tablist" aria-label="Day" className="no-scrollbar -mx-5 flex gap-1 overflow-x-auto px-5 sm:mx-0 sm:px-0">
              {days.map((d) => (
                <button key={d} role="tab" aria-selected={day === d} onClick={() => setDay(d)} className={`relative shrink-0 rounded-full px-4 py-2.5 text-sm font-bold transition-colors ${day === d ? 'text-white' : 'text-ink/60 hover:text-ink'}`}>
                  {day === d && <motion.span layoutId="day-pill" className="absolute inset-0 rounded-full bg-brand" transition={{ type: 'spring', stiffness: 380, damping: 30 }} />}
                  <span className="relative">{d}{d === todayKey && <span className="ml-1 text-[10px] opacity-70">· today</span>}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="mt-10 min-h-[220px]">
            <AnimatePresence mode="wait">
              <motion.ul key={day} initial="hidden" animate="show" exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }} variants={{ show: { transition: { staggerChildren: 0.06 } } }} className="divide-y divide-ink/10 overflow-hidden rounded-xl border border-ink/10 bg-white">
                {schedule[day].map((c) => (
                  <motion.li key={c.time + c.name} variants={{ hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0, transition: { duration: 0.45, ease } } }}
                    className="grid gap-2 px-6 py-5 transition-colors hover:bg-mist sm:grid-cols-[140px_1fr_1fr_minmax(0,1fr)] sm:items-center">
                    <span className="flex items-center gap-2 text-sm font-extrabold text-brand"><Clock className="h-4 w-4" />{c.time}</span>
                    <span className="text-base font-bold">{c.name}</span>
                    <span className="flex items-center gap-2 text-sm text-ink/60"><UserRound className="h-4 w-4" />{c.coach}</span>
                    <span className="flex items-center gap-2 text-sm text-ink/60"><MapPin className="h-4 w-4" />{c.zone}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </AnimatePresence>
          </div>
        </div>
      </section>
    </>
  )
}
