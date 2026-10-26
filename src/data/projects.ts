// Snapshot of the most relevant projects from chienda.com (src/data/projects.ts in liwoo/personal-site-24).
// Each one links to its full case study there.

export interface ProjectMeta {
  role: string
  duration: string
  client: string
}

export interface Project {
  id: string
  title: string
  description: string
  tags: string[]
  previewLink: string
  sourceCode?: string
  caseStudy: string
  image: string
  imageAlt: string
  metadata: ProjectMeta
}

export const projects: Project[] = [
  {
    id: "irembo-ai",
    title: "IremboAI",
    description: "A trilingual AI assistant that gives citizens instant, source-grounded answers about iremboGov services — in Kinyarwanda, English, or French.",
    tags: ["Python","React","LangChain","LangFuse"],
    previewLink: "https://irembo.gov.rw/home/citizen/all_services?lang=en",
    caseStudy: "https://chienda.com/projects/irembo-ai",
    image: "https://pub-a0f6f56fff3c42b9bb30bd2143c99754.r2.dev/Gemini_Generated_Image_cgaca7cgaca7cgac.png",
    imageAlt: "IremboAI",
    metadata: {
      role: "AI Engineer",
      duration: "Jan 2024 - Aug 2025",
      client: "Irembo",
    },
  },
  {
    id: "signal",
    title: "Signal",
    description: "A narrative coding game that teaches the Go programming language — write real Go to break cryptographer Dr. Maya Chen out of a locked-down facility.",
    tags: ["Next.js","React"],
    previewLink: "https://www.playsignal.xyz/",
    caseStudy: "https://chienda.com/projects/signal",
    image: "https://www.playsignal.xyz/og.jpg",
    imageAlt: "Signal — learn Go by saving Dr. Maya Chen",
    metadata: {
      role: "Creator & Engineer",
      duration: "2025 - Present",
      client: "Signal",
    },
  },
  {
    id: "geniyanga",
    title: "GeniYanga",
    description: "A mobile point-of-sale system built for how Malawian businesses actually trade — inventory, cashiers, customers, payments and online selling in one MRA-compliant platform.",
    tags: ["Next.js","Golang","SQL"],
    previewLink: "https://geniyanga.mw",
    caseStudy: "https://chienda.com/projects/geniyanga",
    image: "https://pub-a0f6f56fff3c42b9bb30bd2143c99754.r2.dev/geni-yanga-hero.jpg",
    imageAlt: "GeniYanga — the mobile till built for Malawi",
    metadata: {
      role: "Founder & Engineer",
      duration: "2024 - Present",
      client: "GeniYanga",
    },
  },
  {
    id: "times-elections-dashboard",
    title: "Presidential Elections Dashboard",
    description: "Real-time election results dashboard covering the 2025 Malawian Presidential and Parliamentary Elections with minute-by-minute updates and comprehensive historical analysis.",
    tags: ["React","Node.js","MapBox","Tailwind","WebSockets"],
    previewLink: "https://www.youtube.com/live/_IQyibJ2UHI?si=lGPJJw3y3Dm67YcI",
    caseStudy: "https://chienda.com/projects/times-elections-dashboard",
    image: "https://minio-api.dartsmw.com/chienda.com/times-tv.jpg",
    imageAlt: "Times Elections Dashboard",
    metadata: {
      role: "Designer & Developer",
      duration: "Nov 2024 - Sep 2025",
      client: "Times Group",
    },
  },
  {
    id: "mtl-smart-app",
    title: "MTL Smart App",
    description: "A comprehensive mobile application for MTL customers to manage their mobile services including airtime top-ups, data bundles, balance checks, and advanced account management features.",
    tags: ["Flutter",".NET","Kubernetes","PostgreSQL"],
    previewLink: "https://www.mtlyanga.mtl.mw/",
    caseStudy: "https://chienda.com/projects/mtl-smart-app",
    image: "https://minio-api.dartsmw.com/chienda.com/mtl.jpg",
    imageAlt: "MTL Smart App",
    metadata: {
      role: "Lead Mobile Engineer",
      duration: "Mar 2023 - Present",
      client: "MTL",
    },
  },
  {
    id: "zipatala",
    title: "Master Health Facility Registry",
    description: "Malawi's implementation of OpenHIEs Facility Registry, as part of the Interoperability Layer; implemented in collaboration with the Ministry of Health.",
    tags: ["React","Node.js","Javascript","FHIR"],
    previewLink: "https://zipatala.health.gov.mw/",
    sourceCode: "https://github.com/BaobabHealthTrust/master-facility-list",
    caseStudy: "https://chienda.com/projects/zipatala",
    image: "https://minio-api.dartsmw.com/chienda.com/zipatala.jpg",
    imageAlt: "Zipatala.com",
    metadata: {
      role: "Software Architect",
      duration: "2018 - 2020",
      client: "Baobab Health Trust",
    },
  },
]
