"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, Bookmark, TrendingUp, Eye } from "lucide-react"
import { type Employee, useHRStore } from "@/lib/store"
import Link from "next/link"

interface EmployeeCardProps {
    employee: Employee
}

export function EmployeeCard({ employee }: EmployeeCardProps) {
    const { bookmarkedIds, promotedIds, toggleBookmark, togglePromotion } = useHRStore()

    const isBookmarked = bookmarkedIds.includes(employee.id)
    const isPromoted = promotedIds.includes(employee.id)

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star key={i} className={`h-4 w-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
        ))
    }

    return (
        <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
                <div className="flex items-start gap-4">
                    <Avatar className="h-12 w-12">
                        <AvatarImage
                            src={employee.image || "/placeholder.svg"}
                            alt={`${employee.firstName} ${employee.lastName}`}
                        />
                        <AvatarFallback>
                            {employee.firstName[0]}
                            {employee.lastName[0]}
                        </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-lg truncate">
                                {employee.firstName} {employee.lastName}
                            </h3>
                            {isPromoted && (
                                <Badge variant="secondary" className="ml-2">
                                    <TrendingUp className="h-3 w-3 mr-1" />
                                    Promoted
                                </Badge>
                            )}
                        </div>

                        <p className="text-sm text-muted-foreground truncate">{employee.email}</p>
                        <p className="text-sm text-muted-foreground">Age: {employee.age}</p>

                        <div className="mt-2">
                            <Badge variant="outline">{employee.company.department}</Badge>
                        </div>

                        <div className="flex items-center gap-1 mt-2">
                            {renderStars(employee.performance || 3)}
                            <span className="text-sm text-muted-foreground ml-2">({employee.performance || 3}/5)</span>
                        </div>
                    </div>
                </div>
            </CardContent>

            <CardFooter className="flex flex-wrap gap-2 p-6 pt-0">
                <Button asChild variant="outline" size="sm">
                    <Link href={`/employee/${employee.id}`}>
                        <Eye className="h-4 w-4 mr-1" />
                        View
                    </Link>
                </Button>

                <Button variant={isBookmarked ? "default" : "outline"} size="sm" onClick={() => toggleBookmark(employee.id)}>
                    <Bookmark className={`h-4 w-4 mr-1 ${isBookmarked ? "fill-current" : ""}`} />
                    {isBookmarked ? "Bookmarked" : "Bookmark"}
                </Button>

                <Button variant={isPromoted ? "default" : "outline"} size="sm" onClick={() => togglePromotion(employee.id)}>
                    <TrendingUp className="h-4 w-4 mr-1" />
                    {isPromoted ? "Promoted" : "Promote"}
                </Button>
            </CardFooter>
        </Card>
    )
}
