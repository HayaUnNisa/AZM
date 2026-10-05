import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useEffect } from 'react'

type Item = { src: string; alt: string }

export default function Lightbox({ items, index, onChange, onClose }: { items: Item[]; index: number | null; onChange: (i: number) => void; onClose: () => void }) {
  const open = index !== null
  const go = (d: number) => index !== null && onChange((index + d + items.length) % items.length)

  useEffect(() => {
    if (!open) return
    const k = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    document.addEventListener('keydown', k)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', k); document.body.style.overflow = '' }
  })

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[85] flex flex-col bg-black/95 backdrop-blur" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} role="dialog" aria-modal="true" aria-label="Photo viewer">
          <div className="flex items-center justify-between p-4 text-sm text-white/60" style={{ paddingTop: 'max(1rem, env(safe-area-inset-top))' }}>
            <span className="tabular-nums">{index! + 1} / {items.length}</span>
            <button onClick={onClose} aria-label="Close" className="grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition hover:bg-brand"><X className="h-5 w-5" /></button>
          </div>
          <div className="relative flex flex-1 items-center justify-center overflow-hidden px-4 sm:px-20">
            <AnimatePresence mode="wait">
              <motion.img
                key={items[index!].src + index}
                src={items[index!].src}
                alt={items[index!].alt}
                initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3 }}
                drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={0.4}
                onDragEnd={(_, info) => { if (info.offset.x < -70) go(1); else if (info.offset.x > 70) go(-1) }}
                className="max-h-[78vh] max-w-full cursor-grab rounded-lg object-contain active:cursor-grabbing"
              />
            </AnimatePresence>
            <button onClick={() => go(-1)} aria-label="Previous photo" className="absolute left-3 hidden h-12 w-12 place-items-center rounded-full bg-white/10 text-white transition hover:bg-brand sm:grid"><ChevronLeft /></button>
            <button onClick={() => go(1)} aria-label="Next photo" className="absolute right-3 hidden h-12 w-12 place-items-center rounded-full bg-white/10 text-white transition hover:bg-brand sm:grid"><ChevronRight /></button>
          </div>
          <p className="p-5 text-center text-sm text-white/60" style={{ paddingBottom: 'max(1.25rem, env(safe-area-inset-bottom))' }}>{items[index!].alt}</p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
