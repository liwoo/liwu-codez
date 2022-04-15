import { animated, useSpring } from "@react-spring/web"
import { useContext } from "react"
import BackgroundAnimation, { AnimationContext } from "../components/background-animation"

function Home() {
  const interactions = useContext(AnimationContext)
  const START_FROM = 4000
  const titleStyles = useSpring({
    from: { translateY: -200, opacity: 0 },
    to: { translateY: 0, opacity: 1 },
    delay: START_FROM
  });

  const subtitleStyles = useSpring({
    from: { opacity: 1 },
    to: { opacity: 0 },
    delay: START_FROM - 1000
  });

  const button1Styles = useSpring({
    from: { scale: 0, opacity: 0 },
    to: { scale: 1, opacity: 1 },
    delay: START_FROM + 2000
  });

  const button2Styles = useSpring({
    from: { scale: 0, opacity: 0 },
    to: { scale: 1, opacity: 1 },
    delay: START_FROM + 2500
  });

  return (
    <div className="container flex flex-col justify-start h-screen md:justify-center">
      <animated.div style={subtitleStyles} className="absolute text-xl text-center inset-1/4 top-16 lg:top-64"> <h1>Somewhere in Limbe, Blantyre...</h1> </animated.div>
      <animated.div
        style={titleStyles}
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
          <animated.div style={button1Styles}><button className="btn btn-primary md:btn-lg"> Get in touch </button></animated.div>
          <animated.div style={button2Styles}><button className="btn btn-secondary md:btn-lg">View my work</button></animated.div>
        </div>
      </animated.div>
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
