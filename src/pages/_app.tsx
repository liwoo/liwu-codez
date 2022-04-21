import Head from 'next/head'
import { AppProps } from 'next/app'
import '../styles/index.css'
import { ThemeProvider } from 'next-themes'
import { useEffect } from 'react'
import { themeChange } from 'theme-change'
import Nav from '../components/nav'
import Footer from '../components/footer'
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }: AppProps) {

  useEffect(() => {
    themeChange(false)
  }, [])

  const router = useRouter()
  const pathsWithoutFooter = ['/', '/contact']

  return (
    <ThemeProvider attribute="class">
      <Head>
        <title>🪴 Welcome to Liwu's Digital Garden</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Nav />
      <Component {...pageProps} />
      {pathsWithoutFooter.includes(router.pathname) ? null : <Footer />}
    </ThemeProvider>
  )
}

export default MyApp


