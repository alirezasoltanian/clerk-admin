'use server'

import {
  axiosInstance,
  configGetWithAuthFetch,
  configPostWithAuthFetch,
} from '@/config/api/axios-config'
import { ProductList } from '@/types'
import { ProductAddData, Store } from '@/types/seller'
import { cookies } from 'next/headers'

export async function getStoresAction(input: any) {
  const [column, order] =
    (input.sort?.split('.') as [
      keyof ProductList | undefined,
      'asc' | 'desc' | undefined,
    ]) ?? []
  const ordering =
    order === 'desc' ? `-${column}` : order === 'asc' ? column : '-created_at'
  console.log(
    `/website/admin/clerk/stores/?ordering=${ordering}&page_size=${
      input.limit
    }&p=${input.offset + 1}`
  )

  try {
    const res = await configGetWithAuthFetch({
      endpoint: `/website/admin/clerk/stores/?ordering=${ordering}&page_size=${
        input.limit
      }&p=${input.offset + 1}`,
      cache: 'no-cache',
      tags: ['getStores'],
    })
    console.log(res)
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
  const categories =
    input?.categories && !!input?.categories.length
      ? input?.categories?.join('-')
      : undefined

  try {
    const res = await configGetWithAuthFetch({
      endpoint: `/website/shop/store/filter/?ordering=${ordering}&start_date=${
        input.from
      }&categories=${categories}&p=${input.offset + 1}&page_size=${
        input.limit
      }&search=${input.title}`,
      headers: customHeaders,
      cache: 'no-cache',
      tags: ['getProductsStoreAction'],
    })

    return res.body
  } catch (error: any) {
    console.log(error)
    return error.response.data.message
  }
}

export async function getStoreAction(storeId: string) {
  try {
    const customHeaders: HeadersInit = {
      'store-uuid': storeId,
    }
    const res = await configGetWithAuthFetch<Store>({
      endpoint: `/website/admin/clerk/store/`,
      headers: customHeaders,
    })

    return res.body
  } catch (error: any) {
    console.log(error)
    return error.response.data.message
  }
}

export async function acceptStoreAction(id: string) {
  const customHeaders: HeadersInit = {
    'store-uuid': id,
  }
  const res = await configPostWithAuthFetch({
    endpoint: `/website/admin/store/accept/`,
    headers: customHeaders,
  })
  console.log(res)
  return res
}

export async function rejectStoreAction(id: string) {
  const customHeaders: HeadersInit = {
    'store-uuid': id,
  }
  const res = await configPostWithAuthFetch({
    endpoint: `/website/admin/store/reject/`,
    headers: customHeaders,
  })
  console.log(res)
  return res
}

export async function getCategoryShop() {
  const res = await axiosInstance.get('/website/shop/categories/all/')
  return res.data
}

export async function getProductAction(productId: string) {
  const cookieStore = cookies()
  console.log(productId)
  const authorization = cookieStore.get('authorization')?.value

  var BearerAuth = authorization ? `Bearer ${authorization}` : null
  const customHeaders: HeadersInit = {
    'product-uuid': productId,
  }
  if (BearerAuth) {
    customHeaders['authorization'] = BearerAuth
  }
  try {
    const res = await configGetWithAuthFetch<ProductAddData>({
      endpoint: '/website/admin/shop/product/',
      headers: customHeaders,
      cache: 'no-cache',
      tags: ['getEditProduct'],
    })
    console.log(res.body)
    return res.body
  } catch (error: any) {
    console.log(error)
    return error.response.data.message
  }
}

export async function getSellersAction(input: any) {
  const [column, order] =
    (input.sort?.split('.') as [
      keyof ProductList | undefined,
      'asc' | 'desc' | undefined,
    ]) ?? []
  const ordering =
    order === 'desc' ? `-${column}` : order === 'asc' ? column : '-created_at'
  console.log(
    `/website/admin/clerk/sellers/?ordering=${ordering}&p=${
      input.offset + 1
    }&page_size=${input.limit}&search=${input.title}`
  )

  try {
    const res = await configGetWithAuthFetch({
      endpoint: `/website/admin/clerk/sellers/?ordering=${ordering}&p=${
        input.offset + 1
      }&page_size=${input.limit}&search=${input.title}`,
      cache: 'no-cache',
      tags: ['getSellersAction'],
    })
    console.log(res)

    return res.body
  } catch (error: any) {
    console.log(error)
    return error.response.data.message
  }
}

export async function acceptSellerAction(id: string) {
  const customHeaders: HeadersInit = {
    'seller-uuid': id,
  }
  const res = await configPostWithAuthFetch({
    endpoint: `/website/admin/seller/accept/`,
    headers: customHeaders,
  })
  console.log(res)
  return res
}

export async function rejectSellerAction(id: string) {
  const customHeaders: HeadersInit = {
    'seller-uuid': id,
  }
  const res = await configPostWithAuthFetch({
    endpoint: `/website/admin/seller/reject/`,
    headers: customHeaders,
  })
  console.log(res)
  return res
}
