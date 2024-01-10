export interface Hiring {
  uuid: string
  full_name: string
  profession: string
  city: string
  country: string
  phone: string
  email: string
  tags: string[]
  about: string
  banner_url: string
  image_url: string
  accessibility: string
  is_accepted_policies: boolean
  category_uuid: string
  birth_date: string
  resume_url: string
  status: string
}

interface hiringTable {
  uuid: string
  full_name: string
  profession: string
  city: string
  country: string
  email: string
  resume: string
}
