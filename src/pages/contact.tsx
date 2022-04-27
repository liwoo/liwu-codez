
import { animated, useSpring } from "@react-spring/web"
import { useContext, useRef, useState } from "react"
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

  const decisionTree = {
    "Getting Your Resume": {
      "Recruiter": {
        "EmailInput": "Great, Enter Your Company Email",
        "TextArea": "Feel free to say more (Optional)",
        "Submit": "Send me Resume"
      },
      "Student": {
        "EmailInput": "Awesome, Enter Your Email",
        "TextArea": "Feel free to say more (Optional)",
        "Submit": "Send me Resume"
      },
      "Professional": {
        "EmailInput": "Great! Enter Your Company Email",
        "TextArea": "Feel free to say more (Optional)",
        "Submit": "Send me Resume"
      },
      "Just Stalking": {
        "EmailInput": null,
        "TextArea": "C'mon Bro...",
        "Submit": null
      }
    },
    //["Recruiter", "Student", "Professional", "Just Stalking"],
    "A Speaking Engangement": {
      "School/College": {
        "EmailInput": "Enter Your Email",
        "TextArea": "Please provide some dates, name of the school and other information if possible",
        "Submit": "Check your Availability"
      },
      "Conference": {
        "EmailInput": "Enter Your Email",
        "TextArea": "Please provide some dates, name of Conference, where, and other information if possible",
        "Submit": "Check your Availability"
      },
      //"Company": {}
    },
    //["School/College", "Conference", "Company"],
    //"Mentorship": {  "Coding": {}, "Career": {}, "Education": {} },
    //"Freelance/Consultancy": { "Personal Work": {}, "Company's Work": {}, "Bid/Tender": {} },
    //Referral
    //"Other": {}
  }

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

  const firstSelectRef = useRef(null)
  const secondSelectRef = useRef(null)

  type SelectedDecision = {
    firstDecision?: string
    secondDecision?: string
  }

  const [selectedDecisions, setSelectedDecisions] = useState<SelectedDecision>({ firstDecision: null, secondDecision: null })


  const changeFirstSelect: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    secondSelectRef.current.value = "default"
    setSelectedDecisions({ firstDecision: e.currentTarget.value })
  }

  function getTargetInput(key: string): string | null {
    if (!(selectedDecisions.firstDecision && selectedDecisions.secondDecision)) return null
    return decisionTree[selectedDecisions.firstDecision][selectedDecisions.secondDecision][key]
  }

  return (
    <div className="container flex flex-col justify-start h-screen pt-16 xs:pt-24 md:pt-60">
      <animated.div style={subtitleStyles} className="absolute h-12 text-xl text-center inset-1/4 top-16 lg:top-28"> <h1>Somewhere in Limbe, Blantyre...</h1> </animated.div>
      <animated.div
        style={titleStyles}
        className="flex flex-col items-center w-4/5 p-2 mx-auto mt-16 xs:w-full md:w-full gap-y-4 md:mt-40 sm:p-4"
      >
        <select ref={firstSelectRef} className="w-full max-w-xs select" onChange={changeFirstSelect}>
          <option value="default" disabled selected>I would like to connect about...</option>
          {Object.entries(decisionTree).map(entry => <option value={entry[0]}>{entry[0]}</option>)}
        </select>
        <select ref={secondSelectRef} className="w-full max-w-xs select" onChange={e => setSelectedDecisions({ ...selectedDecisions, secondDecision: e.currentTarget.value })} disabled={!selectedDecisions.firstDecision}>
          <option value="default" disabled selected>I'm asking as a...</option>
          {selectedDecisions.firstDecision ? Object.entries(decisionTree[selectedDecisions.firstDecision]).map(entry => <option value={entry[0]}>{entry[0]}</option>) : null}
        </select>
        <input type="email" required disabled={!getTargetInput("EmailInput")} placeholder={selectedDecisions.secondDecision ? decisionTree[selectedDecisions.firstDecision][selectedDecisions.secondDecision]["EmailInput"] : `I'll be waiting...`} className="w-full max-w-xs input" />
        <textarea disabled={!getTargetInput("TextArea")} style={{ width: `${firstSelectRef.current?.clientWidth}px` }} className="textarea" placeholder={getTargetInput("TextArea")}></textarea>
        <animated.div
          onMouseOver={_e => interactions.startInteraction()}
          onMouseLeave={_e => interactions.endInteraction()}
          style={button1Styles}><button disabled={!getTargetInput("Submit")} className="btn btn-primary btn-wide md:btn-lg"
          >{getTargetInput("Submit") ?? "Submit  🤷🏽‍♂️    "}</button></animated.div>
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
