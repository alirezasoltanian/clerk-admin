'use client'

import { signOutAction } from '@/app/_actions/auth'
import { Icons } from '@/components/icons'
import { cn } from '@/lib/utils'
import type { SidebarNavItem } from '@/types'
import { LogOut } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Button, buttonVariants } from '../ui/button'

export interface SidebarNavProps {
  items: SidebarNavItem[]
}

export function SidebarNav({ items }: SidebarNavProps) {
  const pathname = usePathname()
  const router = useRouter()
  if (!items?.length) return null
  async function signOutClick() {
    const resStatus = await signOutAction()
    if (resStatus === 200) {
      router.refresh()
    }
  }
  return (
    <div className="flex w-full flex-col gap-2">
      {items.map((item, index) => {
        const Icon = Icons[item.icon ?? 'chevronLeft']

        return item.href ? (
          <div>
            <Link
              key={index}
              href={item.href}
              aria-label="account sidebar"
              target={item.external ? '_blank' : ''}
              rel={item.external ? 'noreferrer' : ''}
            >
              <span
                className={cn(
                  'group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:bg-muted hover:text-foreground',
                  pathname.includes(item.href)
                    ? 'bg-muted font-medium text-foreground'
                    : 'text-muted-foreground',
                  item.disabled && 'pointer-events-none opacity-60'
                )}
              >
                <Icon className="mr-2 h-4 w-4" aria-hidden="true" />
                <span>{item.title}</span>
              </span>
            </Link>
            {pathname.includes(item.href) && !!item.items.length && (
              <div className="ml-1 mt-1 space-y-1">
                {item.items.map((item, index) => {
                  const Icon = Icons[item.icon ?? 'chevronLeft']

                  return item.href ? (
                    <div>
                      <Link
                        key={index}
                        href={item.href}
                        aria-label="account sidebar"
                        target={item.external ? '_blank' : ''}
                        rel={item.external ? 'noreferrer' : ''}
                      >
                        <span
                          className={cn(
                            'group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:bg-muted hover:text-foreground text-sm',
                            pathname === item.href
                              ? 'bg-muted font-medium text-foreground'
                              : 'text-muted-foreground',
                            item.disabled && 'pointer-events-none opacity-60'
                          )}
                        >
                          <Icon className="mr-2 h-4 w-4" aria-hidden="true" />
                          <span>{item.title}</span>
                        </span>
                      </Link>
                    </div>
                  ) : (
                    <span
                      key={index}
                      className="flex w-full cursor-not-allowed items-center rounded-md p-2 text-muted-foreground hover:underline"
                    >
                      {item.title}
                    </span>
                  )
                })}
              </div>
            )}
          </div>
        ) : (
          <span
            key={index}
            className="flex w-full cursor-not-allowed items-center rounded-md p-2 text-muted-foreground hover:underline"
          >
            {item.title}
          </span>
        )
      })}
      <Button
        className={cn(buttonVariants({ size: 'sm' }))}
        onClick={async () => {
          const resStatus = await signOutAction()

          if (resStatus === 200) {
            router.refresh()
          }
        }}
      >
        <span className={cn('group flex w-full items-center  px-2 py-1 ')}>
          <Icons.logOut className="mr-2 h-4 w-4" aria-hidden="true" />
          <span>Logout</span>
        </span>
      </Button>
    </div>
  )
}
