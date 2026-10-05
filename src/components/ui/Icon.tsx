import { Activity, CalendarDays, Dumbbell, Flame, ShowerHead, Star, Swords, UserRound, Users, Waves, type LucideProps } from 'lucide-react'

const map = { dumbbell: Dumbbell, activity: Activity, flame: Flame, shower: ShowerHead, swords: Swords, waves: Waves, users: Users, user: UserRound, calendar: CalendarDays, star: Star }

export default function Icon({ name, ...p }: { name: string } & LucideProps) {
  const C = map[name as keyof typeof map] ?? Dumbbell
  return <C {...p} />
}
