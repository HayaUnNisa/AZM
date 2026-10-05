import { motion } from 'framer-motion'
import { stats } from '../../data/site'
import { images } from '../../data/images'
import { ease } from '../../lib/motion'
import CountUp from '../ui/CountUp'
import Icon from '../ui/Icon'
import SectionHeading from '../ui/SectionHeading'

export default function StatsBand() {
  return (
    <section className="relative overflow-hidden border-y border-white/[0.05] bg-ink-800 py-16 lg:py-20">
      <img src={images.statsBack} alt="" aria-hidden="true" className="absolute inset-y-0 left-0 hidden h-full w-[38%] object-cover lg:block opacity-60 [mask-image:linear-gradient(to_right,black_30%,transparent)]" />
      <div className="container-site relative lg:pl-[22%]">
        <SectionHeading eyebrow="Our community" lines={['Real people.', 'Real progress.']} inline />
        <ul className="mt-10 grid grid-cols-2 gap-y-8 lg:grid-cols-4">
          {stats.map((s, i) => (
            <motion.li
              key={s.label}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.7, ease, delay: i * 0.1 }}
              className={`flex items-center gap-4 pr-4 ${i % 2 ? 'border-l border-white/10 pl-5 lg:pl-7' : ''} ${i === 2 ? 'lg:border-l lg:border-white/10 lg:pl-7' : ''}`}
            >
              <Icon name={s.icon} className="h-7 w-7 shrink-0 text-brand" strokeWidth={1.75} />
              <div>
                <p className="flex items-center text-3xl font-extrabold leading-none sm:text-4xl">
                  <span className={i === 2 || i === 3 ? 'text-brand' : ''}><CountUp to={s.value} suffix={s.suffix} /></span>
                  {s.icon === 'star' && <span className="ml-1 text-2xl text-brand">☆</span>}
                </p>
                <p className="mt-1.5 text-xs font-semibold text-white/70">{s.label}</p>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
