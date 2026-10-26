// The top 3 projects. IremboAI and GeniYanga are snapshots from chienda.com
// (src/data/projects.ts in liwoo/personal-site-24) and link to their case studies there;
// Eh Khristu has no case study yet, so it links to the live product.

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
  caseStudy?: string
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
    id: "eh-khristu",
    title: "Eh Khristu",
    description: "A church giving platform across Africa: members give with mobile money, cards or bank apps, and churches see every gift by fund in real time, with reports and year-end statements. Live in Malawi, Ghana, Kenya, Uganda, Tanzania, Rwanda, Zambia, Zimbabwe and Côte d’Ivoire.",
    tags: ["Next.js","PocketBase","Go","Astro","Cloudflare"],
    previewLink: "https://ehkhristu.org",
    image: "https://pub-aae4f72dd7e642ba8de3e090625bee40.r2.dev/eh-khristu-main.jpg",
    imageAlt: "Eh Khristu church giving dashboard",
    metadata: {
      role: "Founder & Engineer",
      duration: "2026 - Present",
      client: "Eh Khristu",
    },
  },
]
