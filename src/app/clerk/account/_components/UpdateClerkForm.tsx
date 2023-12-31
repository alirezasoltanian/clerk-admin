'use client'

import { clerkFormAction, deleteClerkProfileImage } from '@/app/_actions/clerk'
import { OurFileRouter } from '@/app/api/uploadthing/core'
import { AlertDialogC } from '@/components/AlertDialog'
import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { clerckForm, ClerkForm, ClerkFormValidation } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { generateReactHelpers } from '@uploadthing/react/hooks'
import { format, parse } from 'date-fns'
import { CalendarIcon, Download } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { UploadClerkProfileImage } from './UpdateClerkProfileImage'

const UpdateClerkForm: React.FC<{ information: ClerkForm }> = ({
  information,
}) => {
  const router = useRouter()
  const [isPending, startTransition] = React.useTransition()
  const form = useForm<z.infer<typeof clerckForm>>({
    resolver: zodResolver(clerckForm),
    defaultValues: {
      name: information ? information.name : '',
      description: information ? information.description : '',
      birthday: information ? information.birthday : `2023-12-28`,
    },
  })

  const onSubmit = async (data: z.infer<typeof clerckForm>) => {
    const sendData = {
      ...data,
      image: information.image,
    }

    const res = await clerkFormAction(sendData)

    console.log(res)

    toast.message(res.body.message)
  }
  function deleteProfile() {
    startTransition(async () => {
      try {
        deleteClerkProfileImage()
        toast.success(' saved new info ')
        // console.log(res);
        router.refresh()
      } catch (err: any) {
        let message =
          typeof err.response !== 'undefined'
            ? err.response.data.message
            : err.message
        // console.log(message);
        toast.error(message)
      }
    })
  }
  return (
    <div>
      <div className="relative w-fit h-fit">
        <div className="  md:w-32 md:h-32 w-20 h-20 bg-slate-400 shadow-md  relative rounded-full border-2 overflow-hidden border-white  mt-8 mb-8">
          <Image
            width={100}
            height={100}
            src={
              information && information?.image
                ? (information?.image as string)
                : '/placeholder.png'
            }
            alt="image of social profile"
            className="object-cover w-full h-full "
          />

          <div className="absolute inset-0">
            <UploadClerkProfileImage beText={false} />
          </div>
        </div>
        {(information?.image as string) && (
          <AlertDialogC
            title="Are you absolutely sure?"
            description="This action cannot be undone. This will permanently delete your
                profile image "
            click={deleteProfile}
          >
            <div className="absolute -bottom-0 -right-0 ">
              <button
                onClick={() => deleteProfile()}
                className="bg-red-500/60 hover:bg-red-500/80 rounded-full  w-6 h-6 flex items-center justify-center"
              >
                <Icons.trash size={15} />{' '}
              </button>
            </div>
          </AlertDialogC>
        )}
      </div>
      <Form {...form}>
        <form
          className="grid w-full max-w-xl gap-5"
          onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    className=" md:w-1/2"
                    placeholder="enter your full name."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="enter your description about yourself."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="birthday"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Birthday</FormLabel>

                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-[240px] pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value ? (
                          format(
                            parse(field.value, 'yyyy-MM-dd', new Date()),
                            'PPP'
                          )
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={parse(field.value, 'yyyy-MM-dd', new Date())}
                      onSelect={(date) => {
                        console.log(date)

                        // Format the date to "yyyy-MM-dd" before sending it to the backend
                        const formattedDate = format(
                          date as unknown as Date,
                          'yyyy-MM-dd'
                        )
                        console.log(formattedDate)
                        field.onChange(formattedDate)
                      }}
                      disabled={(date) =>
                        date < new Date() || date < new Date('1900-01-01')
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-fit" disabled={isPending}>
            {isPending && (
              <Icons.spinner
                className="mr-2 h-4 w-4 animate-spin"
                aria-hidden="true"
              />
            )}
            submit
            <span className="sr-only">submit</span>
          </Button>
        </form>
      </Form>
      <Button className="w-fit" disabled={true}>
        {false && (
          <Icons.spinner
            className="mr-2 h-4 w-4 animate-spin"
            aria-hidden="true"
          />
        )}
        submit
        <span className="sr-only">submit</span>
      </Button>
    </div>
  )
}

export default UpdateClerkForm
