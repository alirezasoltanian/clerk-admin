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
            information={{
              name: '',
              description: '',
              birthday: `${today.getFullYear()}-${
                today.getMonth() + 1
              }-${today.getDate()}`,
              image: '',
            }}
          />
        </CardContent>
      </Card>
    </Shell>
  )
}
