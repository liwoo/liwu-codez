// Posts are written in the Astro site (github.com/liwoo/personal-site-24) and published at chienda.com.
// This site lists them and links back there, so the canonical copy lives in one place.
export const BLOG_REPO = "liwoo/personal-site-24"
export const BLOG_BRANCH = "main"
export const BLOG_POSTS_DIR = "src/content/post"
export const BLOG_SITE = "https://chienda.com"

export interface Post {
  slug: string
  url: string
  title: string
  excerpt: string | null
  image: string | null
  category: string | null
  tags: string[]
  publishDate: string | null // ISO string; Date objects can't cross getStaticProps
}
