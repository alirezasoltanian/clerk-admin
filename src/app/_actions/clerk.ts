import { configPostWithAuthFetch } from '@/config/api/axios-config'
import { ClerkForm } from '@/types'

const clerkFormAction = async (data: ClerkForm) => {
  const res = configPostWithAuthFetch({
    endpoint: `/website/admin/clerk/`,
    cache: 'no-cache',
    variables: data,
  })
  console.log('clerk check', res)
  return res
}

export { clerkFormAction }
