import { WelcomeEmail } from "@/components/emails/welcome-email"
import { inngest } from "@/inngest/core/client"
import { appUserCreated } from "@/inngest/core/events"
import { result } from "@/lib/either"
import { resend } from "@/lib/resend"

export const id = "email/send-welcome-email" as const

export default inngest.createFunction(
    { id, triggers: [appUserCreated] },
    async ({ event, step, logger }) => {
        await step.run("send-welcome-email", async () => {
            const res = await result.trycatch(() =>
                resend.emails.send({
                    from: "Primus <noreply@yourdomain.com>",
                    to: event.data.email,
                    subject: "Welcome to Primus",
                    react: <WelcomeEmail name={event.data.name} />,
                }),
            )

            if (!res.ok) {
                logger.error({ error: res.error }, "welcome email send failed")
                throw new Error("welcome email send failed", { cause: res.error })
            }

            logger.info({ id: res.value.data?.id, to: event.data.email }, "welcome email sent")
        })
    },
)
