import { images } from './images'

/** Business details — edit here, used everywhere on the site. */
export const contact = {
  name: 'AZM Gym',
  city: 'Riyadh, Saudi Arabia',
  email: 'info@azmgym.com',
  phone: '+966 50 123 4567',
  /** WhatsApp number in international format, digits only. Join & contact forms send here. */
  whatsapp: '966501234567',
  hours: [
    { days: 'Sat – Thu', time: '6:00 AM – 12:00 AM' },
    { days: 'Friday', time: '4:00 PM – 12:00 AM' },
  ],
  /** Paste a Google Maps embed URL to show the live map on the Contact page. */
  mapEmbedUrl: '',
  /** Paste a YouTube embed URL (https://www.youtube.com/embed/ID) for the "Watch Video" button. */
  tourVideoUrl: '',
  socials: {
    instagram: 'https://instagram.com/',
    facebook: 'https://facebook.com/',
    youtube: 'https://youtube.com/',
    tiktok: 'https://tiktok.com/',
  },
}

export const nav = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Facilities', to: '/facilities' },
  { label: 'Membership', to: '/membership' },
  { label: 'Trainers', to: '/trainers' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Contact', to: '/contact' },
]

export const stats = [
  { value: 1500, suffix: '+', label: 'Active members', icon: 'users' },
  { value: 20, suffix: '+', label: 'Expert trainers', icon: 'user' },
  { value: 7, suffix: '', label: 'Days a week', icon: 'calendar' },
  { value: 5, suffix: '', label: 'Average rating', icon: 'star' },
] as const

export type Facility = { slug: string; title: string; short: string; long: string; image: string; icon: string }
export const facilities: Facility[] = [
  { slug: 'strength', title: 'Strength Area', short: 'Free weights & modern machines', long: 'Full dumbbell range, plate-loaded and selectorised machines, power racks and lifting platforms.', image: images.facilityStrength, icon: 'dumbbell' },
  { slug: 'cardio', title: 'Cardio Zone', short: 'Treadmills, bikes, rowers and more', long: 'Rows of treadmills, bikes, rowers and stair climbers, each with its own screen.', image: images.facilityCardio, icon: 'activity' },
  { slug: 'functional', title: 'Functional Area', short: 'HIIT, CrossFit style training', long: 'Turf sled lane, rigs, kettlebells, battle ropes and plyo boxes for conditioning work.', image: images.facilityFunctional, icon: 'flame' },
  { slug: 'locker', title: 'Locker & Shower', short: 'Clean, secure facilities', long: 'Digital-lock lockers, private showers and a grooming area, cleaned throughout the day.', image: images.facilityLocker, icon: 'shower' },
  { slug: 'combat', title: 'Combat Zone', short: 'Bags, pads and conditioning', long: 'Heavy bags and open floor space for boxing and kickboxing sessions.', image: images.facilityBoxing, icon: 'swords' },
  { slug: 'recovery', title: 'Recovery Room', short: 'Stretch, roll and reset', long: 'Mats, foam rollers and mobility tools to recover between sessions.', image: images.facilityRecovery, icon: 'waves' },
]

export type Trainer = { name: string; role: string; image: string; bio: string; specialties: string[]; experience: string }
export const trainers: Trainer[] = [
  { name: 'Omar Khalid', role: 'Strength & Conditioning', image: images.trainerOmar, experience: '9 years', bio: 'Builds strength programmes around compound lifts, sound technique and steady progression.', specialties: ['Powerlifting', 'Athletic performance', 'Injury prevention'] },
  { name: 'Sara Ahmed', role: 'Functional Training', image: images.trainerSara, experience: '7 years', bio: 'Leads the women’s functional sessions and designs programmes that build real-life strength and fitness.', specialties: ['HIIT', 'Mobility', 'Women’s training'] },
  { name: 'Ali Raza', role: 'Bodybuilding & Hypertrophy', image: images.trainerAli, experience: '11 years', bio: 'Competitive physique coach focused on muscle growth, nutrition guidance and contest prep.', specialties: ['Hypertrophy', 'Nutrition guidance', 'Contest prep'] },
]

export type Plan = { id: string; name: string; price: number; popular?: boolean; features: string[]; blurb: string }
export const plans: Plan[] = [
  { id: 'basic', name: 'Basic', price: 199, blurb: 'Train on your own schedule.', features: ['Gym access (off-peak)', 'Cardio equipment', 'Locker facility', 'Community events'] },
  { id: 'pro', name: 'Pro', price: 299, popular: true, blurb: 'Full access plus coaching.', features: ['Full gym access', 'Group fitness classes', '1 personal training session', 'Nutrition guidance', 'Locker & shower facilities'] },
  { id: 'elite', name: 'Elite', price: 499, blurb: 'The complete AZM experience.', features: ['Full gym access', 'Unlimited group classes', '4 personal training sessions', 'Advanced coaching', 'Priority access', 'Locker, shower & towel service'] },
]

/** Rows for the comparison table on the Membership page. */
export const planComparison: { label: string; values: [string | boolean, string | boolean, string | boolean] }[] = [
  { label: 'Gym access', values: ['Off-peak', 'Full', 'Full'] },
  { label: 'Cardio equipment', values: [true, true, true] },
  { label: 'Group fitness classes', values: [false, true, 'Unlimited'] },
  { label: 'Personal training sessions / month', values: ['—', '1', '4'] },
  { label: 'Nutrition guidance', values: [false, true, true] },
  { label: 'Advanced coaching', values: [false, false, true] },
  { label: 'Priority access', values: [false, false, true] },
  { label: 'Locker', values: [true, true, true] },
  { label: 'Shower & towel service', values: [false, 'Shower', 'Shower + towel'] },
  { label: 'Community events', values: [true, true, true] },
]

export const testimonials = [
  { name: 'Ahmed R.', rating: 5, text: 'Amazing gym with great equipment and supportive trainers. The environment is motivating and the results speak for themselves. Highly recommended!' },
  { name: 'Sara M.', rating: 5, text: 'The best fitness environment in Riyadh. I’ve seen real results since joining, and the women’s sessions are run really well.' },
  { name: 'Faisal A.', rating: 5, text: 'Clean, never too crowded in the evenings, and the coaches actually check your form. Worth every riyal.' },
  { name: 'Noura K.', rating: 5, text: 'Started with zero experience. Six months later I’m deadlifting my bodyweight. The trainers made it feel easy to begin.' },
  { name: 'Khalid S.', rating: 5, text: 'Opening hours fit perfectly around work, and the functional area is the best I’ve trained in.' },
]

export type GalleryItem = { src: string; alt: string; category: 'Facilities' | 'Training' | 'Equipment'; wide?: boolean }
export const gallery: GalleryItem[] = [
  { src: images.gallery[0], alt: 'AZM Gym training floor', category: 'Facilities', wide: true },
  { src: images.gallery[1], alt: 'Member training with battle ropes', category: 'Training' },
  { src: images.gallery[2], alt: 'Squat racks and rigs', category: 'Equipment' },
  { src: images.gallery[3], alt: 'Cardio zone', category: 'Facilities' },
  { src: images.gallery[4], alt: 'Strength equipment', category: 'Equipment', wide: true },
  { src: images.gallery[5], alt: 'Dumbbell rack close-up', category: 'Equipment' },
  { src: images.gallery[6], alt: 'Group class in session', category: 'Training' },
  { src: images.gallery[7], alt: 'Reception and entrance', category: 'Facilities', wide: true },
  { src: images.trainerOmar, alt: 'Coach Omar Khalid', category: 'Training' },
  { src: images.ctaPullup, alt: 'Member doing pull-ups', category: 'Training', wide: true },
]

/** Weekly class timetable shown on the Facilities page. */
export const schedule: Record<string, { time: string; name: string; coach: string; zone: string }[]> = {
  Sat: [
    { time: '7:00 AM', name: 'Morning HIIT', coach: 'Sara Ahmed', zone: 'Functional Area' },
    { time: '6:00 PM', name: 'Strength Foundations', coach: 'Omar Khalid', zone: 'Strength Area' },
    { time: '9:00 PM', name: 'Hypertrophy Lab', coach: 'Ali Raza', zone: 'Strength Area' },
  ],
  Sun: [
    { time: '7:00 AM', name: 'Mobility Flow', coach: 'Sara Ahmed', zone: 'Recovery Room' },
    { time: '7:30 PM', name: 'Boxing Conditioning', coach: 'Omar Khalid', zone: 'Combat Zone' },
  ],
  Mon: [
    { time: '6:30 AM', name: 'Metcon', coach: 'Sara Ahmed', zone: 'Functional Area' },
    { time: '8:00 PM', name: 'Powerlifting Club', coach: 'Omar Khalid', zone: 'Strength Area' },
  ],
  Tue: [
    { time: '7:00 AM', name: 'Morning HIIT', coach: 'Sara Ahmed', zone: 'Functional Area' },
    { time: '9:00 PM', name: 'Hypertrophy Lab', coach: 'Ali Raza', zone: 'Strength Area' },
  ],
  Wed: [
    { time: '6:30 PM', name: 'Circuit Burn', coach: 'Sara Ahmed', zone: 'Functional Area' },
    { time: '8:00 PM', name: 'Strength Foundations', coach: 'Omar Khalid', zone: 'Strength Area' },
  ],
  Thu: [
    { time: '7:00 PM', name: 'Team WOD', coach: 'Sara Ahmed', zone: 'Functional Area' },
    { time: '9:30 PM', name: 'Posing & Physique', coach: 'Ali Raza', zone: 'Strength Area' },
  ],
  Fri: [
    { time: '5:00 PM', name: 'Open Gym Social', coach: 'All coaches', zone: 'Whole gym' },
  ],
}

export const faqs = [
  { q: 'Is there a joining fee?', a: 'No. You only pay the monthly price of the plan you choose.' },
  { q: 'Can I switch plans later?', a: 'Yes. Upgrade or downgrade at reception and the change applies from your next billing month.' },
  { q: 'Do you have sessions for women?', a: 'Yes. Women-only functional and HIIT classes run every week — see the timetable on the Facilities page.' },
  { q: 'Can I try the gym before joining?', a: 'Book a free tour and trial session through the Contact page or WhatsApp and we’ll arrange a time.' },
  { q: 'What does “off-peak” mean on the Basic plan?', a: 'Basic members can train any time outside the busiest evening hours. Reception can confirm the current off-peak window.' },
]

export const values = [
  { title: 'Discipline', text: 'Progress comes from showing up. We build routines that last beyond January.' },
  { title: 'Community', text: 'Beginners and athletes train side by side and push each other forward.' },
  { title: 'Expert coaching', text: 'Certified trainers who check your form, track your progress and adjust your plan.' },
  { title: 'Clean, modern space', text: 'Premium equipment, cleaned throughout the day, with room to train properly.' },
]
