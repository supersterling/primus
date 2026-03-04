import { type Metadata } from "next"
import { Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"
import { SignInForm } from "@/components/auth/sign-in-form"
import { Skeleton } from "@/components/ui/skeleton"
import { getSocialProviders } from "@/lib/auth/providers"

export const metadata: Metadata = { title: "Sign in" }

function SignInFormSkeleton() {
    return <Skeleton className="h-96 w-full max-w-3xl rounded-xl" />
}

function SignInFormError() {
    return (
        <p className="text-destructive text-sm">
            Failed to load sign-in form. Refresh to try again.
        </p>
    )
}

export default function SignInPage() {
    const providers = getSocialProviders()

    return (
        <ErrorBoundary fallback={<SignInFormError />}>
            <Suspense fallback={<SignInFormSkeleton />}>
                <SignInForm className="w-full max-w-3xl" providers={providers} />
            </Suspense>
        </ErrorBoundary>
    )
}
