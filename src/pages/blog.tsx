import { Alignment, Fit } from "rive-react"
import BackgroundAnimation from "../components/background-animation"
import Image from "next/image"
import ArticleContainer from "../components/article-container"

interface Article {
  title: string
  date: string
  description: string
  image: string
  link: string
}

const articles: Article[] = [
  {
    title: "How to build a blockchain",
    date: "2020-01-01",
    description: "How to build a blockchain",
    image: "https://images.unsplash.com/photo-1638913662252-70efce1e60a7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  {
    title: "How to build a blockchain",
    date: "2020-01-01",
    description: "How to build a blockchain",
    image: "https://images.unsplash.com/photo-1638913662252-70efce1e60a7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  {
    title: "How to build a blockchain",
    date: "2020-01-01",
    description: "How to build a blockchain",
    image: "https://images.unsplash.com/photo-1638913662252-70efce1e60a7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  {
    title: "How to build a blockchain",
    date: "2020-01-01",
    description: "How to build a blockchain",
    image: "https://images.unsplash.com/photo-1638913662252-70efce1e60a7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  {
    title: "How to build a blockchain",
    date: "2020-01-01",
    description: "How to build a blockchain",
    image: "https://images.unsplash.com/photo-1638913662252-70efce1e60a7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  {
    title: "How to build a blockchain",
    date: "2020-01-01",
    description: "How to build a blockchain",
    image: "https://images.unsplash.com/photo-1638913662252-70efce1e60a7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
]

function BlogPage() {
  return (
    <div className="container p-4">
      <ArticleContainer classOverrides="flex items-center xl:-mt-36">
        <>
          <div className="w-full sm:w-4/5 md:w-2/3 lg:w-1/2">
            <h1 className="text-2xl font-bold leading-tight md:text-4xl lg:text-5xl">My thoughts on Coding & Tech</h1>
            <p className="my-4">Join me on my journey of learning new and exciting trends in Tech including Web3, Frontend, Backend, Mobile and AI </p>
            <div className="relative">
              <input type="email" placeholder="Enter Your Email to Subscribe" className="w-full input input-lg" />
              <button className="absolute mt-2 text-2xl md:text-sm right-2 btn btn-primary"><span className="md:hidden">&#8674;</span><span className="hidden md:block">Subscribe</span></button>
            </div>
          </div>
          <div className="hidden md:w-1/3 lg:w-1/2 md:block">
            <Image width={600} height={600} src="/img/3d/blog.png" className="border" />
          </div>
        </>
      </ArticleContainer>
      <ArticleContainer classOverrides="flex w-full gap-x-6 my-8 lg:my-2">
        <a className={`text-2xl md:text-4xl no-underline ${`opacity-100 border-b border-offBlack dark:border-offWhite border-text border-b-2`}`}>Blog Posts</a>
        <a className={`text-2xl md:text-4xl no-underline ${`opacity-50`}`}>Videos</a>
      </ArticleContainer>
      <ArticleContainer classOverrides="grid py-4 gap-8 grid-cols-max grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {articles.map(article => (
          <Article article={article} />
        ))}
      </ArticleContainer>
    </div>
  )
}

function Article({ article }: { article: Article }): JSX.Element {
  return (
    <div className="w-full hover:skew-y-1 transition-all hover:text-primary shadow-sm hover:shadow-lg card bg-base-100">
      <figure><img src={article.image} className="w-full" alt="Shoes" /></figure>
      <div className="card-body">
        <h2 className="card-title">
          {article.title}
        </h2>
        <p>{humanReadableDate(article.date)}</p>
        <div className="justify-end card-actions">
          <div className="badge badge-outline">Fashion</div>
          <div className="badge badge-outline">Products</div>
        </div>
      </div>
    </div>
  )
}

export function humanReadableDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

export default function Blog() {
  return (
    <BackgroundAnimation scene="Generic" fit={Fit.FitWidth} alignment={Alignment.TopCenter} absolute={false}>
      <BlogPage />
    </BackgroundAnimation>
  )
}
