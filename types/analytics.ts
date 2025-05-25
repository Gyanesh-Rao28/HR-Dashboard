// types/analytics.ts
export interface DepartmentData {
    department: string
    averageRating: number
    employeeCount: number
    bookmarked: number
    promoted: number
    efficiency: number
    satisfaction: number
}

export interface RatingData {
    rating: number
    label: string
    count: number
    percentage: string
}

export interface TrendData {
    month: string
    bookmarks: number
    promotions: number
    performance: number
    satisfaction: number
}

export interface MetricData {
    metric: string
    score: number
}

export interface AgeData {
    range: string
    count: number
}

export interface StatItem {
    label: string
    value: number
    color?: string
}

export interface AnalyticsColors {
    blue: string
    lightBlue: string
    navy: string
    slate: string
    emerald: string
    teal: string
    purple: string
    indigo: string
    violet: string
}

export const ANALYTICS_COLORS: AnalyticsColors = {
    blue: "#1e40af",
    lightBlue: "#3b82f6",
    navy: "#1e293b",
    slate: "#475569",
    emerald: "#059669",
    teal: "#0d9488",
    purple: "#7c3aed",
    indigo: "#4f46e5",
    violet: "#7c3aed",
  }