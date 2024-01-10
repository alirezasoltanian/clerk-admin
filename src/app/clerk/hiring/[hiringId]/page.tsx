import { getHiringAction } from '@/app/_actions/clerk/hiring'
import { getTeacherAction } from '@/app/_actions/clerk/teacher'
import TeacherInformation from '@/components/clerk/TeacherInformation'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import React from 'react'

interface Props {
  params: {
    hiringId: string
  }
}
async function page({ params }: Props) {
  const hiringId = params.hiringId
  const res = await getHiringAction(hiringId)
  clg
  if (!res?.full_name) notFound()

  return (
    <div>
      <div className="space-y-6 my-12">
        <div className="flex flex-col gap-4 xs:flex-row xs:items-center xs:justify-between">
          <h2 className="text-2xl font-bold tracking-tight">
            Hiring user : {res?.full_name}
          </h2>
          {/* <DateRangePicker align="end" /> */}
          <div></div>
        </div>
      </div>
    </div>
  )
}

export default page
