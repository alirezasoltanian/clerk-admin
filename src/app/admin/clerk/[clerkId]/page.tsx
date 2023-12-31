import { getClerkInfoAction } from '@/app/_actions/admin'
import ClerkInformation from '@/components/admin/ClerkInformation'
import React from 'react'

interface Props {
  params: { clerkId: string }
}
async function page({ params }: Props) {
  const clerkId = params.clerkId
  const clerkInfo = await getClerkInfoAction(clerkId)
  console.log(clerkId, clerkInfo)

  return (
    <div>
      <ClerkInformation clerkInfo={clerkInfo} />
    </div>
  )
}

export default page
