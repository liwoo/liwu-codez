import { useContext } from "react"
import BackgroundAnimation, { AnimationContext } from "../components/background-animation"

function Home() {
  const interactions = useContext(AnimationContext)
  return (
    <div className="container flex flex-col justify-start h-screen md:justify-center">
      <div
        className="p-2 mt-16 md:mt-0 bg-base-100/75 lg:bg-transparent sm:p-4"
        onMouseOver={_e => interactions.startInteraction()}
        onMouseLeave={_e => interactions.endInteraction()}>
        <h1 className="my-2 text-2xl font-medium md:my-6">
          Hi, I'm Jeremiah Chienda
        </h1>
        <h2 className="text-2xl leading-tight uppercase dark:text-primary md:text-4xl">
          I'm a {' '}
          <strong className="bg-gradient-to-b from-transparent via-transparent to-secondary">
            software engineer
          </strong>
          <p className="text-base md:text-4xl"> 4rm Blantyre // Malawi </p>
        </h2>
        <p className="hidden p-4 my-12 text-2xl lg:block bg-base-100/95 md:w-2/3 xl:w-3/4">
          <span> When I'm not</span>
          <a>  recording Christian Rap Music </a>
          <span>  or  </span>
          <a> making Tech videos for my YouTube, </a>
          <span>  I'm probably moving humanity forward by  </span>
          <a> writing Software that improves peoples lives. </a>
        </p>
        <div className="flex my-4 gap-x-2 lg:gap-x-4">
          <button className="btn btn-primary md:btn-lg"> Get in touch </button>
          <button className="btn btn-secondary md:btn-lg">View my work</button>
        </div>
      </div>
    </div>
  )
}

export default function Index() {
  return (
    <BackgroundAnimation scene="Home">
      <Home />
    </BackgroundAnimation>
  )
}
