import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="grain relative grid min-h-[100svh] place-items-center overflow-hidden bg-ink px-5 text-center">
      <div>
        <motion.p initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 120, delay: 0.3 }} className="display text-outline text-[9rem] text-brand sm:text-[14rem]">404</motion.p>
        <h1 className="display text-3xl sm:text-4xl">This page skipped leg day</h1>
        <p className="mx-auto mt-4 max-w-sm text-sm text-white/60">The page you’re looking for doesn’t exist or has moved. Head back home to keep training.</p>
        <Link to="/" className="btn btn-primary group mt-8">Back to home <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link>
      </div>
    </section>
  )
}
