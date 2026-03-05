import { Check } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

type Tier = {
    name: string
    price: string
    description: string
    buttonLabel: string
    buttonVariant: "default" | "outline"
    popular: boolean
    features: string[]
}

const TIERS: Tier[] = [
    {
        name: "Free",
        price: "$0/month",
        description: "Perfect for side projects",
        buttonLabel: "Get Started",
        buttonVariant: "outline",
        popular: false,
        features: [
            "Auth + social login",
            "PostgreSQL database",
            "Background jobs",
            "Community support",
        ],
    },
    {
        name: "Pro",
        price: "$29/month",
        description: "For serious SaaS builders",
        buttonLabel: "Upgrade to Pro",
        buttonVariant: "default",
        popular: true,
        features: [
            "Everything in Free +",
            "Priority support",
            "Custom domain",
            "Analytics dashboard",
            "Team collaboration",
            "Webhook management",
            "Advanced billing",
        ],
    },
    {
        name: "Enterprise",
        price: "Custom",
        description: "For teams at scale",
        buttonLabel: "Contact Sales",
        buttonVariant: "outline",
        popular: false,
        features: [
            "Everything in Pro +",
            "Dedicated support",
            "SLA guarantee",
            "Custom integrations",
            "SSO/SAML",
            "Audit logs",
        ],
    },
]

function FeatureItem({ label }: { label: string }) {
    return (
        <li className="flex items-center gap-2 text-sm">
            <Check className="size-4 shrink-0 text-primary" />
            <span>{label}</span>
        </li>
    )
}

function PricingCard({ tier }: { tier: Tier }) {
    return (
        <Card className={cn("flex flex-col", tier.popular && "scale-105 border-primary shadow-md")}>
            <CardHeader>
                <div className="flex items-center gap-2">
                    <CardTitle className="text-lg">{tier.name}</CardTitle>
                    {tier.popular === true && <Badge>Popular</Badge>}
                </div>
                <div className="font-bold text-3xl tracking-tight">{tier.price}</div>
                <CardDescription>{tier.description}</CardDescription>
            </CardHeader>

            <CardContent className="flex-1">
                <Button variant={tier.buttonVariant} className="w-full">
                    {tier.buttonLabel}
                </Button>

                <Separator className="my-6" />

                <ul className="space-y-3">
                    {tier.features.map((feature) => (
                        <FeatureItem key={feature} label={feature} />
                    ))}
                </ul>
            </CardContent>
        </Card>
    )
}

const sectionId = "pricing"

export function Pricing() {
    return (
        <section id={sectionId} className="px-6 py-24">
            <div className="mx-auto max-w-5xl">
                <div className="mb-16 text-center">
                    <h2 className="font-bold text-3xl tracking-tight sm:text-4xl">
                        Pricing that scales with you
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Start free, upgrade when you're ready. No surprises.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-3 md:items-center">
                    {TIERS.map((tier) => (
                        <PricingCard key={tier.name} tier={tier} />
                    ))}
                </div>
            </div>
        </section>
    )
}
