"use client"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

type FaqEntry = {
    question: string
    answer: string
}

const FAQ_ITEMS: FaqEntry[] = [
    {
        question: "What is Primus?",
        answer: "Primus is an opinionated Next.js 16 starter template that comes with authentication (Better Auth), payments (Polar), background jobs (Inngest), and a strictly typed database layer (Drizzle ORM). It's designed to eliminate weeks of boilerplate so you can focus on building your product.",
    },
    {
        question: "Is Primus free to use?",
        answer: "Yes, Primus is open source and free to use for any project. The pricing section above is a demo component included in the template — you'll customize it for your own SaaS pricing.",
    },
    {
        question: "What's included out of the box?",
        answer: "Authentication with social login and email/password, Polar payment integration with webhooks, Inngest background job processing, Drizzle ORM with PostgreSQL, Biome linting with custom GritQL rules, shadcn/ui components, and strict TypeScript configuration.",
    },
    {
        question: "Can I use a different payment provider?",
        answer: "Primus ships with Polar integration, but the payment layer is modular. You can swap it for Stripe or any other provider by updating the webhook handlers and checkout flow.",
    },
    {
        question: "How do I deploy?",
        answer: "Primus is built for Vercel deployment. Push to your repository, connect it to Vercel, set your environment variables, and you're live. Inngest and Polar webhooks are automatically configured via the API routes.",
    },
    {
        question: "Do I need to know all these tools?",
        answer: "No. Each integration is well-documented and follows consistent patterns. The codebase includes detailed docs in the /docs directory covering architecture, patterns, and coding rules.",
    },
]

const sectionId = "faq"

export function Faq() {
    return (
        <section id={sectionId} className="px-6 py-24">
            <div className="mx-auto max-w-3xl">
                <div className="mb-16 text-center">
                    <h2 className="font-bold text-3xl tracking-tight sm:text-4xl">
                        Frequently asked questions
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Everything you need to know about Primus.
                    </p>
                </div>

                <Accordion type="single" collapsible>
                    {FAQ_ITEMS.map((item, index) => (
                        <AccordionItem key={item.question} value={`item-${index}`}>
                            <AccordionTrigger>{item.question}</AccordionTrigger>
                            <AccordionContent>
                                <p className="text-muted-foreground">{item.answer}</p>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
    )
}
