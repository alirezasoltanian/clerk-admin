'use client'

import { Icons } from '@/components/icons'
import { cn } from '@/lib/utils'
import type { SidebarNavItem } from '@/types'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Button, buttonVariants } from '../ui/button'

// import { signOutAction } from "@/app/_action/auth"

export interface SidebarNavProps {
  items: SidebarNavItem[]
}

export function SidebarNavMobil({ items }: SidebarNavProps) {
  const pathname = usePathname()
  const router = useRouter()

  if (!items?.length) return null
  async function signOutClick() {
    // const resStatus =  await signOutAction()

    // if (resStatus === 200) {
    router.refresh()
    // }
  }
  return (
    <div className="flex flex-wrap md:hidden  justify-center p-2 mt-7 w-fit border rounded-md gap-2">
      {items.map((item, index) => {
        const Icon = Icons[item.icon ?? 'chevronLeft']

        return (
          item.href && (
            <Link
              key={index}
              aria-label="account sidebar"
              href={item.href}
              target={item.external ? '_blank' : ''}
              rel={item.external ? 'noreferrer' : ''}
            >
              <span
                className={cn(
                  'group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:bg-muted hover:text-foreground',
                  pathname === item.href
                    ? 'bg-muted font-medium text-foreground'
                    : 'text-muted-foreground',
                  item.disabled && 'pointer-events-none opacity-60'
                )}
              >
                <Icon className="mr-2 h-4 w-4" aria-hidden="true" />
                {/* <span className="text-xs">{item.title}</span> */}
              </span>
            </Link>
          )
        )
      })}
      <Button
        aria-label="account sidebar"
        onClick={signOutClick}
        className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
      >
        <span className={cn('group flex w-full items-center  px-2 py-1 ')}>
          <Icons.logOut className="mr-2 h-4 w-4" aria-hidden="true" />
        </span>
      </Button>
    </div>
  )
}
