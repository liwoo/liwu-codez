// youtube.com/@liwucodes
export const YOUTUBE_CHANNEL_ID = "UCNEXAX15mO3rsVQQQve6Iog"
export const YOUTUBE_CHANNEL_URL = "https://www.youtube.com/@liwucodes"

export interface Video {
  id: string
  title: string
  description: string
  url: string
  isShort: boolean
  publishDate: string | null
  thumbnail: string
  views: number | null
}
