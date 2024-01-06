import { getClerkAction } from '@/app/_actions/admin'
import { getStoresAction } from '@/app/_actions/clerk/seller'
import TeacherInformation from '@/components/clerk/TeacherInformation'
import { ClerksTableShell } from '@/components/shells/ClerksTableShell'
import { StoresTableShell } from '@/components/shells/StoresTableShell'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'

interface Props {
  params: {
    teacherId: string
  }
}
function page({ params }: Props) {
  const teacherId = params.teacherId
  return (
    <div>
      <div className="space-y-6 my-12">
        <div className="flex flex-col gap-4 xs:flex-row xs:items-center xs:justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Stores</h2>
          {/* <DateRangePicker align="end" /> */}
          <div></div>
        </div>
        <TeacherInformation />
      </div>
    </div>
  )
}

export default page
