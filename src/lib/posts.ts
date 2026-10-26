// Server-only: import this from getStaticProps only, so gray-matter stays out of the client bundle
import matter from "gray-matter"
import { BLOG_BRANCH, BLOG_POSTS_DIR, BLOG_REPO, BLOG_SITE, Post } from "./blog-config"
import { fetchWithRetry } from "./fetch-with-retry"

interface GitHubContentItem {
  name: string
  type: "file" | "dir"
  download_url: string | null
}

// Optional: set GITHUB_TOKEN to lift the 60 requests/hour limit for unauthenticated calls
function githubHeaders(): HeadersInit {
  const headers: HeadersInit = { Accept: "application/vnd.github+json" }
  if (process.env.GITHUB_TOKEN) headers["Authorization"] = `Bearer ${process.env.GITHUB_TOKEN}`
  return headers
}

function toIso(value: unknown): string | null {
  if (!value) return null
  const date = new Date(value as string)
  return isNaN(date.getTime()) ? null : date.toISOString()
}

// Mirrors the Astro site's rules (src/utils/blog.ts there): skip drafts, newest first,
// and the permalink is /<file name without extension>
export async function fetchPosts(): Promise<Post[]> {
  const listUrl = `https://api.github.com/repos/${BLOG_REPO}/contents/${BLOG_POSTS_DIR}?ref=${BLOG_BRANCH}`
  const listResponse = await fetchWithRetry(listUrl, { headers: githubHeaders() })
  if (!listResponse.ok) throw new Error(`Listing posts failed: ${listResponse.status} ${listResponse.statusText}`)
  const items: GitHubContentItem[] = await listResponse.json()

  const files = items.filter(item => item.type === "file" && /\.mdx?$/.test(item.name) && item.download_url)

  const posts = await Promise.all(files.map(async (file): Promise<Post | null> => {
    // raw.githubusercontent.com isn't counted against the API rate limit
    const response = await fetchWithRetry(file.download_url)
    if (!response.ok) throw new Error(`Fetching ${file.name} failed: ${response.status}`)
    const { data } = matter(await response.text())
    if (data.draft === true || !data.title) return null

    const slug = file.name.replace(/\.mdx?$/, "").toLowerCase()
    return {
      slug,
      url: `${BLOG_SITE}/${slug}`,
      title: String(data.title),
      excerpt: data.excerpt ? String(data.excerpt) : null,
      image: data.image ? String(data.image) : null,
      category: data.category ? String(data.category) : null,
      tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
      publishDate: toIso(data.publishDate),
    }
  }))

  return posts
    .filter((post): post is Post => post !== null)
    // Undated posts get "now" on the Astro side, so they sort first there too
    .sort((a, b) => (b.publishDate ?? "9999").localeCompare(a.publishDate ?? "9999"))
}
