'use server'

import { getDIY } from '@/app/_actions/clerk/teacher'
import { Diy } from '@/types/teacher'
import Image from 'next/image'
import React from 'react'

const page: React.FC<{
  params: {
    diyid: string
  }
}> = async ({ params }) => {
  const diyid = params.diyid

  const res: Diy = await getDIY(diyid)
  console.log('in page', res)
  return (
    <div className="space-y-6 my-12">
      <div className="flex flex-col gap-4 xs:flex-col xs:items-start xs:justify-center">
        <div className="  md:w-64  aspect-video bg-slate-400 shadow-md  relative border-2 overflow-hidden -mt-12">
          <Image
            width={100}
            height={100}
            src={res ? res.image : '/placeholder.png'}
            alt="image of social profile"
            className="object-fit w-full h-full"
          />
        </div>
        <h2 className="text-2xl font-bold tracking-tight">{res.title}</h2>
      </div>

      <div className="flex flex-col gap-4 border-2 border-slate-400 rounded-md shadow-lg p-2">
        <p>
          {'Description: '}
          {res.description}
        </p>
        <p>
          {'Category: '}
          {res.category_uuid}
        </p>
        <p>
          {'Subcategory: '}
          {res.subcategory_uuid}
        </p>
        <p>
          {'IS PUBLISHED: '} {`${res.is_published}`}
        </p>
        <p>
          {'Tags: '} {res.tags.join(', ')}
        </p>
        <p>
          {'Video Link: '} {res.video}
        </p>
      </div>
    </div>
  )
}

export default page
