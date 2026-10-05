import { Link } from 'react-router-dom'

export function LogoMark({ className = 'h-7 w-auto' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 36" className={className} aria-hidden="true">
      <g fill="none" stroke="#F92B3E" strokeWidth="4.5" strokeLinejoin="round">
        <rect x="4" y="9" width="7" height="18" rx="1.5" />
        <rect x="14" y="4" width="7" height="28" rx="1.5" />
        <rect x="43" y="4" width="7" height="28" rx="1.5" />
        <rect x="53" y="9" width="7" height="18" rx="1.5" />
      </g>
      <rect x="21" y="15.5" width="22" height="5" fill="#F92B3E" />
    </svg>
  )
}

export default function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link to="/" onClick={onClick} className="group inline-flex items-center gap-2" aria-label="AZM Gym home">
      <LogoMark className="h-7 w-auto transition-transform duration-500 group-hover:rotate-[-8deg]" />
      <span className="flex flex-col leading-none">
        <span className="text-xl font-black tracking-tight">AZM</span>
        <span className="text-[8px] font-bold tracking-[0.5em] text-white/70">GYM</span>
      </span>
    </Link>
  )
}
