import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface Employee {
    id: number
    firstName: string
    lastName: string
    email: string
    age: number
    phone: string
    image: string
    company: {
        department: string
        name: string
        title: string
    }
    address: {
        address: string
        city: string
        state: string
        country: string
    }
    performance?: number // 1-5 rating
}

interface HRStore {
    employees: Employee[]
    bookmarkedIds: number[]
    promotedIds: number[]
    searchQuery: string
    selectedDepartments: string[]
    selectedRatings: number[]

    // Actions
    setEmployees: (employees: Employee[]) => void
    toggleBookmark: (id: number) => void
    togglePromotion: (id: number) => void
    setSearchQuery: (query: string) => void
    setSelectedDepartments: (departments: string[]) => void
    setSelectedRatings: (ratings: number[]) => void

    // Computed
    getBookmarkedEmployees: () => Employee[]
    getFilteredEmployees: () => Employee[]
}

export const useHRStore = create<HRStore>()(
    persist(
        (set, get) => ({
            employees: [],
            bookmarkedIds: [],
            promotedIds: [],
            searchQuery: "",
            selectedDepartments: [],
            selectedRatings: [],

            setEmployees: (employees) => set({ employees }),

            toggleBookmark: (id) =>
                set((state) => ({
                    bookmarkedIds: state.bookmarkedIds.includes(id)
                        ? state.bookmarkedIds.filter((bookmarkId) => bookmarkId !== id)
                        : [...state.bookmarkedIds, id],
                })),

            togglePromotion: (id) =>
                set((state) => ({
                    promotedIds: state.promotedIds.includes(id)
                        ? state.promotedIds.filter((promotedId) => promotedId !== id)
                        : [...state.promotedIds, id],
                })),

            setSearchQuery: (searchQuery) => set({ searchQuery }),
            setSelectedDepartments: (selectedDepartments) => set({ selectedDepartments }),
            setSelectedRatings: (selectedRatings) => set({ selectedRatings }),

            getBookmarkedEmployees: () => {
                const { employees, bookmarkedIds } = get()
                return employees.filter((emp) => bookmarkedIds.includes(emp.id))
            },

            getFilteredEmployees: () => {
                const { employees, searchQuery, selectedDepartments, selectedRatings } = get()

                return employees.filter((employee) => {
                    // Search filter
                    const matchesSearch =
                        !searchQuery ||
                        employee.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        employee.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        employee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        employee.company.department.toLowerCase().includes(searchQuery.toLowerCase())

                    // Department filter
                    const matchesDepartment =
                        selectedDepartments.length === 0 || selectedDepartments.includes(employee.company.department)

                    // Rating filter
                    const matchesRating = selectedRatings.length === 0 || selectedRatings.includes(employee.performance || 3)

                    return matchesSearch && matchesDepartment && matchesRating
                })
            },
        }),
        {
            name: "hr-dashboard-storage",
            partialize: (state) => ({
                bookmarkedIds: state.bookmarkedIds,
                promotedIds: state.promotedIds,
            }),
        },
    ),
)
