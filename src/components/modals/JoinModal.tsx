import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check, CheckCircle2, MessageCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useUI } from '../../context/UIContext'
import { contact, plans } from '../../data/site'
import { ease } from '../../lib/motion'
import { openWhatsApp } from '../../lib/whatsapp'
import Modal from '../ui/Modal'

const goals = ['Build muscle', 'Lose weight', 'Get fitter', 'Sport performance']
const steps = ['Plan', 'Your details', 'Confirm']

type Form = { plan: string; name: string; phone: string; email: string; goal: string; start: string }
const empty: Form = { plan: 'pro', name: '', phone: '', email: '', goal: goals[0], start: '' }

export default function JoinModal() {
  const { joinOpen, joinPlan, closeJoin } = useUI()
  const [step, setStep] = useState(0)
  const [dir, setDir] = useState(1)
  const [f, setF] = useState<Form>(empty)
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({})
  const [sent, setSent] = useState(false)

  useEffect(() => {
    if (joinOpen) {
      setStep(0); setSent(false); setErrors({})
      setF((p) => ({ ...p, plan: joinPlan ?? p.plan }))
    }
  }, [joinOpen, joinPlan])

  const plan = plans.find((p) => p.id === f.plan)!
  const set = (k: keyof Form, v: string) => { setF((p) => ({ ...p, [k]: v })); setErrors((e) => ({ ...e, [k]: undefined })) }

  const validate = () => {
    const e: typeof errors = {}
    if (f.name.trim().length < 2) e.name = 'Enter your full name.'
    if (!/^(\+?966|0)?5\d{8}$/.test(f.phone.replace(/[\s-]/g, ''))) e.phone = 'Enter a Saudi mobile number, e.g. 05X XXX XXXX.'
    if (f.email && !/^\S+@\S+\.\S+$/.test(f.email)) e.email = 'Enter a valid email or leave it empty.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const next = () => {
    if (step === 1 && !validate()) return
    setDir(1); setStep((s) => Math.min(s + 1, 2))
  }
  const back = () => { setDir(-1); setStep((s) => Math.max(s - 1, 0)) }

  const send = () => {
    openWhatsApp(
      `Hi ${contact.name}, I'd like to join.\n\nPlan: ${plan.name} (SAR ${plan.price}/month)\nName: ${f.name}\nPhone: ${f.phone}${f.email ? `\nEmail: ${f.email}` : ''}\nGoal: ${f.goal}${f.start ? `\nPreferred start: ${f.start}` : ''}`,
    )
    setSent(true)
  }

  return (
    <Modal open={joinOpen} onClose={closeJoin} label="Join AZM Gym">
      <div className="p-6 sm:p-9">
        {sent ? (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="py-6 text-center">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.1 }} className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-brand/15 text-brand">
              <CheckCircle2 className="h-9 w-9" />
            </motion.div>
            <h2 className="display mt-6 text-3xl">Almost there, {f.name.split(' ')[0]}</h2>
            <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-white/65">
              Your request is ready in WhatsApp. Press send there and our team will confirm your {plan.name} membership.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <button onClick={send} className="btn btn-ghost"><MessageCircle className="h-4 w-4" /> Open WhatsApp again</button>
              <button onClick={closeJoin} className="btn btn-primary">Done</button>
            </div>
          </motion.div>
        ) : (
          <>
            <p className="eyebrow text-white/60">Join AZM Gym</p>
            <h2 className="display mt-3 text-3xl">Start your <span className="text-brand">membership</span></h2>

            {/* progress */}
            <ol className="mt-7 grid grid-cols-3 gap-2">
              {steps.map((s, i) => (
                <li key={s}>
                  <div className="h-1 overflow-hidden rounded-full bg-white/10">
                    <motion.div className="h-full bg-brand" initial={false} animate={{ width: i <= step ? '100%' : '0%' }} transition={{ duration: 0.5, ease }} />
                  </div>
                  <p className={`mt-2 text-[11px] font-semibold ${i <= step ? 'text-white' : 'text-white/40'}`}>{i + 1}. {s}</p>
                </li>
              ))}
            </ol>

            <div className="relative mt-7 min-h-[300px] overflow-hidden">
              <AnimatePresence mode="wait" custom={dir} initial={false}>
                <motion.div
                  key={step}
                  custom={dir}
                  variants={{ enter: (d: number) => ({ x: d * 40, opacity: 0 }), center: { x: 0, opacity: 1 }, exit: (d: number) => ({ x: d * -40, opacity: 0 }) }}
                  initial="enter" animate="center" exit="exit"
                  transition={{ duration: 0.35, ease }}
                >
                  {step === 0 && (
                    <fieldset>
                      <legend className="sr-only">Choose a plan</legend>
                      <div className="space-y-3">
                        {plans.map((p) => {
                          const on = f.plan === p.id
                          return (
                            <label key={p.id} className={`flex cursor-pointer items-center gap-4 rounded-xl border p-4 transition ${on ? 'border-brand bg-brand/10' : 'border-white/10 hover:border-white/30'}`}>
                              <input type="radio" name="plan" value={p.id} checked={on} onChange={() => set('plan', p.id)} className="sr-only" />
                              <span className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border-2 ${on ? 'border-brand bg-brand' : 'border-white/30'}`}>{on && <Check className="h-3 w-3" strokeWidth={3} />}</span>
                              <span className="flex-1">
                                <span className="flex items-center gap-2 text-sm font-bold">{p.name}{p.popular && <span className="rounded bg-brand px-1.5 py-0.5 text-[9px] uppercase tracking-wider">Popular</span>}</span>
                                <span className="text-xs text-white/55">{p.blurb}</span>
                              </span>
                              <span className="text-right text-sm font-extrabold">SAR {p.price}<span className="block text-[10px] font-medium text-white/45">/ month</span></span>
                            </label>
                          )
                        })}
                      </div>
                    </fieldset>
                  )}

                  {step === 1 && (
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field label="Full name" error={errors.name} className="sm:col-span-2">
                        <input className="field" value={f.name} onChange={(e) => set('name', e.target.value)} autoComplete="name" placeholder="e.g. Abdullah Al-Harbi" />
                      </Field>
                      <Field label="Mobile number" error={errors.phone}>
                        <input className="field" value={f.phone} onChange={(e) => set('phone', e.target.value)} inputMode="tel" autoComplete="tel" placeholder="05X XXX XXXX" />
                      </Field>
                      <Field label="Email (optional)" error={errors.email}>
                        <input className="field" value={f.email} onChange={(e) => set('email', e.target.value)} type="email" autoComplete="email" placeholder="you@email.com" />
                      </Field>
                      <Field label="Main goal">
                        <select className="field" value={f.goal} onChange={(e) => set('goal', e.target.value)}>
                          {goals.map((g) => <option key={g} className="bg-ink">{g}</option>)}
                        </select>
                      </Field>
                      <Field label="Preferred start date">
                        <input className="field [color-scheme:dark]" type="date" value={f.start} onChange={(e) => set('start', e.target.value)} />
                      </Field>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                      <div className="flex items-center justify-between border-b border-white/10 pb-4">
                        <span>
                          <span className="block text-xs text-white/50">Plan</span>
                          <span className="font-bold">{plan.name}</span>
                        </span>
                        <span className="text-xl font-extrabold">SAR {plan.price}<span className="text-xs font-medium text-white/50"> / month</span></span>
                      </div>
                      <dl className="mt-4 grid grid-cols-2 gap-y-3 text-sm">
                        <dt className="text-white/50">Name</dt><dd className="text-right font-semibold">{f.name}</dd>
                        <dt className="text-white/50">Mobile</dt><dd className="text-right font-semibold">{f.phone}</dd>
                        {f.email && <><dt className="text-white/50">Email</dt><dd className="truncate text-right font-semibold">{f.email}</dd></>}
                        <dt className="text-white/50">Goal</dt><dd className="text-right font-semibold">{f.goal}</dd>
                        {f.start && <><dt className="text-white/50">Start</dt><dd className="text-right font-semibold">{f.start}</dd></>}
                      </dl>
                      <p className="mt-5 text-xs leading-relaxed text-white/50">Sending opens WhatsApp with these details so our team can confirm your membership and payment at the front desk.</p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-6 flex items-center justify-between gap-3">
              {step > 0 ? (
                <button onClick={back} className="btn btn-ghost !px-4"><ArrowLeft className="h-4 w-4" /> Back</button>
              ) : <span />}
              {step < 2 ? (
                <button onClick={next} className="btn btn-primary group">Continue <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></button>
              ) : (
                <button onClick={send} className="btn btn-primary"><MessageCircle className="h-4 w-4" /> Send on WhatsApp</button>
              )}
            </div>
          </>
        )}
      </div>
    </Modal>
  )
}

function Field({ label, error, children, className = '' }: { label: string; error?: string; children: React.ReactNode; className?: string }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-xs font-semibold text-white/70">{label}</span>
      {children}
      <AnimatePresence>
        {error && <motion.span initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-1.5 block text-xs text-brand-soft">{error}</motion.span>}
      </AnimatePresence>
    </label>
  )
}
