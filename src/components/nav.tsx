import { useTheme } from "next-themes"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useRef, useState } from "react"
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
    href: "/portfolio",
  },
  {
    label: "Contact",
    href: "/contact",
  },
]

type SocialMedia = 'LinkedIn' | 'Twitter' | 'Youtube' | 'Github' | 'Spotify'

interface SocialMediaItem {
  label: SocialMedia
  darkIcon?: string
  ligthIcon: string
  icon?: JSX.Element
  link: string
}

export default function Nav() {
  const { theme, setTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const [icon, switchTo] = theme === "dark" ? ["☀️", 'light'] : ["🌑", 'dark']
  const activeStyle = `text-primary bg-[url('/img/pointer-${theme}.svg')] bg-[center_top_2.5rem] bg-no-repeat`

  const socialMediaItems: SocialMediaItem[] = [
    {
      label: "LinkedIn",
      ligthIcon: "/icons/linkedin.svg",
      link: "https://linkedin.com/in/jchienda",
      icon: <LinkedIn classOverride={`${theme === 'dark' ? `fill-[#D2CBCB]` : `fill-[#032F4C]`} h-5 w-5`} />
    },
    {
      label: "Twitter",
      ligthIcon: "/icons/twitter.svg",
      link: "https://twitter.com/li_woo",
      icon: <Twitter classOverride={`${theme === 'dark' ? `fill-[#D2CBCB]` : `fill-[#032F4C]`} h-5 w-5`} />
    },
    {
      label: "Youtube",
      ligthIcon: "/icons/youtube.svg",
      link: "https://youtube.com/liwucodes",
      icon: <Youtube classOverride={`${theme === 'dark' ? `fill-[#D2CBCB]` : `fill-[#032F4C]`} h-5 w-5`} />
    },
    {
      label: "Github",
      ligthIcon: "/icons/github.svg",
      link: "https://github.com/liwoo",
      icon: <Github classOverride={`${theme === 'dark' ? `fill-[#D2CBCB]` : `fill-[#032F4C]`} h-5 w-5`} />
    },
    {
      label: "Spotify",
      ligthIcon: "/icons/spotify.svg",
      link: "https://open.spotify.com/user/liwucodes",
      icon: <Spotify classOverride={`${theme === 'dark' ? `fill-[#D2CBCB]` : `fill-[#032F4C]`} h-5 w-5`} />
    },
  ]

  const router = useRouter()
  const checkboxRef = useRef<HTMLInputElement>(null)

  const closeMenu = () => {
    checkboxRef!.current.checked = false
    setIsOpen(false)
  }

  useEffect(() => {
    router.events.on("routeChangeStart", closeMenu)
  }, [])

  return <nav className="absolute z-20 flex items-start justify-between w-full p-4 lg:px-16 xl:px-32">
    <div className="flex items-center gap-x-3">
      <button
        onClick={_e => setTheme(switchTo)}
        data-toggle-theme="dark,light"
        className={`bg-accent p-2 rounded cursor-pointer`
        }> {icon}
      </button >
      <label className="p-5 md:hidden btn btn-sm btn-circle swap swap-rotate">

        <input ref={checkboxRef} onClick={toggleSideMenu()} type="checkbox" />

        <svg className="fill-current swap-off" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 512 512"><path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" /></svg>

        <svg className="fill-current swap-on" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 512 512"><polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" /></svg>

      </label>
    </div>
    <ul className="items-center justify-around hidden w-2/3 uppercase md:flex px-auto xl:w-1/2">
      {theme && menuItems.map(item => <li key={item.label} className="my-2">
        <Link href={item.href}>
          <a className={`${item.href === router.pathname ? activeStyle : ""} no-underline py-4 hover:text-primary transition-all`}>{item.label}</a>
        </Link>
      </li>)}
    </ul>
    <ul className="flex-col items-center justify-around hidden md:flex xl:flex-row gap-x-6">
      {theme && socialMediaItems.map(item => <li key={item.label} className="p-1 my-2 border border-2 rounded-full border-[#032F4C] dark:border-[#D2CBCB]">
        <a href={item.link} target="_blank" rel="noopener noreferrer">
          {item.icon}
        </a>
      </li>)}
    </ul>
    <div className="absolute">
      <ul className={`fixed right-0 transition-all duration-300 overflow-x-hidden translate-x-[${isOpen ? '0rem' : '20rem'}] menu w-80 bg-base-100 text-base-content`}>
        {theme && menuItems.map(item => <li key={item.label} className="my-2">
          <Link href={item.href}>
            <a className={`${item.href === router.pathname ? "text-primary font-bold" : ""} no-underline py-4 hover:text-primary transition-all`}>{item.label}</a>
          </Link>
        </li>)}
      </ul>
    </div>
  </nav >

  function toggleSideMenu() {
    return _e => setIsOpen(prev => !prev)
  }
}
