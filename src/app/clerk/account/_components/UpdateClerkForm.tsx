'use client'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { clerckForm, ClerkForm, ClerkFormValidation } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { format, parse } from 'date-fns'
import { CalendarIcon, Download } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'
import { Form, useForm } from 'react-hook-form'

const UpdateClerkForm: React.FC<{ information: ClerkForm }> = ({
  information,
}) => {
  const router = useRouter()
  const [isPending, startTransition] = React.useTransition()
  const form = useForm<ClerkFormValidation>({
    resolver: zodResolver(clerckForm),
    defaultValues: {
      name: information ? information.name : '',
      description: information ? information.description : '',
      birthday: information ? information.birthday : `2023-12-28`,
      image: information ? information.image : '',
    },
  })

  function deleteProfile() {
    startTransition(async () => {
      // try {
      //   deleteProfileImage();
      //   toast.success(" saved new info ");
      //   // console.log(res);
      //   router.refresh();
      // } catch (err: any) {
      //   let message =
      //     typeof err.response !== "undefined"
      //       ? err.response.data.message
      //       : err.message;
      //   // console.log(message);
      //   toast.error(message);
      // }
    })
  }
  return (
    <div>
      <div className="relative w-fit h-fit">
        <div className="  md:w-32 md:h-32 w-20 h-20 bg-slate-400 shadow-md  relative rounded-full border-2 overflow-hidden border-white -mt-16 ml-5 ">
          <Image
            width={100}
            height={100}
            src={
              information && information?.image
                ? (information?.image as string)
                : '/placeholder.png'
            }
            alt="image of social profile"
            className="object-cover w-full h-full"
          />

          <div className="absolute inset-0">
            {/* <UploadProfileImage beText={false} /> */}
          </div>
        </div>
        {/* {(information?.image_url as string) && (
            <AlertDialogC
              title='Are you absolutely sure?'
              description='This action cannot be undone. This will permanently delete your
                profile image '
              click={deleteProfile}
            >
              <div className='absolute -bottom-0 -right-0 '>
                <button
                  // onClick={() => deleteProfile()}
                  className='bg-red-500/60 hover:bg-red-500/80 rounded-full  w-6 h-6 flex items-center justify-center'
                >
                  <Icons.trash size={15} />{" "}
                </button>
              </div>
            </AlertDialogC>
          )} */}
      </div>
      <Form {...form}>
        <form
          className="grid w-full max-w-xl gap-5"
          // onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
        >
          <FormField
            control={form.control}
            name="birthday"
            render={({ field }) => (
              <FormItem className="flex flex-col">
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
        </form>
      </Form>
    </div>
  )
}

export default UpdateClerkForm
