
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


  type Input = {
    EmailInput: string | null
    TextArea: {
      text: string
      required: boolean
    }
    Submit: string | null
  }

  const decisionTree: Record<string, Record<string, Input>> = {
    "Getting Your Resume": {
      "Recruiter": {
        "EmailInput": "Great, Enter Your Company Email",
        "TextArea": {
          "text": "Feel free to say more (Optional)",
          "required": false
        },
        "Submit": "Send Updated Resume"
      },
      "Student": {
        "EmailInput": "Awesome, Enter Your Email",
        "TextArea": {
          "text": "Feel free to say more (Optional)",
          "required": false
        },
        "Submit": "Send Sample Resume"
      },
      "Professional": {
        "EmailInput": "Great! Enter Your Company Email",
        "TextArea": {
          "text": "Feel free to say more (Optional)",
          "required": false,
        },
        "Submit": "Send Sample Resume"
      },
      "Just Stalking": {
        "EmailInput": null,
        "TextArea": {
          "text": "C'mon Bro...",
          "required": false
        },
        "Submit": null
      }
    },
    "A Speaking Engangement": {
      "School/College": {
        "EmailInput": "Enter Your Email",
        "TextArea": {
          "text": "Please provide some dates, name of the school and other information if possible",
          "required": true
        },
        "Submit": "Book Engangement"
      },
      "Conference": {
        "EmailInput": "Enter Your Email",
        "TextArea": {
          "text": "Please provide some dates, name of Conference, where, and other information if possible",
          "required": true
        },
        "Submit": "Book Engangement"
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
  const emailRef = useRef(null)
  const messageRef = useRef(null)

  type SelectedDecision = {
    firstDecision?: string
    secondDecision?: string
  }

  const [selectedDecisions, setSelectedDecisions] = useState<SelectedDecision>({ firstDecision: null, secondDecision: null })
  const [isFormValid, setIsFormValid] = useState<boolean>(false)

  const changeFirstSelect: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    secondSelectRef.current.value = "default"
    setSelectedDecisions({ firstDecision: e.currentTarget.value })
  }


  function getCurrentInput(): Input | null {
    if (!(selectedDecisions.firstDecision && selectedDecisions.secondDecision)) return null
    return decisionTree[selectedDecisions.firstDecision][selectedDecisions.secondDecision]
  }

  function validateForm() {
    const emailValue = emailRef?.current?.value ?? "" as String
    const messageValue = messageRef?.current?.value ?? "" as String
    const shouldRequireMessage = getCurrentInput()?.TextArea?.required ?? true
    const isValid = emailValue.length > 5 && (shouldRequireMessage ? messageValue.length > 8 : true)
    setIsFormValid(isValid)
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
        <input type="email" onChange={_e => validateForm()} ref={emailRef} required disabled={!getCurrentInput()?.EmailInput} placeholder={selectedDecisions.secondDecision ? getCurrentInput()?.EmailInput : `I'll be waiting...`} className="w-full max-w-xs input" />
        <textarea ref={messageRef} onChange={_e => validateForm()} disabled={!getCurrentInput()?.TextArea?.text} style={{ width: `${firstSelectRef.current?.clientWidth}px` }} className="textarea" placeholder={getCurrentInput()?.TextArea?.text}></textarea>
        <animated.div
          onMouseOver={_e => interactions.startInteraction()}
          onMouseLeave={_e => interactions.endInteraction()}
          style={button1Styles}><button disabled={!isFormValid || !getCurrentInput()?.Submit} className="btn btn-primary btn-wide md:btn-lg"
          >{getCurrentInput()?.Submit ?? "Submit  🤷🏽‍♂️    "}</button></animated.div>
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
