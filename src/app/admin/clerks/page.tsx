import { getClerkAction } from '@/app/_actions/admin'
import { ClerksTableShell } from '@/components/shells/ClerksTableShell'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { Metadata } from 'next'
import Link from 'next/link'

interface CoursesPageProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export default async function CoursesPage({ searchParams }: CoursesPageProps) {
  const { page, per_page, sort, from, to } = searchParams ?? {}

  // if (!store) {
  //   notFound()
  // }

  // Number of items per page
  const limit = typeof per_page === 'string' ? parseInt(per_page) : 10
  // Number of items to skip
  const offset =
    typeof page === 'string' ? (parseInt(page) > 0 ? parseInt(page) - 1 : 0) : 0
  const fromDay = typeof from === 'string' ? new Date(from) : undefined
  const toDay = typeof to === 'string' ? new Date(to) : undefined
  const res = await getClerkAction({
    sort,
    limit,
    offset,
    from,
    to,
  })
  console.log(res)
  const pageCount = Math.ceil(res.count / limit)
  return (
    <div className="space-y-6 my-12">
      <div className="flex flex-col gap-4 xs:flex-row xs:items-center xs:justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Clerks</h2>
        {/* <DateRangePicker align="end" /> */}
      </div>
      <ClerksTableShell data={res.results} pageCount={pageCount} />
    </div>
  )
}
