import { SidebarNav } from '@/components/layout/sidebar-nav'
import { SidebarNavMobil } from '@/components/layout/sidebar-nav-mobile'
import { ScrollArea } from '@/components/ui/scroll-area'
import { SidebarNavItem } from '@/types'
import { redirect } from 'next/navigation'
// import { ArchitectashboardConfig } from '@/config/architect';

import React from 'react'
import { getUser } from '../_actions/auth'

export const AdminDashboard: SidebarNavItem[] = [
  {
    title: 'Account',
    href: '/clerk/account',
    icon: 'text',
    items: [],
  },
  {
    title: 'Seller',
    href: '/clerk/seller',
    icon: 'text',
    items: [
      {
        title: 'stores',
        href: '/clerk/seller/stores',
        icon: 'text',
        items: [],
      },
      {
        title: 'products',
        href: '/clerk/seller/products',
        icon: 'text',
        items: [],
      },
    ],
  },
  {
    title: 'Teacher',
    href: '/clerk/teacher',
    icon: 'text',
    items: [],
  },
  {
    title: 'Hiring',
    href: '/clerk/hiring',
    icon: 'text',
    items: [],
  },
  {
    title: 'Idea bank',
    href: '/clerk/idea',
    icon: 'text',
    items: [],
  },
]

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const userInformation = await getUser()
  console.log(userInformation.user?.role)

  if (
    !userInformation.isAuthenticated &&
    userInformation.user?.role !== 'CLERK'
  ) {
    redirect('/')
  }
  return (
    <div className="flex min-h-screen flex-col">
      <div className="container md:px-12 flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <SidebarNavMobil items={AdminDashboard} />

        <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto  border-r md:sticky md:block">
          <ScrollArea className="py-6 pr-6 lg:py-8">
            <SidebarNav items={AdminDashboard} />
          </ScrollArea>
        </aside>
        <main className="flex w-full flex-col overflow-hidden my-5">
          {children}
        </main>
      </div>
    </div>
  )
}
