import { Shell } from '@/components/shells/shell'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Metadata } from 'next'
import Link from 'next/link'
import { LoginForm } from './_components/LoginForm'

export const metadata: Metadata = {
  //   metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: 'Sign Up',
  description: 'Sign up for an account',
}

export default async function SignUpPage() {
  //   const user = await currentUser()
  //   if (user) redirect("/")

  return (
    <Shell className="max-w-lg">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Sign in as Clerk</CardTitle>
          <CardDescription>Welcome Clerk</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <LoginForm />
        </CardContent>
        <CardFooter>
          <div className="">
            <div className="text-sm text-muted-foreground">
              {"Don't you already have an account?  "}
              <Link
                aria-label="Sign up"
                href="/auth/clerk/signup"
                className="text-primary underline-offset-4 transition-colors hover:underline"
              >
                Sign up
              </Link>
            </div>
            <div className="flex flex-col gap-1">
              <Link
                aria-label="Sign up"
                href="/auth/login"
                className="text-primary mt-2 text-sm underline-offset-4 transition-colors hover:underline"
              >
                Forgot password
              </Link>
              <Link
                aria-label="Sign up"
                href="/auth/admin/login"
                className="text-primary mt-2 text-sm underline-offset-4 transition-colors hover:underline"
              >
                Login as Admin
              </Link>
            </div>
          </div>
        </CardFooter>
      </Card>
    </Shell>
  )
}
