import { AnimatePresence, MotionConfig } from 'framer-motion'
import { useLocation, useRoutes } from 'react-router-dom'
import { cloneElement } from 'react'
import { FloatingActions, ScrollProgress } from './components/layout/Chrome'
import Footer from './components/layout/Footer'
import Navbar from './components/layout/Navbar'
import PageTransition from './components/layout/PageTransition'
import Preloader from './components/layout/Preloader'
import JoinModal from './components/modals/JoinModal'
import VideoModal from './components/modals/VideoModal'
import { UIProvider } from './context/UIContext'
import About from './pages/About'
import Contact from './pages/Contact'
import FacilitiesPage from './pages/FacilitiesPage'
import GalleryPage from './pages/GalleryPage'
import Home from './pages/Home'
import Membership from './pages/Membership'
import NotFound from './pages/NotFound'
import TrainersPage from './pages/TrainersPage'

const routes = [
  { path: '/', element: <Home /> },
  { path: '/about', element: <About /> },
  { path: '/facilities', element: <FacilitiesPage /> },
  { path: '/membership', element: <Membership /> },
  { path: '/trainers', element: <TrainersPage /> },
  { path: '/gallery', element: <GalleryPage /> },
  { path: '/contact', element: <Contact /> },
  { path: '*', element: <NotFound /> },
].map((r) => ({ ...r, element: <PageTransition>{r.element}</PageTransition> }))

export default function App() {
  const location = useLocation()
  const element = useRoutes(routes, location)
  return (
    <MotionConfig reducedMotion="user">
      <UIProvider>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded focus:bg-brand focus:px-4 focus:py-2">Skip to content</a>
        <Preloader />
        <ScrollProgress />
        <Navbar />
        <main id="main">
          <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
            {element && cloneElement(element, { key: location.pathname })}
          </AnimatePresence>
        </main>
        <Footer />
        <FloatingActions />
        <JoinModal />
        <VideoModal />
      </UIProvider>
    </MotionConfig>
  )
}
