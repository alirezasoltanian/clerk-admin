'use server'

import {
  getDIYTeachersAction,
  getTeacherPreview,
} from '@/app/_actions/clerk/teacher'
import { DIYTableShell } from '@/components/shells/DIYTableShell'
import { TeacherPreview } from '@/types/teacher'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
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
    id: teacherid,
    sort,
    limit,
    offset,
    from,
    to,
  })

  const prvw: TeacherPreview = await getTeacherPreview(teacherid)
  console.log('prvw', prvw)
  const pageCount = Math.ceil(res.count / limit)
  return (
    <div className="space-y-6 my-12">
      <div className=" relative h-[90%] md:h-[50%] aspect-[4/1] border-4">
        <Image
          width={100}
          height={100}
          src={(prvw.banner as string) ?? ''}
          alt="banner as user Social"
          className=" absolute w-full h-full"
        />
      </div>
      <div className="flex gap-5 mt-7">
        <div className="rounded-full relative size-32 border-4 overflow-hidden">
          <Image
            width={100}
            height={100}
            src={(prvw.image as string) ?? ''}
            alt="banner as user Social"
            className=" absolute w-full h-full"
          />
        </div>
        <div className="gap-4 flex items-center">
          <Link href={`/clerk/teachers/${teacherid}`}>
            <div className="">
              <h2>{prvw.name}</h2>
            </div>
          </Link>
        </div>
      </div>
      <DIYTableShell data={res.results} pageCount={pageCount} />
    </div>
  )
}

export default page
