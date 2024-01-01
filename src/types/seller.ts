interface Store {
  uuid: string
  title: string
  description: string
  created_at: string
  owner: string
  image_owner: string
  email_owner: string
}

interface store {
  uuid: string
  title: string
  created_at: string
  owner: string
  image_owner: string
  email_owner: string
}

interface product {
  uuid: string
  title: string
  created_at: string
}
