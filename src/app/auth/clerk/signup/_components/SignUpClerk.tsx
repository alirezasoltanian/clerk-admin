'use client'

import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import InputForm from '@/components/ui/InputForm'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

const signUpSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  email: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  password: z.string().min(3, {
    message: 'password must be at least 3 characters.',
  }),
})
type SignUpType = z.infer<typeof signUpSchema>

function SignUpClerk() {
  const router = useRouter()
  const [isPending, setIsPending] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<SignUpType>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: '',
    },
  })
  const onSubmit = async (data: SignUpType) => {
    toast.message('ok')
  }
  const searchParams = useSearchParams()

  const previousRoute = searchParams.get('previousRoute')
  return (
    <div className="flex flex-col gap-3">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <InputForm
            type="string"
            name="email"
            title="Email"
            placeholder="Enter your email"
            control={form.control}
          />
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
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          {/* <span className='bg-background px-2 text-muted-foreground'>
            Or continue with
          </span> */}
        </div>
      </div>
      {/* <GoogleAuth
        isPending={isPending}
        setIsLoading={setIsLoading}
        isLoading={isLoading}
      /> */}
    </div>
  )
}

export default SignUpClerk
