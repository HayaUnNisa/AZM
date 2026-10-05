import { LogoMark } from './Logo'

const words = ['Train harder', 'Live better', 'Discipline', 'Community', 'Progress', 'AZM Gym']

export default function Marquee() {
  const row = [...words, ...words]
  return (
    <div className="relative -rotate-1 overflow-hidden bg-brand py-4" aria-hidden="true">
      <div className="flex w-max animate-marquee items-center gap-8 whitespace-nowrap">
        {[...row, ...row].map((w, i) => (
          <span key={i} className="flex items-center gap-8">
            <span className="display text-2xl sm:text-3xl">{w}</span>
            <LogoMark className="h-5 w-auto brightness-0 invert" />
          </span>
        ))}
      </div>
    </div>
  )
}
