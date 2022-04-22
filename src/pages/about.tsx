
import { Alignment, Fit } from "rive-react"
import BackgroundAnimation, { AnimationContext } from "../components/background-animation"
import Image from "next/image"
import ArticleContainer from "../components/article-container"
import { useContext, useEffect, useState } from "react"
import { animated, config, useSpring } from "@react-spring/web"
import Terminal from "../components/icons/terminal"
import Streaming from "../components/icons/streaming"
import Reading from "../components/icons/reading"
import useWindowSize from "../hooks/use-window-size"
import { info } from "console"

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

type Label = "personal" | "professional" | "education" | "other"

interface Activity {
  id: string
  title: string
  description: string
  image?: string
  label: Label
  startDate: Date
  endDate: Date
  location: string
  showRange: boolean
}

type Milestone = Activity | number


//list of milestones
const milestones: Milestone[] = [
  1990,
  {
    id: "1",
    title: "👶  Born",
    description: "Born in a small picturesque village in the south of Malawi called Thyolo",
    label: "personal",
    startDate: new Date(1990, 0, 1),
    endDate: new Date(1990, 0, 1),
    location: "Thyolo, Malawi",
    showRange: false,
  },
  2006,
  {
    id: "2",
    title: "I'm on TV",
    description: "I made my first appearance as a Sports Anchor on TV to cover the 2006 World Cup",
    label: "personal",
    startDate: new Date(2006, 6, 1),
    endDate: new Date(2006, 6, 1),
    location: "Blantyre, Malawi",
    showRange: false,
  },
  2011,
  {
    id: "3",
    title: "🎓  Graduated",
    description: "Graduated from the University of Malawi, The Polytechnic",
    image: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80",
    label: "education",
    startDate: new Date("2007-07-01"),
    endDate: new Date("2012-07-01"),
    location: "Blantyre, Malawi",
    showRange: true,
  },
  2014,
  {
    id: "4",
    title: "🎓🎓  Graduated, Again!",
    description: "Completed my Masters in Computer Science from Doshisha University, Japan",
    image: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80",
    label: "education",
    startDate: new Date("2014-07-01"),
    endDate: new Date("2017-05-01"),
    location: "Kyoto, Japan",
    showRange: true,
  },
  2017,
  {
    id: "5",
    title: "Wedding Bells 💒",
    description: "Married my College sweet❤️, before moving to Lilongwe",
    image: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80",
    label: "personal",
    startDate: new Date("2017-09-02"),
    endDate: new Date("2017-09-02"),
    location: "Blantyre, Malawi",
    showRange: false,
  },
]

function AboutPage() {
  const initialIntersected = milestones.filter(milestone => typeof milestone !== 'number').map(milestone => {
    return {
      id: (milestone as Activity).id,
      intersected: false,
      touched: 0
    }
  })

  const [intersected, setIntersected] = useState(initialIntersected)
  const [timelineHeight, setTimelineHeight] = useState(0)
  const windowSize = useWindowSize()

  const interactions = useContext(AnimationContext)

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const refMilestone = intersected.find(milestone => milestone.id === entry.target.id)
        if (!refMilestone.intersected) {
          refMilestone.intersected = entry.isIntersecting
          setIntersected([...intersected])
        }
      })
    }, { threshold: 0.2 })

    milestones.filter(milestone => typeof milestone !== 'number').forEach(milestone => {
      const refMilestone = document.getElementById((milestone as Activity).id)
      if (refMilestone) {
        observer.observe(refMilestone)
      }
    })

  }, [])

  useEffect(() => {
    const timeline = document.getElementById("timeline")
    if (timeline) {
      setTimelineHeight(timeline.clientHeight)
    }
  }, [windowSize])

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
          <h3 className="my-6 text-lg">My Life in Numbers</h3>
          <div className="mx-auto shadow stats stats-vertical md:stats-horizontal">

            <div className="stat">
              <div className="stat-figure text-primary">
                <Terminal classOverride="w-6 h-6 fill-primary" />
              </div>
              <div className="stat-title">Contributions</div>
              <div className="stat-value">615</div>
              <div className="stat-desc">This Year on Github</div>
            </div>

            <div className="stat">
              <div className="stat-figure text-primary">
                <Streaming classOverride="w-8 h-8 fill-primary" />
              </div>
              <div className="stat-title">Monthly Streams</div>
              <div className="stat-value">4,200</div>
              <div className="stat-desc">↗︎ 400 (22%)</div>
            </div>

            <div className="stat">
              <div className="stat-figure text-primary">
                <Reading classOverride="w-8 h-8 fill-primary" />
              </div>
              <div className="stat-title">Total Reads</div>
              <div className="stat-value">60</div>
              <div className="stat-desc">of my Blog</div>
            </div>

          </div>
        </ArticleContainer>
      </animated.div>
      <animated.div style={contentStyles} id="timeline">
        <div className="absolute w-2 rounded-full inset-x-1/2 bg-offWhite dark:bg-offBlack" style={{ height: timelineHeight, zIndex: -10 }} />
        <ArticleContainer classOverrides="flex flex-col my-12 lg:mb-40">
          {milestones.map(milestone => {
            return typeof milestone === 'number'
              ? <Year title={milestone} key={milestone} />
              : <Activity milestone={milestone} key={milestone.id} intersected={findRefMilestone(milestone)} />
          })}
        </ArticleContainer>
      </animated.div>
    </div>
  )

  function findRefMilestone(milestone: Activity) {
    const found = intersected.find(mile => mile.id === milestone.id)
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


function Year({ title }: { title: number }) {
  return (
    <div className="flex flex-col items-center justify-center w-full my-12">
      <div className="p-3 text-xl rounded bg-accent text-primary">{title}</div>
    </div>
  )
}

function Activity({ milestone, intersected }: { milestone: Activity, intersected: boolean }) {
  const isEven = Number(milestone.id) % 2 === 0
  return (
    <div>
      <div className="absolute hidden w-8 h-8 -ml-3 rounded-full lg:block inset-x-1/2 bg-offBlack dark:bg-offWhite" />
      <div id={milestone.id} className={`flex flex-col ${intersected ? 'translate-y-0' : 'translate-y-64'} transition-all duration-300 items-center w-full md:w-3/4 p-6 mx-auto text-left shadow ${isEven ? 'lg:-ml-8' : 'lg:-mr-8'} lg:w-1/2 lg:flex-row gap-x-6 bg-base-100/75`}>
        {milestone.image ?
          <div className="w-full mb-8 lg:w-1/2 lg:mb-0">
            <img className="mx-auto mask mask-squircle" src={milestone.image} />
          </div>
          : null}
        <div className="flex flex-col">
          <div className="flex flex-col items-center justify-between lg:flex-row">
            <div className="mb-3 text-2xl font-bold">{milestone.title}</div>
            <div className={`my-4 p-2 rounded text-sm bg-${milestone.label}/25 text-${milestone.label} uppercase`}>{milestone.label}</div>
          </div>
          <div className="text-lg">{milestone.description}</div>
          <div className="flex flex-row justify-between mt-4">
            <p className="text-sm font-bold">&#9906; {milestone.location}</p>
            <p>&#9778; {`${monthYear(milestone.startDate)} ${milestone.showRange ? ` - ${monthYear(milestone.endDate)}` : ''}`}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export function monthYear(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "long",
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
