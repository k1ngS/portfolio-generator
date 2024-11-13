export interface PortfolioData {
  name: string
  role: string
  about: string
  skills: string[]
  projects: {
    title: string
    description: string
    techStack: string[]
    link?: string
    github?: string
  }[]
  contact: {
    email: string
    linkedin?: string
    github?: string
  }
}
