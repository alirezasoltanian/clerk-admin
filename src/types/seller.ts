export interface Store {
  uuid: string
  title: string
  description: string
  created_at: string
  owner: string
  status: string
  image_owner: string
  email_owner: string
}

interface product {
  uuid: string
  title: string
  created_at: string
}

export interface Seller {
  uuid: string
  name: string
  image: string
  resume: string
  status: string
  created_at: string
}
export interface ReturnSipping {
  title: boolean
  describe: string
}
export interface DetailDescription {
  title: string
  describe: string
}
export type Color = {
  uuid: string
  title: string
  color: string
}
export interface DetailsProduct {
  uuid: string
  color: Color
  size: string
  remainedCount: number
  isAddedToUserBasket: boolean
  addedCount: number
  price: string
  discount: number
  discounted_price: string
  images: string[]
}
export type ProductAddData = {
  uuid: string
  title: string
  description: string
  storeId: string
  fastShipping: boolean
  returnShipping: ReturnSipping
  detailDescription: DetailDescription[]
  detailsProduct: DetailsProduct[]
  tags: string[]
  last_modified: string
  subcategory: string
  category: string
}
