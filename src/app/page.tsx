import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs"

export default function Home() {
    return (
        <main className="flex min-h-[calc(100vh-53px)] flex-col items-center justify-center gap-8 px-6">
            <div className="flex flex-col items-center gap-3">
                <h1 className="font-serif text-6xl italic tracking-tight">primus</h1>
                <p className="text-lg text-muted-foreground tracking-wide">
                    Build something worth building.
                </p>
            </div>
            <SignedOut>
                <SignInButton>
                    <button
                        className="rounded-full border border-border/60 bg-transparent px-6 py-2 text-foreground text-sm tracking-wide transition-all hover:border-foreground/40 hover:bg-foreground/5"
                        type="button"
                    >
                        Get started
                    </button>
                </SignInButton>
            </SignedOut>
            <SignedIn>
                <p className="text-muted-foreground text-sm tracking-wide">
                    You&apos;re signed in. Start building.
                </p>
            </SignedIn>
        </main>
    )
}
