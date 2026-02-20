function handleFailure() {
    logger.warn("about to throw")
    throw new Error("failed", { cause: undefined })
}
