// Shared by the classic About page and the interactive studio (/about/studio)

export type Label = "personal" | "professional" | "education" | "other"

export interface Activity {
  id: string
  title: string
  description: string
  image?: string
  label: Label
  startDate: Date
  endDate: Date
  location: string
  showRange: boolean
}

export type Milestone = Activity | number

export interface DescriptiveWord {
  word: string
  description: string
  emoji: string
}

export interface Service {
  id: string
  icon: string
  title: string
  description: string
}

export const services: Service[] = [
  {
    id: "ai",
    icon: "icons/api.svg",
    title: "AI Agents & RAG Systems",
    description: "I build production agent systems and RAG pipelines that go past the demo stage, with evals to prove it.",
  },
  {
    id: "web",
    icon: "icons/web-dev.svg",
    title: "Websites and WebApp Development",
    description: "I build world class websites and web applications using industry standard technologies.",
  },
  {
    id: "mobile",
    icon: "icons/smartphone.svg",
    title: "Mobile App Development",
    description: "I specialize in Cross-Platform Mobile App Development using Flutter.",
  },
  {
    id: "api",
    icon: "icons/api.svg",
    title: "API Design and Development",
    description: "RESTful API's, ProtoBufs and GraphQL are my specialty.",
  },
  {
    id: "speak",
    icon: "icons/hoodie.svg",
    title: "Speaking & Technical Writing",
    description: "I will speak at your event, or write technical articles for your publications.",
  },
  {
    id: "ui",
    icon: "icons/responsive.svg",
    title: "UX/UI Design",
    description: "Sometimes I will whip up Figma or Sketch to build High Fidelity prototypes.",
  },
]

export const words: DescriptiveWord[] = [
  {
    word: "Opinionated 🙈",
    description: "They say I'm VERY Opinionated: I'm not afraid of standing up for my point of view, even if goes agains the status quo",
    emoji: "💬",
  },
  {
    word: "Wise",
    description: "\"He is a careful thinker who thinks things through and never makes rash decisions. He values rationality, intellectual strength and independence.\"",
    emoji: "🤔",
  },
  {
    word: "Down to Earth",
    description: "My brother told me that I was down to earth, which means that no matter who I’m talking to, I try to connect with him or her. It’s a great compliment.",
    emoji: "🌍",
  },
  {
    word: "Creative",
    description: "\"As a leader, he fosters creativity and innovation. Combining these qualities with a passion for detail, Liwu is a powerhouse of innovation.\"",
    emoji: "🪄",
  },
]

// Career entries mirror src/data/work-experience.ts on chienda.com (liwoo/personal-site-24)
export const milestones: Milestone[] = [
  1990,
  {
    id: "1",
    title: "👶  Born",
    description: "Born in a small picturesque village in the south of Malawi called Thyolo",
    label: "personal",
    startDate: new Date(1990, 4, 9),
    endDate: new Date(1990, 4, 9),
    location: "Thyolo, Malawi",
    showRange: false,
  },
  2006,
  {
    id: "2",
    title: "I'm on TV",
    description: "I made my first appearance as a Sports Anchor on TV to cover the 2006 World Cup",
    label: "personal",
    startDate: new Date(2006, 5, 1),
    endDate: new Date(2006, 5, 1),
    location: "Blantyre, Malawi",
    showRange: false,
  },
  {
    id: "3",
    title: "I am Jason Bourne... Again",
    description: "Began an life-long adventurous journey as Born Again Christian: For me to Live is Christ and to die is Gain",
    label: "personal",
    startDate: new Date(2006, 11, 31),
    endDate: new Date(2006, 11, 31),
    location: "Blantyre, Malawi",
    showRange: false,
  },
  2007,
  {
    id: "4",
    title: "First Computer Program",
    description: "I wrote my first piece of code in Turbo C++ thanks to a friend of my mum's and immediately found my calling!",
    label: "personal",
    startDate: new Date(2007, 1, 1),
    endDate: new Date(2007, 1, 1),
    location: "Blantyre, Malawi",
    showRange: false,
  },
  2011,
  {
    id: "5",
    title: "Mama we made it 🥳",
    description: "Graduated from the University of Malawi, The Polytechnic (now MUBAS)",
    image: "/img/schools/mubas.png",
    label: "education",
    startDate: new Date("2007-07-01"),
    endDate: new Date("2012-07-01"),
    location: "Blantyre, Malawi",
    showRange: true,
  },
  2013,
  {
    id: "6",
    title: "Hello, Core Banking",
    description: "Joined NBS Bank as a Systems Developer, building internal tools and reporting dashboards on top of the core banking system",
    label: "professional",
    startDate: new Date("2013-06-01"),
    endDate: new Date("2014-08-01"),
    location: "Blantyre, Malawi",
    showRange: true,
  },
  2014,
  {
    id: "7",
    title: "Let's Disrupt Tourism",
    description: "Founded my first startup, tiyeni.app, to disrupt tourism in Malawi. But that's a story for another day",
    label: "other",
    startDate: new Date("2016-04-01"),
    endDate: new Date("2016-04-01"),
    location: "Kyoto, Japan",
    showRange: false,
  },
  {
    id: "8",
    title: "🎓🎓  Graduated, Again!",
    description: "Completed my Masters in Computer Science from Doshisha University, Japan",
    image: "/img/schools/doshisha.gif",
    label: "education",
    startDate: new Date("2014-07-01"),
    endDate: new Date("2017-05-01"),
    location: "Kyoto, Japan",
    showRange: true,
  },
  2017,
  {
    id: "9",
    title: "Wedding Bells 💒",
    description: "Married my College sweet❤️, and begun our new life in Lilongwe",
    label: "personal",
    startDate: new Date("2017-09-02"),
    endDate: new Date("2017-09-02"),
    location: "Blantyre, Malawi",
    showRange: false,
  },
  {
    id: "10",
    title: "Software Architect",
    description: "Architected health information systems for Malawi's Ministry of Health at Baobab Health Trust, including the national Master Health Facility Register",
    label: "professional",
    startDate: new Date("2017-08-01"),
    endDate: new Date("2019-08-01"),
    location: "Lilongwe, Malawi",
    showRange: true,
  },
  2019,
  {
    id: "11",
    title: "Making (r)Apps",
    description: "Released my acclaimed solo Album, getalinafe.com...",
    label: "personal",
    startDate: new Date("2019-09-02"),
    endDate: new Date("2019-09-02"),
    location: "Blantyre, Malawi",
    showRange: false,
  },
  {
    id: "12",
    title: "1M+ Farmers",
    description: "Led the engineering team at One Acre Fund, building mobile and web apps serving over a million smallholder farmers across East Africa",
    label: "professional",
    startDate: new Date("2019-10-01"),
    endDate: new Date("2022-11-01"),
    location: "Kigali, Rwanda",
    showRange: true,
  },
  2022,
  {
    id: "13",
    title: "Hej Denmark",
    description: "Built full-stack internal tooling and supply chain systems at Bestseller, one of Europe's largest fashion companies",
    label: "professional",
    startDate: new Date("2022-12-01"),
    endDate: new Date("2023-07-01"),
    location: "Aarhus, Denmark",
    showRange: true,
  },
  2023,
  {
    id: "14",
    title: "AI for 12 Million Citizens",
    description: "Led AI and mobile engineering at Irembo, shipping a national AI assistant, RAG pipelines and agent systems for Rwanda's e-government platform",
    label: "professional",
    startDate: new Date("2023-08-01"),
    endDate: new Date("2025-08-01"),
    location: "Kigali, Rwanda",
    showRange: true,
  },
  2025,
  {
    id: "15",
    title: "Responsible AI",
    description: "Joined the ICO, the UK's data regulator, as an AI Engineer building responsible data and AI solutions",
    label: "professional",
    startDate: new Date("2025-09-01"),
    endDate: new Date("2025-09-01"),
    location: "Manchester, UK",
    showRange: false,
  },
]

export const activities: Activity[] = milestones.filter((m): m is Activity => typeof m !== "number")

export function monthYear(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  })
}
