'use server'

import { getDIY } from '@/app/_actions/clerk/teacher'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Diy } from '@/types/teacher'
import { Download } from 'lucide-react'
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
        <div className="flex flex-row gap-2 items-center justify-center">
          <h2 className="text-2xl font-bold tracking-tight">{res.title}</h2>
          <h2
            className={`${
              res.is_published ? 'bg-green-100' : 'bg-red-100'
            } p-2 rounded-lg`}
          >
            {res.is_published ? 'PUBLISHED' : 'Unpublished'}
          </h2>
        </div>
      </div>

      <div className="flex flex-col gap-4 border-2 border-slate-400 rounded-md shadow-lg p-2 bg-blue-100">
        <div className="flex flex-row gap-2 p-4">
          <Label>Date: </Label>
          <Label>{new Date(res.date).toLocaleDateString()}</Label>
        </div>
        <div className="flex flex-col gap-2 p-4">
          <Label>Desciption: </Label>
          <Textarea
            readOnly
            defaultValue={res.description}
            className="bg-white"
          />
        </div>
        <div className="flex flex-row gap-4 p-4">
          <div className="flex flex-col gap-2">
            <Label>Category: </Label>
            <Input readOnly defaultValue={res.category_uuid} />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Subcategory: </Label>
            <Input readOnly defaultValue={res.subcategory_uuid} />
          </div>
        </div>

        <div className="flex flex-col gap-4 p-4">
          <Label>Tags: </Label>
          <div className="flex flex-row gap-1">
            {res.tags.map((_item, index) => {
              return (
                <p key={index} className="px-2 rounded-lg bg-gray-400 text-sm">
                  {_item}
                </p>
              )
            })}
          </div>
        </div>
        <div className="flex flex-row p-4 gap-4">
          <div className="flex flex-col gap-4 p-4 w-[40%] items-start justify-center">
            <Label>Video: </Label>
            <div className="flex relative bg-gray-300 w-full aspect-video justify-center">
              <video
                className="absolute w-full h-full"
                width="640"
                height="360"
                controls
              >
                <source src={`${res.video}`} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
          <div className="flex flex-col gap-4 p-4 w-[40%] items-start justify-start">
            <Label>Attachment File: </Label>
            <Button variant={`outline`} disabled={res.attach_file === null}>
              <a href={res.attach_file}>
                <Download />
              </a>
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-row items-start justify-between gap-6 w-[100%]">
        <div className="flex flex-row gap-3 w-full">
          <Button variant={`default`} disabled={res.status === 'REJECTED'}>
            {'Reject DIY'}
          </Button>
          <Button variant={`default`} disabled={res.status === 'ACCEPTED'}>
            {'Accept DIY'}
          </Button>
        </div>
        <div className="w-full">
          {res.is_published && (
            <Button variant={`default`}>{'Make DIY Unpublished'}</Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default page
