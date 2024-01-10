'use server'

import {
  configGetWithAuthFetch,
  configPostWithAuthFetch,
} from '@/config/api/axios-config'
import { ProductList } from '@/types'
import { Diy, FormTeacher, TeacherPreview } from '@/types/teacher'

export async function getTeachersAction(input: any) {
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

export async function clerkTeacherAction(action: string, uuid: string) {
  const endpoint = `/website/admin/teacher/${action}/`
  const customHeaders: HeadersInit = {
    'teacher-uuid': uuid,
  }
  const res = await configPostWithAuthFetch({
    endpoint: endpoint,
    headers: customHeaders,
  })

  console.log('teacher action', res)
  return res
}
export async function acceptTeacherAction(id: string) {
  const customHeaders: HeadersInit = {
    'teacher-uuid': id,
  }
  const res = await configPostWithAuthFetch({
    endpoint: `/website/admin/teacher/accept/`,
    headers: customHeaders,
  })

  return res
}

export async function rejectTeacherAction(id: string) {
  const customHeaders: HeadersInit = {
    'teacher-uuid': id,
  }
  const res = await configPostWithAuthFetch({
    endpoint: `/website/admin/teacher/reject/`,
    headers: customHeaders,
  })
  return res
}

export async function getTeacherAction(id: string) {
  console.log(id)

  const customHeaders: HeadersInit = {
    'teacher-uuid': id,
  }
  try {
    const res = await configGetWithAuthFetch<FormTeacher>({
      endpoint: `/website/archschool/teacher/info/`,
      cache: 'no-cache',
      tags: ['getStoreAction'],
      headers: customHeaders,
    })
    console.log(res.body)
    return res.body
  } catch (error: any) {
    console.log(error)
    return null
  }
}

export async function getDIYTeachersAction(input: any) {
  const [column, order] =
    (input.sort?.split('.') as [
      keyof ProductList | undefined,
      'asc' | 'desc' | undefined,
    ]) ?? []
  const ordering =
    order === 'desc' ? `-${column}` : order === 'asc' ? column : '-created_at'
  console.log(
    `/website/admin/archschool/teacher/diys/?ordering=${ordering}&p=${
      input.offset + 1
    }&page_size=${input.limit}&search=${input.title}`
  )

  try {
    const res = await configGetWithAuthFetch({
      endpoint: `/website/admin/archschool/teacher/diys/?ordering=${ordering}&p=${
        input.offset + 1
      }&page_size=${input.limit}&search=${input.title}`,
      cache: 'no-cache',
      tags: ['getTeachersDiyAction'],
      headers: { 'teacher-uuid': input.id },
    })
    console.log((res.body as any).results)

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
    endpoint: `/website/archschool/teacher/short/`,
    headers: customHeaders,
  })
  console.log(res)
  return res.body as TeacherPreview
}

export async function getDIY(id: string) {
  const customHeaders: HeadersInit = {
    'diy-uuid': id,
  }
  const res = await configGetWithAuthFetch<Diy>({
    endpoint: `/website/admin/clerk/archschool/diy/`,
    headers: customHeaders,
  })

  return res.body
}

export async function clerkDIYAction(action: string, uuid: string) {
  const endpoint = `/website/admin/archschool/diy/${action}/`
  const customHeaders: HeadersInit = {
    'diy-uuid': uuid,
  }
  const res = await configPostWithAuthFetch({
    endpoint: endpoint,
    headers: customHeaders,
  })

  console.log('diy action', res)
  return res
}
