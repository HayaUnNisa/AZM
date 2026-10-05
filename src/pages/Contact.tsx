import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, Clock, Mail, MapPin, MessageCircle, Phone, Send } from 'lucide-react'
import { useState } from 'react'
import PageHero from '../components/layout/PageHero'
import SectionHeading from '../components/ui/SectionHeading'
import SocialIcons from '../components/ui/SocialIcons'
import { images } from '../data/images'
import { contact } from '../data/site'
import { ease } from '../lib/motion'
import { openWhatsApp } from '../lib/whatsapp'

const topics = ['Membership', 'Personal training', 'Free tour', 'Other']

export default function Contact() {
  const [f, setF] = useState({ name: '', phone: '', topic: topics[0], message: '' })
  const [err, setErr] = useState<Record<string, string>>({})
  const [sent, setSent] = useState(false)

  const cards = [
    { icon: MapPin, title: 'Visit us', lines: [contact.city] },
    { icon: Phone, title: 'Call us', lines: [contact.phone], href: `tel:${contact.phone.replace(/\s/g, '')}` },
    { icon: Mail, title: 'Email', lines: [contact.email], href: `mailto:${contact.email}` },
    { icon: Clock, title: 'Opening hours', lines: contact.hours.map((h) => `${h.days}: ${h.time}`) },
  ]

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const x: Record<string, string> = {}
    if (f.name.trim().length < 2) x.name = 'Enter your name.'
    if (!/^(\+?966|0)?5\d{8}$/.test(f.phone.replace(/[\s-]/g, ''))) x.phone = 'Enter a Saudi mobile number, e.g. 05X XXX XXXX.'
    if (f.message.trim().length < 5) x.message = 'Tell us a little about what you need.'
    setErr(x)
    if (Object.keys(x).length) return
    openWhatsApp(`Hi ${contact.name},\n\nTopic: ${f.topic}\nName: ${f.name}\nPhone: ${f.phone}\n\n${f.message}`)
    setSent(true)
  }
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setF((p) => ({ ...p, [k]: e.target.value })); setErr((p) => ({ ...p, [k]: '' }))
  }

  return (
    <>
      <PageHero crumb="Contact" eyebrow="Get in touch" lines={['Let’s get', 'you started']} image={images.aboutInterior}
        text="Questions about memberships, personal training or a free tour? Send us a message and the team will get back to you." />

      <section className="bg-ink py-20 lg:py-28">
        <div className="container-site">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {cards.map((c, i) => {
              const Inner = (
                <>
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand/15 text-brand transition-colors duration-500 group-hover:bg-brand group-hover:text-white"><c.icon className="h-5 w-5" /></span>
                  <h3 className="mt-5 text-sm font-bold">{c.title}</h3>
                  {c.lines.map((l) => <p key={l} className="mt-1 text-sm text-white/60">{l}</p>)}
                </>
              )
              return (
                <motion.div key={c.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease, delay: i * 0.08 }}>
                  {c.href ? (
                    <a href={c.href} className="group block h-full rounded-xl border border-white/10 bg-ink-800 p-6 transition-colors hover:border-brand/60">{Inner}</a>
                  ) : (
                    <div className="group h-full rounded-xl border border-white/10 bg-ink-800 p-6">{Inner}</div>
                  )}
                </motion.div>
              )
            })}
          </div>

          <div className="mt-20 grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <SectionHeading eyebrow="Send a message" lines={['We reply', 'fast']}>
                Your message opens in WhatsApp, ready to send to our front desk.
              </SectionHeading>
              <div className="mt-8 flex items-center gap-3 text-sm text-white/60">Follow us <SocialIcons /></div>
              <div className="mt-10 overflow-hidden rounded-xl border border-white/10">
                {contact.mapEmbedUrl ? (
                  <iframe src={contact.mapEmbedUrl} title="AZM Gym location" loading="lazy" className="h-72 w-full grayscale invert-[0.9] hue-rotate-180" />
                ) : (
                  <div className="relative grid h-72 place-items-center bg-ink-800 [background-image:linear-gradient(rgba(255,255,255,.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.04)_1px,transparent_1px)] [background-size:32px_32px]">
                    <div className="text-center">
                      <span className="relative mx-auto grid h-14 w-14 place-items-center rounded-full bg-brand">
                        <span className="absolute inset-0 animate-ping rounded-full bg-brand/40" />
                        <MapPin className="relative h-6 w-6" />
                      </span>
                      <p className="mt-4 text-sm font-semibold">{contact.city}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="relative rounded-2xl border border-white/10 bg-ink-800 p-6 sm:p-9">
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div key="ok" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="flex min-h-[420px] flex-col items-center justify-center text-center">
                    <CheckCircle2 className="h-14 w-14 text-brand" />
                    <h3 className="display mt-6 text-3xl">Message ready</h3>
                    <p className="mt-3 max-w-xs text-sm text-white/60">Press send in WhatsApp and our team will reply as soon as possible.</p>
                    <button onClick={() => setSent(false)} className="btn btn-ghost mt-8">Write another message</button>
                  </motion.div>
                ) : (
                  <motion.form key="form" onSubmit={submit} noValidate exit={{ opacity: 0 }} className="grid gap-5 sm:grid-cols-2">
                    <Fld label="Name" error={err.name}><input className="field" value={f.name} onChange={set('name')} autoComplete="name" /></Fld>
                    <Fld label="Mobile number" error={err.phone}><input className="field" value={f.phone} onChange={set('phone')} inputMode="tel" autoComplete="tel" placeholder="05X XXX XXXX" /></Fld>
                    <Fld label="Topic" className="sm:col-span-2">
                      <div className="flex flex-wrap gap-2">
                        {topics.map((t) => (
                          <button type="button" key={t} onClick={() => setF((p) => ({ ...p, topic: t }))} className={`rounded-full border px-4 py-2 text-xs font-bold transition ${f.topic === t ? 'border-brand bg-brand text-white' : 'border-white/15 text-white/70 hover:border-white/40'}`}>{t}</button>
                        ))}
                      </div>
                    </Fld>
                    <Fld label="Message" error={err.message} className="sm:col-span-2"><textarea rows={6} className="field resize-none" value={f.message} onChange={set('message')} /></Fld>
                    <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row">
                      <button type="submit" className="btn btn-primary flex-1"><MessageCircle className="h-4 w-4" /> Send on WhatsApp</button>
                      <a href={`mailto:${contact.email}?subject=${encodeURIComponent(`${f.topic} enquiry`)}&body=${encodeURIComponent(f.message)}`} className="btn btn-ghost"><Send className="h-4 w-4" /> Email instead</a>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

function Fld({ label, error, children, className = '' }: { label: string; error?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <label className="block">
        <span className="mb-2 block text-xs font-semibold text-white/70">{label}</span>
        {children}
      </label>
      {error && <p className="mt-1.5 text-xs text-brand-soft">{error}</p>}
    </div>
  )
}
