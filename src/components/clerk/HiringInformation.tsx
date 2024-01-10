'use client'

import { clerkHiringAction } from '@/app/_actions/clerk/hiring'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn, formatDate } from '@/lib/utils'
import { Hiring } from '@/types/hiring'
import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { Check, File } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'sonner'
import { Icons } from '../icons'
import { Button, buttonVariants } from '../ui/button'

function HiringInformation({ information }: { information: Hiring }) {
  const [isPending, startTransition] = React.useTransition()

  const router = useRouter()

  async function actionFunc(action: 'accept' | 'reject', id: string) {
    const res = await clerkHiringAction(action, id)
    if (res.status === 204 || 200) {
      toast.success(res.body.message)
      router.refresh()
    } else {
      toast.error(res.body.message)
    }
  }
  return (
    <div>
      <div className=" relative h-[90%] md:h-[50%] bg-slate-400 aspect-[4/1] border-4">
        <Image
          width={100}
          height={100}
          src={(information.banner_url as string) ?? ''}
          alt="banner as user Social"
          className=" absolute w-full h-full"
        />
      </div>
      <div className="flex gap-5 mt-7">
        <div className="rounded-full relative size-32   border-4 overflow-hidden">
          <Image
            width={100}
            height={100}
            src={(information.banner_url as string) ?? ''}
            alt="banner as user Social"
            className=" absolute w-full h-full"
          />
        </div>
        <div className="gap-4 flex items-center">
          <div className="flex items-center ">
            <div className="">
              <h2>{information.full_name}</h2>
              <h3>{information.email}</h3>
              <h3>{information.phone}</h3>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  aria-label="Open menu"
                  variant="ghost"
                  className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
                >
                  <DotsHorizontalIcon className="h-4 w-4" aria-hidden="true" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[160px] space-y-1">
                {information.status !== 'ACCEPTED' && (
                  <DropdownMenuItem asChild>
                    <button
                      onClick={() => {
                        startTransition(() => {
                          // row.toggleSelected(false)
                          toast.promise(
                            actionFunc('accept', information.uuid),
                            {
                              loading: 'accepting...',
                            }
                          )
                        })
                      }}
                      className="w-full hover:bg-green-300 flex justify-between focus:bg-green-300 bg-green-200"
                    >
                      <p>Accept </p>
                      <p className="">
                        <Check size={12} />
                      </p>
                    </button>
                  </DropdownMenuItem>
                )}
                {information.status !== 'REJECTED' && (
                  <DropdownMenuItem asChild>
                    <button
                      onClick={() => {
                        startTransition(() => {
                          // row.toggleSelected(false)

                          toast.promise(
                            actionFunc('reject', information.uuid),
                            {
                              loading: 'rejecting...',
                            }
                          )
                        })
                      }}
                      className="w-full hover:bg-red-300 flex justify-between focus:bg-red-300 bg-red-200"
                    >
                      <p>Reject </p>
                      <p className="">
                        <Icons.close size={12} />
                      </p>
                    </button>
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          {information.resume_url && (
            <a
              href={`${information.resume_url}`}
              className={cn(buttonVariants({ variant: 'outline' }))}
              target="_blank"
            >
              <File />
            </a>
          )}
        </div>
      </div>
      <div className="space-y-2 ml-5 mt-2">
        <div className="flex flex-wrap">
          <h3>Profession : </h3> <p>{information.profession}</p>
        </div>
        <div className="flex flex-wrap">
          <h3>Birthday : </h3> <p>{formatDate(information.birth_date)}</p>
        </div>
        <div className="flex flex-wrap">
          <h3>Country / City : </h3>{' '}
          <p>
            {information.country} / {information.city}
          </p>
        </div>
        <div className="flex flex-wrap">
          <h3>Bio :</h3>
          {'  '}
          <p>{information.about}</p>
        </div>

        <div className="flex flex-wrap">
          <h3> Description for admin :</h3>
          {'  '}
          <p>{information.description_for_admin}</p>
        </div>

        <div className="flex ">
          <h3 className="">Tags :</h3>{' '}
          <div className="flex gap-2">
            {information.tags?.map((item, index) => (
              <div className="border-2 rounded px-3 text-sm " key={index}>
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HiringInformation
