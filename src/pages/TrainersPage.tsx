import { useState } from 'react'
import PageHero from '../components/layout/PageHero'
import TrainerModal from '../components/modals/TrainerModal'
import TrainerCard from '../components/sections/TrainerCard'
import Testimonials from '../components/sections/Testimonials'
import SectionHeading from '../components/ui/SectionHeading'
import { images } from '../data/images'
import { trainers, type Trainer } from '../data/site'

export default function TrainersPage() {
  const [active, setActive] = useState<Trainer | null>(null)
  return (
    <>
      <PageHero crumb="Trainers" eyebrow="Our trainers" lines={['Learn from', 'the best']} image={images.trainerAli}
        text="Our certified trainers guide you with personalized workout plans, proper technique, and continuous support." />
      <section className="bg-mist py-20 text-ink lg:py-28">
        <div className="container-site">
          <SectionHeading tone="light" eyebrow="Meet the team" lines={['Your', 'coaches']} inline>
            Tap a coach to see their specialties and experience.
          </SectionHeading>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {trainers.map((t, i) => <TrainerCard key={t.name} t={t} i={i} onOpen={() => setActive(t)} />)}
          </div>
        </div>
      </section>
      <Testimonials />
      <TrainerModal trainer={active} onClose={() => setActive(null)} />
    </>
  )
}
