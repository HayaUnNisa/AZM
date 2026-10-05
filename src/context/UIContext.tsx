import { createContext, useCallback, useContext, useState, type ReactNode } from 'react'

type UI = {
  joinOpen: boolean
  joinPlan: string | null
  openJoin: (planId?: string) => void
  closeJoin: () => void
  videoOpen: boolean
  openVideo: () => void
  closeVideo: () => void
}

const Ctx = createContext<UI | null>(null)

export function UIProvider({ children }: { children: ReactNode }) {
  const [joinOpen, setJoinOpen] = useState(false)
  const [joinPlan, setJoinPlan] = useState<string | null>(null)
  const [videoOpen, setVideoOpen] = useState(false)
  const openJoin = useCallback((planId?: string) => { setJoinPlan(planId ?? null); setJoinOpen(true) }, [])
  const closeJoin = useCallback(() => setJoinOpen(false), [])
  const openVideo = useCallback(() => setVideoOpen(true), [])
  const closeVideo = useCallback(() => setVideoOpen(false), [])
  return (
    <Ctx.Provider value={{ joinOpen, joinPlan, openJoin, closeJoin, videoOpen, openVideo, closeVideo }}>
      {children}
    </Ctx.Provider>
  )
}

export function useUI() {
  const v = useContext(Ctx)
  if (!v) throw new Error('useUI must be used inside UIProvider')
  return v
}
