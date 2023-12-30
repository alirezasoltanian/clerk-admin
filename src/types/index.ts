import { Icons } from '@/components/icons'
import { z } from 'zod'

export interface UserInformation {
  name: string
  accessToken: string | unknown
  image: string
  email: string
  username: string
}

export const signUpSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  email: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  password: z.string().min(3, {
    message: 'password must be at least 3 characters.',
  }),
})
export type SignUpType = z.infer<typeof signUpSchema>
export interface DataTableSearchableColumn<TData> {
  id: keyof TData
  title: string
}

export interface DataTableFilterableColumn<TData>
  extends DataTableSearchableColumn<TData> {
  options: Option[]
}
export interface Option {
  label: string
  value: string
  icon?: React.ComponentType<{ className?: string }>
}
export type Product = {
  uuid: string
  title: string
  rate: number
  oneCategory: string
  created_at: Date
}
export interface ProductList extends Product {
  provider: string
  isWishlist: boolean
  courseType: string
  rate: number
  price: number | null
  discount: number | null
  discounted_price: number | null
  isWishedList: boolean
  image: string
  teachers: string
  institution: string
}
export const clerckForm = z.object({
  name: z.string().min(3, {
    message: 'Provide a legal name',
  }),
  description: z.string().min(15, {
    message: 'Provide more description about yourself',
  }),
  birthday: z
    .string()
    .refine((date) => !isNaN(Date.parse(date)), {
      message: 'Invalid date format',
    })
    .refine((date) => new Date(date) >= new Date(), {
      message: 'Birthday must be in the past',
    }),
})

export type ClerkFormValidation = z.infer<typeof clerckForm>
export type ClerkForm = {
  name: string
  description: string
  birthday: string
  image: string
}
export type ClerkCheck = z.infer<typeof signUpSchema>
export type SidebarNavItem = NavItemWithChildren
export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[]
}
export interface Clerk {
  uuid: string
  name: string
  image: string
}
export interface NavItem {
  title: string
  href?: string
  disabled?: boolean
  external?: boolean
  icon?: keyof typeof Icons
  label?: string
  description?: string
}
