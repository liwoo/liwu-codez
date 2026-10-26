import Link from "next/link"
import { ReactNode } from "react"
import { activities, Activity, monthYear, services, words } from "../../data/about"
import { BLOG_SITE, Post } from "../../lib/blog-config"
import { HotspotId } from "./room-scene"

const SPOTIFY_ARTIST = "3rglolSNrGllZKwpuu9b8U"

export interface Panel {
  title: string
  eyebrow?: string
  size?: "md" | "lg" | "xl"
  body: ReactNode
}

const labelDot: Record<Activity["label"], string> = {
  personal: "bg-personal",
  professional: "bg-professional",
  education: "bg-education",
  other: "bg-other",
}

function CtaRow({ children }: { children: ReactNode }) {
  return <div className="flex flex-wrap gap-3 mt-6">{children}</div>
}

// Places in the order they first appear in the timeline
function places(): { place: string, why: string, year: number }[] {
  const seen = new Map<string, { place: string, why: string, year: number }>()
  for (const a of activities) {
    if (!seen.has(a.location)) seen.set(a.location, { place: a.location, why: a.title.replace(/[^\w\s'(),.&-]/g, "").trim(), year: a.startDate.getFullYear() })
  }
  return Array.from(seen.values()).sort((x, y) => x.year - y.year)
}

export function panelFor(id: Exclude<HotspotId, "lamp">, posts: Post[]): Panel {
  switch (id) {
    case "me":
      return {
        title: "Hi, I'm Jeremiah 👋🏾",
        eyebrow: "AI Engineer · Christian · Hubby · Daddy · Rapper",
        body: <>
          <div className="flex flex-col gap-6 sm:flex-row">
            <img src="/img/jeremiah.jpg" alt="Jeremiah Chienda" className="object-cover w-32 h-40 rounded-lg shrink-0" />
            <div>
              <p className="text-lg">I'm a Software Engineer from Blantyre, Malawi 🇲🇼, these days building AI agents that go past the demo stage, currently at the ICO in Manchester.</p>
              <p className="mt-3">I believe Tech is the fastest route towards generational wealth for underprivileged minorities, and I'm a strong advocate for teaching it to whoever will listen.</p>
            </div>
          </div>
          <figure className="mt-6">
            <img src="/img/setup.jpg" alt="Jeremiah's real desk: two monitors, a mic, a plant and posters on the wall" className="w-full rounded-lg" loading="lazy" />
            <figcaption className="mt-2 text-sm opacity-80">This room is real. Here's the actual desk.</figcaption>
          </figure>
          <CtaRow>
            <Link href="/contact"><a className="no-underline btn btn-primary">Get in touch</a></Link>
            <Link href="/work"><a className="no-underline btn">See my work</a></Link>
          </CtaRow>
        </>,
      }
    case "monitors":
      return {
        title: "What I do",
        eyebrow: "On the screens",
        size: "xl",
        body: <>
          <p className="text-lg">Things I've spent <code>{"hours |> times |> 1000s"}</code> perfecting:</p>
          <ul className="grid gap-4 mt-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map(s => (
              <li key={s.id} className="p-4 rounded-lg bg-base-100/60">
                <img src={`/${s.icon}`} alt="" className="w-10 h-10 mb-3" />
                <h3 className="font-bold">{s.title}</h3>
                <p className="mt-1 text-sm">{s.description}</p>
              </li>
            ))}
          </ul>
          <CtaRow>
            <Link href="/work"><a className="no-underline btn btn-primary">See my work</a></Link>
            <a href="https://chienda.com/projects" className="no-underline btn">All projects on chienda.com</a>
          </CtaRow>
        </>,
      }
    case "whiteboard":
      return {
        title: "The journey so far",
        eyebrow: "On the whiteboard",
        body: <ol className="relative pl-6 border-l-2 border-base-content/20">
          {activities.map(a => (
            <li key={a.id} className="mb-6">
              <span aria-hidden="true" className={`absolute -left-[7px] mt-1.5 w-3 h-3 rounded-full ${labelDot[a.label]}`} />
              <p className="text-sm opacity-80">{monthYear(a.startDate)}{a.showRange ? ` – ${monthYear(a.endDate)}` : ""} · {a.location}</p>
              <h3 className="font-bold">{a.title}</h3>
              <div className="flex items-start gap-3">
                {a.image ? <img src={a.image} alt="" className="object-contain w-12 h-12 p-1 bg-white rounded shrink-0" loading="lazy" /> : null}
                <p>{a.description}</p>
              </div>
            </li>
          ))}
        </ol>,
      }
    case "posters":
      return {
        title: "Faith, family & football",
        eyebrow: "On the wall",
        body: <>
          <ul className="space-y-4 text-lg">
            <li><strong>Faith.</strong> Born again since 2006: for me to live is Christ and to die is gain.</li>
            <li><strong>Family.</strong> Married my college sweetheart in 2017. Hubby and daddy before anything with a keyboard.</li>
            <li><strong>Football.</strong> Arsenal till I die. COYG. 🔴⚪️</li>
            <li><strong>Programmer x1, 100% organic.</strong> Batch number 0905 1990.</li>
          </ul>
          <blockquote className="mt-8">Success isn't about how much money you make, it's about the difference you make in people's lives</blockquote>
          <cite className="block">Michelle Obama</cite>
        </>,
      }
    case "window":
      return {
        title: "From Thyolo to Manchester",
        eyebrow: "Out the window",
        body: <>
          <p className="text-lg">Home is Malawi, but the road has been long. Every place I've lived:</p>
          <ol className="mt-6 space-y-3">
            {places().map(p => (
              <li key={p.place} className="flex items-baseline gap-4">
                <span className="w-12 font-mono text-sm opacity-80 shrink-0">{p.year}</span>
                <span><strong>{p.place}</strong> <span className="opacity-80">· {p.why}</span></span>
              </li>
            ))}
          </ol>
        </>,
      }
    case "plant":
      return {
        title: "In my mates' words",
        eyebrow: "What's grown on people",
        body: <>
          <p>I asked a few of my mates to describe me in 4 words, and here's what they came up with:</p>
          <ul className="mt-6 space-y-5">
            {words.map(w => (
              <li key={w.word} className="flex items-start gap-4">
                <span aria-hidden="true" className="p-3 text-2xl rounded-lg bg-accent">{w.emoji}</span>
                <div>
                  <h3 className="text-lg font-bold">{w.word}</h3>
                  <p>{w.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </>,
      }
    case "mic":
      return {
        title: "Liwu the rapper",
        eyebrow: "On the mic",
        body: <>
          <p className="text-lg">When I'm not writing software I'm writing bars: Gospel Rap, as Liwu. Highlights include the UMP Cypha 2018, my album <a href="https://getalinafe.com">Getalinafe</a> (2019) and <em>Machine Minder</em>.</p>
          <iframe
            title="Liwu on Spotify"
            className="w-full mt-6 rounded-xl"
            src={`https://open.spotify.com/embed/artist/${SPOTIFY_ARTIST}?theme=0`}
            height="352"
            loading="lazy"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" />
          <CtaRow>
            <a href={`https://open.spotify.com/artist/${SPOTIFY_ARTIST}`} className="no-underline btn btn-primary">Open in Spotify</a>
            <a href="https://www.youtube.com/watch?v=McDvYyCLYBs" className="no-underline btn">Watch a music video</a>
          </CtaRow>
        </>,
      }
    case "shelf":
      return {
        title: "Latest writing",
        eyebrow: "On the shelf",
        body: <>
          {posts.length > 0
            ? <ul className="space-y-4">
              {posts.slice(0, 4).map(p => (
                <li key={p.slug}>
                  <a href={p.url} className="flex gap-4 p-3 no-underline rounded-lg group bg-base-100/60 hover:bg-base-100">
                    {p.image ? <img src={p.image} alt="" loading="lazy" className="object-cover w-20 h-16 rounded shrink-0" /> : null}
                    <span>
                      <span className="block font-bold group-hover:underline decoration-primary">{p.title}</span>
                      {p.excerpt ? <span className="block mt-1 text-sm opacity-80">{p.excerpt.slice(0, 110)}…</span> : null}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            : <p>The shelf is being restocked. Read everything on <a href={`${BLOG_SITE}/blog`}>chienda.com</a>.</p>}
          <CtaRow>
            <Link href="/blog"><a className="no-underline btn btn-primary">All posts & videos</a></Link>
            <a href={`${BLOG_SITE}/?ref=liwu-codes`} className="no-underline btn">Subscribe to the newsletter</a>
          </CtaRow>
        </>,
      }
    case "mug":
      return {
        title: "Buy me a coffee ☕️",
        eyebrow: "Fuel",
        size: "md",
        body: <>
          <p className="text-lg">I accept ETH if you're feeling generous ❤️. Send it to <strong>liwucodez.crypto</strong>.</p>
          <p className="mt-4">Or, even better, tell me what you're building.</p>
          <CtaRow>
            <Link href="/contact"><a className="no-underline btn btn-primary">Say hi</a></Link>
          </CtaRow>
        </>,
      }
  }
}
