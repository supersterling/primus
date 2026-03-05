"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Cog, Loader2 } from "lucide-react"
import { useCallback, useId, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { authClient } from "@/lib/auth/client"
import { result } from "@/lib/either"

const MIN_PASSWORD_LENGTH = 8

const changePasswordSchema = z
    .object({
        currentPassword: z.string().min(1, "Current password is required"),
        newPassword: z
            .string()
            .min(MIN_PASSWORD_LENGTH, `Must be at least ${MIN_PASSWORD_LENGTH} characters`),
        confirmPassword: z.string(),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Passwords don\u2019t match",
        path: ["confirmPassword"],
    })

type ChangePasswordValues = z.infer<typeof changePasswordSchema>

function buildFieldIds(base: string) {
    return {
        currentPassword: `${base}-current-password`,
        currentPasswordError: `${base}-current-password-error`,
        newPassword: `${base}-new-password`,
        newPasswordError: `${base}-new-password-error`,
        confirmPassword: `${base}-confirm-password`,
        confirmPasswordError: `${base}-confirm-password-error`,
    }
}

function ChangePasswordDialogContent({ onSuccess }: { onSuccess: () => void }) {
    const ids = buildFieldIds(useId())

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ChangePasswordValues>({
        resolver: zodResolver(changePasswordSchema),
        defaultValues: { currentPassword: "", newPassword: "", confirmPassword: "" },
    })

    async function onSubmit(values: ChangePasswordValues) {
        const res = await result.trycatch(async () =>
            authClient.changePassword({
                currentPassword: values.currentPassword,
                newPassword: values.newPassword,
                revokeOtherSessions: true,
            }),
        )

        if (!res.ok) {
            toast.error("Unable to reach the server. Check your connection and try again.")
            return
        }

        if (res.value.error) {
            toast.error(res.value.error.message)
            return
        }

        toast.success("Password updated")
        onSuccess()
    }

    const submitLabel = isSubmitting ? "Updating\u2026" : "Update password"
    const submitIcon = isSubmitting ? (
        <Loader2 className="size-4 animate-spin" aria-hidden="true" />
    ) : null

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
                <Field>
                    <FieldLabel htmlFor={ids.currentPassword}>Current password</FieldLabel>
                    <Input
                        id={ids.currentPassword}
                        type="password"
                        autoComplete="current-password"
                        aria-invalid={Boolean(errors.currentPassword)}
                        aria-describedby={
                            errors.currentPassword ? ids.currentPasswordError : undefined
                        }
                        {...register("currentPassword")}
                    />
                    <FieldError id={ids.currentPasswordError} errors={[errors.currentPassword]} />
                </Field>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Field>
                        <FieldLabel htmlFor={ids.newPassword}>New password</FieldLabel>
                        <Input
                            id={ids.newPassword}
                            type="password"
                            autoComplete="new-password"
                            aria-invalid={Boolean(errors.newPassword)}
                            aria-describedby={errors.newPassword ? ids.newPasswordError : undefined}
                            {...register("newPassword")}
                        />
                        <FieldError id={ids.newPasswordError} errors={[errors.newPassword]} />
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
                    Must be at least {MIN_PASSWORD_LENGTH} characters long. All other sessions will
                    be signed out.
                </FieldDescription>
                <DialogFooter>
                    <Button type="submit" disabled={isSubmitting}>
                        {submitIcon}
                        {submitLabel}
                    </Button>
                </DialogFooter>
            </FieldGroup>
        </form>
    )
}

export function ChangePasswordForm() {
    const [open, setOpen] = useState(false)
    const handleSuccess = useCallback(() => setOpen(false), [])

    return (
        <div className="flex items-center justify-between">
            <div>
                <p className="font-medium">Password</p>
                <p className="text-muted-foreground text-sm">
                    Change your password to keep your account secure.
                </p>
            </div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Change password"
                        className="text-muted-foreground"
                    >
                        <Cog className="size-4" aria-hidden="true" />
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Change password</DialogTitle>
                        <DialogDescription>
                            Enter your current password and choose a new one.
                        </DialogDescription>
                    </DialogHeader>
                    <ChangePasswordDialogContent onSuccess={handleSuccess} />
                </DialogContent>
            </Dialog>
        </div>
    )
}
