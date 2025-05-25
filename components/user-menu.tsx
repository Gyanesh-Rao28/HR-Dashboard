"use client"

import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut, User, Settings, Shield } from "lucide-react"
import { useAuthStore } from "@/lib/auth-store"

export function UserMenu() {
    const { user, logout } = useAuthStore()
    const router = useRouter()

    if (!user) return null

    const handleLogout = () => {
        logout()
        router.push("/login")
    }

    const getRoleColor = (role: string) => {
        switch (role) {
            case "admin":
                return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
            case "manager":
                return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
            case "user":
                return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
            default:
                return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
        }
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className="border-2 border-slate-400">
                <Button variant="ghost" className="relative h-auto w-full justify-start gap-2 px-2 py-2">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder.svg" alt={user.name} />
                        <AvatarFallback className="text-xs">{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col items-start text-left flex-1 min-w-0">
                        <span className="text-sm font-medium truncate">{user.name}</span>
                        <div className="flex items-center gap-2 w-full">
                            <span className="text-xs text-muted-foreground truncate flex-1">{user.email}</span>
                            <Badge variant="secondary" className={`text-xs px-1.5 py-0.5 ${getRoleColor(user.role)}`}>
                                {user.role}
                            </Badge>
                        </div>
                    </div>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                        <Badge variant="secondary" className={`text-xs w-fit ${getRoleColor(user.role)}`}>
                            <Shield className="mr-1 h-3 w-3" />
                            {user.role}
                        </Badge>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
