import { type Metadata } from "next"

export const metadata: Metadata = { title: "Dashboard" }

export default function DashboardPage() {
    return (
        <div className="p-6">
            <h1 className="text-pretty font-bold text-2xl">Dashboard</h1>
            <p className="mt-1 text-muted-foreground text-sm">Welcome back.</p>
        </div>
    )
}
