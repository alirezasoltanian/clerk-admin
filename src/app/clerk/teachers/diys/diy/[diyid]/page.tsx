'use server'

import { getDIY } from '@/app/_actions/clerk/teacher'
import { Diy } from '@/types/teacher'
import React from 'react'

const page: React.FC<{
  params: {
    diyid: string
  }
}> = async ({ params }) => {
  const diyid = params.diyid

  const res: Diy = await getDIY(diyid)
  console.log('in page', res)

  const x: string[] = []
  for (const y in res) {
    x.push(y)
  }
  return (
    <div className="flex flex-col gap-2">
      {x.map((item, ind) => (
        <h1 key={ind}>{item}</h1>
      ))}
    </div>
  )
}

export default page
