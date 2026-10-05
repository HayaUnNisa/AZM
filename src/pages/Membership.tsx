import { motion } from 'framer-motion'
import { Check, Minus } from 'lucide-react'
import PageHero from '../components/layout/PageHero'
import PlanCard from '../components/sections/PlanCard'
import Accordion from '../components/ui/Accordion'
import SectionHeading from '../components/ui/SectionHeading'
import { useUI } from '../context/UIContext'
import { images } from '../data/images'
import { faqs, planComparison, plans } from '../data/site'
import { ease } from '../lib/motion'

function Cell({ v }: { v: string | boolean }) {
  if (v === true) return <Check className="mx-auto h-5 w-5 text-brand" strokeWidth={2.5} aria-label="Included" />
  if (v === false) return <Minus className="mx-auto h-4 w-4 text-white/25" aria-label="Not included" />
  return <span className="text-sm font-semibold">{v}</span>
}

export default function Membership() {
  const { openJoin } = useUI()
  return (
    <>
      <PageHero crumb="Membership" eyebrow="Membership plans" lines={['Choose', 'your plan']} image={images.ctaPullup}
        text="Flexible plans for every fitness goal. Pick the one that fits and start your transformation today." />

      <section className="relative bg-ink py-20 lg:py-28">
        <div className="container-site grid gap-5 md:grid-cols-3 lg:gap-7">
          {plans.map((p, i) => <PlanCard key={p.id} plan={p} i={i} />)}
        </div>
      </section>

      <section className="bg-ink pb-20 lg:pb-28">
        <div className="container-site">
          <SectionHeading eyebrow="Compare plans" lines={['What’s', 'included']} inline />
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.8, ease }} className="mt-10 overflow-x-auto rounded-xl border border-white/10">
            <table className="w-full min-w-[640px] text-left">
              <thead>
                <tr className="bg-ink-800">
                  <th className="p-5 text-sm font-semibold text-white/50">Feature</th>
                  {plans.map((p) => (
                    <th key={p.id} className={`p-5 text-center ${p.popular ? 'bg-brand/10' : ''}`}>
                      <span className={`block text-sm font-extrabold ${p.popular ? 'text-brand' : ''}`}>{p.name}</span>
                      <span className="text-xs font-medium text-white/50">SAR {p.price}/mo</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {planComparison.map((r) => (
                  <tr key={r.label} className="border-t border-white/[0.06] transition-colors hover:bg-white/[0.02]">
                    <td className="p-5 text-sm text-white/75">{r.label}</td>
                    {r.values.map((v, i) => <td key={i} className={`p-5 text-center ${plans[i].popular ? 'bg-brand/[0.05]' : ''}`}><Cell v={v} /></td>)}
                  </tr>
                ))}
                <tr className="border-t border-white/[0.06]">
                  <td className="p-5" />
                  {plans.map((p) => (
                    <td key={p.id} className={`p-5 text-center ${p.popular ? 'bg-brand/[0.05]' : ''}`}>
                      <button onClick={() => openJoin(p.id)} className={`btn !px-4 !py-2.5 !text-xs ${p.popular ? 'btn-primary' : 'btn-ghost'}`}>Choose {p.name}</button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      <section className="border-t border-white/[0.05] bg-ink-800 py-20 lg:py-28">
        <div className="container-site grid gap-12 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)]">
          <SectionHeading eyebrow="FAQ" lines={['Questions', 'answered']}>
            Can’t find what you need? Message us on WhatsApp and we’ll reply quickly.
          </SectionHeading>
          <Accordion items={faqs} />
        </div>
      </section>
    </>
  )
}
