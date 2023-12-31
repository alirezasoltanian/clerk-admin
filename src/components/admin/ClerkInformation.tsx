import { cn } from '@/lib/utils'
import { ClerkInfo } from '@/types'
import { Download } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { buttonVariants } from '../ui/button'

interface Props {
  clerkInfo: ClerkInfo
}
function ClerkInformation({ clerkInfo }: Props) {
  console.log(clerkInfo)

  return (
    <div className="mt-10 space-y-5">
      <div
        className={cn(
          clerkInfo.status === 'ACCEPTED'
            ? 'bg-green-300  text-green-700'
            : 'bg-red-300  text-red-700',
          'w-fit rounded-md py-1 px-2'
        )}
      >
        {clerkInfo.status}
      </div>

      <div className="relative size-20 rounded-md bg-slate-500 ">
        <Image
          width={100}
          height={100}
          className="absolute rounded-sm w-full h-full "
          alt="image of clerk"
          src={clerkInfo.image}
        />
      </div>
      <h3>Name : {clerkInfo.name}</h3>
      <div className="space-y-2">
        <h3>Description : </h3>
        <p>{clerkInfo.description}</p>
      </div>
      <div className="space-x-2 flex">
        <h3>CV : </h3>
        <a
          download
          className={cn(buttonVariants({ variant: 'outline', size: 'icon' }))}
          target="_blank"
          href={clerkInfo.image}
        >
          <Download />{' '}
        </a>
      </div>
    </div>
  )
}

export default ClerkInformation
