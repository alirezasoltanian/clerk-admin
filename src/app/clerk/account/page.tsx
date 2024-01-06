import {
  getClerkInformationAction,
  getClerkInformationCheck,
} from '@/app/_actions/clerk'
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/page-header'
import { Shell } from '@/components/shells/shell'
import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { ClerkForm } from '@/types'
import type { Metadata } from 'next'
import Link from 'next/link'
import UpdateClerkForm from './_components/UpdateClerkForm'

const today = new Date()
export const metadata: Metadata = {
  //   metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: 'Clerk',
  description: 'Add a new clerk',
}

export default async function NewStorePage() {
  // const res = await getTeacherAction();

  const check = await getClerkInformationCheck()
  console.log(check)
  const res = await getClerkInformationAction()
  if (res !== null && check !== null) res['image'] = check.image
  console.log(res)
  return (
    <Shell variant="sidebar">
      <PageHeader
        id="new-store-page-header"
        aria-labelledby="new-store-page-header-heading"
      >
        <div className="flex justify-between">
          <div>
            <PageHeaderHeading size="sm">Clerk</PageHeaderHeading>
            <PageHeaderDescription size="sm">
              Add Information for access Clerk
            </PageHeaderDescription>
          </div>
        </div>
      </PageHeader>
      <Card
        as="section"
        id="new-store-page-form-container"
        aria-labelledby="new-store-page-form-heading"
      >
        <CardContent>
          <UpdateClerkForm
            information={
              res
                ? res
                : {
                    name: '',
                    description: '',
                    birthday: `${today.getFullYear()}-${
                      today.getMonth() + 1
                    }-${today.getDate()}`,
                    email: '',
                    resume: '',
                    image: '',
                    is_accepted_policies: false,
                  }
            }
          />
        </CardContent>
      </Card>
    </Shell>
  )
}
