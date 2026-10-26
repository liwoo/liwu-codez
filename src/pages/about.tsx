import { GetStaticProps } from "next"
import Head from "next/head"
import { useTheme } from "next-themes"
import { CSSProperties, useEffect, useRef, useState } from "react"
import Modal from "../components/modal"
import { panelFor } from "../components/studio/panels"
import RoomScene, { FRAMES, HOTSPOTS, HotspotId } from "../components/studio/room-scene"
import { Post } from "../lib/blog-config"
import { fetchPosts } from "../lib/posts"

interface StudioProps {
  posts: Post[]
}

type PanelId = Exclude<HotspotId, "lamp">

// Pan (walk-through) mode kicks in when the 16:9 room is clearly wider than the screen
const isNarrow = () => (window.innerHeight * 16) / 9 > window.innerWidth * 1.15
const prefersReducedMotion = () => window.matchMedia?.("(prefers-reduced-motion: reduce)").matches

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)

function nearestFrame(x: number): number {
  return FRAMES.reduce((best, f, i) => Math.abs(f.center - x) < Math.abs(FRAMES[best].center - x) ? i : best, 0)
}

export default function Studio({ posts }: StudioProps) {
  const { resolvedTheme, setTheme } = useTheme()
  const [open, setOpen] = useState<PanelId | null>(null)
  const [exploring, setExploring] = useState(false)
  const [announcement, setAnnouncement] = useState("")
  const [introOpen, setIntroOpen] = useState(true)
  const [pan, setPan] = useState(false)
  const [frame, setFrame] = useState(0)
  const introAutoHidden = useRef(false)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const roomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const update = () => setPan(isNarrow())
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  // Walk-through: vertical page scroll slides the room sideways, and CSS scroll-snap
  // stops on each frame. The transform is written straight to the DOM to stay smooth.
  useEffect(() => {
    if (!pan) return
    const html = document.documentElement
    html.classList.add("studio-snap")
    let raf = 0

    const render = () => {
      raf = 0
      const wrapper = wrapperRef.current
      const stage = stageRef.current
      const room = roomRef.current
      if (!wrapper || !stage || !room) return
      const roomWidth = room.offsetWidth
      const stageWidth = stage.clientWidth
      const travel = wrapper.offsetHeight - stage.clientHeight
      const progress = travel > 0 ? clamp(-wrapper.getBoundingClientRect().top / travel, 0, 1) : 0
      const position = progress * (FRAMES.length - 1)
      const xs = FRAMES.map(f => clamp((f.center * roomWidth) / 1600 - stageWidth / 2, 0, roomWidth - stageWidth))
      const i = Math.floor(position)
      const x = xs[i] + ((xs[i + 1] ?? xs[i]) - xs[i]) * (position - i)
      room.style.transform = `translate3d(${-x}px, 0, 0)`
      setFrame(Math.round(position))
    }
    const schedule = () => { if (!raf) raf = requestAnimationFrame(render) }

    render()
    window.addEventListener("scroll", schedule, { passive: true })
    window.addEventListener("resize", schedule)
    return () => {
      html.classList.remove("studio-snap")
      window.removeEventListener("scroll", schedule)
      window.removeEventListener("resize", schedule)
      cancelAnimationFrame(raf)
      if (roomRef.current) roomRef.current.style.transform = ""
    }
  }, [pan])

  // Once someone starts walking around on a phone, tuck the intro away (once; "?" brings it back)
  useEffect(() => {
    if (pan && frame > 0 && !introAutoHidden.current) {
      introAutoHidden.current = true
      setIntroOpen(false)
    }
  }, [pan, frame])

  function goToFrame(index: number) {
    const wrapper = wrapperRef.current
    const stage = stageRef.current
    if (!wrapper || !stage) return
    const top = wrapper.getBoundingClientRect().top + window.scrollY + index * stage.clientHeight
    window.scrollTo({ top, behavior: prefersReducedMotion() ? "auto" : "smooth" })
  }

  // Tabbing to an object that's off-screen walks to its frame
  function onFocusHotspot(id: HotspotId) {
    if (!pan) return
    const target = nearestFrame(HOTSPOTS.find(h => h.id === id).marker[0])
    if (target !== frame) goToFrame(target)
  }

  function select(id: HotspotId) {
    setExploring(false)
    if (id === "lamp") {
      const next = resolvedTheme === "dark" ? "light" : "dark"
      setTheme(next)
      setAnnouncement(next === "dark" ? "Lights off. Night mode." : "Lights on. Day mode.")
      return
    }
    setOpen(id)
  }

  const panel = open ? panelFor(open, posts) : null

  return (
    <div
      ref={wrapperRef}
      className={`studio ${pan ? "studio-pan" : "relative"}`}
      style={pan ? { "--frames": FRAMES.length } as CSSProperties : undefined}>
      <Head>
        <title>About · Step into my studio · Liwu Codez</title>
      </Head>
      {pan ? FRAMES.map((f, i) => <div key={f.label} aria-hidden="true" className="studio-snap-point" style={{ "--i": i } as CSSProperties} />) : null}
      <div
        ref={stageRef}
        className={pan ? "studio-stage" : "relative"}
        // Focus can try to scroll a clipped box sideways; the transform does the panning, so undo it
        onScroll={pan ? e => { e.currentTarget.scrollLeft = 0 } : undefined}>
        <div className={pan ? "h-full" : "studio-viewport"}>
          <div ref={roomRef} className={pan ? "studio-pan-room" : "studio-room"}>
            <RoomScene onSelect={select} onFocusHotspot={onFocusHotspot} />
          </div>
        </div>

        {pan
          ? <nav aria-label="Walk around the room" className="absolute z-10 flex flex-col gap-3 -translate-y-1/2 right-3 top-1/2">
            {FRAMES.map((f, i) => (
              <button
                key={f.label}
                type="button"
                onClick={() => goToFrame(i)}
                aria-label={`Go to ${f.label}`}
                aria-current={frame === i ? "step" : undefined}
                className={`w-3 rounded-full transition-all shadow ${frame === i ? "h-8 bg-primary" : "h-3 bg-base-content/40"}`} />
            ))}
          </nav>
          : null}

        {introOpen
          ? <section aria-labelledby="studio-title" className="absolute z-10 p-4 shadow-lg bottom-4 left-4 right-4 sm:right-auto sm:max-w-sm rounded-2xl bg-base-200/90 backdrop-blur">
            <button type="button" onClick={() => setIntroOpen(false)} aria-label="Hide intro" className="absolute top-2 right-2 btn btn-xs btn-circle btn-ghost">
              <span aria-hidden="true">✕</span>
            </button>
            <h1 id="studio-title" className="pr-6 text-xl font-bold">Welcome to my studio</h1>
            <p className="mt-1 text-sm">
              {pan
                ? <>Scroll down to walk around the room, and tap anything with a glowing dot to learn more about me.</>
                : <>Click anything with a glowing dot to learn more about me.</>} The lamp works too.
            </p>
            <div className="flex flex-wrap items-center gap-3 mt-3">
              <button type="button" className="btn btn-sm btn-primary" onClick={() => setExploring(true)}>Explore as a list</button>
              {pan && frame === 0 ? <span aria-hidden="true" className="text-xl animate-bounce motion-reduce:animate-none">↓</span> : null}
            </div>
          </section>
          : <>
            <h1 className="sr-only">Welcome to my studio</h1>
            <button type="button" onClick={() => setIntroOpen(true)} aria-label="Show intro and list of things to explore" className="absolute z-10 shadow-lg bottom-4 left-4 btn btn-circle btn-primary">
              <span aria-hidden="true" className="text-lg">?</span>
            </button>
          </>}

      </div>

      <p className="sr-only" aria-live="polite">{announcement}</p>

      <Modal open={exploring} onClose={() => setExploring(false)} title="Explore the room" size="md">
        <ul className="grid gap-2">
          {HOTSPOTS.map(h => (
            <li key={h.id}>
              <button type="button" className="justify-start w-full normal-case btn btn-ghost bg-base-100/60" onClick={() => select(h.id)}>
                {h.label}
              </button>
            </li>
          ))}
        </ul>
      </Modal>

      <Modal open={panel !== null} onClose={() => setOpen(null)} title={panel?.title ?? ""} eyebrow={panel?.eyebrow} size={panel?.size}>
        {panel?.body}
      </Modal>
    </div>
  )
}

export const getStaticProps: GetStaticProps<StudioProps> = async () => {
  try {
    return { props: { posts: (await fetchPosts()).slice(0, 4) }, revalidate: 60 * 60 }
  } catch (error) {
    // While revalidating, throwing keeps serving the last good page
    if (process.env.NEXT_PHASE !== "phase-production-build") throw error
    console.warn("Building /about without posts:", error)
    return { props: { posts: [] }, revalidate: 60 }
  }
}
