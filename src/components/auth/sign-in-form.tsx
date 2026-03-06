"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useId } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { AuthFormShell } from "@/components/auth/auth-form-shell"
import { SocialButton, type SocialProviders } from "@/components/auth/social-button"
import { GitHub } from "@/components/icons/github"
import { Google } from "@/components/icons/google"
import { Button } from "@/components/ui/button"
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { authClient } from "@/lib/auth/client"
import { isRelativePath } from "@/lib/auth/utils"
import { result } from "@/lib/either"

const signInSchema = z.object({
    email: z.string().email("Enter a valid email"),
    password: z.string().min(1, "Password is required"),
})

type SignInValues = z.infer<typeof signInSchema>

type SignInFormProps = {
    className?: string
    providers: SocialProviders
}

function SignInSocialSection({
    providers,
    callbackUrl,
}: {
    providers: SocialProviders
    callbackUrl: string
}) {
    return (
        <Field className="grid grid-cols-2 gap-4">
            <SocialButton
                provider="google"
                enabled={providers.google}
                icon={<Google className="size-4" />}
                label="Sign in with Google"
                callbackUrl={callbackUrl}
            />
            <SocialButton
                provider="github"
                enabled={providers.github}
                icon={<GitHub className="size-4" />}
                label="Sign in with GitHub"
                callbackUrl={callbackUrl}
            />
        </Field>
    )
}

function SignInFooter() {
    return (
        <FieldDescription className="text-center">
            Don&apos;t have an account? <Link href="/sign-up">Sign up</Link>
        </FieldDescription>
    )
}

export function SignInForm({ className, providers }: SignInFormProps) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const callbackParam = searchParams.get("callback-url")
    const callbackRoute =
        callbackParam != null && isRelativePath(callbackParam) ? callbackParam : "/app"
    const id = useId()
    const emailId = `${id}-email`
    const emailErrorId = `${id}-email-error`
    const passwordId = `${id}-password`
    const passwordErrorId = `${id}-password-error`

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<SignInValues>({
        resolver: zodResolver(signInSchema),
    })

    async function onSubmit(values: SignInValues) {
        const res = await result.trycatch(() =>
            authClient.signIn.email({
                email: values.email,
                password: values.password,
            }),
        )

        if (!res.ok) {
            toast.error("Something went wrong. Check your connection and try again.")
            return
        }

        if (res.value.error) {
            const message =
                typeof res.value.error.message === "string" && res.value.error.message !== ""
                    ? res.value.error.message
                    : "Sign in failed. Please try again."
            toast.error(message)
            return
        }

        router.push(callbackRoute)
        router.refresh()
    }

    const submitLabel = isSubmitting ? "Signing in\u2026" : "Sign in"
    const submitIcon = isSubmitting ? (
        <Loader2 className="mr-2 size-4 animate-spin" aria-hidden="true" />
    ) : null

    return (
        <AuthFormShell
            title="Welcome back"
            description="Sign in to your account"
            className={className}
            socialSection={
                <SignInSocialSection providers={providers} callbackUrl={callbackRoute} />
            }
            footer={<SignInFooter />}
        >
            <form onSubmit={handleSubmit(onSubmit)} aria-label="Sign in">
                <FieldGroup>
                    <Field>
                        <FieldLabel htmlFor={emailId}>Email</FieldLabel>
                        <Input
                            id={emailId}
                            type="email"
                            placeholder="you@example.com"
                            autoComplete="email"
                            aria-invalid={Boolean(errors.email)}
                            aria-describedby={errors.email ? emailErrorId : undefined}
                            {...register("email")}
                        />
                        <FieldError id={emailErrorId} errors={[errors.email]} />
                    </Field>
                    <Field>
                        <FieldLabel htmlFor={passwordId}>Password</FieldLabel>
                        <Input
                            id={passwordId}
                            type="password"
                            autoComplete="current-password"
                            aria-invalid={Boolean(errors.password)}
                            aria-describedby={errors.password ? passwordErrorId : undefined}
                            {...register("password")}
                        />
                        <FieldError id={passwordErrorId} errors={[errors.password]} />
                    </Field>
                    <Field>
                        <Button type="submit" disabled={isSubmitting}>
                            {submitIcon}
                            {submitLabel}
                        </Button>
                    </Field>
                </FieldGroup>
            </form>
        </AuthFormShell>
    )
}
