'use server'

import { getDIYTeachersAction } from '@/app/_actions/clerk/DIY'
import { DIYTableShell } from '@/components/shells/DIYTableShell'
import type { Metadata } from 'next'
import Image from 'next/image'
import React from 'react'

const page: React.FC<{
  params: {
    teacherid: string
  }
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}> = async ({ params, searchParams }) => {
  const teacherid = params.teacherid

  const { page, per_page, sort, from, to } = searchParams ?? {}

  // if (!store) {
  //   notFound()
  // }

  // Number of items per page
  const limit = typeof per_page === 'string' ? parseInt(per_page) : 10
  // Number of items to skip
  const offset =
    typeof page === 'string' ? (parseInt(page) > 0 ? parseInt(page) - 1 : 0) : 0
  const fromDay = typeof from === 'string' ? new Date(from) : undefined
  const toDay = typeof to === 'string' ? new Date(to) : undefined
  const res = await getDIYTeachersAction({
    sort,
    limit,
    offset,
    from,
    to,
  })
  console.log(res)
  const pageCount = Math.ceil(res.count / limit)
  return (
    <div className="space-y-6 my-12">
      <div className="flex flex-col gap-4 xs:flex-row xs:items-center xs:justify-between">
        <h2 className="text-2xl font-bold tracking-tight">DIYs</h2>

        {/* <DateRangePicker align="end" /> */}
      </div>
      <div>
        <div>
          <div className="aspect-[4/1] relative mt-5 bg-slate-200">
            {
              <Image
                width={100}
                height={100}
                src={'/placeholder.png'}
                alt="banner as user Social"
                className=" absolute w-full h-full"
              />
            }
          </div>
          <div className="relative w-fit h-fit">
            <div className="  md:w-32 md:h-32 w-20 h-20 bg-slate-400 shadow-md  relative rounded-full border-2 overflow-hidden border-white -mt-16 ml-5 ">
              <Image
                width={100}
                height={100}
                src={'/placeholder.png'}
                alt="image of social profile"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
        <h1>TEACHER NAME</h1>
      </div>
      <DIYTableShell data={res.results} pageCount={pageCount} />
    </div>
  )
}

export default page
