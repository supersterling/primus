const res = result.trycatch(() => doSomething())
if (!res.ok) {
    handleError(res.error)
}
