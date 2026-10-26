import Head from 'next/head'
import { AppProps } from 'next/app'
import '../styles/index.css'
import { ThemeProvider as NextThemesProvider, ThemeProviderProps } from 'next-themes'
import Nav from '../components/nav'
import Footer from '../components/footer'
import { useRouter } from 'next/router'
import { Globals } from '@react-spring/web'

// Respect "reduce motion": jump every spring (and its delay) straight to its end state.
// Set at module load so it applies before the first page's springs start.
if (typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
  Globals.assign({ skipAnimation: true })
}

// next-themes' typings expect React 18's PropsWithChildren; re-type it for our React 17 types
const ThemeProvider = NextThemesProvider as React.FC<ThemeProviderProps>

function MyApp({ Component, pageProps }: AppProps) {

  const router = useRouter()
  const pathsWithoutFooter = ['/', '/contact']

  return (
    // Single source of truth for the theme: `class` drives Tailwind's `dark:`
    // variant and `data-theme` drives daisyUI, so they can never drift apart
    <ThemeProvider attribute={['class', 'data-theme']} themes={['light', 'dark']} enableSystem defaultTheme="system">
      <Head>
        <title>🪴 Welcome to Liwu's Digital Garden</title>
        <meta name="description" content="Jermiah Chienda is a Malawian Software Engineer, Recording Hip-hop Artist, Youtuber and Tech Enthusiast with more than 5 years Professional Experience accross 3 industries." />
        <meta property="og:title" content="🪴 Welcome to Liwu's Digital Garden" />
        <meta property="og:description" content="Jermiah Chienda is a Malawian Software Engineer, Recording Hip-hop Artist, Youtuber and Tech Enthusiast with more than 5 years Professional Experience accross 3 industries." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.liwu.codes" />
        <meta property="og:image" content="https://pub-a0f6f56fff3c42b9bb30bd2143c99754.r2.dev/2026.jpg" />
        <meta property="og:image:width" content="880" />
        <meta property="og:image:height" content="1168" />
        <meta property="og:image:alt" content="Liwu's Digital Garden" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" type="image/svg+xml" href="favicon/favicon.svg" />
        <link rel="icon" type="image/png" href="favicon/favicon.png" />
      </Head>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-1/2 focus:-translate-x-1/2 focus:z-50 btn btn-primary">Skip to content</a>
      <Nav />
      <main id="main">
        <Component {...pageProps} />
      </main>
      {pathsWithoutFooter.includes(router.pathname) ? null : <Footer />}
    </ThemeProvider>
  )
}

export default MyApp


