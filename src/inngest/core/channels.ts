import { channel, topic } from "@inngest/realtime"
import { z } from "zod"

const HelloWorldChannel = channel("hello-world")
    .addTopic(topic("greeting").schema(z.object({ greeting: z.string() })))
    .addTopic(topic("farewell").schema(z.object({ farewell: z.string() })))

const channels = {
    [HelloWorldChannel.name]: HelloWorldChannel,
} as const

export { channels, HelloWorldChannel }
