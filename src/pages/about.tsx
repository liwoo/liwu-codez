
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


interface DescriptiveWord {
  word: string
  description: string
  emoji: string
}

const words: DescriptiveWord[] = [
  {
    word: "Opinionated 🙈",
    description: "They say I'm VERY Opinionated: I'm not afraid of standing up for my point of view, even if goes agains the status quo",
    emoji: "‼️",
  },
  {
    word: "Wise",
    description: "\"He is a careful thinker who thinks things through and never makes rash decisions. He values rationality, intellectual strength and independence.\"",
    emoji: "🤔",
  },
  {
    word: "Down to Earth",
    description: "My brother told me that I was down to earth, which means that no matter who I’m talking to, I try to connect with him or her. It’s a great compliment.",
    emoji: "🌍",
  },
  {
    word: "Creative",
    description: "\"As a leader, he fosters creativity and innovation. Combining these qualities with a passion for detail, Liwu is a powerhouse of innovation.\"",
    emoji: "🪄",
  },
]

type Label = "Personal" | "Professional" | "Education" | "Other"

interface Activity {
  id: string
  title: string
  description: string
  image?: string
  label: Label
  startDate: Date
  endDate: Date
}

type Milestone = Activity | number


const labelColors: Record<Label, string> = {
  Personal: "#f5f5f5",
  Professional: "#f5f5f5",
  Education: "#f5f5f5",
  Other: "#f5f5f5",
}

//list of milestones
const milestones: Milestone[] = [
  1990,
  {
    id: "1",
    title: "👶  Born",
    description: "Born in a small picturesque village in the south of Malawi called Thyolo",
    label: "Personal",
    startDate: new Date(1990, 0, 1),
    endDate: new Date(1990, 0, 1),
  },
  2006,
  {
    id: "2",
    title: "Graduated from University of California, Irvine",
    description: "Graduated from University of California, Irvine",
    image: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80",
    label: "Education",
    startDate: new Date("2020-01-01"),
    endDate: new Date("2020-01-01"),
  },
  {
    id: "2",
    title: "Started working at Google",
    description: "Started working at Google",
    image: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80",
    label: "Professional",
    startDate: new Date("2020-01-01"),
    endDate: new Date("2020-01-01"),
  },
  {
    id: "3",
    title: "Started working at Google",
    description: "Started working at Google",
    image: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80",
    label: "Professional",
    startDate: new Date("2020-01-01"),
    endDate: new Date("2020-01-01"),
  },
]

function AboutPage() {
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

  const wordsStlyes = useSpring({
    from: { translateY: -20, opacity: 0 },
    to: { translateY: 0, opacity: 1 },
    delay: START_FROM + 700,
    config: config.slow,
    immediate: interactions.loaded
  });

  return (
    <div className="container p-4">
      <ArticleContainer classOverrides="flex xl:px-36 flex-col md:flex-row flex-col-reverse md:flex-row-reverse items-start xl:-mt-16">
        <>
          <div className="w-full md:w-2/3">
            <animated.div style={titleStyles}>
              <h1 className="text-2xl font-bold leading-tight xl:mt-20 md:text-4xl lg:text-5xl">💬 More About <code>{"<Me />"}</code></h1>
              <p className="my-4 text-xl">I'm a Christian, Hubby, Daddy, Rapper and Software Engineer from Blantyre, Malawi  🇲🇼 .  I believe that Tech <a href="#">is the fastest route towards generational wealth for underprivileged minorities</a>, and I'm a strong advocate for teaching it to whoever will listen!</p>
              <p className="my-4 text-sm">Here are a few words others have described me as:</p>
            </animated.div>
            <animated.div style={wordsStlyes}>
              {words.map(word => (
                <DescriptiveWord key={word.word} word={word} />
              ))}
            </animated.div>
          </div>
          <animated.div style={objectStyles} className="w-1/2 mx-auto mb-8 -mt-16 md:-mt-0 md:mb-0 md:mx-0 md:w-1/3">
            <Image width={600} height={700} src="https://res.cloudinary.com/tiyeni/image/upload/v1638831306/dp_new.png" className="rounded-lg" layout="responsive" objectFit="cover" />
            <div className="hidden my-20 md:block">
              <blockquote>Success isn't about how much money you make, it's about the difference you make in people's lives </blockquote>
              <cite>Michelle Obama</cite>
            </div>
          </animated.div>
        </>
      </ArticleContainer>
      <animated.div style={contentStyles}>
        <ArticleContainer classOverrides="flex flex-col items-center w-full gap-x-6 my-8 lg:my-20">
          <h3 className="my-6 text-lg">My life in Numbers</h3>
          <div className="mx-auto shadow stats stats-vertical md:stats-horizontal">

            <div className="stat">
              <div className="stat-figure text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <div className="stat-title">Contributions</div>
              <div className="stat-value">615</div>
              <div className="stat-desc">This Year on Github</div>
            </div>

            <div className="stat">
              <div className="stat-figure text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
              </div>
              <div className="stat-title">Monthly Streams</div>
              <div className="stat-value">4,200</div>
              <div className="stat-desc">↗︎ 400 (22%)</div>
            </div>

            <div className="stat">
              <div className="stat-figure text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></svg>
              </div>
              <div className="stat-title">Monthly Reads</div>
              <div className="stat-value">60</div>
              <div className="stat-desc">↘︎ 90 (14%)</div>
            </div>

          </div>
        </ArticleContainer>
      </animated.div>
      <animated.div style={contentStyles}>
        <ArticleContainer classOverrides="grid py-4 gap-8 grid-cols-max grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
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


function DescriptiveWord({ word }: { word: DescriptiveWord }) {
  return (
    <div className="flex items-start justify-center my-8 gap-x-8">
      <div className="p-4 text-2xl rounded-lg shadow bg-accent">
        {word.emoji}
      </div>
      <div>
        <h2 className="mb-3 text-xl font-bold capitalize">{word.word}</h2>
        <p className="">{word.description}</p>
      </div>
    </div>
  )
}

function Article({ article, intersected }: { article: Article, intersected: boolean }): JSX.Element {
  return (
    <div id={article.id} className={`w-full ${intersected ? 'translate-y-0 opacity-100' : 'translate-y-32 opacity-25'} transition-all hover:skew-y-1 transition-transform duration-500 delay-600 hover:text-primary shadow-sm hover:shadow-lg card bg-base-100`}>
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
    </div>
  )
}

export function humanReadableDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

export default function About() {
  return (
    <BackgroundAnimation scene="Generic" fit={Fit.FitWidth} alignment={Alignment.TopCenter} absolute={false}>
      <AboutPage />
    </BackgroundAnimation>
  )
}
