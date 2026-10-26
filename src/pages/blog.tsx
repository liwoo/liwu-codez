import { Alignment, Fit } from "rive-react"
import BackgroundAnimation, { AnimationContext } from "../components/background-animation"
import Image from "next/image"
import ArticleContainer from "../components/article-container"
import { KeyboardEvent, useContext, useEffect, useRef, useState } from "react"
import { animated, config, useSpring } from "@react-spring/web"
import { GetStaticProps } from "next"
import { BLOG_SITE, Post } from "../lib/blog-config"
import { fetchPosts } from "../lib/posts"
import { Video, YOUTUBE_CHANNEL_URL } from "../lib/video-config"
import { fetchVideos } from "../lib/videos"
import Modal from "../components/modal"

const PAGE_SIZE = 9

type Tab = "posts" | "videos"
const TABS: { id: Tab, label: string }[] = [
  { id: "posts", label: "Blog Posts" },
  { id: "videos", label: "Videos" },
]

interface BlogProps {
  posts: Post[]
  videos: Video[]
}

function BlogPage({ posts, videos }: BlogProps) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const [tab, setTab] = useState<Tab>("posts")
  const tabRefs = useRef<Record<Tab, HTMLButtonElement | null>>({ posts: null, videos: null })
  const interactions = useContext(AnimationContext)

  // /blog#videos opens straight onto the videos tab
  useEffect(() => {
    if (window.location.hash === "#videos") setTab("videos")
  }, [])

  function selectTab(next: Tab) {
    setTab(next)
    window.history.replaceState(null, "", next === "videos" ? "#videos" : window.location.pathname)
  }

  // Arrow keys move between tabs, per the WAI-ARIA tabs pattern
  function onTabKeyDown(e: KeyboardEvent<HTMLButtonElement>) {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return
    const next: Tab = tab === "posts" ? "videos" : "posts"
    selectTab(next)
    tabRefs.current[next]?.focus()
  }

  const START_FROM = 500

  const titleStyles = useSpring({
    from: { translateY: -50, opacity: 0 },
    to: { translateY: 0, opacity: 1 },
    delay: START_FROM,
    immediate: interactions.loaded
  });

  const objectStyles = useSpring({
    from: { scale: 0, opacity: 0 },
    to: { scale: 1, opacity: 1 },
    delay: START_FROM + 300,
    config: config.wobbly,
    immediate: interactions.loaded
  });

  const contentStyles = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: START_FROM + 1500,
    immediate: interactions.loaded
  });

  const inputStyles = useSpring({
    from: { width: '0%', opacity: 0 },
    to: { width: '100%', opacity: 1 },
    delay: START_FROM + 700,
    config: config.slow,
    immediate: interactions.loaded
  });

  return (
    <div className="container p-4">
      <ArticleContainer classOverrides="flex items-center xl:-mt-36">
        <>
          <div className="w-full sm:w-4/5 md:w-2/3 lg:w-1/2">
            <animated.div style={titleStyles}>
              <h1 className="text-2xl font-bold leading-tight md:text-4xl lg:text-5xl">My thoughts on Coding & Tech</h1>
              <p className="my-4">Join me on my journey of learning new and exciting trends in Tech including Web3, Frontend, Backend, Mobile and AI </p>
            </animated.div>
            {/* The newsletter (and its spam protection) lives on chienda.com, where these posts are published */}
            <animated.div style={inputStyles} className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <a href={`${BLOG_SITE}/?ref=liwu-codes`} className="no-underline btn btn-primary btn-lg">
                Subscribe to my Newsletter <span aria-hidden="true" className="ml-2">↗</span>
              </a>
              <span className="text-sm opacity-80">Sign up on chienda.com</span>
            </animated.div>
          </div>
          <animated.div style={objectStyles} className="hidden md:w-1/3 lg:w-1/2 md:block">
            <Image width={600} height={600} src="/img/3d/work.png" alt="" className="border" />
          </animated.div>
        </>
      </ArticleContainer>
      <animated.div style={contentStyles}>
        <ArticleContainer classOverrides="flex flex-wrap items-baseline w-full gap-x-6 gap-y-2 my-8 lg:my-2">
          <div role="tablist" aria-label="Posts and videos" className="flex gap-x-6">
            {TABS.map(t => (
              <button
                key={t.id}
                ref={el => { tabRefs.current[t.id] = el }}
                id={`tab-${t.id}`}
                type="button"
                role="tab"
                aria-selected={tab === t.id}
                aria-controls={`panel-${t.id}`}
                tabIndex={tab === t.id ? 0 : -1}
                onClick={() => selectTab(t.id)}
                onKeyDown={onTabKeyDown}
                className={`text-2xl md:text-4xl border-b-2 transition-all ${tab === t.id ? "border-base-content" : "border-transparent opacity-75 hover:opacity-100"}`}>
                {t.label}
              </button>
            ))}
          </div>
          <a href={tab === "posts" ? `${BLOG_SITE}/rss.xml` : YOUTUBE_CHANNEL_URL} className="ml-auto text-sm">
            {tab === "posts" ? "RSS feed" : "Subscribe on YouTube"}
          </a>
        </ArticleContainer>
      </animated.div>
      <animated.div style={contentStyles}>
        <div role="tabpanel" id="panel-videos" aria-labelledby="tab-videos" hidden={tab !== "videos"}>
          <h2 className="sr-only">Videos</h2>
          <VideosPanel videos={videos} />
        </div>
        <div role="tabpanel" id="panel-posts" aria-labelledby="tab-posts" hidden={tab !== "posts"}>
        <h2 className="sr-only">Blog Posts</h2>
        {posts.length === 0
          ? <ArticleContainer classOverrides="py-12 text-center lg:mb-28">
            <p className="text-lg">The posts are taking a breather. Read them on <a href={`${BLOG_SITE}/blog`}>chienda.com</a> in the meantime.</p>
          </ArticleContainer>
          : <ArticleContainer classOverrides="py-4 lg:mb-28 lg:mt-12">
            <ul className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3 lg:gap-12">
              {posts.slice(0, visibleCount).map(post => <li key={post.slug} className="flex"><Article post={post} /></li>)}
            </ul>
            <div className="flex flex-col items-center my-12 gap-y-4">
              {visibleCount < posts.length
                ? <button type="button" className="btn btn-primary" onClick={() => setVisibleCount(count => count + PAGE_SIZE)}>
                  Show more posts
                </button>
                : null}
              <p className="text-sm" aria-live="polite">Showing {Math.min(visibleCount, posts.length)} of {posts.length} posts</p>
            </div>
          </ArticleContainer>}
        </div>
      </animated.div>
    </div>
  )
}

function VideosPanel({ videos }: { videos: Video[] }) {
  const [playing, setPlaying] = useState<Video | null>(null)
  const longForm = videos.filter(v => !v.isShort)
  const shorts = videos.filter(v => v.isShort)

  if (videos.length === 0) {
    return <ArticleContainer classOverrides="py-12 text-center lg:mb-28">
      <p className="text-lg">Couldn't load the videos right now. Watch them on <a href={YOUTUBE_CHANNEL_URL}>YouTube</a> in the meantime.</p>
    </ArticleContainer>
  }

  return (
    <ArticleContainer classOverrides="py-4 lg:mb-28 lg:mt-12">
      {longForm.length > 0
        ? <section aria-labelledby="latest-videos">
          <h3 id="latest-videos" className="mb-6 text-xl font-bold">Latest Videos</h3>
          <ul className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
            {longForm.map(video => <li key={video.id}><VideoCard video={video} onPlay={setPlaying} /></li>)}
          </ul>
        </section>
        : null}
      {shorts.length > 0
        ? <section aria-labelledby="latest-shorts" className="mt-16">
          <h3 id="latest-shorts" className="mb-6 text-xl font-bold">Shorts</h3>
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {shorts.map(video => <li key={video.id}><VideoCard video={video} onPlay={setPlaying} /></li>)}
          </ul>
        </section>
        : null}
      <p className="my-12 text-center"><a href={YOUTUBE_CHANNEL_URL}>See everything on youtube.com/@liwucodes</a></p>
      <Modal open={playing !== null} onClose={() => setPlaying(null)} title={playing?.title ?? ""} size={playing?.isShort ? "md" : "xl"}>
        {playing
          ? <>
            <div className={`w-full overflow-hidden rounded-lg bg-black ${playing.isShort ? "aspect-[9/16] max-h-[70vh] mx-auto" : "aspect-video"}`}>
              <iframe
                className="w-full h-full"
                src={`https://www.youtube-nocookie.com/embed/${playing.id}?autoplay=1&rel=0`}
                title={playing.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen />
            </div>
            {playing.description ? <p className="mt-4 whitespace-pre-line">{truncate(playing.description, 280)}</p> : null}
            <a href={playing.url} className="inline-block mt-4">Watch on YouTube</a>
          </>
          : null}
      </Modal>
    </ArticleContainer>
  )
}

function VideoCard({ video, onPlay }: { video: Video, onPlay: (video: Video) => void }) {
  return (
    // A real link to YouTube, upgraded to the in-page player when JavaScript is running
    <a
      href={video.url}
      onClick={e => { e.preventDefault(); onPlay(video) }}
      className="flex flex-col w-full h-full overflow-hidden no-underline transition-all duration-300 shadow-sm group card bg-base-200 hover:shadow-lg hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">
      <figure className={`relative shrink-0 bg-black ${video.isShort ? "aspect-[9/16]" : "aspect-video"}`}>
        <img src={video.thumbnail} alt="" loading="lazy" className="object-cover w-full h-full" />
        <span aria-hidden="true" className="absolute flex items-center justify-center w-14 h-14 text-2xl transition-transform rounded-full shadow-lg bg-primary text-primary-content group-hover:scale-110">▶</span>
      </figure>
      <div className={video.isShort ? "p-3" : "card-body"}>
        <h4 className={`font-bold group-hover:text-primary group-hover:underline decoration-primary ${video.isShort ? "text-sm" : "card-title"}`}>
          <span className="sr-only">Play video: </span>{video.title}
        </h4>
        <p className="text-sm opacity-80">
          {video.publishDate ? <time dateTime={video.publishDate}>{humanReadableDate(video.publishDate)}</time> : null}
          {video.views !== null ? <span> · {video.views.toLocaleString()} views</span> : null}
        </p>
      </div>
    </a>
  )
}

function Article({ post }: { post: Post }): JSX.Element {
  return (
    // The whole card is the link; it opens the post on chienda.com, where it's published
    <a href={post.url} className="flex flex-col w-full overflow-hidden no-underline transition-all duration-300 shadow-sm group card bg-base-200 hover:shadow-lg hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">
      <figure className="h-48 shrink-0 bg-accent">
        {post.image
          ? <img src={post.image} alt="" loading="lazy" className="object-cover w-full h-full" />
          : <div aria-hidden="true" className="flex items-center justify-center w-full h-full p-6 text-3xl font-bold text-center text-accent-content bg-gradient-to-br from-accent to-primary/40">
            {post.category ?? "Liwu Codez"}
          </div>}
      </figure>
      <div className="card-body">
        {post.publishDate ? <time dateTime={post.publishDate} className="text-sm opacity-80">{humanReadableDate(post.publishDate)}</time> : null}
        <h3 className="card-title group-hover:text-primary group-hover:underline decoration-primary">{post.title}</h3>
        {post.excerpt ? <p>{truncate(post.excerpt, 140)}</p> : null}
        {post.tags.length > 0
          ? <ul className="flex flex-wrap justify-end gap-2 mt-auto card-actions" aria-label="Tags">
            {post.tags.slice(0, 3).map(tag => <li key={tag} className="badge badge-outline">{tag}</li>)}
          </ul>
          : null}
      </div>
    </a>
  )
}

// Cut at a word boundary so every card's summary is roughly the same length
function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, text.lastIndexOf(" ", maxLength)).replace(/[\s,.;:–-]+$/, "") + "…"
}

export function humanReadableDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  })
}

// Incremental Static Regeneration: posts published on chienda.com show up here within the hour,
// without a redeploy
const REVALIDATE_SECONDS = 60 * 60

export const getStaticProps: GetStaticProps<BlogProps> = async () => {
  const isBuild = process.env.NEXT_PHASE === "phase-production-build"
  const [posts, videos] = await Promise.allSettled([fetchPosts(), fetchVideos()])
  const failed = [posts, videos].filter((r): r is PromiseRejectedResult => r.status === "rejected")
  // While revalidating, throwing keeps serving the last good page instead of an emptier one
  if (failed.length > 0 && !isBuild) throw failed[0].reason
  // During a build, don't let a GitHub/YouTube hiccup fail the deploy; retry soon instead
  failed.forEach(f => console.warn("Building /blog without some content:", f.reason))
  return {
    props: {
      posts: posts.status === "fulfilled" ? posts.value : [],
      videos: videos.status === "fulfilled" ? videos.value : [],
    },
    revalidate: failed.length > 0 ? 60 : REVALIDATE_SECONDS,
  }
}

export default function Blog({ posts, videos }: BlogProps) {
  return (
    <BackgroundAnimation scene="Generic" fit={Fit.FitWidth} alignment={Alignment.TopCenter} absolute={false}>
      <BlogPage posts={posts} videos={videos} />
    </BackgroundAnimation>
  )
}
