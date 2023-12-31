'use server'

// import { SignInType, UserInformation } from "@/types";
// import { ResetPasswordType, SignUpType } from "@/types/authType";
import {
  axiosInstance,
  configPostFetch,
  configPostWithAuthFetch,
} from '@/config/api/axios-config'
import { ClerkCheck, SignUpType } from '@/types'
import { GetServerSidePropsContext } from 'next'
import { cookies } from 'next/headers'
import { checkUser } from './action-auth'

export interface ReturnSignin {
  access: string
  access_exp: number
  refresh: string
  refresh_exp: number
}

export const getUser = async () => {
  let isAuthenticated = false
  let accessToken = null
  let user = null
  if (cookies().get('authorization'))
    accessToken = cookies().get('authorization')?.value
  if (cookies().get('refresh')) {
    if (!accessToken && cookies().get('refresh')?.value) {
      // const setCookies = await refreshToken(cookies().get("refresh")?.value);
      accessToken = cookies().get('authorization')?.value
    }
    if (accessToken) {
      user = await checkUser(accessToken)

      if (user) isAuthenticated = true
    } else user = null
  } else {
    user = null
  }

  return {
    isAuthenticated,
    user,
  }
}
export async function signOutAction() {
  const cookieStore = cookies()
  const authorization = cookieStore.get('authorization')?.value
  const refresh = cookieStore.get('refresh')?.value
  var BearerAuth = authorization ? `Bearer ${authorization}` : null
  const res = await axiosInstance.post(
    '/website/user/logout/',
    {},
    { headers: { Authorization: BearerAuth } }
  )
  cookies().delete('refresh')
  cookies().delete('authorization')
  return res.status
  // revalidatePath("/");
}
export const SignInAdmin = async (data: {
  username: string
  password: string
}): Promise<any> => {
  const res = await configPostFetch<ReturnSignin>({
    endpoint: `/website/user/login/`,
    cache: 'no-cache',
    tags: ['loginClerk'],
    variables: data,
  })

  console.log('clerk signin', res.body)
  if (res.status === 202) {
    cookies().set({
      name: 'authorization',
      value: res.body.access,
      maxAge: res.body.access_exp / 1000,
      httpOnly: true,
      secure: true,
    })
    cookies().set({
      name: 'refresh',
      value: res.body.refresh,
      maxAge: res.body.refresh_exp / 1000,
      httpOnly: true,
      secure: true,
    })
  }
  return res.status
}
export const SignInClerk = async (data: {
  username: string
  password: string
}): Promise<any> => {
  const res = await configPostFetch<ReturnSignin>({
    endpoint: `/website/admin/clerk/login/`,
    cache: 'no-cache',
    tags: ['loginClerk'],
    variables: data,
  })

  console.log('clerk signin', res.body)
  if (res.status === 202) {
    cookies().set({
      name: 'authorization',
      value: res.body.access,
      maxAge: res.body.access_exp / 1000,
      httpOnly: true,
      secure: true,
    })
    cookies().set({
      name: 'refresh',
      value: res.body.refresh,
      maxAge: res.body.refresh_exp / 1000,
      httpOnly: true,
      secure: true,
    })
  }
  return res.status
}

export const signUpClerkAction = async (data: SignUpType) => {
  const res = await configPostFetch({
    endpoint: `/website/admin/clerk/register/`,
    cache: 'no-cache',
    variables: data,
  })
  console.log('clerk signup', res)
  return res
}
