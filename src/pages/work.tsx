
import { Alignment, Fit } from "rive-react"
import BackgroundAnimation, { AnimationContext } from "../components/background-animation"
import Image from "next/image"
import ArticleContainer from "../components/article-container"
import { CSSProperties, useContext, useEffect, useRef, useState } from "react"
import { animated, config, SpringValue, useSpring } from "@react-spring/web"
import { Project, projects } from "../data/projects"


interface Skill {
  id: string
  name: string
  icon: string
  years: number
}

interface Company {
  id: string
  name: string
  logo: string
}


// Current employers first (logos from chienda.com), then earlier clients
const companies: Company[] = [
  {
    id: "ico",
    name: "ICO",
    logo: "img/companies/ico.png",
  },
  {
    id: "irembo",
    name: "Irembo",
    logo: "img/companies/irembo.png",
  },
  {
    id: "bestseller",
    name: "Bestseller",
    logo: "img/companies/bestseller.png",
  },
  {
    id: "oaf",
    name: "One Acre Fund",
    logo: "img/companies/oaf.png",
  },
  {
    id: "bht",
    name: "Baobab Health Trust",
    logo: "img/companies/bht.png",
  },
  {
    id: "kuunika",
    name: "Kuunika",
    logo: "img/companies/kuunika.png",
  },
  {
    id: "centenary",
    name: "Centenary Bank",
    logo: "img/companies/centenary.png",
  },
  {
    id: "nbs",
    name: "NBS Bank",
    logo: "img/companies/nbs.png",
  },
  {
    id: "mtl",
    name: "MTL",
    logo: "img/companies/mtl.png",
  },
  {
    id: "times",
    name: "Times Group",
    logo: "logos/times.png",
  },
  {
    id: "undp",
    name: "UNDP",
    logo: "logos/undp.png",
  },
  {
    id: "tnm",
    name: "TNM",
    logo: "logos/tnm.png",
  },
  {
    id: "bmg",
    name: "Bill & Melinda Gates Foundation",
    logo: "logos/bmg.png",
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

function WorkPage() {
  const initialSkills = skills.map(skill => {
    return {
      id: skill.id,
      intersected: false,
      touched: 0
    }
  })

  const initialIntersected = [...initialSkills]

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
          <h1 className="my-3 text-2xl">My Magic Toolbox <span aria-hidden="true">🛠</span></h1>
          <p className="text-center lg:w-2/3">I've been coding  professionally for <code>6++</code> years.  I've  worked  with so many different technologies, but below are a few that I've come to particularly enjoy</p>
          <div style={{ transform: `perspective(1200px) rotateY(0deg)` }} className="flex flex-col w-full p-2 py-8 my-8 rounded-lg md:p-6 shadow-sm lg:mt-16 lg:w-2/3 gap-y-8 bg-gradient-to-bl bg-accent/50 from-base-100">
            {skills.map((skill, index) => <Skill key={skill.id} index={index} skill={skill} intersected={findIntersected(skill.id)} />)}
          </div>
        </ArticleContainer>
      </div>
      <div className="flex flex-col items-center px-4 py-12 mt-12 overflow-x-hidden text-neutral-content bg-neutral">
        <h2 className="my-3 text-2xl font-bold">UR In Great Company</h2>
        <p className="text-center">I've been extremely priviledged to do work with these awesome companies over the years</p>
        <div className="relative overflow-hidden" style={{ height: `${logosContainerRef.current?.clientHeight}px` }}>
          {/* The marquee repeats every logo, so screen readers get one plain list instead */}
          <ul className="sr-only">{companies.map(company => <li key={company.id}>{company.name}</li>)}</ul>
          <div ref={logosContainerRef} aria-hidden="true" className="inline-flex p-8 overflow-x-hidden gap-x-12 animate-logos motion-reduce:animate-none">
            {companies.map(company =>
              <div key={company.id} className="w-40 h-20 overflow-none"><img src={company.logo} alt="" /></div>
            )}
          </div>
          <div aria-hidden="true" className="inline-flex p-8 overflow-x-hidden gap-x-12 animate-logosMd motion-reduce:hidden">
            {companies.map(company =>
              <div key={company.id} className="w-40 h-20 overflow-none"><img src={company.logo} alt="" /></div>
            )}
          </div>
        </div>
      </div>
      <div className="container p-4">
        <animated.div id="timeline">
          <ArticleContainer classOverrides="flex flex-row my-8">
            <div className="hidden lg:w-2/5 lg:block">
              <Image width={600} height={600} src="/img/3d/blog.png" alt="" className="border" />
            </div>
            <div className="w-full lg:w-3/5">
              {projects.map((project, index) => <ProjectTab key={project.id} project={project} index={index} />)}
              <p className="mt-8 text-center"><a href="https://chienda.com/projects">See every project on chienda.com</a></p>
            </div>
          </ArticleContainer>
        </animated.div>
      </div>
    </>
  )
}

function ProjectTab({ index, project }: { index: number, project: Project }) {
  return (
    <div className="w-full my-6 border-b collapse collapse-plus">
      <input type="checkbox" aria-label={`Show details for ${project.title}`} />
      <h2 className="text-2xl font-bold sm:text-3xl lg:text-4xl xl:text-5xl collapse-title">
        {`0${index + 1}. ${project.title}`}
      </h2>
      <div className="collapse-content">
        <div className="transition-all hover:shadow-lg mockup-window bg-base-300">
          <div className="flex justify-center bg-base-200">
            <Image width={900} height={473} src={project.image} alt={project.imageAlt} objectFit="cover" />
          </div>
        </div>
        <div className="flex flex-wrap justify-center w-full my-4 gap-3">
          <a className="no-underline btn btn-primary" href={project.caseStudy}>Read the Case Study</a>
          <a className="no-underline btn" href={project.previewLink} target="_blank" rel="noopener noreferrer">View Live Link</a>
          {project.sourceCode
            ? <a className="no-underline btn btn-ghost" href={project.sourceCode} target="_blank" rel="noopener noreferrer">View Source Code</a>
            : null}
        </div>
        <div className="flex flex-col-reverse md:my-8 md:gap-x-6 gap-y-8 md:gap-y-0 md:flex-row">
          <div className="w-full md:w-1/2"><p className="my-3 text-lg">{project.description}</p></div>
          <div className="flex flex-col w-full gap-y-3 md:w-1/2">
            <div>
              {Object.entries(project.metadata).map(entry => <Metafield key={entry[0]} title={entry[0]} description={entry[1]} />)}
            </div>
            <div className="flex flex-wrap gap-3">
              {project.tags.map(tag => <span key={tag} className="badge">{tag}</span>)}
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
      <span className="font-semibold">{title}</span>
      <span>{description}</span>
    </div>
  )
}

function Skill({ skill, intersected, index }: { skill: Skill, intersected: boolean, index: number }) {
  const percentage = skill.years / 6 * 100
  const props = useSpring({
    width: intersected ? `${percentage}%` : `0%`,
    from: { width: `0%` },
    config: config.wobbly,
    delay: 100 + index * 200
  });

  return (
    <div id={skill.id} className="flex flex-row justify-start w-full mx-auto gap-x-4">
      <div className="w-24 shrink-0 sm:w-1/4">
        <h2 className="my-2 text-sm font-medium text-center uppercase sm:text-base">{skill.name}</h2>
      </div>
      <div className="flex flex-col items-start min-w-0 grow">
        <animated.div role="presentation" className="h-8 rounded-lg bg-neutral dark:bg-accent" style={props} />
        <div className="my-2 badge">{skill.years} year{`${skill.years > 1 ? `s` : ``}`}</div>
      </div>
    </div>
  )
}

export default function Work() {
  return (
    <BackgroundAnimation scene="Generic" fit={Fit.FitWidth} alignment={Alignment.TopCenter} absolute={false}>
      <WorkPage />
    </BackgroundAnimation>
  )
}
