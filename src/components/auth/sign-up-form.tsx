"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
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

const MIN_PASSWORD_LENGTH = 8

const signUpSchema = z
    .object({
        name: z.string().min(1, "Name is required"),
        email: z.string().email("Enter a valid email"),
        password: z
            .string()
            .min(MIN_PASSWORD_LENGTH, `Must be at least ${MIN_PASSWORD_LENGTH} characters`),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don\u2019t match",
        path: ["confirmPassword"],
    })

type SignUpValues = z.infer<typeof signUpSchema>

type SignUpFormProps = {
    className?: string
    providers: SocialProviders
}

function SignUpSocialSection({ providers }: { providers: SocialProviders }) {
    return (
        <Field className="grid grid-cols-2 gap-4">
            <SocialButton
                provider="google"
                enabled={providers.google}
                icon={<Google className="size-4" />}
                label="Sign up with Google"
            />
            <SocialButton
                provider="github"
                enabled={providers.github}
                icon={<GitHub className="size-4" />}
                label="Sign up with GitHub"
            />
        </Field>
    )
}

function SignUpFooter() {
    return (
        <FieldDescription className="text-center">
            Already have an account? <Link href="/sign-in">Sign in</Link>
        </FieldDescription>
    )
}

function buildFieldIds(base: string) {
    return {
        name: `${base}-name`,
        nameError: `${base}-name-error`,
        email: `${base}-email`,
        emailError: `${base}-email-error`,
        password: `${base}-password`,
        passwordError: `${base}-password-error`,
        confirmPassword: `${base}-confirm-password`,
        confirmPasswordError: `${base}-confirm-password-error`,
    }
}

export function SignUpForm({ className, providers }: SignUpFormProps) {
    const router = useRouter()
    const ids = buildFieldIds(useId())

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<SignUpValues>({
        resolver: zodResolver(signUpSchema),
    })

    async function onSubmit(values: SignUpValues) {
        const { error } = await authClient.signUp.email({
            name: values.name,
            email: values.email,
            password: values.password,
        })

        if (error) {
            toast.error(error.message)
            return
        }

        router.push("/app")
        router.refresh()
    }

    const submitLabel = isSubmitting ? "Creating account\u2026" : "Create account"
    const submitIcon = isSubmitting ? (
        <Loader2 className="mr-2 size-4 animate-spin" aria-hidden="true" />
    ) : null

    return (
        <AuthFormShell
            title="Create your account"
            description="Enter your details below to get started"
            className={className}
            socialSection={<SignUpSocialSection providers={providers} />}
            footer={<SignUpFooter />}
        >
            <form onSubmit={handleSubmit(onSubmit)} aria-label="Create account">
                <FieldGroup>
                    <Field>
                        <FieldLabel htmlFor={ids.name}>Name</FieldLabel>
                        <Input
                            id={ids.name}
                            type="text"
                            placeholder="Jane Doe"
                            autoComplete="name"
                            spellCheck={false}
                            aria-invalid={Boolean(errors.name)}
                            aria-describedby={errors.name ? ids.nameError : undefined}
                            {...register("name")}
                        />
                        <FieldError id={ids.nameError} errors={[errors.name]} />
                    </Field>
                    <Field>
                        <FieldLabel htmlFor={ids.email}>Email</FieldLabel>
                        <Input
                            id={ids.email}
                            type="email"
                            placeholder="you@example.com"
                            autoComplete="email"
                            aria-invalid={Boolean(errors.email)}
                            aria-describedby={errors.email ? ids.emailError : undefined}
                            {...register("email")}
                        />
                        <FieldError id={ids.emailError} errors={[errors.email]} />
                    </Field>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <Field>
                            <FieldLabel htmlFor={ids.password}>Password</FieldLabel>
                            <Input
                                id={ids.password}
                                type="password"
                                autoComplete="new-password"
                                aria-invalid={Boolean(errors.password)}
                                aria-describedby={errors.password ? ids.passwordError : undefined}
                                {...register("password")}
                            />
                            <FieldError id={ids.passwordError} errors={[errors.password]} />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor={ids.confirmPassword}>Confirm password</FieldLabel>
                            <Input
                                id={ids.confirmPassword}
                                type="password"
                                autoComplete="new-password"
                                aria-invalid={Boolean(errors.confirmPassword)}
                                aria-describedby={
                                    errors.confirmPassword ? ids.confirmPasswordError : undefined
                                }
                                {...register("confirmPassword")}
                            />
                            <FieldError
                                id={ids.confirmPasswordError}
                                errors={[errors.confirmPassword]}
                            />
                        </Field>
                    </div>
                    <FieldDescription>
                        Must be at least {MIN_PASSWORD_LENGTH} characters long.
                    </FieldDescription>
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
