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
  accessibility: string
  is_accepted_policies: boolean
  category_uuid: string
  birth_date: string
  resume: string
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
