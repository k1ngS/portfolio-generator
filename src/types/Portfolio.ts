export interface PortfolioData {
  name: string
  role: string
  about: string
  avatar?: string | File;
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
