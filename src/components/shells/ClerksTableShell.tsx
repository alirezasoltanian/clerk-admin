'use client'

import { acceptClerkAction, rejectClerkAction } from '@/app/_actions/admin'
import { DataTable } from '@/components/data-table/data-table'
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn, formatDate, formatPrice } from '@/lib/utils'
import { Clerk } from '@/types'
import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { type ColumnDef } from '@tanstack/react-table'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import * as React from 'react'
import { toast } from 'sonner'
import { Icons } from '../icons'
import { Badge } from '../ui/badge'

interface PostTableShellProps {
  data: Clerk[]
  pageCount: number
}

export function ClerksTableShell({ data, pageCount }: PostTableShellProps) {
  const router = useRouter()
  async function acceptClerk(id: string) {
    const res = await acceptClerkAction(id)
    if (res.status === 204 || 200) {
      toast.success('delete successfully')
      router.refresh()
    } else {
      toast.error(res.body.message)
    }
  }
  async function rejectClerk(id: string) {
    const res = await rejectClerkAction(id)
    if (res.status === 204 || 200) {
      toast.success('delete successfully')
      router.refresh()
    } else {
      toast.error(res.body.message)
    }
  }
  // Memoize the columns so they don't re-render on every render
  const columns = React.useMemo<ColumnDef<Clerk, unknown>[]>(
    () => [
      {
        accessorKey: 'image',
        header: ({ column }) => {
          return <div>image</div>
        },
        cell: ({ row }) => {
          const image_url: string = row.getValue('image')
          console.log(data)
          return (
            <div className="flex flex-wrap gap-1">
              {!!image_url && (
                <div className="relative size-10 bg-slate-500 ">
                  <Image
                    width={100}
                    height={100}
                    className="absolute rounded-sm w-full h-full "
                    alt="image of clerk"
                    src={image_url}
                  />
                </div>
              )}
            </div>
          )
        },
      },
      {
        accessorKey: 'name',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Name" />
        ),
      },

      {
        accessorKey: 'birthday',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Birthday" />
        ),
        cell: ({ cell }) => formatDate(cell.getValue() as string | number),
        enableColumnFilter: false,
      },

      {
        accessorKey: 'created_at',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Create at" />
        ),
        cell: ({ cell }) => formatDate(cell.getValue() as string | number),
        enableColumnFilter: false,
      },
      {
        id: 'actions',
        cell: ({ row }) => {
          const slug = row.original.uuid
          // ?.replace("@", `-${Math.random().toString(36).substring(2, 10)}-`)
          // .replace(".com", "");
          return (
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
                  <Link href={`/admin/clerk/${slug}`}>View clerk</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <button
                    onClick={() => acceptClerk(slug)}
                    className="w-full hover:bg-green-300 flex justify-between focus:bg-green-300 bg-green-200"
                  >
                    <p>Accept clerk</p>
                    <p className="">
                      <Icons.trash size={12} />
                    </p>
                  </button>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <button
                    onClick={() => rejectClerk(slug)}
                    className="w-full hover:bg-red-300 flex justify-between focus:bg-red-300 bg-red-200"
                  >
                    <p>Reject clerk</p>
                    <p className="">
                      <Icons.trash size={12} />
                    </p>
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )
        },
      },
    ],
    []
  )

  return <DataTable columns={columns} data={data} pageCount={pageCount} />
}
