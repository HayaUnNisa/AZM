import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Clock, Mail, MapPin, Phone } from 'lucide-react'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useUI } from '../../context/UIContext'
import { images } from '../../data/images'
import { contact, nav } from '../../data/site'
import { fadeUp } from '../../lib/motion'
import Logo from '../ui/Logo'
import SectionHeading from '../ui/SectionHeading'
import SocialIcons from '../ui/SocialIcons'

export default function Footer() {
  const { openJoin } = useUI()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-12%', '0%'])
  const scale = useTransform(scrollYProgress, [0, 1], [1.12, 1])

  return (
    <footer ref={ref} className="relative overflow-hidden bg-ink">
      {/* One photo behind the CTA and the footer */}
      <motion.img
        style={{ y, scale }}
        src={images.ctaFooter}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="absolute inset-x-0 top-0 h-[560px] w-full object-cover object-[50%_25%] [mask-image:linear-gradient(to_bottom,black_55%,transparent)] lg:h-[115%] lg:object-[60%_20%] lg:[mask-image:none]"
      />
      {/* Darker on the left so the CTA text reads */}
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-ink/10" />
      {/* Photo fades into solid dark toward the bottom */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/0 via-ink/75 to-ink" />
      {/* Soft blend with the section above */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-ink to-transparent" />

      <div className="relative">
        {/* CTA: text left, stacked buttons right */}
        <div className="container-site pb-20 pt-28 lg:pb-28 lg:pt-36">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-xl">
              <SectionHeading eyebrow="Ready to start?" lines={['Your stronger', 'self starts here']} size="lg">
                Join AZM Gym today and take the first step towards a healthier, happier you.
              </SectionHeading>
            </div>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              custom={4}
              className="flex w-full flex-col gap-3 sm:w-[220px] lg:shrink-0"
            >
              <button onClick={() => openJoin()} className="btn btn-primary group w-full">
                Join Now <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              <Link to="/contact" className="btn btn-ghost w-full bg-ink/40 backdrop-blur">
                Contact Us
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Footer columns */}
        <div className="container-site">
          <div className="grid gap-12 pb-14 pt-4 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_1.2fr_0.8fr]">
            <div>
              <Logo />
              <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/60">
                More than a gym. A community built on discipline, progress and a stronger tomorrow.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-bold text-brand/80">Quick links</h3>
              <ul className="mt-4 space-y-2.5 text-sm text-white/60">
                {nav.filter((n) => n.to !== '/contact').map((n) => (
                  <li key={n.to}>
                    <Link to={n.to} className="inline-block transition hover:translate-x-1 hover:text-brand">{n.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-bold text-brand/80">Contact</h3>
              <ul className="mt-4 space-y-3.5 text-sm text-white/65">
                <li className="flex gap-3"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" />{contact.city}</li>
                <li className="flex gap-3"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand" /><a className="hover:text-white" href={`mailto:${contact.email}`}>{contact.email}</a></li>
                <li className="flex gap-3"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand" /><a className="hover:text-white" href={`tel:${contact.phone.replace(/\s/g, '')}`}>{contact.phone}</a></li>
                <li className="flex gap-3">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                  <span>{contact.hours.map((h) => <span key={h.days} className="block">{h.days}: {h.time}</span>)}</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-bold text-brand/80">Follow us</h3>
              <SocialIcons className="mt-3 -ml-2" />
            </div>
          </div>
        </div>

        {/* Bottom bar: line spans the full screen, text stays in the container */}
        <div className="border-t border-brand/50">
          <div className="container-site flex flex-col gap-3 py-6 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} AZM Gym. All rights reserved.</p>
            <div className="flex gap-6">
              <Link to="/contact" className="hover:text-white">Privacy Policy</Link>
              <Link to="/contact" className="hover:text-white">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}