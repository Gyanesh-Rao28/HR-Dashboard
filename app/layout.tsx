import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthWrapper } from "@/components/auth-wrapper"
import { SidebarTrigger } from "@/components/ui/sidebar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "HR Performance Dashboard",
  description: "Advanced HR management and performance tracking dashboard",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} [&::-webkit-scrollbar]:w-2
        [&::-webkit-scrollbar-track]:rounded-full
        [&::-webkit-scrollbar-track]:bg-gray-100
        [&::-webkit-scrollbar-thumb]:rounded-full
        [&::-webkit-scrollbar-thumb]:bg-gray-300
        dark:[&::-webkit-scrollbar-track]:bg-neutral-700
        dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AuthWrapper>
            {children}
            <SidebarTrigger 
              className="h-10 w-10 fixed bottom-8 right-8 z-50 bg-black text-white dark:bg-amber-500 rounded-lg shadow-lg hover:shadow-xl transition-shadow" />
          </AuthWrapper>
        </ThemeProvider>
      </body>
    </html>
  )
}