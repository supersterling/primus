"use client"

import NumberFlow from "@number-flow/react"
import { ArrowRight, BadgeCheck } from "lucide-react"
import { useCallback, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

type Frequency = "monthly" | "yearly"

type Plan = {
    id: string
    name: string
    price: Record<Frequency, number | string>
    description: string
    features: string[]
    cta: string
    popular?: boolean
}

const plans: Plan[] = [
    {
        id: "free",
        name: "Free",
        price: {
            monthly: "Free forever",
            yearly: "Free forever",
        },
        description: "Perfect for side projects and getting started.",
        features: [
            "Auth + social login",
            "PostgreSQL database",
            "Background jobs",
            "Community support",
        ],
        cta: "Get started",
    },
    {
        id: "pro",
        name: "Pro",
        price: {
            monthly: 29,
            yearly: 24,
        },
        description: "Everything you need for a serious SaaS.",
        features: [
            "Everything in Free",
            "Priority support",
            "Custom domain",
            "Analytics dashboard",
            "Team collaboration",
            "Webhook management",
            "Advanced billing",
        ],
        cta: "Upgrade to Pro",
        popular: true,
    },
    {
        id: "enterprise",
        name: "Enterprise",
        price: {
            monthly: "Custom pricing",
            yearly: "Custom pricing",
        },
        description: "For teams that need dedicated support and SLAs.",
        features: [
            "Everything in Pro",
            "Dedicated support",
            "SLA guarantee",
            "Custom integrations",
            "SSO / SAML",
            "Audit logs",
        ],
        cta: "Contact sales",
    },
]

const sectionId = "pricing"

export function Pricing() {
    const [frequency, setFrequency] = useState<Frequency>("monthly")

    const handleFrequencyChange = useCallback((value: string) => {
        if (value === "monthly" || value === "yearly") {
            setFrequency(value)
        }
    }, [])

    return (
        <section id={sectionId} className="px-6 py-24">
            <div className="mx-auto max-w-5xl">
                <div className="flex flex-col items-center gap-8 text-center">
                    <h2 className="text-pretty text-4xl tracking-tight">
                        Pricing that scales with you
                    </h2>
                    <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                        Start free, upgrade when you're ready. No surprises.
                    </p>

                    <Tabs defaultValue={frequency} onValueChange={handleFrequencyChange}>
                        <TabsList>
                            <TabsTrigger value="monthly">Monthly</TabsTrigger>
                            <TabsTrigger value="yearly">
                                Yearly
                                <Badge variant="secondary">20% off</Badge>
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>

                    <div className="mt-8 grid w-full max-w-4xl gap-4 md:grid-cols-3">
                        {plans.map((plan) => (
                            <PricingCard key={plan.id} plan={plan} frequency={frequency} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

function PricingCard({ plan, frequency }: { plan: Plan; frequency: Frequency }) {
    const price = plan.price[frequency]
    const isNumeric = typeof price === "number"

    return (
        <Card
            className={cn(
                "relative w-full text-left",
                plan.popular === true && "ring-2 ring-primary",
            )}
        >
            {plan.popular === true && (
                <Badge className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full">
                    Popular
                </Badge>
            )}
            <CardHeader>
                <CardTitle className="font-medium text-xl">{plan.name}</CardTitle>
                <CardDescription>
                    <p>{plan.description}</p>
                    {isNumeric ? (
                        <NumberFlow
                            className="font-medium text-foreground"
                            format={{
                                style: "currency",
                                currency: "USD",
                                maximumFractionDigits: 0,
                            }}
                            suffix={`/month, billed ${frequency}.`}
                            value={price}
                        />
                    ) : (
                        <span className="font-medium text-foreground">{price}.</span>
                    )}
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-2">
                {plan.features.map((feature) => (
                    <div className="flex gap-2 text-muted-foreground text-sm" key={feature}>
                        <BadgeCheck className="h-[1lh] w-4 flex-none" />
                        {feature}
                    </div>
                ))}
            </CardContent>
            <CardFooter>
                <Button
                    className="w-full"
                    variant={plan.popular === true ? "default" : "secondary"}
                >
                    {plan.cta}
                    <ArrowRight className="ml-2 size-4" />
                </Button>
            </CardFooter>
        </Card>
    )
}
