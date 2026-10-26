import { Alignment, Fit } from "rive-react"
import BackgroundAnimation, { AnimationContext } from "../components/background-animation"
import Image from "next/image"
import ArticleContainer from "../components/article-container"
import { useContext, useState } from "react"
import { animated, config, useSpring } from "@react-spring/web"
import { GetStaticProps } from "next"
import { BLOG_SITE, Post } from "../lib/blog-config"
import { fetchPosts } from "../lib/posts"

const YOUTUBE_CHANNEL = "https://www.youtube.com/channel/UCNEXAX15mO3rsVQQQve6Iog"
const PAGE_SIZE = 9

interface BlogProps {
  posts: Post[]
}

function BlogPage({ posts }: BlogProps) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const interactions = useContext(AnimationContext)

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
            <animated.div style={inputStyles} className="relative">
              <input type="email" aria-label="Your email" autoComplete="email" placeholder="Enter Your Email to Subscribe" className="w-full input input-lg" />
              <button className="absolute mt-2 text-2xl md:text-sm right-2 btn btn-primary" aria-label="Subscribe"><span aria-hidden="true" className="md:hidden">&#8674;</span><span aria-hidden="true" className="hidden md:block">Subscribe</span></button>
            </animated.div>
          </div>
          <animated.div style={objectStyles} className="hidden md:w-1/3 lg:w-1/2 md:block">
            <Image width={600} height={600} src="/img/3d/work.png" alt="" className="border" />
          </animated.div>
        </>
      </ArticleContainer>
      <animated.div style={contentStyles}>
        <ArticleContainer classOverrides="flex flex-wrap items-baseline w-full gap-x-6 gap-y-2 my-8 lg:my-2">
          <h2 className="text-2xl border-b-2 md:text-4xl border-base-content">Blog Posts</h2>
          <a href={YOUTUBE_CHANNEL} className="text-2xl no-underline md:text-4xl opacity-80 hover:opacity-100">Videos <span aria-hidden="true">↗</span></a>
          <a href={`${BLOG_SITE}/rss.xml`} className="ml-auto text-sm">RSS feed</a>
        </ArticleContainer>
      </animated.div>
      <animated.div style={contentStyles}>
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
      </animated.div>
    </div>
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
  try {
    return { props: { posts: await fetchPosts() }, revalidate: REVALIDATE_SECONDS }
  } catch (error) {
    // While revalidating, throwing keeps serving the last good page instead of an empty one
    if (process.env.NEXT_PHASE !== "phase-production-build") throw error
    // During a build, don't let a GitHub hiccup fail the deploy; retry soon instead
    console.warn("Couldn't load blog posts, building with an empty list:", error)
    return { props: { posts: [] }, revalidate: 60 }
  }
}

export default function Blog({ posts }: BlogProps) {
  return (
    <BackgroundAnimation scene="Generic" fit={Fit.FitWidth} alignment={Alignment.TopCenter} absolute={false}>
      <BlogPage posts={posts} />
    </BackgroundAnimation>
  )
}
