
import { animated, useSpring } from "@react-spring/web"
import { useContext } from "react"
import { Alignment } from "rive-react"
import BackgroundAnimation, { AnimationContext } from "../components/background-animation"

function Contact() {
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
    <div className="container flex flex-col justify-start h-screen pt-28 md:pt-60">
      <animated.div style={subtitleStyles} className="absolute h-12 text-xl text-center inset-1/4 top-16 lg:top-28"> <h1>Somewhere in Limbe, Blantyre...</h1> </animated.div>
      <animated.div
        style={titleStyles}
        className="flex flex-col items-center p-2 mt-16 gap-y-4 md:mt-0 sm:p-4"
      >
        <select className="w-full max-w-xs select">
          <option disabled selected>I would like to connect cocerning..</option>
          <option>Homer</option>
        </select>
        <select className="w-full max-w-xs select">
          <option disabled selected>Pick your favorite Simpson</option>
          <option>Homer</option>
        </select>
        <input type="text" placeholder="Type here" className="w-full max-w-xs input" />
        <textarea className="textarea" cols={33} placeholder="Bio"></textarea>
        <animated.div
          onMouseOver={_e => interactions.startInteraction()}
          onMouseLeave={_e => interactions.endInteraction()}
          style={button1Styles}><button className="btn btn-primary btn-wide md:btn-lg"
        >Submit</button></animated.div>
      </animated.div>
    </div>
  )
}

export default function ContactPage() {
  return (
    <BackgroundAnimation scene="Contact" alignment={Alignment.TopCenter}>
      <Contact />
    </BackgroundAnimation>
  )
}
