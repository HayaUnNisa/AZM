import { plans } from '../../data/site'
import SectionHeading from '../ui/SectionHeading'
import PlanCard from './PlanCard'

export default function Pricing() {
  return (
    <section className="relative overflow-hidden bg-ink py-20 lg:py-28">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/[0.07] blur-[140px]" />
      <div className="container-site relative grid items-center gap-12 lg:grid-cols-[minmax(0,350px)_minmax(0,1fr)]">
        <div>
          <SectionHeading eyebrow="Membership plans" lines={['Choose', 'your plan']} size="lg">
            Flexible plans for every fitness goal. Join today and start your transformation.
          </SectionHeading>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {plans.map((p, i) => <PlanCard key={p.id} plan={p} i={i} />)}
        </div>
      </div>
    </section>
  )
}
