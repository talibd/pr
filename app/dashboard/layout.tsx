"use client";

import { AppSidebar } from "@/components/app-sidebar"
import { NavActions } from "@/components/nav-actions"
import { AppBreadcrumbs } from "@/components/app-breadcrumbs"
import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { useEffect, useState, type ReactNode } from "react"

export default function Page({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return null
  return (
    <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-14 shrink-0 items-center gap-2">
                    <div className="flex flex-1 items-center gap-2 px-3">
                        <SidebarTrigger />
                        <Separator
                            orientation="vertical"
                            className="mr-2 data-[orientation=vertical]:h-4"
                        />
                        <AppBreadcrumbs />
                    </div>
                    <div className="ml-auto px-3">
                        <NavActions />
                    </div>
                </header>
                <div className="">
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
