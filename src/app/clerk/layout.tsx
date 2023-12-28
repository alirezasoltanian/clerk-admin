import { SidebarNav } from '@/components/layout/sidebar-nav'
import { SidebarNavMobil } from '@/components/layout/sidebar-nav-mobile'
import { ScrollArea } from '@/components/ui/scroll-area'
import { SidebarNavItem } from '@/types'
// import { getUser } from '../_action/auth';
import { redirect } from 'next/navigation'
// import { ArchitectashboardConfig } from '@/config/architect';

import React from 'react'

export const AdminDashboard: SidebarNavItem[] = [
  {
    title: 'Account',
    href: '/clerk/account',
    icon: 'text',
    items: [],
  },
]

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  //   const userInformation = await getUser();
  //   if (!userInformation.isAuthenticated && userInformation.user?.role !== "ARCHITECT") {
  //     redirect("/");
  //   }
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
