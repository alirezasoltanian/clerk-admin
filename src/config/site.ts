// site config
export type SiteConfig = {
  name: string
  description: string
  url: string
  ogImage: string
  links: {
    twitter: string
    github: string
  }
}

export const siteConfig: SiteConfig = {
  name: 'uritect',
  description: 'uritect project description',
  url: 'https://uritect-frontend-project.vercel.app/',
  ogImage: '/images/opengraph-image.jpg',
  links: {
    twitter: 'https://twitter.com/',
    github: 'https://github.com/Uritect',
  },
}

const links = {
  twitter: '',
  github: 'https://github.com/Uritect',
  githubAccount: 'https://github.com/Uritect',
  discord: '',
  calDotCom: '',
}
