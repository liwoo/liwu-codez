
import { Alignment, Fit } from "rive-react"
import BackgroundAnimation, { AnimationContext } from "../components/background-animation"
import Image from "next/image"
import ArticleContainer from "../components/article-container"
import { CSSProperties, useContext, useEffect, useRef, useState } from "react"
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

interface Company {
  id: string
  logo: string
}


interface ProjectMeta {
  role: string
  months: number
  client: string
}

interface Project {
  id: string
  title: string
  description: string
  tags: string[]
  previewLink: string
  sourceCode?: string
  image?: string
  metadata: ProjectMeta
}

const projects: Project[] = [
  {
    id: "mybucks",
    title: "Official MyBucks Website",
    description: "Official website of MyBucks Banking Corporation. \nI designed the entire site from scratch in Sketch while collaborating with marketing team. \nThe site was coded in React and GatsbyJS powered by a custom-build CMS in Strapi, deployed with Netlify!",
    tags: ["Website", "ReactJS", "GatsbyJS"],
    previewLink: "https://mybucksbanking.mw",
    image: "https://res.cloudinary.com/tiyeni/image/upload/v1651013189/Screen_Shot_2022-04-27_at_12.46.16_AM.png",
    metadata: {
      role: "Designer & Developer",
      months: 8,
      client: "MyBucks Bank"
    }
  },
  {
    id: "cla",
    title: "Official MyBucks Website",
    description: "Some cool project I worked on...",
    tags: ["Website", "ReactJS", "GatsbyJS"],
    previewLink: "https://mybucksbanking.mw",
    image: "https://res.cloudinary.com/tiyeni/image/upload/v1651013189/Screen_Shot_2022-04-27_at_12.46.16_AM.png",
    metadata: {
      role: "Designer & Developer",
      months: 8,
      client: "MyBucks Bank"
    }
  },
  {
    id: "getalinafe",
    title: "Official MyBucks Website",
    description: "Some cool project I worked on...",
    tags: ["Website", "ReactJS", "GatsbyJS"],
    previewLink: "https://mybucksbanking.mw",
    image: "https://res.cloudinary.com/tiyeni/image/upload/v1651013189/Screen_Shot_2022-04-27_at_12.46.16_AM.png",
    metadata: {
      role: "Designer & Developer",
      months: 8,
      client: "MyBucks Bank"
    }
  },
]


const companies: Company[] = [
  {
    id: "times",
    logo: "logos/times.png",
  },
  {
    id: "undp",
    logo: "logos/undp.png",
  },
  {
    id: "tnm",
    logo: "logos/tnm.png",
  },
  {
    id: "mybucks",
    logo: "logos/mybucks.png",
  },
  {
    id: "oaf",
    logo: "logos/oaf.png",
  },
  {
    id: "bmg",
    logo: "logos/bmg.png",
  },
  {
    id: "nbs",
    logo: "logos/nbs.png",
  },
  {
    id: "ugi",
    logo: "logos/ugi.png",
  },
  {
    id: "mtl",
    logo: "logos/mtl.png",
  },
]

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


  const interactions = useContext(AnimationContext)
  const logosContainerRef = useRef(null)

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

    skills.forEach(skill => {
      const refSkill = document.getElementById(skill.id)
      if (refSkill) {
        observer.observe(refSkill)
      }
    })


  }, [])


  const START_FROM = 2000

  const contentStyles = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: START_FROM + 3000,
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
          <p className="text-center lg:w-2/3">I've been coding  professionally for <code>6++</code> years.  I've  worked  with so many different technologies, but below are a few that I've come to particularly enjoy</p>
          <div style={{ transform: `perspective(1200px) rotateY(0deg)` }} className="flex flex-col w-full p-2 py-8 my-8 rounded-lg md:p-6 shadow-sm lg:mt-16 lg:w-2/3 gap-y-8 bg-gradient-to-bl bg-accent/50 from-base-100">
            {skills.map((skill, index) => <Skill key={skill.id} index={index} skill={skill} intersected={findIntersected(skill.id)} />)}
          </div>
        </ArticleContainer>
      </div>
      <div className="flex flex-col items-center px-4 py-12 mt-12 overflow-x-hidden text-offWhite bg-neutral">
        <h3 className="my-3 text-2xl font-bold">UR In Great Company</h3>
        <p className="text-center">I've been extremely priviledged to do work with these awesome companies over the years</p>
        <div className="relative overflow-hidden" style={{ height: `${logosContainerRef.current?.clientHeight}px` }}>
          <div ref={logosContainerRef} className="inline-flex p-8 overflow-x-hidden gap-x-12 animate-logos">
            {companies.map(company =>
              <div id={company.id} className="w-40 h-20 overflow-none"><img src={company.logo} alt={company.id} /></div>
            )}
          </div>
          <div className="inline-flex p-8 overflow-x-hidden gap-x-12 animate-logosMd">
            {companies.map(company =>
              <div id={company.id} className="w-40 h-20 overflow-none"><img src={company.logo} alt={company.id} /></div>
            )}
          </div>
        </div>
      </div>
      <div className="container p-4">
        <animated.div id="timeline">
          <ArticleContainer classOverrides="flex flex-row my-8">
            <div className="hidden lg:w-2/5 lg:block">
              <Image width={600} height={600} src="/img/3d/blog.png" className="border" />
            </div>
            <div className="w-full lg:w-3/5">
              {projects.map((project, index) => <ProjectTab key={project.id} project={project} index={index} />)}
            </div>
          </ArticleContainer>
        </animated.div>
      </div>
    </>
  )
}

function ProjectTab({ index, project }: { index: number, project: Project }) {
  return (
    <div tabIndex={index} className="w-full my-6 border-b collapse collapse-plus">
      <input type="checkbox" />
      <div className="text-xl text-3xl font-bold lg:text-4xl xl:text-5xl collapse-title">
        {`0${index + 1}. ${project.title}`}
      </div>
      <div className="collapse-content">
        {project.image ?
          <div className="hover:shadow-lg transition-all mockup-window bg-base-300">
            <div className="flex justify-center bg-base-200">
              <Image width={900} height={450} src={project.image} className="border" />
            </div>
          </div>
          : null}
        <div className="flex justify-center w-full my-4 gap-x-3">
          <button className="btn btn-primary">View Live Link</button>
          <button className="btn" disabled={project.sourceCode === undefined}>View Source Code</button>
        </div>
        <div className="flex flex-col-reverse md:my-8 md:gap-x-6 gap-y-8 md:gap-y-0 md:flex-row">
          <div className="w-full md:w-1/2">{project.description.split('\n').map(par => <p className="my-3 text-lg">{par}</p>)}</div>
          <div className="flex flex-col w-full gap-y-3 md:w-1/2">
            <div>
              {Object.entries(project.metadata).map(entry => <Metafield title={entry[0]} description={entry[1]} />)}
            </div>
            <div className="flex gap-x-3">
              {project.tags.map(tag => <span className="badge">{tag}</span>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Metafield({ title, description }: { title: string, description: string }) {
  return (
    <div className="flex flex-row justify-between py-3 my-1 uppercase border-b border-dashed">
      <h4 className="font-semibold">{title}</h4>
      <h5>{description}</h5>
    </div>
  )
}

function Skill({ skill, intersected, index }: { skill: Skill, intersected: boolean, index: number }) {
  const percentage = skill.years / 6 * 100
  const props = useSpring({
    width: intersected ? `${percentage}` : `0%`,
    from: { width: `0%` },
    config: config.wobbly,
    delay: 100 + index * 200
  });

  return (
    <div id={skill.id} className="flex flex-row justify-start w-full mx-auto gap-x-4">
      <div className="w-1/4">
        <h3 className="my-2 font-medium text-center uppercase">{skill.name}</h3>
      </div>
      <div className="flex flex-col items-start w-3/4">
        <animated.div className="h-8 rounded-lg bg-neutral dark:bg-accent" style={props} />
        <div className="my-2 badge">{skill.years} year{`${skill.years > 1 ? `s` : ``}`}</div>
      </div>
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
