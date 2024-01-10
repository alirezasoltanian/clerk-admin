'use client'

import {
  acceptHiringAction,
  clerkHiringAction,
  rejectHiringAction,
} from '@/app/_actions/clerk/hiring'
import { DataTable } from '@/components/data-table/data-table'
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn, formatDate } from '@/lib/utils'
import { Hiring } from '@/types/hiring'
import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { ColumnDef } from '@tanstack/react-table'
import { Check, Download } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import * as React from 'react'
import { toast } from 'sonner'
import { Icons } from '../icons'
import { Button } from '../ui/button'

interface PostTableShellProps {
  data: Hiring[]
  pageCount: number
}

export function HiringTableShell({ data, pageCount }: PostTableShellProps) {
  const [isPending, startTransition] = React.useTransition()

  const router = useRouter()
  async function acceptFunc(id: string) {
    const res = await acceptHiringAction(id)
    if (res.status === 204 || 200) {
      toast.success(res.body.message)
      router.refresh()
    } else {
      toast.error(res.body.message)
    }
  }
  async function rejectFunc(id: string) {
    const res = await rejectHiringAction(id)
    if (res.status === 204 || 200) {
      toast.success(res.body.message)
      router.refresh()
    } else {
      toast.error(res.body.message)
    }
  }
  async function actionFunc(action: string, id: string) {
    const res = await clerkHiringAction(action, id)
    if (res.status === 204 || 200) {
      toast.success(res.body.message)
      router.refresh()
    } else {
      toast.error(res.body.message)
    }
  }
  // Memoize the columns so they don't re-render on every render
  const columns = React.useMemo<ColumnDef<Hiring, unknown>[]>(
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
        accessorKey: 'full_name',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Name" />
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
        accessorKey: 'resume',
        header: () => {
          return <div>Resume</div>
        },
        cell: ({ row }) => {
          const status: string = row.getValue('status')
          return (
            <div className="">
              <Button
                disabled={row.original.resume === null}
                variant="outline"
                size={'icon'}
              >
                <a className={''} href={row.original.resume}>
                  <Download />
                </a>
              </Button>
            </div>
          )
        },
      },

      {
        accessorKey: 'created_at',
        header: ({ column }) => {
          return <div>image</div>
        },
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
                  <Link href={`/clerk/hiring/${slug}`}>View User</Link>
                </DropdownMenuItem>

                {status !== 'ACCEPTED' && (
                  <DropdownMenuItem asChild>
                    <button
                      onClick={() => {
                        startTransition(() => {
                          row.toggleSelected(false)
                          toast.promise(
                            actionFunc('accept', row.original.uuid),
                            {
                              loading: 'accepting...',
                            }
                          )
                        })
                      }}
                      className="w-full hover:bg-green-300 flex justify-between focus:bg-green-300 bg-green-200"
                    >
                      <p>Accept </p>
                      <p className="">
                        <Check size={12} />
                      </p>
                    </button>
                  </DropdownMenuItem>
                )}
                {status !== 'REJECTED' && (
                  <DropdownMenuItem asChild>
                    <button
                      onClick={() => {
                        startTransition(() => {
                          row.toggleSelected(false)

                          toast.promise(
                            actionFunc('reject', row.original.uuid),
                            {
                              loading: 'rejecting...',
                            }
                          )
                        })
                      }}
                      className="w-full hover:bg-red-300 flex justify-between focus:bg-red-300 bg-red-200"
                    >
                      <p>Reject </p>
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
    [data, isPending]
  )

  return <DataTable columns={columns} data={data} pageCount={pageCount} />
}
