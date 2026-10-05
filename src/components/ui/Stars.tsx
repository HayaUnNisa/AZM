import { Star } from 'lucide-react'
export default function Stars({ n = 5, className = 'h-3.5 w-3.5' }: { n?: number; className?: string }) {
  return (
    <div className="flex gap-0.5" aria-label={`${n} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`${className} ${i < n ? 'fill-amber-400 text-amber-400' : 'text-white/20'}`} />
      ))}
    </div>
  )
}
