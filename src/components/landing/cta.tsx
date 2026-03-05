import Link from "next/link"
import { Button } from "@/components/ui/button"

const sectionId = "cta"

export function Cta() {
    return (
        <section id={sectionId} className="px-6 py-24">
            <div className="mx-auto max-w-5xl">
                <div className="relative overflow-hidden rounded-xl bg-primary px-6 py-20 text-center text-primary-foreground sm:px-16">
                    <div
                        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-foreground/10 via-transparent to-transparent"
                        aria-hidden="true"
                    />

                    <div className="relative">
                        <h2 className="font-bold text-3xl tracking-tight sm:text-4xl">
                            Start building today
                        </h2>
                        <p className="mx-auto mt-4 max-w-xl text-lg text-primary-foreground/80">
                            Clone the repo. Configure your services. Ship your SaaS.
                        </p>

                        <div className="mt-10">
                            <Button asChild variant="secondary" size="lg">
                                <Link href="/sign-in">Get Started</Link>
                            </Button>
                        </div>

                        <p className="mt-4 text-primary-foreground/60 text-sm">
                            Free and open source
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
