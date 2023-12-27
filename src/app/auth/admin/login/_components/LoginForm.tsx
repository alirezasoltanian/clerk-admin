'use client'

import { SignInClerk } from '@/app/_actions/auth'
// import { SignInAdmin } from '@/app/_actions/auth'
import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import InputForm from '@/components/ui/InputForm'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

const signInForm = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),

  password: z.string().min(3, {
    message: 'password must be at least 3 characters.',
  }),
})
type SignInType = z.infer<typeof signInForm>
export function LoginForm() {
  const router = useRouter()
  const [isPending, startTransition] = React.useTransition()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const form = useForm<SignInType>({
    resolver: zodResolver(signInForm),
    defaultValues: {
      username: '',
    },
  })
  const onSubmit = async (data: SignInType) => {
    startTransition(async () => {
      const resStatus = await SignInClerk(data)
      if (resStatus === 202) {
        toast.success('login successfully')
        // router.push("/architect/account");
      } else {
        toast.error('password & username not correct')
      }
    })
  }

  return (
    <div className="flex flex-col gap-3">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <InputForm
            type="string"
            name="username"
            title="Username"
            placeholder="Enter Username"
            control={form.control}
          />

          <InputForm
            type="pass"
            name="password"
            title="Password"
            placeholder="Enter password"
            control={form.control}
          />
          <Button disabled={isPending || isLoading} type="submit">
            {isPending ? (
              <div className="flex">
                <Icons.spinner
                  className="mr-2 h-4 w-4 animate-spin"
                  aria-hidden="true"
                />
                <span className="">loading ...</span>
              </div>
            ) : (
              <span className="">Submit</span>
            )}
          </Button>
        </form>
      </Form>
    </div>
  )
}
