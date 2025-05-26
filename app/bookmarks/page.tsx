"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, Bookmark, TrendingUp, Eye, X } from "lucide-react"
import { useHRStore } from "@/lib/store"
import Link from "next/link"

export default function BookmarksPage() {
    const { getBookmarkedEmployees, toggleBookmark, togglePromotion, promotedIds } = useHRStore()
    const bookmarkedEmployees = getBookmarkedEmployees()

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star key={i} className={`h-4 w-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
        ))
    }

    return (
        <div className="flex flex-col">
            <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                {/* <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" /> */}
                <h1 className="text-lg font-semibold">Bookmarked Employees</h1>
            </header>

            <div className="flex-1 p-6">
                <div className="space-y-6">
                    <div>
                        <h2 className="text-2xl font-bold mb-2">Your Bookmarks</h2>
                        <p className="text-muted-foreground">Manage your bookmarked employees and quick actions</p>
                    </div>

                    {bookmarkedEmployees.length === 0 ? (
                        <Card>
                            <CardContent className="p-12 text-center">
                                <Bookmark className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                                <h3 className="text-lg font-semibold mb-2">No bookmarks yet</h3>
                                <p className="text-muted-foreground mb-4">
                                    Start bookmarking employees to keep track of important team members
                                </p>
                                <Button asChild>
                                    <Link href="/">Browse Employees</Link>
                                </Button>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {bookmarkedEmployees.map((employee) => {
                                const isPromoted = promotedIds.includes(employee.id)

                                return (
                                    <Card key={employee.id} className="hover:shadow-lg transition-shadow">
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
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => toggleBookmark(employee.id)}
                                                            className="text-muted-foreground hover:text-foreground"
                                                        >
                                                            <X className="h-4 w-4" />
                                                        </Button>
                                                    </div>

                                                    <p className="text-sm text-muted-foreground truncate">{employee.email}</p>
                                                    <p className="text-sm text-muted-foreground">Age: {employee.age}</p>

                                                    <div className="mt-2 flex items-center gap-2">
                                                        <Badge variant="outline">{employee.company.department}</Badge>
                                                        {isPromoted && (
                                                            <Badge variant="secondary">
                                                                <TrendingUp className="h-3 w-3 mr-1" />
                                                                Promoted
                                                            </Badge>
                                                        )}
                                                    </div>

                                                    <div className="flex items-center gap-1 mt-2">
                                                        {renderStars(employee.performance || 3)}
                                                        <span className="text-sm text-muted-foreground ml-2">({employee.performance || 3}/5)</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>

                                        <CardFooter className="flex gap-2 p-6 pt-0">
                                            <Button asChild variant="outline" size="sm" className="flex-1">
                                                <Link href={`/employee/${employee.id}`}>
                                                    <Eye className="h-4 w-4 mr-1" />
                                                    View Details
                                                </Link>
                                            </Button>

                                            <Button
                                                variant={isPromoted ? "default" : "outline"}
                                                size="sm"
                                                onClick={() => togglePromotion(employee.id)}
                                                className="flex-1"
                                            >
                                                <TrendingUp className="h-4 w-4 mr-1" />
                                                {isPromoted ? "Promoted" : "Promote"}
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                )
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
