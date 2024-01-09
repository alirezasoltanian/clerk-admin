import { getTeacherAction } from '@/app/_actions/clerk/teacher'
import { cn } from '@/lib/utils'
import { FormTeacher } from '@/types/teacher'
import { File } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { buttonVariants } from '../ui/button'

async function TeacherInformation({
  information,
}: {
  information: FormTeacher
}) {
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
      <div className="flex gap-5 mt-7">
        <div className="rounded-full relative size-32 border-4 overflow-hidden">
          <Image
            width={100}
            height={100}
            src={(information.banner_url as string) ?? ''}
            alt="banner as user Social"
            className=" absolute w-full h-full"
          />
        </div>
        <div className="gap-4 flex items-center">
          <div className="">
            <h2>{information.full_name}</h2>
            <h3>{information.email}</h3>
            <h3>{information.phone_number}</h3>
          </div>
          <a
            href={`${information.resume_url}`}
            className={cn(buttonVariants({ variant: 'outline' }))}
            target="_blank"
          >
            <File />
          </a>
        </div>
      </div>
      <div className="space-y-2 ml-5 mt-2">
        <h3 className="">Bio : {information.bio}</h3>
        <div>
          <h3 className="">Bio : {information.bio}</h3>
          <h3 className="">Bio : {information.bio}</h3>
        </div>

        <h3 className="">Bio : {information.bio}</h3>
        <h3 className="">
          Description for admin : {information.description_for_admin}
        </h3>
        <h3 className="mt-3 ml-5">Bio : {information.bio}</h3>
        <div className="flex gap-2">
          <p className="">Teaching Fields :</p>{' '}
          <div className="flex">
            {information.teaching_fields?.map((item, index) => (
              <div className="border-2 rounded px-3 " key={index}>
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TeacherInformation
