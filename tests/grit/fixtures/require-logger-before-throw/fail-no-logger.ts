function handleFailure() {
    throw new Error("failed", { cause: undefined })
}
