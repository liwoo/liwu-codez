import { GetStaticProps } from "next"
import Head from "next/head"
import Link from "next/link"
import { useTheme } from "next-themes"
import { useEffect, useRef, useState } from "react"
import Modal from "../../components/modal"
import { panelFor } from "../../components/studio/panels"
import RoomScene, { HOTSPOTS, HotspotId } from "../../components/studio/room-scene"
import { Post } from "../../lib/blog-config"
import { fetchPosts } from "../../lib/posts"

interface StudioProps {
  posts: Post[]
}

type PanelId = Exclude<HotspotId, "lamp">

export default function Studio({ posts }: StudioProps) {
  const { resolvedTheme, setTheme } = useTheme()
  const [open, setOpen] = useState<PanelId | null>(null)
  const [exploring, setExploring] = useState(false)
  const [announcement, setAnnouncement] = useState("")
  const [introOpen, setIntroOpen] = useState(true)
  const viewportRef = useRef<HTMLDivElement>(null)

  // On portrait screens the room is wider than the viewport: start centred on the desk
  useEffect(() => {
    const viewport = viewportRef.current
    if (viewport) viewport.scrollLeft = (viewport.scrollWidth - viewport.clientWidth) / 2
  }, [])

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
    <div className="relative studio">
      <Head>
        <title>Step into my studio · Liwu Codez</title>
      </Head>
      <div ref={viewportRef} className="studio-viewport">
        <div className="studio-room">
          <RoomScene onSelect={select} />
        </div>
      </div>

      {introOpen
        ? <section aria-labelledby="studio-title" className="absolute z-10 p-4 shadow-lg bottom-4 left-4 right-4 sm:right-auto sm:max-w-sm rounded-2xl bg-base-200/90 backdrop-blur">
          <button type="button" onClick={() => setIntroOpen(false)} aria-label="Hide intro" className="absolute top-2 right-2 btn btn-xs btn-circle btn-ghost">
            <span aria-hidden="true">✕</span>
          </button>
          <h1 id="studio-title" className="pr-6 text-xl font-bold">Welcome to my studio</h1>
          <p className="mt-1 text-sm">
            Click anything with a glowing dot to learn more about me<span className="sm:hidden">, and swipe to look around the room</span>. The lamp works too.
          </p>
          <div className="flex flex-wrap gap-2 mt-3">
            <button type="button" className="btn btn-sm btn-primary" onClick={() => setExploring(true)}>Explore as a list</button>
            <Link href="/about"><a className="no-underline btn btn-sm btn-ghost">Classic About page</a></Link>
          </div>
        </section>
        : <>
          <h1 className="sr-only">Welcome to my studio</h1>
          <button type="button" onClick={() => setIntroOpen(true)} aria-label="Show intro and list of things to explore" className="absolute z-10 shadow-lg bottom-4 left-4 btn btn-circle btn-primary">
            <span aria-hidden="true" className="text-lg">?</span>
          </button>
        </>}

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
    console.warn("Building /about/studio without posts:", error)
    return { props: { posts: [] }, revalidate: 60 }
  }
}
