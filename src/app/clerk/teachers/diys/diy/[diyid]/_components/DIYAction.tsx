'use client'

import { clerkDIYAction } from '@/app/_actions/clerk/teacher'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React from 'react'

const DIYAction: React.FC<{
  status: 'ACCEPTED' | 'REJECTED' | 'NOT_DECIDED'
  uuid: string
}> = ({ status, uuid }) => {
  const router = useRouter()

  const onAccept = async () => {
    const res = await clerkDIYAction('accept', uuid)
    console.log(res)
    router.refresh()
  }
  const onReject = async () => {
    console.log('REJECTED', uuid)
    const res = await clerkDIYAction('reject', uuid)
    console.log(res)
    router.refresh()
  }
  return (
    <div className="flex flex-row items-start justify-between gap-6 w-[100%]">
      <div className="flex flex-row gap-3 w-full">
        <Button
          variant={`default`}
          disabled={status === 'REJECTED'}
          onClick={onReject}
        >
          {'Reject DIY'}
        </Button>
        <Button
          variant={`default`}
          disabled={status === 'ACCEPTED'}
          onClick={onAccept}
        >
          {'Accept DIY'}
        </Button>
      </div>
    </div>
  )
}

export default DIYAction
