import { getTeacherAction } from '@/app/_actions/clerk/teacher'
import { cn, formatDate } from '@/lib/utils'
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
        <h3 className="">Birthday : {formatDate(information.birth_date)}</h3>
        <div className="flex gap-5">
          <h3 className="">
            Graduated university : {information.graduated_university}
          </h3>
          <h3 className="">
            Degree of education : {information.degree_of_education}
          </h3>
        </div>

        <h3 className="">Bio : {information.bio}</h3>
        <h3 className="">
          Description for admin : {information.description_for_admin}
        </h3>
        <div className="flex ">
          <p className="">Teaching Fields :</p>{' '}
          <div className="flex gap-2">
            {information.teaching_fields?.map((item, index) => (
              <div className="border-2 rounded px-3 " key={index}>
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="">
          <div className="grid grid-cols-4 md:w-[70%] w-full *:px-2 *:border-r-2 last:border-r-0">
            <h3>Place</h3>
            <h3>Field</h3>
            <h3>Start</h3>
            <h3>End</h3>
          </div>
          <h3 className="">Studying history : </h3>

          {information?.studying_history?.map((item, index) => (
            <div
              className="grid grid-cols-4 md:w-[70%] w-full *:border-r-2  *:px-3 last:border-r-0"
              key={index}
            >
              <div>{formatDate(item.place)}</div>
              <div>{formatDate(item.field)}</div>
              <div>{formatDate(item.start)}</div>
              <div>{formatDate(item.end)}</div>
            </div>
          ))}
          <h3 className="mt-4">Teaching history : </h3>

          {information?.teaching_history?.map((item, index) => (
            <div
              className="grid grid-cols-4 md:w-[70%] w-full *:border-r-2  *:px-3 last:border-r-0"
              key={index}
            >
              <div className="">{formatDate(item.place)}</div>
              <div className="">{formatDate(item.field)}</div>
              <div className="">{formatDate(item.start)}</div>
              <div className="">{formatDate(item.end)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TeacherInformation
