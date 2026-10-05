import { useCallback, useEffect, useRef, useState } from 'react'

/** Scroll-snap carousel helper: arrow controls + edge state, works with touch/trackpad natively. */
export function useCarousel<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  const update = useCallback(() => {
    const el = ref.current
    if (!el) return
    setAtStart(el.scrollLeft <= 4)
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4)
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    update()
    el.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => { el.removeEventListener('scroll', update); window.removeEventListener('resize', update) }
  }, [update])

  const scrollBy = (dir: 1 | -1) => {
    const el = ref.current
    if (!el) return
    const card = el.querySelector<HTMLElement>('[data-slide]')
    const step = card ? card.offsetWidth + 16 : el.clientWidth * 0.8
    el.scrollBy({ left: dir * step, behavior: 'smooth' })
  }

  return { ref, atStart, atEnd, prev: () => scrollBy(-1), next: () => scrollBy(1) }
}
