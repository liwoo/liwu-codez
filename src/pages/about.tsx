
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
import { useTheme } from "next-themes"
import Link from "next/link"

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

const services: Service[] = [
  {
    id: "web",
    icon: "icons/web-dev.svg",
    title: "Websites and WebApp Development",
    description: "I build world class websites and web applications using industry standard technologies.",
  },
  {
    id: "mobile",
    icon: "icons/smartphone.svg",
    title: "Mobile App Development",
    description: "I specialize in Cross-Platform Mobile App Development using Flutter.",
  },
  {
    id: "api",
    icon: "icons/api.svg",
    title: "API Design and Development",
    description: "RESTful API's, ProtoBufs and GraphQL are my specialty.",
  },
  {
    id: "speak",
    icon: "icons/hoodie.svg",
    title: "Speaking & Technical Writing",
    description: "I will speak at your event, or write technical articles for your publications.",
  },
  {
    id: "ui",
    icon: "icons/responsive.svg",
    title: "UX/UI Design",
    description: "Sometimes I will whip up Figma or Sketch to build High Fidelity prototypes.",
  },
  {
    id: "web3",
    icon: "icons/smart-contracts.svg",
    title: "Smart Contract Development",
    description: "Recently, I've been dabbling with Solidity and Anchor",
  },
]

const words: DescriptiveWord[] = [
  {
    word: "Opinionated ????",
    description: "They say I'm VERY Opinionated: I'm not afraid of standing up for my point of view, even if goes agains the status quo",
    emoji: "????",
  },
  {
    word: "Wise",
    description: "\"He is a careful thinker who thinks things through and never makes rash decisions. He values rationality, intellectual strength and independence.\"",
    emoji: "????",
  },
  {
    word: "Down to Earth",
    description: "My brother told me that I was down to earth, which means that no matter who I???m talking to, I try to connect with him or her. It???s a great compliment.",
    emoji: "????",
  },
  {
    word: "Creative",
    description: "\"As a leader, he fosters creativity and innovation. Combining these qualities with a passion for detail, Liwu is a powerhouse of innovation.\"",
    emoji: "????",
  },
]

//list of milestones
const milestones: Milestone[] = [
  1990,
  {
    id: "1",
    title: "????  Born",
    description: "Born in a small picturesque village in the south of Malawi called Thyolo",
    label: "personal",
    startDate: new Date(1990, 4, 9),
    endDate: new Date(1990, 4, 9),
    location: "Thyolo, Malawi",
    showRange: false,
  },
  2006,
  {
    id: "2",
    title: "I'm on TV",
    description: "I made my first appearance as a Sports Anchor on TV to cover the 2006 World Cup",
    label: "personal",
    startDate: new Date(2006, 5, 1),
    endDate: new Date(2006, 5, 1),
    location: "Blantyre, Malawi",
    showRange: false,
  },
  {
    id: "3",
    title: "I am Jason Bourne... Again",
    description: "Began an life-long adventurous journey as Born Again Christian: For me to Live is Christ and to die is Gain",
    label: "personal",
    startDate: new Date(2006, 11, 31),
    endDate: new Date(2006, 11, 31),
    location: "Blantyre, Malawi",
    showRange: false,
  },
  2007,
  {
    id: "4",
    title: "First Computer Program",
    description: "I wrote my first piece of code in Turbo C++ thanks to a friend of my mum's and immediately found my calling!",
    label: "personal",
    startDate: new Date(2007, 1, 1),
    endDate: new Date(2007, 1, 1),
    location: "Blantyre, Malawi",
    showRange: false,
  },
  2011,
  {
    id: "5",
    title: "Mama we made it ????",
    description: "Graduated from the University of Malawi, The Polytechnic",
    //need to find graduation picture
    label: "education",
    startDate: new Date("2007-07-01"),
    endDate: new Date("2012-07-01"),
    location: "Blantyre, Malawi",
    showRange: true,
  },
  2014,
  {
    id: "6",
    title: "Let's Disrupt Tourism",
    description: "Founded my first startup, tiyeni.app, to disrupt tourism in Malawi. But that's a story for another day",
    image: "https://res.cloudinary.com/tiyeni/image/upload/v1651273860/tiyeni2.jpg",
    label: "other",
    startDate: new Date("2016-04-01"),
    endDate: new Date("2016-04-01"),
    location: "Kyoto, Japan",
    showRange: false,
  },
  {
    id: "7",
    title: "????????  Graduated, Again!",
    description: "Completed my Masters in Computer Science from Doshisha University, Japan",
    image: "https://res.cloudinary.com/tiyeni/image/upload/v1651273383/graduation.jpg",
    label: "education",
    startDate: new Date("2014-07-01"),
    endDate: new Date("2017-05-01"),
    location: "Kyoto, Japan",
    showRange: true,
  },
  2017,
  {
    id: "8",
    title: "Wedding Bells ????",
    description: "Married my College sweet??????, and begun our new life in Lilongwe",
    image: "https://res.cloudinary.com/tiyeni/image/upload/v1651274000/wedding.jpg",
    label: "personal",
    startDate: new Date("2017-09-02"),
    endDate: new Date("2017-09-02"),
    location: "Blantyre, Malawi",
    showRange: false,
  },
  2019,
  {
    id: "9",
    title: "Making (r)Apps",
    description: "Released my acclaimed solo Album, getalinafe.com...",
    image: "https://res.cloudinary.com/tiyeni/image/upload/v1651274165/rapping.jpg",
    label: "personal",
    startDate: new Date("2019-09-02"),
    endDate: new Date("2019-09-02"),
    location: "Blantyre, Malawi",
    showRange: false,
  },
]

function AboutPage() {
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

  const initialIntersected = [...initialMilestones, ...initialServices]

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

  return (
    <div className="container p-4">
      <ArticleContainer classOverrides="flex xl:px-36 flex-col md:flex-row flex-col-reverse md:flex-row-reverse items-start xl:-mt-16">
        <>
          <div className="w-full md:w-2/3">
            <animated.div style={titleStyles}>
              <h1 className="text-2xl font-bold leading-tight xl:mt-20 md:text-4xl lg:text-5xl">???? More About <code>{"<Me />"}</code></h1>
              <p className="my-4 text-xl">I'm a Christian, Hubby, Daddy, Rapper and Software Engineer from Blantyre, Malawi  ???????? .  I believe that Tech <a href="#">is the fastest route towards generational wealth for underprivileged minorities</a>, and I'm a strong advocate for teaching it to whoever will listen!</p>
              <p className="my-4 text-sm">I asked a few of my mates to describe me in 4 words, and here's what they came up with:</p>
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
      <div className="py-4 my-8 bg-neutral">
        <ArticleContainer classOverrides="flex flex-col p-8 items-center">
          <h3 className="my-3 text-2xl text-offWhite">My Specialities</h3>
          <p className="text-center text-offWhite">Here are a few things that I've spent <code className="text-secondary-content">{'hours |> times |> 1000s'}</code> perfecting, and have come  pretty darn good at...</p>
          <div className="my-8 mt-12 xl:mt-16 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {services.map(service => (
              <Service key={service.id} intersected={findIntersected(service.id)} service={service} />
            ))}
          </div>
          <Link href="/contact"><button className="my-4 btn btn-lg btn-primary">Get in Touch</button></Link>
        </ArticleContainer>
      </div>
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
              <div className="stat-desc">?????? 400 (22%)</div>
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
      <animated.div id="timeline">
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
  )

  function findIntersected(id: string) {
    const found = intersected.find(item => item.id === id)
    return found.intersected
  }
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
  const theme = useTheme()
  const props = useSpring({
    to: { transform: `perspective(200px) rotateX(0deg) scale(0.9)`, },
    from: { transform: intersected ? `perspective(1200px) rotateX(60deg) scale(0)` : `perspective(200px) rotateX(0deg) scale(0.9)` },
    delay: 100,
  })

  return (
    <div className="w-full overflow-hidden">
      <div className="absolute hidden w-8 h-8 -ml-3 rounded-full lg:block inset-x-1/2 bg-offBlack dark:bg-offWhite" />
      <animated.div style={props} id={milestone.id} className={`overflow-x-hidden flex flex-col transition-all duration-300 w-full items-center w-full md:w-3/4 p-6 mx-auto text-left shadow ${isEven ? 'lg:-ml-8' : 'lg:-mr-8'} lg:w-1/2 lg:flex-row gap-x-6 bg-offWhite dark:bg-base-100`}>
        {milestone.image ?
          <div className="w-full mb-8 lg:w-1/2 lg:mb-0">
            <img className="mx-auto mask mask-squircle" src={milestone.image} />
          </div>
          : null}
        <div className="flex flex-col">
          <div className="flex flex-col items-center justify-between lg:flex-row">
            <div className="mb-3 text-2xl font-bold">{milestone.title}</div>
            <div className={`my-4 p-2 rounded text-sm bg-${milestone.label}/25 text-${milestone.label} uppercase`} style={{ backgroundColor: `${labelColors[milestone.label]}${theme === 'dark' ? `50` : ``}`, color: theme === 'dark' ? labelColors[milestone.label] : `white` }}>{milestone.label}</div>
          </div>
          <div className="text-lg">{milestone.description}</div>
          <div className="flex flex-row justify-between mt-4">
            <p className="text-sm font-bold">&#9906; {milestone.location}</p>
            <p>&#9778; {`${monthYear(milestone.startDate)} ${milestone.showRange ? ` - ${monthYear(milestone.endDate)}` : ''}`}</p>
          </div>
        </div>
      </animated.div>
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
