"use client"

import { useEffect, useState } from "react"
import { EmployeeCard } from "@/components/employee-card"
import { SearchFilters } from "@/components/search-filters"
import { useHRStore } from "@/lib/store"
import { fetchEmployees } from "@/lib/api"
import { Skeleton } from "@/components/ui/skeleton"

export default function Dashboard() {
  const { employees, setEmployees, getFilteredEmployees } = useHRStore()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadEmployees = async () => {
      if (employees.length === 0) {
        const data = await fetchEmployees()
        setEmployees(data)
      }
      setLoading(false)
    }

    loadEmployees()
  }, [employees.length, setEmployees])

  const filteredEmployees = getFilteredEmployees()

  if (loading) {
    return (
      <div className="flex flex-col h-full">
        <div className="flex-1 p-6">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="space-y-3">
                  <Skeleton className="h-48 w-full" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 p-6 overflow-auto">
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Employee Overview</h2>
            <p className="text-muted-foreground">Manage and track employee performance across your organization</p>
          </div>

          <SearchFilters />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEmployees.map((employee) => (
              <EmployeeCard key={employee.id} employee={employee} />
            ))}
          </div>

          {filteredEmployees.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No employees found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
