"use client"

import { Check, Copy } from "lucide-react"
import { useCallback, useId, useRef, useState } from "react"
import { toast } from "sonner"
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
} from "@/components/ui/input-group"

const COPIED_FEEDBACK_MS = 2000

type EmailFieldProps = {
    email: string
}

export function EmailField({ email }: EmailFieldProps) {
    const id = useId()
    const inputId = `${id}-email`
    const descriptionId = `${id}-email-description`
    const [copied, setCopied] = useState(false)
    const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null)

    const handleCopy = useCallback(() => {
        navigator.clipboard.writeText(email).then(
            () => {
                toast.success("Email copied to clipboard")
                setCopied(true)
                if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current)
                }
                timeoutRef.current = setTimeout(() => setCopied(false), COPIED_FEEDBACK_MS)
            },
            () => {
                toast.error("Unable to copy to clipboard")
            },
        )
    }, [email])

    const icon = copied ? (
        <Check className="size-4" aria-hidden="true" />
    ) : (
        <Copy className="size-4" aria-hidden="true" />
    )

    return (
        <Field>
            <FieldLabel htmlFor={inputId}>Email</FieldLabel>
            <InputGroup>
                <InputGroupInput
                    id={inputId}
                    type="email"
                    value={email}
                    readOnly
                    spellCheck={false}
                    aria-describedby={descriptionId}
                />
                <InputGroupAddon align="inline-end">
                    <InputGroupButton
                        type="button"
                        size="icon-xs"
                        aria-label="Copy email"
                        onClick={handleCopy}
                    >
                        {icon}
                    </InputGroupButton>
                </InputGroupAddon>
            </InputGroup>
            <FieldDescription id={descriptionId}>
                Contact your administrator to change your email address.
            </FieldDescription>
        </Field>
    )
}
