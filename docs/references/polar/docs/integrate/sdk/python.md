> ## Documentation Index
> Fetch the complete documentation index at: https://polar.sh/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Python SDK

Fully type-hinted and allows both synchronous and asynchronous usage, thanks to [HTTPX](https://www.python-httpx.org/).
Under the hood, schemas are validated by [Pydantic](https://docs.pydantic.dev/latest/).

### Quickstart

```bash Terminal theme={null}
pip install polar-sdk
```

```python  theme={null}
# Synchronous Example
from polar_sdk import Polar

s = Polar(
    access_token="<YOUR_BEARER_TOKEN_HERE>",
)


res = s.users.benefits.list()

if res is not None:
    while True:
        # handle items

        res = res.Next()
        if res is None:
            break
```

[Read more](https://github.com/polarsource/polar-python)

### Sandbox Environment

You can configure the SDK so it hits the [sandbox environment](/integrate/sandbox) instead of the production one. You just need to add the `server` argument when instantiating the client:

```python  theme={null}
s = Polar(
    server="sandbox",
    access_token="<YOUR_BEARER_TOKEN_HERE>",
)
```
