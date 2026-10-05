import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { ArrowRight, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { contact, nav } from '../../data/site'
import { useUI } from '../../context/UIContext'
import { ease } from '../../lib/motion'
import Logo from '../ui/Logo'
import SocialIcons from '../ui/SocialIcons'

export default function Navbar() {
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const { openJoin } = useUI()
  const { pathname } = useLocation()

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setScrolled(y > 30)
    setHidden(y > 400 && y > prev && !open)
  })

  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  return (
    <>
      <motion.header
        animate={{ y: hidden ? '-110%' : '0%' }}
        transition={{ duration: 0.45, ease }}
        className={`fixed inset-x-0 top-0 z-50 transition-[background,border-color,backdrop-filter] duration-500 ${
          scrolled ? 'border-b border-white/[0.06] bg-ink/80 backdrop-blur-xl' : 'border-b border-transparent'
        }`}
        style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
      >
        <div className={`container-site flex items-center justify-between transition-[height] duration-500 ${scrolled ? 'h-16' : 'h-20'}`}>
          <Logo />
          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {nav.map((n) => (
                <li key={n.to}>
                  <NavLink to={n.to} end={n.to === '/'} className="relative block px-3.5 py-2 text-[13px] font-semibold text-white/80 transition hover:text-white">
                    {({ isActive }) => (
                      <>
                        <span className={isActive ? 'text-white' : ''}>{n.label}</span>
                        {isActive && (
                          <motion.span layoutId="nav-underline" className="absolute inset-x-3.5 -bottom-0.5 h-[2px] rounded-full bg-brand" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />
                        )}
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center gap-3">
            <button onClick={() => openJoin()} className="btn btn-primary hidden !px-5 !py-2.5 !text-[13px] sm:inline-flex group">
              Join Now <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button onClick={() => setOpen(true)} className="grid h-11 w-11 place-items-center rounded-full border border-white/15 lg:hidden" aria-label="Open menu" aria-expanded={open}>
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[70] flex flex-col bg-ink lg:hidden"
            initial={{ clipPath: 'circle(0% at 100% 0%)' }}
            animate={{ clipPath: 'circle(150% at 100% 0%)' }}
            exit={{ clipPath: 'circle(0% at 100% 0%)' }}
            transition={{ duration: 0.7, ease }}
            style={{ paddingTop: 'env(safe-area-inset-top, 0px)', paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
          >
            <div className="container-site flex h-20 items-center justify-between">
              <Logo onClick={() => setOpen(false)} />
              <button onClick={() => setOpen(false)} className="grid h-11 w-11 place-items-center rounded-full border border-white/15" aria-label="Close menu">
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav aria-label="Mobile" className="container-site flex-1 overflow-y-auto pt-6">
              <ul className="space-y-1">
                {nav.map((n, i) => (
                  <motion.li key={n.to} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + i * 0.05, duration: 0.5, ease }}>
                    <NavLink to={n.to} end={n.to === '/'} className={({ isActive }) => `display flex items-center justify-between border-b border-white/[0.06] py-4 text-3xl ${isActive ? 'text-brand' : 'text-white'}`}>
                      {n.label}
                      <ArrowRight className="h-5 w-5 opacity-40" />
                    </NavLink>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <motion.div className="container-site space-y-5 pb-8 pt-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}>
              <button onClick={() => { setOpen(false); openJoin() }} className="btn btn-primary w-full">Join Now <ArrowRight className="h-4 w-4" /></button>
              <div className="flex items-center justify-between text-sm text-white/60">
                <a href={`tel:${contact.phone.replace(/\s/g, '')}`}>{contact.phone}</a>
                <SocialIcons />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
