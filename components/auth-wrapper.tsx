"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useAuthStore } from "@/lib/auth-store"
import { Skeleton } from "@/components/ui/skeleton"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

interface AuthWrapperProps {
    children: React.ReactNode
}

export function AuthWrapper({ children }: AuthWrapperProps) {
    const { isAuthenticated } = useAuthStore()
    const router = useRouter()
    const pathname = usePathname()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Small delay to prevent hydration issues
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 100)

        return () => clearTimeout(timer)
    }, [])

    useEffect(() => {
        if (!isLoading) {
            if (!isAuthenticated && pathname !== "/login") {
                router.push("/login")
            } else if (isAuthenticated && pathname === "/login") {
                router.push("/")
            }
        }
    }, [isAuthenticated, pathname, router, isLoading])

    if (isLoading) {
        return (
            <div className="flex flex-col h-screen">
                <div className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                    <Skeleton className="h-6 w-6" />
                    <Skeleton className="h-4 w-px" />
                    <Skeleton className="h-6 w-32" />
                </div>
                <div className="flex-1 p-6">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <Skeleton className="h-8 w-64" />
                            <Skeleton className="h-4 w-96" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <Skeleton key={i} className="h-48 w-full" />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    // Always provide SidebarProvider to prevent hook errors
    return (
        <SidebarProvider>
            {/* Only show sidebar when authenticated and not on login page */}
            {isAuthenticated && pathname !== "/login" && <AppSidebar />}

            {/* Use SidebarInset only when authenticated, otherwise use regular div */}
            {isAuthenticated && pathname !== "/login" ? (
                <SidebarInset>
                    <main className="flex-1 overflow-auto">{children}</main>
                </SidebarInset>
            ) : (
                <main className="flex-1 overflow-auto">{children}</main>
            )}
        </SidebarProvider>
    )
}
