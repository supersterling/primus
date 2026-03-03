"use client"

import { useClerk } from "@clerk/nextjs"
import * as React from "react"
import { Button } from "@/components/ui/button"

export function ManageAccountButton() {
    const { openUserProfile } = useClerk()
    const handleClick = React.useCallback(() => openUserProfile(), [openUserProfile])

    return (
        <Button variant="outline" size="sm" onClick={handleClick}>
            Manage
        </Button>
    )
}
