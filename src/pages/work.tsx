
import { Alignment, Fit } from "rive-react"
import BackgroundAnimation, { AnimationContext } from "../components/background-animation"
import Image from "next/image"
import ArticleContainer from "../components/article-container"
import { CSSProperties, useContext, useEffect, useState } from "react"
import { animated, config, SpringValue, useSpring } from "@react-spring/web"
import Terminal from "../components/icons/terminal"
import Streaming from "../components/icons/streaming"
import Reading from "../components/icons/reading"
import useWindowSize from "../hooks/use-window-size"


interface Skill {
  id: string
  name: string
  icon: string
  years: number
}

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

interface DescriptiveWord {
  word: string
  description: string
  emoji: string
}


//record of Labels to colors
const labelColors: { [key in Label]: string } = {
  personal: "#D044BB",
  professional: "#493BB4",
  education: "#D9914D",
  other: "#70D94D",
}

interface Service {
  id: string
  icon: string
  title: string
  description: string
}

const skills: Skill[] = [
  {
    id: "javascript",
    name: "Javascript",
    icon: 'icons/typescript.svg',
    years: 6,
  },
  {
    id: "node-js",
    name: "NodeJs",
    icon: 'icons/node.svg',
    years: 5,
  },
  {
    id: "react-js",
    name: "ReactJs",
    icon: 'icons/react.svg',
    years: 4,
  },
  {
    id: "csharp",
    name: "C#",
    icon: 'icons/csharp.svg',
    years: 3,
  },
  {
    id: "flutter",
    name: "Flutter",
    icon: 'icons/typescript.svg',
    years: 3,
  },
  {
    id: "golang",
    name: "Golang",
    icon: 'icons/golang.svg',
    years: 1,
  },
]

const services: Service[] = [
  {
    id: "web",
    icon: "icons/web-dev.svg",
    title: "Websites and WebApp Development",
    description: "I use the terminal to manage my projects and manage my time.",
  },
  {
    id: "mobile",
    icon: "icons/smartphone.svg",
    title: "Mobile App Development",
    description: "I stream a lot of things, mostly music and games.",
  },
  {
    id: "api",
    icon: "icons/api.svg",
    title: "API Design and Development",
    description: "I read a lot of books and articles.",
  },
  {
    id: "speak",
    icon: "icons/hoodie.svg",
    title: "Speaking & Technical Writing",
    description: "I read a lot of books and articles.",
  },
  {
    id: "ui",
    icon: "icons/responsive.svg",
    title: "UX/UI Design",
    description: "I stream a lot of things, mostly music and games.",
  },
  {
    id: "web3",
    icon: "icons/smart-contracts.svg",
    title: "Smart Contract Development",
    description: "I read a lot of books and articles.",
  },
]

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

export interface Percentage extends CSSProperties {
  '--value': SpringValue<number> | number;
  '--size': string;
}

function WorkPage() {
  const initialMilestones = milestones.filter(milestone => typeof milestone !== 'number').map(milestone => {
    return {
      id: (milestone as Activity).id,
      intersected: false,
      touched: 0
    }
  })

  const initialServices = services.map(service => {
    return {
      id: service.id,
      intersected: false,
      touched: 0
    }
  })


  const initialSkills = skills.map(skill => {
    return {
      id: skill.id,
      intersected: false,
      touched: 0
    }
  })

  const initialIntersected = [...initialMilestones, ...initialServices, ...initialSkills]

  const [intersected, setIntersected] = useState(initialIntersected)
  const [statsIntersected, setStatsIntersected] = useState(false)

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
    })

    milestones.filter(milestone => typeof milestone !== 'number').forEach(milestone => {
      const refMilestone = document.getElementById((milestone as Activity).id)
      if (refMilestone) {
        observer.observe(refMilestone)
      }
    })


    services.forEach(service => {
      const refService = document.getElementById(service.id)
      if (refService) {
        observer.observe(refService)
      }
    })

    skills.forEach(skill => {
      const refSkill = document.getElementById(skill.id)
      if (refSkill) {
        observer.observe(refSkill)
      }
    })

    const statsObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setStatsIntersected(true)
        }
      })
    }, { threshold: 0.2 })

    const statsRef = document.getElementById('stats')

    if (statsRef) {
      statsObserver.observe(statsRef)
    }

  }, [])

  useEffect(() => {
    const timeline = document.getElementById("timeline")
    if (timeline) {
      setTimelineHeight(timeline.clientHeight)
    }
  }, [windowSize])

  const START_FROM = 2000

  const contributionProps = useSpring({
    val: statsIntersected ? 615 : 0,
    from: { val: 0 },
    config: config.slow,
    delay: 100
  })

  const streamsProps = useSpring({
    val: statsIntersected ? 4200 : 0,
    from: { val: 0 },
    config: config.slow,
    delay: 200
  })

  const readsProps = useSpring({
    val: statsIntersected ? 60 : 0,
    from: { val: 0 },
    config: config.slow,
    delay: 300
  })

  const titleStyles = useSpring({
    from: { translateY: -50, opacity: 0 },
    to: { translateY: 0, opacity: 1 },
    delay: START_FROM,
    immediate: interactions.loaded
  });

  const objectStyles = useSpring({
    from: { scale: 0, opacity: 0 },
    to: { scale: 1, opacity: 1 },
    delay: START_FROM + 600,
    config: config.wobbly,
    immediate: interactions.loaded
  });

  const contentStyles = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: START_FROM + 3000,
    immediate: interactions.loaded
  });

  const wordsStlyes = useSpring({
    from: { translateY: -20, opacity: 0 },
    to: { translateY: 0, opacity: 1 },
    delay: START_FROM + 1500,
    config: config.slow,
    immediate: interactions.loaded
  });

  function findIntersected(id: string) {
    const found = intersected.find(item => item.id === id)
    return found.intersected
  }

  return (
    <>
      <div className="container p-4">
        <ArticleContainer classOverrides="xl:px-36 flex flex-col items-center">
          <h3 className="my-3 text-2xl">My Magic Toolbox  🛠  </h3>
          <p className="text-center">I've been coding  professionally for <code>6++</code> years.  I've  worked  with so many different technologies, but below are a few that I've come to particularly enjoy</p>
          <div className="w-2/3 my-8 lg:mt-16 gap-12 gap-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {skills.map((skill, index) => <Skill key={skill.id} index={index} skill={skill} intersected={findIntersected(skill.id)} />)}
          </div>
        </ArticleContainer>
      </div>
      <div className="bg-neutral">
        My Clients
      </div>
      <div className="container p-4">
        <animated.div style={contentStyles}>
          <ArticleContainer classOverrides="flex flex-col items-center w-full gap-x-6 my-8 lg:my-20">
            <h3 className="my-6 text-lg">My Life in Numbers</h3>
            <div id="stats" className="mx-auto shadow stats stats-vertical md:stats-horizontal">

              <div className="stat">
                <div className="stat-figure text-primary">
                  <Terminal classOverride="w-6 h-6 fill-primary" />
                </div>
                <div className="stat-title">Contributions</div>
                <animated.div className="stat-value">{contributionProps.val.to(val => Math.floor(val).toLocaleString())}</animated.div>
                <div className="stat-desc">This Year on Github</div>
              </div>

              <div className="stat">
                <div className="stat-figure text-primary">
                  <Streaming classOverride="w-8 h-8 fill-primary" />
                </div>
                <div className="stat-title">Monthly Streams</div>
                <animated.div className="stat-value">{streamsProps.val.to(val => Math.floor(val).toLocaleString())}</animated.div>
                <div className="stat-desc">↗︎ 400 (22%)</div>
              </div>

              <div className="stat">
                <div className="stat-figure text-primary">
                  <Reading classOverride="w-8 h-8 fill-primary" />
                </div>
                <div className="stat-title">Total Reads</div>
                <animated.div className="stat-value">{readsProps.val.to(val => Math.floor(val).toLocaleString())}</animated.div>
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
                : <Activity milestone={milestone} key={milestone.id} intersected={findIntersected(milestone.id)} />
            })}
          </ArticleContainer>
        </animated.div>
      </div>
    </>
  )
}

function Skill({ skill, intersected, index }: { skill: Skill, intersected: boolean, index: number }) {
  const percentage = skill.years / 6 * 100
  const props = useSpring({
    val: intersected ? percentage : 0,
    from: { val: 0 },
    config: config.slow,
    delay: 100 + index * 200
  });

  return (
    <div id={skill.id} className="flex flex-col items-center justify-start mx-auto">
      <animated.div className="border-4 border-transparent radial-progress text-neutral dark:text-accent bg-base-100" style={{ '--value': props.val, '--size': '8rem' } as Percentage}><img src={skill.icon} className="w-12 h-12" alt={skill.name} /></animated.div>
      <h3 className="my-2 font-medium text-center uppercase">{skill.name}</h3>
      <div className="badge">{skill.years} years</div>
    </div>
  )
}

function Service({ service, intersected }: { service: Service, intersected: boolean }): JSX.Element {
  return (
    <div id={service.id} className={`flex flex-col ${intersected ? 'translate-y-0' : 'translate-y-64'}  transition-all  ease-in-out duration-600 rounded-lg dark:bg-offBlack/75 bg-offWhite/75 p-5`}>
      <img src={service.icon} className="w-12 h-12 mb-4" />
      <h4 className="my-2 text-xl font-bold">{service.title}</h4>
      <p>{service.description}</p>
    </div>
  )
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
            <div className={`my-4 p-2 rounded text-sm bg-${milestone.label}/25 text-${milestone.label} uppercase`} style={{ backgroundColor: `${labelColors[milestone.label]}50`, color: labelColors[milestone.label] }}>{milestone.label}</div>
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

export default function Work() {
  return (
    <BackgroundAnimation scene="Generic" fit={Fit.FitWidth} alignment={Alignment.TopCenter} absolute={false}>
      <WorkPage />
    </BackgroundAnimation>
  )
}
