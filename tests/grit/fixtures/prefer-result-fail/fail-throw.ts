function doWork() {
    logger.warn("bailing out")
    throw new Error("nope", { cause: undefined })
}
