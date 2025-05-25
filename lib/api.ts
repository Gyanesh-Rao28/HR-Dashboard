import type { Employee } from "./store"

export async function fetchEmployees(): Promise<Employee[]> {
    try {
        const response = await fetch("https://dummyjson.com/users?limit=100")
        const data = await response.json()

        return data.users.map((user: any) => ({
            ...user,
            performance: Math.floor(Math.random() * 5) + 1,
        }))
    } catch (error) {
        console.error("Failed to fetch employees:", error)
        return []
    }
}

export function generateMockProjects() {
    const projects = [
        "Website Redesign",
        "Mobile App Development",
        "Database Migration",
        "Security Audit",
        "Performance Optimization",
        "User Research",
        "API Integration",
        "Cloud Migration",
        "Training Program",
    ]

    return Array.from({ length: 3 }, (_, i) => ({
        id: i + 1,
        name: projects[Math.floor(Math.random() * projects.length)],
        status: ["In Progress", "Completed", "Planning"][Math.floor(Math.random() * 3)],
        progress: Math.floor(Math.random() * 100),
        deadline: new Date(Date.now() + Math.random() * 90 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    }))
}

export function generateMockFeedback() {
    const feedback = [
        "Excellent communication skills and team collaboration",
        "Shows great initiative in problem-solving",
        "Consistently meets deadlines and quality standards",
        "Strong technical skills and attention to detail",
        "Good leadership potential and mentoring abilities",
    ]

    return Array.from({ length: 3 }, (_, i) => ({
        id: i + 1,
        author: ["John Smith", "Sarah Wilson", "Mike Johnson"][i],
        date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        rating: Math.floor(Math.random() * 5) + 1,
        comment: feedback[Math.floor(Math.random() * feedback.length)],
    }))
}
