'use client'

import {
  clerkFormAction,
  deleteClerkProfileImage,
  updateClerkAction,
} from '@/app/_actions/clerk'
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
      birthday:
        information && information.birthday
          ? information.birthday
          : `2024-02-28`,
      email: information ? information.email : '',
      resume: information ? information.resume : '',
      is_accepted_policies: information
        ? information.is_accepted_policies
        : false,
    },
  })
  const { useUploadThing } = generateReactHelpers<OurFileRouter>()

  const { isUploading, startUpload } = useUploadThing('clerkCV')

  const onSubmit = async (data: z.infer<typeof clerckForm>) => {
    const cvFile = (form.watch('resume') as File[])[0]

    console.log(cvFile)

    const cvRes = await startUpload([cvFile])

    console.log(cvRes)
    const sendData = {
      name: data.name,
      birthday: data.birthday,
      description: data.description,
      resume: cvRes ? cvRes[0].url : information.resume,
      email: data.email,
      is_accepted_policies: data.is_accepted_policies,
    }
    let res
    if (information && information.is_accepted_policies)
      res = await updateClerkAction(sendData)
    else res = await clerkFormAction(sendData)

    console.log(res)

    toast.message(res?.body.message)
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
                ? (information?.image.split(
                    'https://api.uritect.top/media/'
                  )[1] as string)
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
          <div className="w-[45%]">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      className=""
                      placeholder="enter your email."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
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
          <FormItem className="">
            <div className="flex-col">
              <FormLabel>CV File</FormLabel>
              <FormControl className="w-fix">
                {/* {officeImage !== "" && <img src={officeImage} alt="office image" height={50} width={50}/>} */}
                <input
                  placeholder=""
                  {...form.register('resume')}
                  type="file"
                  accept=".pdf"
                  className="ml-2 w-fix accent-slate-800"
                  onChange={(e) => {
                    // setOfficeImage("");
                  }}
                />
              </FormControl>
            </div>
          </FormItem>
          {information && !information.is_accepted_policies && (
            <FormItem className="">
              <div className="flex">
                <FormLabel>Accept policies</FormLabel>
                <FormControl className="w-fix">
                  <input
                    placeholder=""
                    {...form.register('is_accepted_policies')}
                    type="checkbox"
                    className="ml-2 w-fix accent-slate-800"
                  />
                </FormControl>
              </div>
            </FormItem>
          )}
          <Button
            className="w-fit"
            disabled={isPending || !form.watch('is_accepted_policies')}
          >
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
