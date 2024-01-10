import { getHiringUsersAction } from '@/app/_actions/clerk/hiring'
import { HiringTableShell } from '@/components/shells/HiringTableShell'
import { TeachersTableShell } from '@/components/shells/TeachersTableShell'
import type { Metadata } from 'next'

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
  const res = await getHiringUsersAction({
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
        <h2 className="text-2xl font-bold tracking-tight">Hiring Users</h2>
        {/* <DateRangePicker align="end" /> */}
      </div>
      <HiringTableShell data={res.results} pageCount={pageCount} />
    </div>
  )
}
