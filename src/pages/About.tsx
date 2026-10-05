import { motion } from 'framer-motion'
import PageHero from '../components/layout/PageHero'
import StatsBand from '../components/sections/StatsBand'
import Trainers from '../components/sections/Trainers'
import RevealImage from '../components/ui/RevealImage'
import Marquee from '../components/ui/Marquee'
import SectionHeading from '../components/ui/SectionHeading'
import { images } from '../data/images'
import { values } from '../data/site'
import { ease } from '../lib/motion'

export default function About() {
  return (
    <>
      <PageHero crumb="About" eyebrow="About AZM Gym" lines={['More than', 'just a gym']} image={images.aboutInterior}
        text="At AZM Gym, we believe fitness is a lifestyle. Our mission is to create a space where everyone — from beginners to athletes — can train, grow, and become the best version of themselves." />

      <section className="bg-ink py-20 lg:py-28">
        <div className="container-site grid items-center gap-14 lg:grid-cols-2">
          <div className="relative">
            <RevealImage src={images.facilityStrength} alt="AZM Gym strength area" className="aspect-[4/3.4]" />
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease, delay: 0.9 }} className="absolute -bottom-6 -right-3 rounded-xl bg-brand px-6 py-5 sm:-right-6">
              <p className="text-3xl font-extrabold leading-none">7 days</p>
              <p className="mt-1 text-xs font-semibold text-white/85">a week, morning to midnight</p>
            </motion.div>
          </div>
          <div>
            <SectionHeading eyebrow="Our story" lines={['Built in Riyadh', 'for real progress']}>
              <p>AZM means determination. We opened AZM Gym to give Riyadh a place where serious equipment, real coaching and a welcoming community come together under one roof.</p>
              <p className="mt-4">Whether it’s your first week or your tenth year of training, our coaches build a plan around you and help you stick to it.</p>
            </SectionHeading>
          </div>
        </div>
      </section>

      <Marquee />

      <section className="bg-ink py-20 lg:py-28">
        <div className="container-site">
          <SectionHeading eyebrow="What we stand for" lines={['Our', 'values']} inline />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <motion.div key={v.title} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease, delay: i * 0.1 }}
                className="group relative overflow-hidden rounded-xl border border-white/10 bg-ink-800 p-7 transition-colors duration-500 hover:border-brand/60">
                <span className="absolute -right-3 -top-6 text-[7rem] font-black leading-none text-white/[0.03] transition-colors duration-500 group-hover:text-brand/10">{v.title[0]}</span>
                <span className="block h-[3px] w-10 bg-brand transition-all duration-500 group-hover:w-16" />
                <h3 className="mt-6 text-lg font-extrabold">{v.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/60">{v.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <StatsBand />
      <Trainers />
    </>
  )
}
