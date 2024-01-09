'use client'

import { acceptClerkAction, rejectClerkAction } from '@/app/_actions/admin'
import {
  acceptTeacherAction,
  rejectTeacherAction,
} from '@/app/_actions/clerk/teacher'
import { DataTable } from '@/components/data-table/data-table'
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn, formatDate, formatPrice } from '@/lib/utils'
import { DIYTeacher } from '@/types/teacher'
import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { type ColumnDef } from '@tanstack/react-table'
import { Check, Download } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import * as React from 'react'
import { toast } from 'sonner'
import { Icons } from '../icons'
import { Badge } from '../ui/badge'
import { Button, buttonVariants } from '../ui/button'

const DIYTeacherTableShell: React.FC<{
  data: DIYTeacher[]
  pageCount: number
}> = ({ data, pageCount }) => {
  const columns = React.useMemo<ColumnDef<DIYTeacher, unknown>[]>(
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
        id: 'actions',
        cell: ({ row }) => {
          const slug = row.original.uuid
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
                  <Link href={`/clerk/diys/teacher/${slug}`}>Show DIYS</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )
        },
      },
    ],
    [data]
  )

  return <DataTable columns={columns} data={data} pageCount={pageCount} />
}

export { DIYTeacherTableShell }
