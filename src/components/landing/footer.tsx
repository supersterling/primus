import { Crown } from "lucide-react"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"

type FooterLink = {
    label: string
    href: string
}

type FooterColumn = {
    title: string
    links: FooterLink[]
}

const COLUMNS: FooterColumn[] = [
    {
        title: "Product",
        links: [
            { label: "Features", href: "#features" },
            { label: "Pricing", href: "#pricing" },
            { label: "Documentation", href: "#" },
            { label: "Changelog", href: "#" },
        ],
    },
    {
        title: "Developers",
        links: [
            { label: "Getting Started", href: "#" },
            { label: "API Reference", href: "#" },
            { label: "GitHub", href: "#" },
            { label: "Contributing", href: "#" },
        ],
    },
    {
        title: "Company",
        links: [
            { label: "About", href: "#" },
            { label: "Blog", href: "#" },
            { label: "Contact", href: "#" },
            { label: "Privacy", href: "#" },
        ],
    },
]

function FooterLinkColumn({ column }: { column: FooterColumn }) {
    return (
        <div>
            <h3 className="font-semibold text-sm">{column.title}</h3>
            <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                    <li key={link.label}>
                        <a
                            href={link.href}
                            className="text-muted-foreground text-sm transition-colors hover:text-foreground"
                        >
                            {link.label}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export function Footer() {
    return (
        <footer className="px-6 pt-16 pb-8">
            <div className="mx-auto max-w-5xl">
                <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
                    <div className="lg:col-span-1">
                        <Link
                            href="/"
                            className="flex items-center gap-2 font-mono text-sm uppercase tracking-widest"
                        >
                            <Crown className="size-5" />
                            <span>Primus</span>
                        </Link>
                        <p className="mt-4 text-muted-foreground text-sm">
                            An opinionated Next.js starter for shipping SaaS products fast.
                        </p>
                    </div>

                    {COLUMNS.map((column) => (
                        <FooterLinkColumn key={column.title} column={column} />
                    ))}
                </div>

                <Separator className="my-8" />

                <p className="text-center text-muted-foreground text-sm">
                    &copy; 2025 Primus. All rights reserved.
                </p>
            </div>
        </footer>
    )
}
