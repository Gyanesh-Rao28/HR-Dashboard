import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface User {
    id: string
    email: string
    name: string
    role: "admin" | "manager" | "user"
}

interface AuthStore {
    user: User | null
    isAuthenticated: boolean
    isLoading: boolean

    // Actions
    login: (email: string, password: string) => Promise<boolean>
    logout: () => void
    setLoading: (loading: boolean) => void
}

// Mock users database
const mockUsers: User[] = [
    {
        id: "1",
        email: "admin@hr.com",
        name: "HR Admin",
        role: "admin",
    },
    {
        id: "2",
        email: "manager@hr.com",
        name: "HR Manager",
        role: "manager",
    },
    {
        id: "3",
        email: "user@hr.com",
        name: "HR User",
        role: "user",
    },
]

export const useAuthStore = create<AuthStore>()(
    persist(
        (set, get) => ({
            user: null,
            isAuthenticated: false,
            isLoading: false,

            login: async (email: string, password: string) => {
                set({ isLoading: true })

                // Simulate API call delay
                await new Promise((resolve) => setTimeout(resolve, 1000))

                // Mock authentication logic
                const user = mockUsers.find((u) => u.email === email)

                // Simple password check (in real app, this would be hashed)
                const validPasswords: Record<string, string> = {
                    "admin@hr.com": "admin123",
                    "manager@hr.com": "manager123",
                    "user@hr.com": "user123",
                }

                if (user && validPasswords[email] === password) {
                    set({
                        user,
                        isAuthenticated: true,
                        isLoading: false,
                    })
                    return true
                } else {
                    set({ isLoading: false })
                    return false
                }
            },

            logout: () => {
                set({
                    user: null,
                    isAuthenticated: false,
                    isLoading: false,
                })
            },

            setLoading: (loading: boolean) => {
                set({ isLoading: loading })
            },
        }),
        {
            name: "auth-storage",
            partialize: (state) => ({
                user: state.user,
                isAuthenticated: state.isAuthenticated,
            }),
        },
    ),
)
