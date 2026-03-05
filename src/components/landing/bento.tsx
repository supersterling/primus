import { CreditCard, Lock, Shield, Zap } from "lucide-react"
import Image from "next/image"
import { ChatConversation } from "@/components/landing/chat-conversation"
import { InngestFlow } from "@/components/landing/inngest-flow"
import { TypeSafetyCode } from "@/components/landing/type-safety-code"
import { Card, CardContent } from "@/components/ui/card"

const sectionId = "features"

export function Bento() {
    return (
        <section id={sectionId} className="w-full px-6 py-24">
            <div className="mx-auto max-w-5xl">
                <div className="mb-16 text-center">
                    <h2 className="text-pretty text-4xl tracking-tight">
                        Everything you need to ship fast
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
                        Stop wasting weeks on boilerplate. Primus gives you auth, payments,
                        background jobs, and type safety out of the box.
                    </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 sm:grid-rows-[auto_auto]">
                    {/* Row 1: Auth (short) + Payments (tall) */}
                    <Card className="overflow-hidden border-border/50 py-0 sm:row-span-1">
                        <div className="relative overflow-hidden bg-muted/50">
                            <ChatConversation className="min-h-0" />
                            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-muted/90 via-muted/40 to-transparent" />
                        </div>
                        <CardContent className="space-y-2 py-6">
                            <div className="flex items-center gap-2 text-foreground">
                                <Shield className="size-5" aria-hidden="true" />
                                <h3 className="font-semibold">Authentication</h3>
                            </div>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                Better Auth with social login, email/password, and session
                                management. Ready in minutes, not days.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="overflow-hidden border-border/50 py-0 sm:row-span-2">
                        <div className="relative overflow-hidden bg-muted/50">
                            <Image
                                src="/images/polar-transactions.jpg"
                                alt="Polar payment transactions dashboard"
                                width={600}
                                height={600}
                                className="object-cover object-top"
                            />
                            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-muted/90 via-muted/40 to-transparent" />
                        </div>
                        <CardContent className="space-y-2 py-6">
                            <div className="flex items-center gap-2 text-foreground">
                                <CreditCard className="size-5" aria-hidden="true" />
                                <h3 className="font-semibold">Payments</h3>
                            </div>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                Polar integration for subscriptions, one-time payments, and
                                webhook-driven billing. No Stripe complexity.
                            </p>
                        </CardContent>
                    </Card>

                    {/* Row 2: Code (tall) + Inngest (short) */}
                    <Card className="overflow-hidden border-border/50 py-0 sm:row-span-2">
                        <div className="relative overflow-hidden bg-muted/50">
                            <TypeSafetyCode />
                            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-muted/90 via-muted/40 to-transparent" />
                        </div>
                        <CardContent className="space-y-2 py-6">
                            <div className="flex items-center gap-2 text-foreground">
                                <Lock className="size-5" aria-hidden="true" />
                                <h3 className="font-semibold">Type Safety</h3>
                            </div>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                End-to-end types with Drizzle ORM, t3-env, and strict TypeScript.
                                Errors caught at compile time, not runtime.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="overflow-hidden border-border/50 py-0 sm:row-span-1">
                        <div className="relative overflow-hidden bg-muted/50">
                            <InngestFlow />
                            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-muted/90 via-muted/40 to-transparent" />
                        </div>
                        <CardContent className="space-y-2 py-6">
                            <div className="flex items-center gap-2 text-foreground">
                                <Zap className="size-5" aria-hidden="true" />
                                <h3 className="font-semibold">Background Jobs</h3>
                            </div>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                Inngest for durable workflows, scheduled tasks, and event-driven
                                functions. Built-in retry and observability.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    )
}
