import { Alignment, Fit } from "rive-react"
import BackgroundAnimation from "../components/background-animation"
import Image from "next/image"

function BlogPage() {
  return (
    <div className="container p-4">
      <div className="flex items-center xl:-mt-36 xl:mx-24 gap-x-16">
        <div className="w-full sm:w-4/5 md:w-1/2">
          <h1 className="text-2xl font-bold leading-tight md:text-4xl lg:text-5xl">My thoughts on Coding & Tech</h1>
          <p className="my-4">Join me on my journey of learning new and exciting trends in Tech including Web3, Frontend, Backend, Mobile and AI </p>
          <div className="relative">
            <input type="email" placeholder="Enter Your Email Address" className="w-full input input-lg" />
            <button className="absolute mt-2 right-2 btn btn-primary">Subscribe</button>
          </div>
        </div>
        <div className="hidden w-1/2 md:block">
          <Image width={600} height={600} src="/img/3d/blog.png" className="border" />
        </div>
      </div>
      <div className="w-full tabs">
        <a className="text-4xl tab-lg tab tab-bordered">Tab 1</a>
        <a className="text-4xl tab tab-bordered tab-active">Tab 2</a>
        <a className="text-4xl tab tab-bordered">Tab 3</a>
      </div>
    </div>
  )
}

export default function Blog() {
  return (
    <BackgroundAnimation scene="Generic" fit={Fit.FitWidth} alignment={Alignment.TopCenter} absolute={false}>
      <BlogPage />
    </BackgroundAnimation>
  )
}
