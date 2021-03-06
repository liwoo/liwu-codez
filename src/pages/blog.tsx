import { Alignment, Fit } from "rive-react"
import BackgroundAnimation, { AnimationContext } from "../components/background-animation"
import Image from "next/image"
import ArticleContainer from "../components/article-container"
import { useContext, useEffect, useState } from "react"
import { animated, config, useSpring } from "@react-spring/web"

interface Article {
  id: string
  title: string
  date: string
  description: string
  image: string
  link: string
}

const articles: Article[] = [
  {
    id: "1",
    title: "How to build a blockchain",
    date: "2020-01-01",
    description: "How to build a blockchain",
    image: "https://images.unsplash.com/photo-1638913662252-70efce1e60a7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  {
    id: "2",
    title: "How to build a blockchain",
    date: "2020-01-01",
    description: "How to build a blockchain",
    image: "https://images.unsplash.com/photo-1638913662252-70efce1e60a7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  {
    id: "3",
    title: "How to build a blockchain",
    date: "2020-01-01",
    description: "How to build a blockchain",
    image: "https://images.unsplash.com/photo-1638913662252-70efce1e60a7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  {
    id: "4",
    title: "How to build a blockchain",
    date: "2020-01-01",
    description: "How to build a blockchain",
    image: "https://images.unsplash.com/photo-1638913662252-70efce1e60a7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  {
    id: "5",
    title: "How to build a blockchain",
    date: "2020-01-01",
    description: "How to build a blockchain",
    image: "https://images.unsplash.com/photo-1638913662252-70efce1e60a7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  {
    id: "6",
    title: "How to build a blockchain",
    date: "2020-01-01",
    description: "How to build a blockchain",
    image: "https://images.unsplash.com/photo-1638913662252-70efce1e60a7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
]

function BlogPage() {
  const initialIntersected = articles.map(article => {
    return {
      id: article.id,
      intersected: false,
      touched: 0
    }
  })

  // [ { id: "1", intersected: false }, { id: "2", intersected: false } ]


  const [intersected, setIntersected] = useState(initialIntersected)

  const interactions = useContext(AnimationContext)
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const refArticle = intersected.find(article => article.id === entry.target.id)
        if (!refArticle.intersected) {
          refArticle.intersected = entry.isIntersecting
          setIntersected([...intersected])
        }
      })
    }, { threshold: 0.2 })

    articles.forEach(article => {
      const refArticle = document.getElementById(article.id)
      if (refArticle) {
        observer.observe(refArticle)
      }
    })
  }, [])


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
              <input type="email" placeholder="Enter Your Email to Subscribe" className="w-full input input-lg" />
              <button className="absolute mt-2 text-2xl md:text-sm right-2 btn btn-primary"><span className="md:hidden">&#8674;</span><span className="hidden md:block">Subscribe</span></button>
            </animated.div>
          </div>
          <animated.div style={objectStyles} className="hidden md:w-1/3 lg:w-1/2 md:block">
            <Image width={600} height={600} src="/img/3d/work.png" className="border" />
          </animated.div>
        </>
      </ArticleContainer>
      <animated.div style={contentStyles}>
        <ArticleContainer classOverrides="flex w-full gap-x-6 my-8 lg:my-2">
          <a className={`text-2xl md:text-4xl no-underline ${`opacity-100 border-b border-offBlack dark:border-offWhite border-text border-b-2`}`}>Blog Posts</a>
          <a className={`text-2xl md:text-4xl no-underline ${`opacity-50`}`}>Videos</a>
        </ArticleContainer>
      </animated.div>
      <animated.div style={contentStyles}>
        <ArticleContainer classOverrides="grid py-4 gap-8 lg:gap-16 grid-cols-max grid-cols-1 md:grid-cols-2 lg:mb-28 lg:mt-12 xl:grid-cols-3">
          {articles.map(article => (
            <Article article={article} intersected={findRefArticle(article)} />
          ))}
        </ArticleContainer>
      </animated.div>
    </div>
  )

  function findRefArticle(article: Article) {
    const found = intersected.find(art => art.id === article.id)
    return found.intersected
  }
}

function Article({ article, intersected }: { article: Article, intersected: boolean }): JSX.Element {

  const props = useSpring({
    to: { transform: `translateY(0%)`, },
    from: { transform: intersected ? `translateY(20%)` : `translateY(0%)` },
    delay: 300,
  })

  return (
    <animated.div style={props} id={article.id} className={`w-full transition-all transition-transform duration-500 delay-600 hover:text-primary shadow-sm hover:shadow-lg card bg-base-100`}>
      <figure><img src={article.image} className="w-full" alt="Shoes" /></figure>
      <div className="card-body">
        <h2 className="card-title">
          {article.title}
        </h2>
        <p>{humanReadableDate(article.date)}</p>
        <div className="justify-end card-actions">
          <div className="badge badge-outline">Fashion</div>
          <div className="badge badge-outline">Products</div>
        </div>
      </div>
    </animated.div>
  )
}

export function humanReadableDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

export default function Blog() {
  return (
    <BackgroundAnimation scene="Generic" fit={Fit.FitWidth} alignment={Alignment.TopCenter} absolute={false}>
      <BlogPage />
    </BackgroundAnimation>
  )
}
