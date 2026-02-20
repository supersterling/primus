import { serve } from "inngest/next"
import { inngest } from "@/inngest/core/client"
import { functions } from "@/inngest/core/functions"

export const { GET, POST, PUT } = serve({ client: inngest, functions })
