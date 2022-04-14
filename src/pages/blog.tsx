import { Alignment, Fit } from "rive-react"
import BackgroundAnimation from "../components/background-animation"

function BlogPage() {
  return (
    <div className="container">
      <h1>Welcome to my Blog</h1>
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
