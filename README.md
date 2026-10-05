# AZM Gym — website

React + TypeScript + Tailwind CSS + React Router + Framer Motion (Vite).

## Run it
```bash
npm install
npm run dev       # local dev server
npm run build     # production build in /dist
```

## Deploy to Vercel
Import the folder/repo in Vercel → framework preset **Vite** → deploy.
`vercel.json` is already set up so links like `/membership` work on refresh.

## Edit content (no component changes needed)
| What | File |
|---|---|
| Phone, WhatsApp number, email, hours, socials, tour video URL, Google Maps embed | `src/data/site.ts` → `contact` |
| Facilities, trainers, plans & prices, comparison table, testimonials, gallery, class timetable, FAQ, values | `src/data/site.ts` |
| **All images** (real photos + placeholders) | `src/data/images.ts` |

### Replacing placeholders
Placeholders live in `src/assets/placeholders/` (each shows its label + ideal size).
1. Put the real photo in `src/assets/images/` (WebP or JPG, ~1600px wide max).
2. In `src/data/images.ts`, change that one import to point to the new file.

### Join & contact forms
Both open WhatsApp with the details pre-filled, sent to `contact.whatsapp`
(international format, digits only, e.g. `966501234567`).

## Structure
```
src/
  data/            site.ts (content) · images.ts (all images)
  pages/           Home, About, FacilitiesPage, Membership, TrainersPage, GalleryPage, Contact, NotFound
  components/
    layout/        Navbar, Footer, Preloader, PageTransition, PageHero, Chrome (progress bar, WhatsApp + back-to-top)
    sections/      Hero, AboutBanner, Facilities, StatsBand, Trainers, Pricing, GalleryPreview, Testimonials, CTABanner, cards
    modals/        JoinModal (3-step), VideoModal, TrainerModal
    ui/            SectionHeading, Lightbox, Modal, Accordion, CountUp, Marquee, RevealImage, carousel hook, icons
```
Animations respect the visitor's "reduce motion" setting.
