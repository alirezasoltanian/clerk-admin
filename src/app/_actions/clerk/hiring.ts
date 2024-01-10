import {
  configGetWithAuthFetch,
  configPostWithAuthFetch,
} from '@/config/api/axios-config'
import { ProductList } from '@/types'
import { Hiring } from '@/types/hiring'

export async function getHiringUsersAction(input: any) {
  const [column, order] =
    (input.sort?.split('.') as [
      keyof ProductList | undefined,
      'asc' | 'desc' | undefined,
    ]) ?? []
  const ordering =
    order === 'desc' ? `-${column}` : order === 'asc' ? column : '-created_at'
  console.log(
    `/website/admin/clerk/hiring/users/?ordering=${ordering}&p=${
      input.offset + 1
    }&page_size=${input.limit}&search=${input.title}`
  )

  try {
    const res = await configGetWithAuthFetch({
      endpoint: `/website/admin/clerk/hiring/users/?ordering=${ordering}&p=${
        input.offset + 1
      }&page_size=${input.limit}&search=${input.title}`,
      cache: 'no-cache',
      tags: ['getHiringUsersAction'],
    })
    console.log(res)

    return res.body
  } catch (error: any) {
    console.log(error)
    return error.response.data.message
  }
}

export async function acceptHiringAction(id: string) {
  const customHeaders: HeadersInit = {
    'hiring-uuid': id,
  }
  const res = await configPostWithAuthFetch({
    endpoint: `/website/admin/hiring/user/accept/`,
    headers: customHeaders,
  })
  console.log(res)

  return res
}

export async function rejectHiringAction(id: string) {
  const customHeaders: HeadersInit = {
    'hiring-uuid': id,
  }
  const res = await configPostWithAuthFetch({
    endpoint: `/website/admin/hiring/user/reject/`,
    headers: customHeaders,
  })
  return res
}

export async function getHiringAction(id: string) {
  const customHeaders: HeadersInit = {
    'hiring-uuid': id,
  }
  try {
    const res = await configGetWithAuthFetch<Hiring>({
      endpoint: `/website/admin/clerk/hiring/user/`,
      cache: 'no-cache',
      tags: ['getStoreAction'],
      headers: customHeaders,
    })

    return res.body
  } catch (error: any) {
    console.log(error)
    return null
  }
}
