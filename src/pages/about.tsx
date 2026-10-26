
import { Alignment, Fit } from "rive-react"
import BackgroundAnimation, { AnimationContext } from "../components/background-animation"
import Image from "next/image"
import ArticleContainer from "../components/article-container"
import { useContext, useEffect, useRef, useState } from "react"
import { animated, config, useSpring } from "@react-spring/web"
import Terminal from "../components/icons/terminal"
import Streaming from "../components/icons/streaming"
import Reading from "../components/icons/reading"
import useWindowSize from "../hooks/use-window-size"
import Link from "next/link"

import { Activity, DescriptiveWord, Label, milestones, monthYear, Service, services, words } from "../data/about"

// Full class names (not built from strings) so Tailwind generates them.
// The tint carries the label colour; text stays base-content so it passes WCAG AA in both themes.
const labelStyles: { [key in Label]: string } = {
  personal: "bg-personal/30 border-personal",
  professional: "bg-professional/30 border-professional",
  education: "bg-education/30 border-education",
  other: "bg-other/30 border-other",
}

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
              <h1 className="text-2xl font-bold leading-tight xl:mt-20 md:text-4xl lg:text-5xl">💬 More About <code>{"<Me />"}</code></h1>
              <p className="my-4 text-xl">I'm a Christian, Hubby, Daddy, Rapper and Software Engineer from Blantyre, Malawi  🇲🇼 .  I believe that Tech <span className="underline decoration-primary">is the fastest route towards generational wealth for underprivileged minorities</span>, and I'm a strong advocate for teaching it to whoever will listen!</p>
              <Link href="/about/studio"><a className="my-2 no-underline btn btn-secondary">Step into my studio <span aria-hidden="true" className="ml-2">→</span></a></Link>
              <p className="my-4 text-sm">I asked a few of my mates to describe me in 4 words, and here's what they came up with:</p>
            </animated.div>
            <animated.div style={wordsStlyes}>
              {words.map(word => (
                <DescriptiveWord key={word.word} word={word} />
              ))}
            </animated.div>
          </div>
          <animated.div style={objectStyles} className="w-1/2 mx-auto mb-8 -mt-16 md:-mt-0 md:mb-0 md:mx-0 md:w-1/3">
            <Image width={600} height={797} src="/img/jeremiah.jpg" alt="Jeremiah Chienda" className="rounded-lg" layout="responsive" objectFit="cover" priority />
            <div className="hidden my-20 md:block">
              <blockquote>Success isn't about how much money you make, it's about the difference you make in people's lives </blockquote>
              <cite>Michelle Obama</cite>
            </div>
          </animated.div>
        </>
      </ArticleContainer>
      <div className="py-4 my-8 bg-neutral text-neutral-content">
        <ArticleContainer classOverrides="flex flex-col p-8 items-center">
          <h2 className="my-3 text-2xl text-neutral-content">My Specialities</h2>
          <p className="text-center text-neutral-content">Here are a few things that I've spent <code className="text-secondary-content">{'hours |> times |> 1000s'}</code> perfecting, and have come  pretty darn good at...</p>
          <div className="my-8 mt-12 xl:mt-16 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {services.map(service => (
              <Service key={service.id} intersected={findIntersected(service.id)} service={service} />
            ))}
          </div>
          <Link href="/contact"><a className="my-4 no-underline btn btn-lg btn-primary">Get in Touch</a></Link>
        </ArticleContainer>
      </div>
      <animated.div style={contentStyles}>
        <ArticleContainer classOverrides="flex flex-col items-center w-full gap-x-6 my-8 lg:my-20">
          <h2 className="my-6 text-lg">My Life in Numbers</h2>
          <div id="stats" className="mx-auto shadow stats stats-vertical md:stats-horizontal bg-base-200">

            <div className="stat">
              <div className="stat-figure text-primary">
                <Terminal classOverride="w-6 h-6 fill-primary" />
              </div>
              <div className="stat-title opacity-80">Contributions</div>
              <animated.div className="stat-value">{contributionProps.val.to(val => Math.floor(val).toLocaleString())}</animated.div>
              <div className="stat-desc opacity-80">This Year on Github</div>
            </div>

            <div className="stat">
              <div className="stat-figure text-primary">
                <Streaming classOverride="w-8 h-8 fill-primary" />
              </div>
              <div className="stat-title opacity-80">Monthly Streams</div>
              <animated.div className="stat-value">{streamsProps.val.to(val => Math.floor(val).toLocaleString())}</animated.div>
              <div className="stat-desc opacity-80">↗︎ 400 (22%)</div>
            </div>

            <div className="stat">
              <div className="stat-figure text-primary">
                <Reading classOverride="w-8 h-8 fill-primary" />
              </div>
              <div className="stat-title opacity-80">Total Reads</div>
              <animated.div className="stat-value">{readsProps.val.to(val => Math.floor(val).toLocaleString())}</animated.div>
              <div className="stat-desc opacity-80">of my Blog</div>
            </div>

          </div>
        </ArticleContainer>
      </animated.div>
      <animated.div id="timeline">
        <div className="absolute w-2 rounded-full inset-x-1/2 bg-base-content/20" style={{ height: timelineHeight, zIndex: -10 }} />
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
    <div id={service.id} className={`flex flex-col ${intersected ? 'translate-y-0' : 'translate-y-64'}  transition-all  ease-in-out duration-600 rounded-lg bg-base-200/90 text-base-content p-5`}>
      <img src={service.icon} alt="" className="w-12 h-12 mb-4" />
      <h3 className="my-2 text-xl font-bold">{service.title}</h3>
      <p>{service.description}</p>
    </div>
  )
}

function DescriptiveWord({ word }: { word: DescriptiveWord }) {
  return (
    <div className="flex items-start justify-center my-8 gap-x-8">
      <div aria-hidden="true" className="p-4 text-2xl rounded-lg shadow bg-accent">
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
      <h2 className="p-3 text-xl rounded bg-accent text-accent-content">{title}</h2>
    </div>
  )
}

function Activity({ milestone, intersected }: { milestone: Activity, intersected: boolean }) {
  const isEven = Number(milestone.id) % 2 === 0
  // Hide the photo slot if the image is gone, rather than leaving half the card empty.
  // The mount check catches images that failed before hydration attached onError.
  const imageRef = useRef<HTMLImageElement>(null)
  const [imageFailed, setImageFailed] = useState(false)
  useEffect(() => {
    const img = imageRef.current
    if (img && img.complete && img.naturalWidth === 0) setImageFailed(true)
  }, [])
  const props = useSpring({
    to: { transform: `perspective(200px) rotateX(0deg) scale(0.9)`, },
    from: { transform: intersected ? `perspective(1200px) rotateX(60deg) scale(0)` : `perspective(200px) rotateX(0deg) scale(0.9)` },
    delay: 100,
  })

  return (
    <div className="w-full overflow-hidden">
      <div className="absolute hidden w-8 h-8 -ml-3 rounded-full lg:block inset-x-1/2 bg-base-content" />
      <animated.div style={props} id={milestone.id} className={`overflow-x-hidden flex flex-col transition-all duration-300 w-full items-center w-full md:w-3/4 p-6 mx-auto text-left shadow ${isEven ? 'lg:-ml-8' : 'lg:-mr-8'} lg:w-1/2 lg:flex-row gap-x-6 bg-base-200`}>
        {milestone.image && !imageFailed ?
          <div className="w-full mb-8 lg:w-1/2 lg:mb-0">
            <img ref={imageRef} onError={() => setImageFailed(true)} className="object-contain p-3 mx-auto bg-white rounded-lg max-h-36" src={milestone.image} alt="" />
          </div>
          : null}
        <div className="flex flex-col">
          <div className="flex flex-col items-center justify-between lg:flex-row">
            <h3 className="mb-3 text-2xl font-bold">{milestone.title}</h3>
            <div className={`my-4 p-2 rounded text-sm uppercase border-l-4 text-base-content ${labelStyles[milestone.label]}`}>{milestone.label}</div>
          </div>
          <div className="text-lg">{milestone.description}</div>
          <div className="flex flex-row justify-between mt-4">
            <p className="text-sm font-bold"><span aria-hidden="true">&#9906; </span>{milestone.location}</p>
            <p><span aria-hidden="true">&#9778; </span>{`${monthYear(milestone.startDate)} ${milestone.showRange ? ` - ${monthYear(milestone.endDate)}` : ''}`}</p>
          </div>
        </div>
      </animated.div>
    </div>
  )
}

export default function About() {
  return (
    <BackgroundAnimation scene="Generic" fit={Fit.FitWidth} alignment={Alignment.TopCenter} absolute={false}>
      <AboutPage />
    </BackgroundAnimation>
  )
}
