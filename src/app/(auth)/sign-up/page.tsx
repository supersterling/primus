import { type Metadata } from "next"
import { SignUpForm } from "@/components/auth/sign-up-form"
import { getSocialProviders } from "@/lib/auth/providers"

export const metadata: Metadata = { title: "Sign up" }

export default function SignUpPage() {
    const providers = getSocialProviders()

    return <SignUpForm className="w-full max-w-3xl" providers={providers} />
}
