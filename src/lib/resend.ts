import { Resend } from "resend"
import { env } from "@/lib/env"

/**
 * Lazily-initialised Resend client.
 *
 * Instantiation is deferred until first use so that the module can be safely
 * imported during the Next.js build even when RESEND_API_KEY is not set.
 * The client will throw at call-time (inside an Inngest step) if the key is
 * missing, which gives a clear error in the right place rather than a build
 * failure.
 */
let _resend: Resend | null = null

function getResend(): Resend {
    if (_resend === null) {
        _resend = new Resend(env.RESEND_API_KEY)
    }
    return _resend
}

export const resend: Pick<Resend, "emails"> = {
    get emails() {
        return getResend().emails
    },
}
