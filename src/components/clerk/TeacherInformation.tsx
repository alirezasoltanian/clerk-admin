import { getTeacherAction } from '@/app/_actions/clerk/teacher'
import { FormTeacher } from '@/types/teacher'
import Image from 'next/image'
import React from 'react'

async function TeacherInformation({
  information,
}: {
  information: FormTeacher
}) {
  const res = await getTeacherAction()
  console.log(res)

  return (
    <div>
      <div className=" relative h-[90%] md:h-[50%] aspect-[4/1] border-4">
        <Image
          width={100}
          height={100}
          src={(information.banner_url as string) ?? ''}
          alt="banner as user Social"
          className=" absolute w-full h-full"
        />
      </div>
      <div className="rounded-full relative size-32 border-4">
        <Image
          width={100}
          height={100}
          src={(information.banner_url as string) ?? ''}
          alt="banner as user Social"
          className=" absolute w-full h-full"
        />
      </div>
    </div>
  )
}

export default TeacherInformation
