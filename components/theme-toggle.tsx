"use client"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
    const { theme, setTheme } = useTheme()

    return (
        <Button
            variant="ghost"
            size="sm"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="w-full relative overflow-hidden hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200 rounded-lg p-3 border border-slate-200/50 dark:border-slate-700/50 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm"
        >
            <div className="flex items-center justify-center gap-2">
                <div className="relative w-4 h-4">
                    <Sun className="h-4 w-4 absolute inset-0 text-amber-500 rotate-0 scale-100 transition-all duration-300 ease-in-out dark:-rotate-90 dark:scale-0 dark:opacity-0" />
                    <Moon className="h-4 w-4 absolute inset-0 text-blue-400 rotate-90 scale-0 opacity-0 transition-all duration-300 ease-in-out dark:rotate-0 dark:scale-100 dark:opacity-100" />
                </div>
                <span className="text-xs font-medium text-slate-600 dark:text-slate-300">
                    {theme === "light" ? "Switch to Dark" : "Switch to Light"}
                </span>
            </div>
            <span className="sr-only">Toggle between light and dark theme</span>
        </Button>
    )
}