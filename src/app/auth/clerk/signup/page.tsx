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
import SignUpClerk from './_components/SignUpClerk'

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
          <CardTitle className="text-2xl">Sign up as Clerk</CardTitle>
          <CardDescription>
            Register as clerk and wait for acceptance
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <SignUpClerk />
        </CardContent>
        <CardFooter>
          <div className="text-sm text-muted-foreground flex flex-col">
            <div className="flex flex-row">
              Already have an account?{' '}
              <Link
                aria-label="log in"
                href="/auth/clerk/login"
                className="text-primary underline-offset-4 transition-colors hover:underline"
              >
                Login
              </Link>
            </div>
            <Link
              aria-label="Sign in"
              href="/auth/admin/login"
              className="text-primary underline-offset-4 transition-colors hover:underline"
            >
              Login as Admin
            </Link>
          </div>
        </CardFooter>
      </Card>
    </Shell>
  )
}
