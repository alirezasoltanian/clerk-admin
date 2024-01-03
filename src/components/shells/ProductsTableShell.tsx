'use client'

import { acceptClerkAction, rejectClerkAction } from '@/app/_actions/admin'
import { DataTable } from '@/components/data-table/data-table'
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { catchError, formatDate, formatPrice } from '@/lib/utils'
import { Category, Product } from '@/types'
import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { type ColumnDef } from '@tanstack/react-table'
import { Check } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import * as React from 'react'
import { toast } from 'sonner'
import { Icons } from '../icons'

interface ProductsTableShellProps {
  enumCategories: Category[]
  data: Product[]
  pageCount: number
  storeId: string
}

export function ProductsTableShell({
  enumCategories,
  data,
  pageCount,
  storeId,
}: ProductsTableShellProps) {
  const [isPending, startTransition] = React.useTransition()
  const router = useRouter()

  async function rejectClerk(id: string) {
    const res = await rejectClerkAction(id)
    if (res.status === 204 || 200) {
      toast.success(res.body.message)
      router.refresh()
    } else {
      toast.error(res.body.message)
    }
  }
  // Memoize the columns so they don't re-render on every render
  const columns = React.useMemo<ColumnDef<Product, unknown>[]>(
    () => [
      {
        accessorKey: 'title',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Name" />
        ),
      },
      {
        accessorKey: 'oneCategory',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Category" />
        ),
        cell: ({ cell }) => {
          const categories = Object.values(
            enumCategories.map((item) => item.title)
          )
          const category = cell.getValue() as string

          if (!categories.includes(category)) return null

          return (
            <Badge variant="outline" className="capitalize">
              {category}
            </Badge>
          )
        },
      },
      {
        accessorKey: 'price',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Price" />
        ),
        cell: ({ cell }) => formatPrice(cell.getValue() as number),
      },
      // {
      //   accessorKey: "inventory",
      //   header: ({ column }) => (
      //     <DataTableColumnHeader column={column} title="Inventory" />
      //   ),
      // },
      {
        accessorKey: 'rate',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Rating" />
        ),
      },
      {
        accessorKey: 'created_at',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Created At" />
        ),
        cell: ({ cell }) => formatDate(cell.getValue() as string | number),
        enableColumnFilter: false,
      },
      {
        id: 'actions',
        cell: ({ row }) => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                aria-label="Open menu"
                variant="ghost"
                className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
              >
                <DotsHorizontalIcon className="h-4 w-4" aria-hidden="true" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[160px] space-y-1">
              <DropdownMenuItem asChild>
                <Link
                  href={`/clerk/seller/stores/${storeId}/product/${row.original.uuid}`}
                >
                  View product
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <button
                  onClick={() => {
                    startTransition(() => {
                      row.toggleSelected(false)

                      toast.promise(rejectClerk(row.original.uuid), {
                        loading: 'Deleting...',
                      })
                    })
                  }}
                  className="w-full hover:bg-red-300 flex justify-between focus:bg-red-300 bg-red-200"
                >
                  <p>Reject clerk</p>
                  <p className="">
                    <Icons.close size={12} />
                  </p>
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      },
    ],
    [data, isPending, storeId]
  )

  return (
    <DataTable
      columns={columns}
      data={data}
      pageCount={pageCount}
      filterableColumns={[
        {
          id: 'oneCategory',
          title: 'Category',
          options: enumCategories.map((category) => ({
            label: `${category.title
              .charAt(0)
              .toUpperCase()}${category.title.slice(1)}`,
            value: category.title,
          })),
        },
      ]}
      searchableColumns={[
        {
          id: 'title',
          title: 'names',
        },
      ]}
      newRowLink={`/seller/stores/${storeId}/products/new`}
    />
  )
}
