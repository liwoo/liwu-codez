import { useTheme } from "next-themes";
import { createContext, useEffect, useState } from "react";
import { Alignment, Fit, Layout, useRive, useStateMachineInput } from "rive-react";
import useWindowSize from "../hooks/use-window-size";

interface Props {
  scene: string
  children: React.ReactNode
  fit?: Fit
  alignment?: Alignment
  absolute?: boolean
}


interface AnimationContextProps {
  startInteraction: () => void
  endInteraction: () => void
}

export const AnimationContext = createContext<AnimationContextProps>(null)

export default function BackgroundAnimation(props: Props): JSX.Element {
  const fit = props.fit ?? Fit.Cover
  const alignment = props.alignment ?? Alignment.TopRight
  const absolute = props.absolute ?? true

  const { theme } = useTheme()
  const [loaded, setLoaded] = useState(false)
  const size = useWindowSize()

  const { rive, RiveComponent } = useRive({
    src: "website_background.riv",
    artboard: props.scene,
    stateMachines: "State machine",
    autoplay: true,
    layout: new Layout({
      fit: fit,
      alignment: alignment
    })
  });

  const interaction = useStateMachineInput(rive, "State machine", "interact")
  const changeTheme = useStateMachineInput(rive, "State machine", "switch")

  useEffect(() => {
    if (rive) {
      toggleTheme()
    }
  }, [changeTheme]);

  useEffect(() => {
    toggleTheme()
  }, [theme]);


  useEffect(() => {
    setTimeout(() => {
      setLoaded(true)
    }, 1000)
  }, []);

  function toggleTheme() {
    if (rive && (theme === "dark")) {
      changeTheme.value = 100;
    } <svg width="45" height="34" xmlns="http://www.w3.org/2000/svg"><path fill="#2A5083" d="M23.42.285.326 33.124h43.776z" fill-rule="evenodd" /></svg>

    if (rive && (theme === "light")) {
      changeTheme.value = -100;
    }
  }

  function triggerInteraction(value: boolean) {
    if (rive) {
      interaction.value = value
    }
  }


  return (
    <AnimationContext.Provider value={{
      startInteraction: () => triggerInteraction(true),
      endInteraction: () => triggerInteraction(false)
    }}>
      <div style={{ position: "relative" }} className={`${!loaded ? 'opacity-0' : 'opacity-1'} transition-all min-h-screen bg-accent/25 duration-500`}>
     <RiveComponent style={{ width: '100%', height: absolute ? '100vh' : size.width / 2.67, position: absolute ? 'absolute' : "inherit", zIndex: -20 }} />
        {props.children}
      </div>
    </AnimationContext.Provider >
  )
}

