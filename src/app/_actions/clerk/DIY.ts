'use server'

import {
  configGetWithAuthFetch,
  configPostWithAuthFetch,
} from '@/config/api/axios-config'
import { ProductList } from '@/types'
import { TeacherPreview } from '@/types/teacher'

export async function getDIYTeachersAction(input: any) {
  const [column, order] =
    (input.sort?.split('.') as [
      keyof ProductList | undefined,
      'asc' | 'desc' | undefined,
    ]) ?? []
  const ordering =
    order === 'desc' ? `-${column}` : order === 'asc' ? column : '-created_at'
  console.log(
    `/website/admin/clerk/teachers/?ordering=${ordering}&p=${
      input.offset + 1
    }&page_size=${input.limit}&search=${input.title}`
  )

  try {
    const res = await configGetWithAuthFetch({
      endpoint: `/website/admin/clerk/teachers/?ordering=${ordering}&p=${
        input.offset + 1
      }&page_size=${input.limit}&search=${input.title}`,
      cache: 'no-cache',
      tags: ['getTeachersAction'],
    })
    console.log(res)

    return res.body
  } catch (error: any) {
    console.log(error)
    return error.response.data.message
  }
}

export async function getTeacherPreview(id: string) {
  const customHeaders: HeadersInit = {
    'teacher-uuid': id,
  }
  const res = await configGetWithAuthFetch({
    endpoint: `/website/admin/teacher/${''}/`,
    headers: customHeaders,
  })
  console.log(res)
  return res.body as TeacherPreview
}
