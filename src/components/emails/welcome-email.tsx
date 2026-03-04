import {
    Body,
    Button,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Preview,
    Section,
    Tailwind,
    Text,
} from "@react-email/components"
import { baseUrl } from "@/lib/utils"

type Props = {
    name: string
    dashboardUrl?: string
}

const appUrl = baseUrl()

// Pass hex equivalents of the oklch tokens from globals.css so Tailwind
// utility classes match the Primus design system inside email clients.
const tailwindConfig = {
    theme: {
        extend: {
            colors: {
                foreground: "#1a1a1a",
                primary: "#292929",
                muted: "#888888",
                border: "#e8e8e8",
                surface: "#f7f7f7",
            },
            fontFamily: {
                serif: ["Georgia", "Times New Roman", "serif"],
                sans: [
                    "-apple-system",
                    "BlinkMacSystemFont",
                    "Segoe UI",
                    "Helvetica",
                    "Arial",
                    "sans-serif",
                ],
            },
        },
    },
}

const features = [
    {
        title: "Auth",
        description:
            "Better Auth with protected routes, sign-in, and session management pre-configured.",
    },
    {
        title: "Payments",
        description: "Polar checkout and webhooks wired in, tested, and ready to go live.",
    },
    {
        title: "Background jobs",
        description: "Inngest with typed events, durable functions, and local dev tooling.",
    },
    {
        title: "50+ lint rules",
        description:
            "GritQL + Biome enforce error handling, logging, type safety, and more — automatically.",
    },
]

export function WelcomeEmail({ name, dashboardUrl = `${appUrl}/app` }: Props) {
    return (
        <Html lang="en">
            <Head />
            <Preview>Welcome to Primus — the foundation for what comes next.</Preview>
            <Tailwind config={tailwindConfig}>
                <Body className="m-0 bg-white p-0">
                    {/* Header */}
                    <Section className="bg-primary px-10 py-6">
                        <Text className="m-0 font-normal font-serif text-lg text-white tracking-tight">
                            ♔ Primus
                        </Text>
                    </Section>

                    {/* Hero */}
                    <Section className="px-10 pt-12 pb-10">
                        <Container className="max-w-lg">
                            <Text className="m-0 mb-5 font-sans font-semibold text-muted text-xs uppercase tracking-widest">
                                Welcome aboard
                            </Text>
                            <Heading className="m-0 mb-5 font-normal font-serif text-3xl text-foreground leading-tight tracking-tight">
                                The foundation is ready,
                                <br />
                                {name}.
                            </Heading>
                            <Text className="m-0 mb-8 font-sans text-base text-muted leading-relaxed">
                                Auth, payments, background jobs, and 50+ lint rules — all wired in
                                and enforced. Your job is to build the product, not the plumbing.
                            </Text>
                            <Button
                                className="inline-block rounded-md bg-primary px-6 py-3 font-medium font-sans text-sm text-white no-underline"
                                href={dashboardUrl}
                            >
                                Open your dashboard →
                            </Button>
                        </Container>
                    </Section>

                    {/* Features */}
                    <Section className="bg-surface px-10 py-10">
                        <Container className="max-w-lg">
                            <Text className="m-0 mb-6 font-normal font-serif text-foreground text-lg tracking-tight">
                                What&apos;s ready for you
                            </Text>
                            {features.map((feature) => (
                                <Section key={feature.title} className="mb-4">
                                    <Hr className="m-0 mb-4 border-border" />
                                    <Text className="m-0 mb-1 font-sans font-semibold text-foreground text-sm">
                                        {feature.title}
                                    </Text>
                                    <Text className="m-0 font-sans text-muted text-sm leading-relaxed">
                                        {feature.description}
                                    </Text>
                                </Section>
                            ))}
                            <Hr className="m-0 border-border" />
                        </Container>
                    </Section>

                    {/* Footer */}
                    <Section className="px-10 pt-8 pb-10">
                        <Container className="max-w-lg">
                            <Hr className="mb-6 border-border" />
                            <Text className="m-0 mb-1 font-sans text-muted text-xs leading-relaxed">
                                You&apos;re receiving this because you signed up for Primus.
                            </Text>
                            <Text className="m-0 font-sans text-muted text-xs">
                                © {new Date().getFullYear()} Primus. All rights reserved.
                            </Text>
                        </Container>
                    </Section>
                </Body>
            </Tailwind>
        </Html>
    )
}
