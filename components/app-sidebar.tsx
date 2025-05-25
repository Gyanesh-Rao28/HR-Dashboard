"use client"

import { Home, Users, Bookmark, BarChart3, Settings, Link2, ExternalLink } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarHeader,
    SidebarFooter,
} from "@/components/ui/sidebar"
import { ThemeToggle } from "@/components/theme-toggle"

import { Inter, Playfair_Display, Raleway, Poppins } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const playfair = Playfair_Display({ subsets: ["latin"], weight: "600" });
const raleway = Raleway({ subsets: ["latin"], weight: "600" });
const poppins = Poppins({ subsets: ["latin"], weight: "600" });

const menuItems = [
    {
        title: "Dashboard",
        url: "/",
        icon: Home,
    },
    {
        title: "Bookmarks",
        url: "/bookmarks",
        icon: Bookmark,
    },
    {
        title: "Analytics",
        url: "/analytics",
        icon: BarChart3,
    },
]

export function AppSidebar() {
    const pathname = usePathname()

    return (
        <Sidebar>
            <SidebarHeader>
                <div className="flex items-center gap-2 px-2 py-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                        <Users className="h-4 w-4" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-semibold">HR Dashboard</span>
                        <span className="text-xs text-muted-foreground">Performance Tracker</span>
                    </div>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {menuItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild isActive={pathname === item.url}>
                                        <Link href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <div className="flex flex-col gap-3 px-2 py-3">
                    
                    <div className="flex justify-center">
                        <ThemeToggle />
                    </div>

                    <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 dark:from-blue-400/30 dark:via-purple-400/30 dark:to-pink-400/30 rounded-lg blur-sm group-hover:blur-none transition-all duration-300"></div>
                        <div className="relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 rounded-lg p-3 group-hover:shadow-lg transition-all duration-300">
                            <p className="text-[10px] text-slate-500 dark:text-slate-400 mb-1 tracking-wide uppercase">
                                Developed by
                            </p>
                            <a
                                href="https://gyaneshrao.vercel.app/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`${poppins.className} text-sm font-bold block group-hover:scale-105 transition-transform duration-200`}
                            >
                                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 dark:hover:from-blue-300 dark:hover:via-purple-300 dark:hover:to-pink-300 transition-all duration-300">
                                    S Gyanesh Rao
                                </span>
                                <ExternalLink className="inline-block ml-1 h-3 w-3 text-slate-400 dark:text-slate-500 group-hover:text-purple-500 dark:group-hover:text-purple-400 transition-colors duration-200" />
                            </a>
                        </div>
                    </div>
                </div>
            </SidebarFooter>
        </Sidebar>
    )
}