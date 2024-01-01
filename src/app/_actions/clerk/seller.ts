'use server'

import {
  axiosInstance,
  configGetWithAuthFetch,
  configPostWithAuthFetch,
} from '@/config/api/axios-config'
import { ProductList } from '@/types'

export async function getStoresAction(input: any) {
  const [column, order] =
    (input.sort?.split('.') as [
      keyof ProductList | undefined,
      'asc' | 'desc' | undefined,
    ]) ?? []
  const ordering =
    order === 'desc' ? `-${column}` : order === 'asc' ? column : '-created_at'
  console.log(
    `/admin/clerk/stores/?ordering=${ordering}&page_size=${input.limit}&p=${
      input.offset + 1
    }`
  )

  try {
    const res = await configGetWithAuthFetch({
      endpoint: `/admin/clerk/stores/?ordering=${ordering}&page_size=${
        input.limit
      }&p=${input.offset + 1}`,
      cache: 'no-cache',
      tags: ['getStores'],
    })
    return res.body
  } catch (error: any) {
    console.log(error)
    return error.response.data.message
  }
}

export async function getProductsAction(input: any) {
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
  const customHeaders: HeadersInit = {
    'store-uuid': input.storeId,
  }

  try {
    const res = await configGetWithAuthFetch({
      endpoint: `/website/admin/clerks/?ordering=${ordering}&page_size=${
        input.limit
      }&p=${input.offset + 1}`,
      cache: 'no-cache',
      tags: ['getStores'],
      headers: customHeaders,
    })

    return res.body
  } catch (error: any) {
    console.log(error)
    return error.response.data.message
  }
}

export async function getStoreAction(storeId: string) {
  console.log(storeId)

  try {
    const customHeaders: HeadersInit = {
      'store-uuid': storeId,
    }
    const res = await configGetWithAuthFetch<Store>({
      endpoint: `/admin/clerk/store/`,
      headers: customHeaders,
    })
    console.log(res.body)

    console.log(res)
    return res.body
  } catch (error: any) {
    console.log(error)
    return error.response.data.message
  }
}

export async function getCategoryShop() {
  const res = await axiosInstance.get('/website/shop/categories/all/')
  return res.data
}
