"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Star, ArrowLeft, Bookmark, TrendingUp, MapPin, Phone, Mail } from "lucide-react"
import { useHRStore, type Employee } from "@/lib/store"
import { generateMockProjects, generateMockFeedback } from "@/lib/api"
import Link from "next/link"

export default function EmployeeDetails() {
    const params = useParams()
    const id = Number.parseInt(params.id as string)
    const { employees, bookmarkedIds, promotedIds, toggleBookmark, togglePromotion } = useHRStore()
    const [employee, setEmployee] = useState<Employee | null>(null)
    const [projects, setProjects] = useState<any[]>([])
    const [feedback, setFeedback] = useState<any[]>([])

    useEffect(() => {
        const emp = employees.find((e) => e.id === id)
        setEmployee(emp || null)
        setProjects(generateMockProjects())
        setFeedback(generateMockFeedback())
    }, [id, employees])

    if (!employee) {
        return (
            <div className="flex flex-col">
                <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                    {/* <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" /> */}
                    <h1 className="text-lg font-semibold">Employee Not Found</h1>
                </header>
                <div className="flex-1 p-6">
                    <p>Employee not found.</p>
                </div>
            </div>
        )
    }

    const isBookmarked = bookmarkedIds.includes(employee.id)
    const isPromoted = promotedIds.includes(employee.id)

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
                <Button asChild variant="ghost" size="sm">
                    <Link href="/">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Dashboard
                    </Link>
                </Button>
                <Separator orientation="vertical" className="mr-2 h-4" />
                <h1 className="text-lg font-semibold">Employee Details</h1>
            </header>

            <div className="flex-1 p-6">
                <div className="space-y-6">
                    {/* Employee Header */}
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex flex-col md:flex-row gap-6">
                                <Avatar className="h-24 w-24">
                                    <AvatarImage
                                        src={employee.image || "/placeholder.svg"}
                                        alt={`${employee.firstName} ${employee.lastName}`}
                                    />
                                    <AvatarFallback className="text-lg">
                                        {employee.firstName[0]}
                                        {employee.lastName[0]}
                                    </AvatarFallback>
                                </Avatar>

                                <div className="flex-1">
                                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                                        <div>
                                            <h1 className="text-3xl font-bold">
                                                {employee.firstName} {employee.lastName}
                                            </h1>
                                            <p className="text-lg text-muted-foreground">{employee.company.title}</p>
                                            <div className="flex items-center gap-2 mt-2">
                                                <Badge variant="outline">{employee.company.department}</Badge>
                                                {isPromoted && (
                                                    <Badge variant="secondary">
                                                        <TrendingUp className="h-3 w-3 mr-1" />
                                                        Promoted
                                                    </Badge>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex gap-2">
                                            <Button
                                                variant={isBookmarked ? "default" : "outline"}
                                                onClick={() => toggleBookmark(employee.id)}
                                            >
                                                <Bookmark className={`h-4 w-4 mr-2 ${isBookmarked ? "fill-current" : ""}`} />
                                                {isBookmarked ? "Bookmarked" : "Bookmark"}
                                            </Button>
                                            <Button variant={isPromoted ? "default" : "outline"} onClick={() => togglePromotion(employee.id)}>
                                                <TrendingUp className="h-4 w-4 mr-2" />
                                                {isPromoted ? "Promoted" : "Promote"}
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                                        <div className="flex items-center gap-2">
                                            <Mail className="h-4 w-4 text-muted-foreground" />
                                            <span className="text-sm">{employee.email}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Phone className="h-4 w-4 text-muted-foreground" />
                                            <span className="text-sm">{employee.phone}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <MapPin className="h-4 w-4 text-muted-foreground" />
                                            <span className="text-sm">
                                                {employee.address.city}, {employee.address.state}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-medium">Performance Rating:</span>
                                            <div className="flex items-center gap-1">
                                                {renderStars(employee.performance || 3)}
                                                <span className="text-sm text-muted-foreground ml-2">({employee.performance || 3}/5)</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Tabs */}
                    <Tabs defaultValue="overview" className="space-y-4">
                        <TabsList>
                            <TabsTrigger value="overview">Overview</TabsTrigger>
                            <TabsTrigger value="projects">Projects</TabsTrigger>
                            <TabsTrigger value="feedback">Feedback</TabsTrigger>
                        </TabsList>

                        <TabsContent value="overview" className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Personal Information</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-2">
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Age:</span>
                                            <span>{employee.age}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Company:</span>
                                            <span>{employee.company.name}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Department:</span>
                                            <span>{employee.company.department}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Position:</span>
                                            <span>{employee.company.title}</span>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle>Address</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-2">
                                        <div>{employee.address.address}</div>
                                        <div>
                                            {employee.address.city}, {employee.address.state}
                                        </div>
                                        <div>{employee.address.country}</div>
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>

                        <TabsContent value="projects" className="space-y-4">
                            <div className="grid gap-4">
                                {projects.map((project) => (
                                    <Card key={project.id}>
                                        <CardContent className="p-6">
                                            <div className="flex items-center justify-between mb-4">
                                                <h3 className="font-semibold">{project.name}</h3>
                                                <Badge
                                                    variant={
                                                        project.status === "Completed"
                                                            ? "default"
                                                            : project.status === "In Progress"
                                                                ? "secondary"
                                                                : "outline"
                                                    }
                                                >
                                                    {project.status}
                                                </Badge>
                                            </div>
                                            <div className="space-y-2">
                                                <div className="flex justify-between text-sm">
                                                    <span>Progress</span>
                                                    <span>{project.progress}%</span>
                                                </div>
                                                <Progress value={project.progress} />
                                                <div className="flex justify-between text-sm text-muted-foreground">
                                                    <span>Deadline: {project.deadline}</span>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </TabsContent>

                        <TabsContent value="feedback" className="space-y-4">
                            <div className="grid gap-4">
                                {feedback.map((item) => (
                                    <Card key={item.id}>
                                        <CardContent className="p-6">
                                            <div className="flex items-start justify-between mb-4">
                                                <div>
                                                    <h4 className="font-semibold">{item.author}</h4>
                                                    <p className="text-sm text-muted-foreground">{item.date}</p>
                                                </div>
                                                <div className="flex items-center gap-1">{renderStars(item.rating)}</div>
                                            </div>
                                            <p className="text-sm">{item.comment}</p>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}
