import AboutBanner from '../components/sections/AboutBanner'
import Facilities from '../components/sections/Facilities'
import GalleryPreview from '../components/sections/GalleryPreview'
import Hero from '../components/sections/Hero'
import Pricing from '../components/sections/Pricing'
import StatsBand from '../components/sections/StatsBand'
import Testimonials from '../components/sections/Testimonials'
import Trainers from '../components/sections/Trainers'

export default function Home() {
  return (
    <>
      <Hero />
      <AboutBanner />
      <Facilities />
      <StatsBand />
      <Trainers />
      <Pricing />
      <GalleryPreview />
      <Testimonials />
    </>
  )
}
