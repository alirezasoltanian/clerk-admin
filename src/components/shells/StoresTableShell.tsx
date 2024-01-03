'use client'

import { acceptClerkAction, rejectClerkAction } from '@/app/_actions/admin'
import {
  acceptStoreAction,
  rejectStoreAction,
} from '@/app/_actions/clerk/seller'
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
import { Check } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import * as React from 'react'
import { toast } from 'sonner'
import { Icons } from '../icons'
import { Badge } from '../ui/badge'

interface PostTableShellProps {
  data: Store[]
  pageCount: number
}

export function StoresTableShell({ data, pageCount }: PostTableShellProps) {
  const router = useRouter()
  async function acceptStore(id: string) {
    const res = await acceptStoreAction(id)
    if (res.status === 204 || 200) {
      toast.success(res.body.message)
      router.refresh()
    } else {
      toast.error(res.body.message)
    }
  }
  async function rejectStore(id: string) {
    const res = await rejectStoreAction(id)
    if (res.status === 204 || 200) {
      toast.success(res.body.message)
      router.refresh()
    } else {
      toast.error(res.body.message)
    }
  }
  // Memoize the columns so they don't re-render on every render
  const columns = React.useMemo<ColumnDef<Clerk, unknown>[]>(
    () => [
      {
        accessorKey: 'image_owner',
        header: ({ column }) => {
          return <div>image</div>
        },
        cell: ({ row }) => {
          const image_url: string = row.getValue('image_owner')
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
        accessorKey: 'owner',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Owner" />
        ),
      },
      {
        accessorKey: 'email_owner',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Email" />
        ),
      },
      {
        accessorKey: 'title',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Store" />
        ),
      },
      {
        accessorKey: 'status',
        header: ({ column }) => {
          return <div>Status</div>
        },
        cell: ({ row }) => {
          const status: string = row.getValue('status')
          return (
            <div className="flex flex-wrap gap-1">
              <div
                className={cn(
                  status === 'ACCEPTED'
                    ? 'bg-green-300 text-green-600'
                    : status === 'REJECTED'
                      ? 'bg-red-300 text-red-600'
                      : 'bg-yellow-300 text-yellow-600',
                  'py-0.5 px-1 rounded-sm text-xs'
                )}
              >
                {status}
              </div>
            </div>
          )
        },
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
          const status = row.original.status
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
                  <Link href={`/clerk/seller/stores/${slug}`}>View store</Link>
                </DropdownMenuItem>
                {status !== 'ACCEPTED' && (
                  <DropdownMenuItem asChild>
                    <button
                      onClick={() => acceptStore(slug)}
                      className="w-full hover:bg-green-300 flex justify-between focus:bg-green-300 bg-green-200"
                    >
                      <p>Accept clerk</p>
                      <p className="">
                        <Check size={12} />
                      </p>
                    </button>
                  </DropdownMenuItem>
                )}
                {status !== 'REJECTED' && (
                  <DropdownMenuItem asChild>
                    <button
                      onClick={() => rejectStore(slug)}
                      className="w-full hover:bg-red-300 flex justify-between focus:bg-red-300 bg-red-200"
                    >
                      <p>Reject clerk</p>
                      <p className="">
                        <Icons.close size={12} />
                      </p>
                    </button>
                  </DropdownMenuItem>
                )}
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
