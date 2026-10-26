import { useTheme } from "next-themes"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import useScroll from "../hooks/use-scroll"
import Github from "./icons/github"
import LinkedIn from "./icons/linkedin"
import Spotify from "./icons/spotify"
import Twitter from "./icons/twitter"
import Youtube from "./icons/youtube"

interface MenuItem {
  label: string
  active?: boolean
  href: string
}

const menuItems: MenuItem[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Blog",
    href: "/blog",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "My Work",
    href: "/work",
  },
  {
    label: "Contact",
    href: "/contact",
  },
]

type SocialMedia = 'LinkedIn' | 'Twitter' | 'Youtube' | 'Github' | 'Spotify'

interface SocialMediaItem {
  label: SocialMedia
  icon: JSX.Element
  link: string
}

// Icon colours come from the active daisyUI theme, not from JS, so they're right on first paint
const socialIconClass = "fill-base-content h-5 w-5"

const socialMediaItems: SocialMediaItem[] = [
  {
    label: "LinkedIn",
    link: "https://linkedin.com/in/jchienda",
    icon: <LinkedIn classOverride={socialIconClass} />
  },
  {
    label: "Twitter",
    link: "https://twitter.com/li_woo",
    icon: <Twitter classOverride={socialIconClass} />
  },
  {
    label: "Youtube",
    link: "https://www.youtube.com/channel/UCNEXAX15mO3rsVQQQve6Iog",
    icon: <Youtube classOverride={socialIconClass} />
  },
  {
    label: "Github",
    link: "https://github.com/liwoo",
    icon: <Github classOverride={socialIconClass} />
  },
  {
    label: "Spotify",
    link: "https://open.spotify.com/artist/3rglolSNrGllZKwpuu9b8U?si=93921d3c51434595",
    icon: <Spotify classOverride={socialIconClass} />
  },
]

const activeStyle = "text-primary bg-[url('/img/pointer-light.svg')] dark:bg-[url('/img/pointer-dark.svg')] bg-[center_top_2.5rem] bg-no-repeat"

export default function Nav() {
  const { resolvedTheme, setTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  // resolvedTheme is unknown during SSR; wait for mount so the toggle never shows the wrong icon
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const isDark = resolvedTheme === "dark"
  const switchTo = isDark ? "light" : "dark"

  const router = useRouter()
  // Sub-pages keep their section highlighted
  const isActive = (href: string) => href === "/" ? router.pathname === "/" : router.pathname === href || router.pathname.startsWith(`${href}/`)

  useEffect(() => {
    const closeMenu = () => setIsOpen(false)
    router.events.on("routeChangeStart", closeMenu)
    return () => router.events.off("routeChangeStart", closeMenu)
  }, [router.events])

  useEffect(() => {
    if (!isOpen) return
    const onKeyDown = (e: KeyboardEvent) => e.key === "Escape" && setIsOpen(false)
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [isOpen])

  const scrollY = useScroll()
  const SCROLL_THRESHOLD = 100
  const menuBgLg = 'transition-all xl:shadow xl:bg-base-200'
  const menuBg = 'transition-all rounded-lg shadow xl:shadow-none bg-base-200 xl:bg-transparent'

  return <nav aria-label="Main" className={`${scrollY > SCROLL_THRESHOLD ? `fixed ${menuBgLg}` : 'absolute'} z-20 flex items-start xl:items-center justify-between w-full p-4 lg:px-16 xl:px-32`}>
    <div className="flex items-center gap-x-3">
      <button
        type="button"
        onClick={_e => setTheme(switchTo)}
        aria-label={mounted ? `Switch to ${switchTo} mode` : "Toggle colour theme"}
        title={mounted ? `Switch to ${switchTo} mode` : undefined}
        className="w-10 h-10 p-2 rounded cursor-pointer bg-accent">
        <span aria-hidden="true">{mounted ? (isDark ? "☀️" : "🌑") : null}</span>
      </button>
      <button
        type="button"
        onClick={_e => setIsOpen(prev => !prev)}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        className={`w-10 h-10 lg:hidden btn btn-sm btn-circle swap swap-rotate ${isOpen ? "swap-active" : ""}`}>
        <svg aria-hidden="true" className="fill-current swap-off" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 512 512"><path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" /></svg>
        <svg aria-hidden="true" className="fill-current swap-on" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 512 512"><polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" /></svg>
      </button>
    </div>
    <ul className={`items-center justify-around hidden w-2/3 px-4 py-2 ${scrollY > SCROLL_THRESHOLD ? menuBg : ''} uppercase md:flex px-auto xl:w-1/2`}>
      {menuItems.map(item => <li key={item.label} className="my-2">
        <Link href={item.href}>
          <a aria-current={isActive(item.href) ? "page" : undefined} className={`${isActive(item.href) ? activeStyle : ""} no-underline py-4 hover:text-primary transition-all`}>{item.label}</a>
        </Link>
      </li>)}
    </ul>
    {/* Below lg the vertical icon column collides with page content; the menu panel carries them instead */}
    <SocialLinks className="flex-col items-center justify-around hidden lg:flex xl:flex-row gap-x-6" />
    {/* `invisible` when closed keeps the off-screen links out of the tab order */}
    <div
      id="mobile-menu"
      className={`fixed right-0 top-20 w-64 p-2 rounded-l-lg shadow-lg lg:hidden transition-all duration-300 bg-base-200 text-base-content ${isOpen ? "translate-x-0 visible" : "translate-x-full invisible"}`}>
      <ul className="menu md:hidden">
        {menuItems.map(item => <li key={item.label} className="my-1">
          <Link href={item.href}>
            <a aria-current={isActive(item.href) ? "page" : undefined} className={`${isActive(item.href) ? "text-primary font-bold" : ""} no-underline py-3 hover:text-primary transition-all`}>{item.label}</a>
          </Link>
        </li>)}
      </ul>
      <SocialLinks className="flex justify-around px-2 py-4 mt-2 border-t md:mt-0 md:border-t-0 border-base-content/20" />
    </div>
  </nav>
}

function SocialLinks({ className }: { className: string }) {
  return <ul className={className}>
    {socialMediaItems.map(item => <li key={item.label} className="p-1 my-2 border-2 rounded-full border-base-content">
      <a href={item.link} target="_blank" rel="noopener noreferrer" aria-label={item.label}>
        {item.icon}
      </a>
    </li>)}
  </ul>
}
