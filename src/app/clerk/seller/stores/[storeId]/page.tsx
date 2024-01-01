import { getClerkAction } from '@/app/_actions/admin'
import {
  getCategoryShop,
  getProductsAction,
  getStoreAction,
  getStoresAction,
} from '@/app/_actions/clerk/seller'
import StoreDetail from '@/components/clerk/StoreDetail'
import { ClerksTableShell } from '@/components/shells/ClerksTableShell'
import { ProductsTableShell } from '@/components/shells/ProductsTableShell'
import { StoresTableShell } from '@/components/shells/StoresTableShell'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { Metadata } from 'next'
import Link from 'next/link'

interface CoursesPageProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
  params: {
    storeId: string
  }
}

export default async function CoursesPage({
  searchParams,
  params,
}: CoursesPageProps) {
  const { page, per_page, sort, from, to } = searchParams ?? {}
  const storeId = params.storeId
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
  const res = await getProductsAction({
    sort,
    limit,
    offset,
    from,
    to,
    storeId,
  })
  const getCategories = await getCategoryShop()
  const storeDetail = await getStoreAction(storeId)
  console.log(res)
  const pageCount = Math.ceil(res.count / limit)
  return (
    <div className="space-y-6 my-12">
      {/* <div className="flex flex-col gap-4 xs:flex-row xs:items-center xs:justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Store : {}</h2>
        <StoreDetail store={storeDetail as Store} />
      </div>
      <ProductsTableShell enumCategories={getCategories} storeId={storeId} data={res.results} pageCount={pageCount} /> */}
    </div>
  )
}
