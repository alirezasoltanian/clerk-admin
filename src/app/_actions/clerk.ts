'use server'

import {
  axiosInstance,
  configGetWithAuthFetch,
  configPostWithAuthFetch,
} from '@/config/api/axios-config'
import { clerckForm, ClerkForm } from '@/types'
import { cookies } from 'next/headers'
import { z } from 'zod'

const clerkFormAction = async (data: {
  name: string
  birthday: string
  description: string
  resume: string
  email: string
}) => {
  try {
    const res = configPostWithAuthFetch({
      endpoint: `/website/admin/clerk/`,
      cache: 'no-cache',
      variables: data,
    })
    console.log('clerk check', res)
    return res
  } catch (e: any) {
    console.log(e)
    return null
  }
}

const onSubmitClerkResetImage = async (image: string) => {
  try {
    const res = await configPostWithAuthFetch({
      endpoint: `/website/user/change-profile/`,
      variables: { image: image },
    })
    console.log('PROFILE', res)
    return res.body
  } catch (error: any) {
    console.log(error)
    return error.response.data.message
  }
}

const deleteClerkProfileImage = async () => {
  const cookieStore = cookies()
  const authorization = cookieStore.get('authorization')?.value
  var BearerAuth = authorization ? `Bearer ${authorization}` : null
  try {
    const res = await axiosInstance.delete('/website/user/change-profile/', {
      headers: { Authorization: BearerAuth },
    })
  } catch (e: any) {
    console.log(e)
  }
}

const getClerkInformationAction = async () => {
  try {
    const res = await configGetWithAuthFetch<ClerkForm>({
      endpoint: `/website/admin/clerk/`,
      cache: 'no-cache',
      tags: ['getClerkAction'],
    })
    return res.body
  } catch (error: any) {
    console.log(error)
    return null
  }
}

export {
  clerkFormAction,
  onSubmitClerkResetImage,
  deleteClerkProfileImage,
  getClerkInformationAction,
}
