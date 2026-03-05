"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Check, Loader2, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { useCallback, useId, useRef } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field"
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
} from "@/components/ui/input-group"
import { authClient } from "@/lib/auth/client"
import { result } from "@/lib/either"

const updateNameSchema = z.object({
    name: z.string().min(1, "Name is required"),
})

type UpdateNameValues = z.infer<typeof updateNameSchema>

type UpdateNameFormProps = {
    defaultName: string
}

export function UpdateNameForm({ defaultName }: UpdateNameFormProps) {
    const router = useRouter()
    const id = useId()
    const inputId = `${id}-name`
    const errorId = `${id}-name-error`
    const descriptionId = `${id}-name-description`

    const savedName = useRef(defaultName)

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting, isDirty },
    } = useForm<UpdateNameValues>({
        resolver: zodResolver(updateNameSchema),
        defaultValues: { name: defaultName },
    })

    const handleCancel = useCallback(() => reset({ name: savedName.current }), [reset])

    async function onSubmit(values: UpdateNameValues) {
        const res = await result.trycatch(async () => authClient.updateUser({ name: values.name }))

        if (!res.ok) {
            toast.error("Unable to reach the server. Check your connection and try again.")
            return
        }

        if (res.value.error) {
            toast.error(res.value.error.message)
            return
        }

        toast.success("Name updated")
        savedName.current = values.name
        reset({ name: values.name })
        router.refresh()
    }

    const submitIcon = isSubmitting ? (
        <Loader2 className="size-4 animate-spin motion-reduce:animate-none" aria-hidden="true" />
    ) : (
        <Check className="size-4" aria-hidden="true" />
    )

    const describedBy = [errors.name ? errorId : null, descriptionId].filter(Boolean).join(" ")

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Field>
                <FieldLabel htmlFor={inputId}>Name</FieldLabel>
                <InputGroup>
                    <InputGroupInput
                        id={inputId}
                        type="text"
                        autoComplete="name"
                        spellCheck={false}
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={describedBy}
                        {...register("name")}
                    />
                    {isDirty === true && (
                        <InputGroupAddon align="inline-end">
                            <InputGroupButton
                                type="button"
                                size="icon-xs"
                                disabled={isSubmitting}
                                aria-label="Cancel changes"
                                onClick={handleCancel}
                            >
                                <X className="size-4" aria-hidden="true" />
                            </InputGroupButton>
                            <InputGroupButton
                                type="submit"
                                size="icon-xs"
                                disabled={isSubmitting}
                                aria-label="Save name"
                            >
                                {submitIcon}
                            </InputGroupButton>
                        </InputGroupAddon>
                    )}
                </InputGroup>
                <FieldError id={errorId} errors={[errors.name]} />
                <FieldDescription id={descriptionId}>
                    Your full name is used across your profile and communications.
                </FieldDescription>
            </Field>
        </form>
    )
}
