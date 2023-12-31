import {
  axiosInstance,
  configPostWithAuthFetch,
} from '@/config/api/axios-config'
import { ClerkForm } from '@/types'
import { cookies } from 'next/headers'

const clerkFormAction = async (data: ClerkForm) => {
  const res = configPostWithAuthFetch({
    endpoint: `/website/admin/clerk/`,
    cache: 'no-cache',
    variables: data,
  })
  console.log('clerk check', res)
  return res
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

export { clerkFormAction, onSubmitClerkResetImage, deleteClerkProfileImage }
