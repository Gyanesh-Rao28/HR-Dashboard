"use client"

import { useEffect, useState } from "react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useHRStore } from "@/lib/store"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
    LineElement,
    RadialLinearScale,
    Filler,
} from "chart.js"
import { Bar, Line, Doughnut, Radar } from "react-chartjs-2"
import { Users, TrendingUp, Star, Award, Target, Activity, BarChart3, PieChart, Calendar, Crown, SquareArrowOutUpRight, StarIcon, Percent } from "lucide-react"
import Link from "next/link"

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
    LineElement,
    RadialLinearScale,
    Filler,
)

export default function AnalyticsPage() {
    const { employees, bookmarkedIds, promotedIds } = useHRStore()
    const [departmentData, setDepartmentData] = useState<any[]>([])
    const [ratingDistribution, setRatingDistribution] = useState<any[]>([])
    const [bookmarkTrends, setBookmarkTrends] = useState<any[]>([])
    const [performanceMetrics, setPerformanceMetrics] = useState<any[]>([])
    const [topEmployeesByDept, setTopEmployeesByDept] = useState<any[]>([])

    useEffect(() => {
        if (employees.length > 0) {
            // Calculate department-wise data
            const deptMap = new Map()
            employees.forEach((emp) => {
                const dept = emp.company.department
                if (!deptMap.has(dept)) {
                    deptMap.set(dept, { total: 0, count: 0, employees: [] })
                }
                const data = deptMap.get(dept)
                data.total += emp.performance || 3
                data.count += 1
                data.employees.push(emp)
            })

            const deptData = Array.from(deptMap.entries()).map(([dept, data]) => ({
                department: dept,
                averageRating: data.total / data.count,
                employeeCount: data.count,
                bookmarked: data.employees.filter((emp: any) => bookmarkedIds.includes(emp.id)).length,
                promoted: data.employees.filter((emp: any) => promotedIds.includes(emp.id)).length,
                efficiency: Math.random() * 30 + 70, // Mock efficiency score
                satisfaction: Math.random() * 20 + 80, // Mock satisfaction score
            }))

            setDepartmentData(deptData)

            // Get top 3 employees from each department
            const topEmployees = Array.from(deptMap.entries()).map(([dept, data]) => {
                const sortedEmployees = data.employees
                    .sort((a: any, b: any) => (b.performance || 3) - (a.performance || 3))
                    .slice(0, 3)

                return {
                    department: dept,
                    topEmployees: sortedEmployees,
                }
            })

            setTopEmployeesByDept(topEmployees)

            // Rating distribution
            const ratingMap = new Map()
            employees.forEach((emp) => {
                const rating = emp.performance || 3
                ratingMap.set(rating, (ratingMap.get(rating) || 0) + 1)
            })

            const ratingData = Array.from(ratingMap.entries()).map(([rating, count]) => ({
                rating: rating,
                label: `${rating} Star${rating !== 1 ? "s" : ""}`,
                count,
                percentage: ((count / employees.length) * 100).toFixed(1),
            }))

            setRatingDistribution(ratingData)

            // Performance metrics (radar chart data)
            const metrics = [
                { metric: "Technical Skills", score: 85 },
                { metric: "Communication", score: 78 },
                { metric: "Leadership", score: 72 },
                { metric: "Problem Solving", score: 88 },
                { metric: "Teamwork", score: 82 },
                { metric: "Innovation", score: 75 },
            ]

            setPerformanceMetrics(metrics)

            // Enhanced trends data
            const trends = [
                { month: "Jan", bookmarks: 5, promotions: 2, performance: 3.2, satisfaction: 78 },
                { month: "Feb", bookmarks: 8, promotions: 3, performance: 3.4, satisfaction: 80 },
                { month: "Mar", bookmarks: 12, promotions: 5, performance: 3.6, satisfaction: 82 },
                { month: "Apr", bookmarks: 15, promotions: 4, performance: 3.8, satisfaction: 85 },
                {
                    month: "May",
                    bookmarks: bookmarkedIds.length,
                    promotions: promotedIds.length,
                    performance: 4.0,
                    satisfaction: 87,
                },
                {
                    month: "Jun",
                    bookmarks: bookmarkedIds.length + 2,
                    promotions: promotedIds.length + 1,
                    performance: 4.1,
                    satisfaction: 89,
                },
            ]

            setBookmarkTrends(trends)
        }
    }, [employees, bookmarkedIds, promotedIds])

    // Professional color schemes
    const primaryColors = {
        blue: "#1e40af",
        lightBlue: "#3b82f6",
        navy: "#008080",
        slate: "#475569",
        emerald: "#059669",
        teal: "#0d9488",
        purple: "#7c3aed",
        indigo: "#4f46e5",
    }

    // Chart configurations
    const departmentChartData = {
        labels: departmentData.map((d) => d.department),
        datasets: [
            {
                label: "Average Rating",
                data: departmentData.map((d) => d.averageRating),
                backgroundColor: [
                    primaryColors.blue,
                    primaryColors.emerald,
                    primaryColors.purple,
                    primaryColors.teal,
                    primaryColors.indigo,
                    primaryColors.slate,
                ],
                borderColor: [
                    primaryColors.navy,
                    primaryColors.emerald,
                    primaryColors.purple,
                    primaryColors.teal,
                    primaryColors.indigo,
                    primaryColors.slate,
                ],
                borderWidth: 2,
                borderRadius: 8,
                borderSkipped: false,
            },
        ],
    }

    const departmentChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: "Department Performance Overview",
                font: {
                    size: 16,
                    weight: "bold" as const,
                },
                color: "#008080",
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 5,
                grid: {
                    color: "#e2e8f0",
                },
                ticks: {
                    color: "#64748b",
                },
            },
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    color: "#64748b",
                },
            },
        },
    }

    const ratingDoughnutData = {
        labels: ratingDistribution.map((r) => r.label),
        datasets: [
            {
                data: ratingDistribution.map((r) => r.count),
                backgroundColor: [
                    "#ef4444", // 1 star
                    "#f97316", // 2 stars
                    "#eab308", // 3 stars
                    "#22c55e", // 4 stars
                    "#3b82f6", // 5 stars
                ],
                borderColor: "#ffffff",
                borderWidth: 3,
                cutout: "60%",
            },
        ],
    }

    const ratingDoughnutOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "bottom" as const,
                labels: {
                    padding: 20,
                    usePointStyle: true,
                    font: { size: 12 },
                },
            },
            title: {
                display: true,
                text: "Performance Rating Distribution",
                font: {
                    size: 16,
                    weight: "bold" as const,
                },
                color: "#008080",
            },
        },
    }

    const trendsLineData = {
        labels: bookmarkTrends.map((t) => t.month),
        datasets: [
            {
                label: "Performance Score",
                data: bookmarkTrends.map((t) => t.performance),
                borderColor: primaryColors.blue,
                backgroundColor: `${primaryColors.blue}20`,
                tension: 0.4,
                fill: true,
                pointBackgroundColor: primaryColors.blue,
                pointBorderColor: "#ffffff",
                pointBorderWidth: 2,
                pointRadius: 6,
            },
            {
                label: "Employee Satisfaction",
                data: bookmarkTrends.map((t) => t.satisfaction),
                borderColor: primaryColors.emerald,
                backgroundColor: `${primaryColors.emerald}20`,
                tension: 0.4,
                fill: true,
                pointBackgroundColor: primaryColors.emerald,
                pointBorderColor: "#ffffff",
                pointBorderWidth: 2,
                pointRadius: 6,
            },
        ],
    }

    const trendsLineOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "top" as const,
                labels: {
                    usePointStyle: true,
                    padding: 20,
                },
            },
            title: {
                display: true,
                text: "Performance & Satisfaction Trends",
                font: {
                    size: 16,
                    weight: "bold" as const,
                },
                color: "#008080",
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: "#e2e8f0",
                },
                ticks: {
                    color: "#64748b",
                },
            },
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    color: "#64748b",
                },
            },
        },
    }

    const radarData = {
        labels: performanceMetrics.map((m) => m.metric),
        datasets: [
            {
                label: "Team Performance",
                data: performanceMetrics.map((m) => m.score),
                backgroundColor: `${primaryColors.purple}30`,
                borderColor: primaryColors.purple,
                borderWidth: 2,
                pointBackgroundColor: primaryColors.purple,
                pointBorderColor: "#ffffff",
                pointBorderWidth: 2,
                pointRadius: 6,
            },
        ],
    }

    const radarOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: "Team Performance Metrics",
                font: {
                    size: 16,
                    weight: "bold" as const,
                },
                color: "#008080",
            },
        },
        scales: {
            r: {
                beginAtZero: true,
                max: 100,
                grid: {
                    color: "#e2e8f0",
                },
                pointLabels: {
                    color: "#64748b",
                    font: { size: 11 },
                },
                ticks: {
                    display: false,
                },
            },
        },
    }

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star key={i} className={`h-3 w-3 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
        ))
    }

    return (
        <div className="flex flex-col">
            <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                {/* <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" /> */}
                <h1 className="text-lg font-semibold">Analytics Dashboard</h1>
            </header>

            <div className="flex-1 p-6 bg-slate-50 dark:bg-slate-900">
                <div className="space-y-6">
                    <div>
                        <h2 className="text-3xl font-bold mb-2 text-slate-800 dark:text-slate-200">Performance Analytics</h2>
                        <p className="text-slate-600 dark:text-slate-400">
                            Comprehensive insights and trends across your organization
                        </p>
                    </div>

                    {/* Enhanced Summary Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium opacity-90">Total Employees</CardTitle>
                                <Users className="h-5 w-5 opacity-80" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold">{employees.length}</div>
                                <div className="flex items-center gap-1 mt-2">
                                    <TrendingUp className="h-4 w-4" />
                                    <span className="text-sm opacity-90">+12% from last month</span>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white border-0">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium opacity-90">Bookmarked</CardTitle>
                                <Star className="h-5 w-5 opacity-80" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold">{bookmarkedIds.length}</div>
                                <div className="flex items-center gap-1 mt-2">
                                    <Target className="h-4 w-4" />
                                    <span className="text-sm opacity-90">
                                        {employees.length > 0 ? ((bookmarkedIds.length / employees.length) * 100).toFixed(1) : 0}% of total
                                    </span>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium opacity-90">Promoted</CardTitle>
                                <Award className="h-5 w-5 opacity-80" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold">{promotedIds.length}</div>
                                <div className="flex items-center gap-1 mt-2">
                                    <Activity className="h-4 w-4" />
                                    <span className="text-sm opacity-90">
                                        {employees.length > 0 ? ((promotedIds.length / employees.length) * 100).toFixed(1) : 0}% promoted
                                    </span>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-gradient-to-br from-teal-500 to-teal-600 text-white border-0">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium opacity-90">Avg Rating</CardTitle>
                                <BarChart3 className="h-5 w-5 opacity-80" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold">
                                    {employees.length > 0
                                        ? (employees.reduce((sum, emp) => sum + (emp.performance || 3), 0) / employees.length).toFixed(1)
                                        : "0"}
                                </div>
                                <div className="flex items-center gap-1 mt-2">
                                    <TrendingUp className="h-4 w-4" />
                                    <span className="text-sm opacity-90">out of 5.0</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Main Charts Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Card className="shadow-lg">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <BarChart3 className="h-5 w-5 text-blue-600" />
                                    Department Performance
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[350px]">
                                    {departmentData.length > 0 && <Bar data={departmentChartData} options={departmentChartOptions} />}
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="shadow-lg">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <PieChart className="h-5 w-5 text-emerald-600" />
                                    Rating Distribution
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[350px]">
                                    {ratingDistribution.length > 0 && (
                                        <Doughnut data={ratingDoughnutData} options={ratingDoughnutOptions} />
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Secondary Charts Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <Card className="shadow-lg">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Activity className="h-5 w-5 text-purple-600" />
                                    Performance Metrics
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[300px]">
                                    {performanceMetrics.length > 0 && <Radar data={radarData} options={radarOptions} />}
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="shadow-lg">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Crown className="h-5 w-5 text-yellow-600" />
                                    Top Performers
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[300px] overflow-y-auto space-y-4
                                                [&::-webkit-scrollbar]:w-2
                                                [&::-webkit-scrollbar-track]:rounded-full
                                                [&::-webkit-scrollbar-track]:bg-gray-100
                                                [&::-webkit-scrollbar-thumb]:rounded-full
                                                [&::-webkit-scrollbar-thumb]:bg-gray-300
                                                dark:[&::-webkit-scrollbar-track]:bg-neutral-700
                                                dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
                                    {topEmployeesByDept.map((dept) => (
                                        <div key={dept.department} className="space-y-2 mx-2">
                                            <h4 className="font-semibold text-sm text-slate-600 dark:text-slate-400 border-b pb-1">
                                                {dept.department}
                                            </h4>
                                            <div className="space-y-2">
                                                {dept.topEmployees.map((emp: any, index: number) => (
                                                    <div
                                                        key={emp.id}
                                                        className="flex items-center gap-3 p-2 rounded-lg bg-slate-50 dark:bg-slate-800"
                                                    >
                                                        <div className="flex items-center gap-2">
                                                            <span
                                                                className={`text-xs font-bold px-2 py-1 rounded-full ${index === 0
                                                                    ? "bg-yellow-100 text-yellow-800"
                                                                    : index === 1
                                                                        ? "bg-gray-100 text-gray-800"
                                                                        : "bg-orange-100 text-orange-800"
                                                                    }`}
                                                            >
                                                                #{index + 1}
                                                            </span>
                                                            <Avatar className="h-6 w-6">
                                                                <AvatarImage
                                                                    src={emp.image || "/placeholder.svg"}
                                                                    alt={`${emp.firstName} ${emp.lastName}`}
                                                                />
                                                                <AvatarFallback className="text-xs">
                                                                    {emp.firstName[0]}
                                                                    {emp.lastName[0]}
                                                                </AvatarFallback>
                                                            </Avatar>
                                                        </div>
                                                        <div className="flex-1 min-w-0 flex items-center justify-between gap-2">
                                                            <div className="flex-1 min-w-0">
                                                                <p className="text-xs font-medium truncate">
                                                                    {emp.firstName} {emp.lastName}
                                                                </p>
                                                                <div className="flex items-center gap-1 mt-1">
                                                                    {renderStars(emp.performance || 3)}
                                                                </div>
                                                            </div>
                                                            <Link
                                                                href={`/employee/${emp.id}`}
                                                                className="flex-shrink-0 p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-colors"
                                                            >
                                                                <SquareArrowOutUpRight className="h-3 w-3 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200" />
                                                            </Link>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="shadow-lg">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Calendar className="h-5 w-5 text-indigo-600" />
                                    Quick Stats
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span>Team Efficiency</span>
                                        <span className="font-semibold">87%</span>
                                    </div>
                                    <Progress value={87} className="h-2" />
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span>Goal Achievement</span>
                                        <span className="font-semibold">92%</span>
                                    </div>
                                    <Progress value={92} className="h-2" />
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span>Employee Satisfaction</span>
                                        <span className="font-semibold">89%</span>
                                    </div>
                                    <Progress value={89} className="h-2" />
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span>Retention Rate</span>
                                        <span className="font-semibold">94%</span>
                                    </div>
                                    <Progress value={94} className="h-2" />
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Trends Chart */}
                    <Card className="shadow-lg">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <TrendingUp className="h-5 w-5 text-blue-600" />
                                Performance & Satisfaction Trends
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[400px]">
                                {bookmarkTrends.length > 0 && <Line data={trendsLineData} options={trendsLineOptions} />}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Department Overview */}
                    <Card className="shadow-lg">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Users className="h-5 w-5 text-slate-600" />
                                Department Overview
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {departmentData.map((dept, index) => (
                                    <div
                                        key={dept.department}
                                        className="p-4 border rounded-lg bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700"
                                    >
                                        <div className="flex items-center justify-between mb-3">
                                            <h4 className="font-semibold text-lg">{dept.department}</h4>
                                            <Badge variant="outline" className="bg-white dark:bg-slate-600">
                                                {dept.employeeCount} employees
                                            </Badge>
                                        </div>
                                        <div className="space-y-3">
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-slate-600 dark:text-slate-400">Performance</span>
                                                <div className="flex items-center gap-2">
                                                    <Progress value={(dept.averageRating / 5) * 100} className="w-16 h-2" />
                                                    <span className="text-sm font-semibold">{dept.averageRating.toFixed(1)}</span>
                                                    <StarIcon className="h-5 w-5"/>
                                                </div>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-slate-600 dark:text-slate-400">Efficiency</span>
                                                <div className="flex items-center gap-2">
                                                    <Progress value={dept.efficiency} className="w-16 h-2" />
                                                    <span className="text-sm font-semibold">{dept.efficiency.toFixed(0)}</span>
                                                    <Percent className="h-5 w-5" />
                                                </div>
                                            </div>
                                            <div className="flex gap-2 mt-3">
                                                <Badge variant="secondary" className="text-xs">
                                                    {dept.bookmarked} bookmarked
                                                </Badge>
                                                <Badge variant="default" className="text-xs">
                                                    {dept.promoted} promoted
                                                </Badge>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}