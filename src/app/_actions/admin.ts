'use server'

import {
  configGetWithAuthFetch,
  configPostWithAuthFetch,
} from '@/config/api/axios-config'
import { ProductList } from '@/types'

export async function getClerkAction(input: any) {
  const [column, order] =
    (input.sort?.split('.') as [
      keyof ProductList | undefined,
      'asc' | 'desc' | undefined,
    ]) ?? []
  const ordering =
    order === 'desc' ? `-${column}` : order === 'asc' ? column : '-created_at'
  console.log(
    `/website/admin/clerks/?ordering=${ordering}&page_size=${input.limit}&p=${input.offset}`
  )

  try {
    const res = await configGetWithAuthFetch({
      endpoint: `/website/admin/clerks/?ordering=${ordering}&page_size=${
        input.limit
      }&p=${input.offset + 1}`,
      cache: 'no-cache',
      tags: ['getPostsDashboard'],
    })
    return res.body
  } catch (error: any) {
    console.log(error)
    return error.response.data.message
  }
}

export async function acceptClerkAction(id: string) {
  const customHeaders: HeadersInit = {
    'clerk-uuid': id,
  }
  const res = await configPostWithAuthFetch({
    endpoint: `/website/admin/clerk/accept/`,
    headers: customHeaders,
  })
  console.log(res)
  return res
}

export async function rejectClerkAction(id: string) {
  const customHeaders: HeadersInit = {
    'clerk-uuid': id,
  }
  const res = await configPostWithAuthFetch({
    endpoint: `/website/admin/clerk/reject/`,
    headers: customHeaders,
  })
  console.log(res)
  return res
}
