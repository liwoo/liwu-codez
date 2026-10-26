// Server-only: reads the public YouTube RSS feed for @liwucodes (no API key, latest 15 uploads)
import { fetchWithRetry } from "./fetch-with-retry"
import { Video, YOUTUBE_CHANNEL_ID } from "./video-config"

const FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${YOUTUBE_CHANNEL_ID}`

function decode(text: string): string {
  return text
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
}

function tag(entry: string, name: string): string | null {
  const match = entry.match(new RegExp(`<${name}>([\\s\\S]*?)</${name}>`))
  return match ? decode(match[1].trim()) : null
}

function attr(entry: string, name: string, attribute: string): string | null {
  const match = entry.match(new RegExp(`<${name}[^>]*\\s${attribute}="([^"]*)"`))
  return match ? decode(match[1]) : null
}

// Hashtags are for YouTube's algorithm, not for reading on a card
function cleanTitle(title: string): string {
  return title.replace(/\s*#[\w-]+/g, "").trim() || title
}

export async function fetchVideos(): Promise<Video[]> {
  const response = await fetchWithRetry(FEED_URL)
  if (!response.ok) throw new Error(`YouTube feed failed: ${response.status}`)
  const xml = await response.text()

  return (xml.match(/<entry>[\s\S]*?<\/entry>/g) ?? []).map(entry => {
    const id = tag(entry, "yt:videoId")
    const url = attr(entry, "link", "href") ?? `https://www.youtube.com/watch?v=${id}`
    const views = attr(entry, "media:statistics", "views")
    return {
      id,
      title: cleanTitle(tag(entry, "title") ?? ""),
      description: tag(entry, "media:description") ?? "",
      url,
      isShort: url.includes("/shorts/"),
      publishDate: tag(entry, "published"),
      thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
      views: views ? Number(views) : null,
    }
  }).filter(video => video.id)
}
