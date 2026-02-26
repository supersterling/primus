import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs"

export default function Home() {
    return (
        <main className="flex min-h-[calc(100vh-41px)] flex-col items-center justify-center gap-5 px-4 py-8">
            {/* Terminal Panel */}
            <div className="w-full max-w-2xl border border-border bg-panel">
                <div className="border-border border-b px-3 py-1.5 text-[11px] text-muted-foreground uppercase tracking-widest">
                    ─ TERMINAL
                </div>
                <div className="px-6 py-10">
                    <h1 className="font-bold font-mono text-4xl tracking-tight sm:text-5xl">
                        &gt; PRIMUS
                        <span className="cursor-blink text-accent">_</span>
                    </h1>
                    <p className="mt-3 text-muted-foreground text-sm tracking-wide">
                        Build something worth building.
                    </p>
                    <div className="mt-8">
                        <SignedOut>
                            <SignInButton>
                                <button
                                    className="border border-accent bg-transparent px-5 py-2.5 text-[11px] text-accent uppercase tracking-[0.2em] transition-all hover:bg-accent hover:text-white"
                                    type="button"
                                >
                                    GET STARTED ▶
                                </button>
                            </SignInButton>
                        </SignedOut>
                        <SignedIn>
                            <div className="flex items-center gap-2 text-[11px] uppercase tracking-widest">
                                <span className="inline-block h-2 w-2 rounded-full bg-green" />
                                <span className="text-green">AUTHENTICATED — READY</span>
                            </div>
                        </SignedIn>
                    </div>
                </div>
            </div>

            {/* Info Panels */}
            <div className="grid w-full max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Stack Panel */}
                <div className="border border-border bg-panel">
                    <div className="border-border border-b px-3 py-1.5 text-[11px] text-muted-foreground uppercase tracking-widest">
                        ─ STACK
                    </div>
                    <div className="px-3 py-3 font-mono text-xs">
                        {[
                            ["NEXT.JS", "16.x"],
                            ["REACT", "19.x"],
                            ["TYPESCRIPT", "5.x"],
                            ["TAILWIND", "4.x"],
                        ].map(([name, version]) => (
                            <div key={name} className="flex justify-between py-0.5">
                                <span className="text-muted-foreground">{name}</span>
                                <span>{version}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Status Panel */}
                <div className="border border-border bg-panel">
                    <div className="border-border border-b px-3 py-1.5 text-[11px] text-muted-foreground uppercase tracking-widest">
                        ─ STATUS
                    </div>
                    <div className="px-3 py-3 font-mono text-xs">
                        {[
                            {
                                label: "SYS",
                                value: "OPERATIONAL",
                                active: true,
                            },
                            {
                                label: "AUTH",
                                value: "CLERK READY",
                                active: true,
                            },
                            {
                                label: "DB",
                                value: "PENDING",
                                active: false,
                            },
                            {
                                label: "EVENTS",
                                value: "PENDING",
                                active: false,
                            },
                        ].map(({ label, value, active }) => (
                            <div key={label} className="flex items-center justify-between py-0.5">
                                <span className="text-muted-foreground">{label}</span>
                                <span
                                    className={`flex items-center gap-1.5 ${active ? "text-foreground" : "text-dim"}`}
                                >
                                    <span
                                        className={`inline-block h-1.5 w-1.5 rounded-full ${active ? "bg-green" : "border border-dim"}`}
                                    />
                                    {value}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer Bar */}
            <div className="flex w-full max-w-2xl items-center justify-between border border-border bg-panel px-3 py-1.5 text-[10px] text-muted-foreground uppercase tracking-widest">
                <span>PRIMUS v0.1</span>
                <span className="hidden sm:inline">│ NEXT.JS TEMPLATE │</span>
                <span>© 2026</span>
            </div>
        </main>
    )
}
