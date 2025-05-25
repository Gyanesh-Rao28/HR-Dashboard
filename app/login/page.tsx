"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Users, Eye, EyeOff, Loader2, Mail, Lock, Shield, UserCheck, User } from "lucide-react"
import { useAuthStore } from "@/lib/auth-store"

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState("")
    const [focusedField, setFocusedField] = useState<string | null>(null)
    const router = useRouter()

    const { login, isLoading, isAuthenticated } = useAuthStore()

    // Redirect if already authenticated
    useEffect(() => {
        if (isAuthenticated) {
            router.push("/")
        }
    }, [isAuthenticated, router])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")

        const success = await login(email, password)

        if (success) {
            router.push("/")
        } else {
            setError("Invalid email or password. Please try again.")
        }
    }

    const fillDemoCredentials = (userType: "admin" | "manager" | "user") => {
        const credentials = {
            admin: { email: "admin@hr.com", password: "admin123" },
            manager: { email: "manager@hr.com", password: "manager123" },
            user: { email: "user@hr.com", password: "user123" },
        }

        setEmail(credentials[userType].email)
        setPassword(credentials[userType].password)
        setError("")
    }

    const roleConfigs = {
        admin: { icon: Shield, color: "text-red-600", bgColor: "bg-red-50 hover:bg-red-100" },
        manager: { icon: UserCheck, color: "text-blue-600", bgColor: "bg-blue-50 hover:bg-blue-100" },
        user: { icon: User, color: "text-green-600", bgColor: "bg-green-50 hover:bg-green-100" }
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-4 -right-4 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-8 -left-8 w-96 h-96 bg-primary/3 rounded-full blur-3xl"></div>
            </div>

            <Card className="w-full max-w-5xl shadow-2xl border-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl relative overflow-hidden">
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none"></div>

                {/* Header section */}
                <CardHeader className="space-y-1 text-center relative z-10 pb-8">
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <div className="relative">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg">
                                <Users className="h-7 w-7" />
                            </div>
                            <div className="absolute -inset-1 bg-primary/20 rounded-xl blur animate-pulse"></div>
                        </div>
                        <div className="text-left">
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
                                HR Dashboard
                            </h1>
                            <p className="text-sm text-muted-foreground font-medium">Performance Tracker</p>
                        </div>
                    </div>
                    <CardTitle className="text-3xl font-bold mb-2">Flam Assignment</CardTitle>
                    <CardDescription className="text-base">
                    🚀 Challenge: Build a Mini HR Performance Dashboard
                    </CardDescription>
                </CardHeader>

                <CardContent className="relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Left Side - Login Form */}
                        <div className="space-y-6">
                            <div className="text-center lg:text-left mb-6">
                                <h2 className="text-xl font-semibold mb-2">Sign In</h2>
                                <p className="text-muted-foreground">Enter your credentials to access your account</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-sm font-semibold">Email Address</Label>
                                    <div className="relative group">
                                        <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 transition-colors duration-200 ${focusedField === 'email' ? 'text-primary' : 'text-muted-foreground'
                                            }`} />
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="Enter your email address"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            onFocus={() => setFocusedField('email')}
                                            onBlur={() => setFocusedField(null)}
                                            required
                                            disabled={isLoading}
                                            className="pl-11 h-12 text-base border-2 transition-all duration-200 focus:border-primary focus:shadow-lg focus:shadow-primary/10"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="password" className="text-sm font-semibold">Password</Label>
                                    <div className="relative group">
                                        <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 transition-colors duration-200 ${focusedField === 'password' ? 'text-primary' : 'text-muted-foreground'
                                            }`} />
                                        <Input
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Enter your password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            onFocus={() => setFocusedField('password')}
                                            onBlur={() => setFocusedField(null)}
                                            required
                                            disabled={isLoading}
                                            className="pl-11 pr-12 h-12 text-base border-2 transition-all duration-200 focus:border-primary focus:shadow-lg focus:shadow-primary/10"
                                        />
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-10 px-3 hover:bg-primary/10 rounded-md transition-colors duration-200"
                                            onClick={() => setShowPassword(!showPassword)}
                                            disabled={isLoading}
                                        >
                                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                        </Button>
                                    </div>
                                </div>

                                {error && (
                                    <Alert variant="destructive" className="animate-in slide-in-from-top-2 duration-300">
                                        <AlertDescription className="font-medium">{error}</AlertDescription>
                                    </Alert>
                                )}

                                <Button
                                    type="submit"
                                    className="w-full h-12 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02]"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                            Signing in...
                                        </>
                                    ) : (
                                        "Sign in to Dashboard"
                                    )}
                                </Button>
                            </form>
                        </div>

                        {/* Right Side - Demo Credentials */}
                        <div className="space-y-6">
                            <div className="text-center lg:text-left mb-6">
                                <h2 className="text-xl font-semibold mb-2">Demo Accounts</h2>
                                <p className="text-muted-foreground">Quick access with pre-filled credentials</p>
                            </div>

                            <div className="space-y-4">
                                {(Object.entries(roleConfigs) as [keyof typeof roleConfigs, typeof roleConfigs[keyof typeof roleConfigs]][]).map(([role, config]) => {
                                    const IconComponent = config.icon;
                                    return (
                                        <Button
                                            key={role}
                                            variant="outline"
                                            size="lg"
                                            onClick={() => fillDemoCredentials(role)}
                                            disabled={isLoading}
                                            className={`justify-start h-auto p-4 border-2 transition-all duration-200 hover:scale-[1.02] hover:shadow-md ${config.bgColor} hover:border-current w-full`}
                                        >
                                            <div className="flex items-center gap-4 w-full">
                                                <div className={`p-3 rounded-lg bg-white shadow-sm ${config.color}`}>
                                                    <IconComponent className="h-6 w-6" />
                                                </div>
                                                <div className="text-left flex-1">
                                                    <p className="font-semibold text-lg capitalize">{role} Account</p>
                                                    <p className="text-muted-foreground text-sm">
                                                        {role}@hr.com • {role}123
                                                    </p>
                                                </div>
                                            </div>
                                        </Button>
                                    );
                                })}
                            </div>

                            
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}