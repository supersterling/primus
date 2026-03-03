# Access the Clerk object outside of components

The [`Clerk`](https://clerk.com/docs/reference/javascript/clerk.md) object is accessible using the [`useClerk()`](https://clerk.com/docs/nextjs/reference/hooks/use-clerk.md) hook. However, if you need to access the [`Clerk`](https://clerk.com/docs/reference/javascript/clerk.md) object outside of React components, such as in utility functions or background tasks, you can use the `getClerkInstance()` function.

**Fetch**

```ts
import { getClerkInstance } from '@clerk/clerk-expo'

export async function fetchFoo() {
  const clerkInstance = getClerkInstance()
  // Use `getToken()` to get the current session token
  const token = await clerkInstance.session?.getToken()

  const response = await fetch('/api/foo', {
    headers: {
      // Include the session token as a Bearer token in the Authorization header
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    // Include status code and status text in error message
    throw new Error(`API Error: ${response.status} ${response.statusText}`)
  }

  return response.json()
}
```

**Axios**

```ts
import axios from 'axios'
import { getClerkInstance } from '@clerk/clerk-expo'

export async function fetchFoo() {
  try {
    const data = await axios.get('/api/foo')
    return data
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(`API Error: ${error.response.status} ${error.response.statusText}`)
    }

    throw new Error('Unknown error')
  }
}

// Intercept requests and modify them to include the current session token
axios.interceptors.request.use(async (config) => {
  const clerkInstance = getClerkInstance()
  // Use `getToken()` to get the current session token
  const token = await clerkInstance.session?.getToken()

  if (token) {
    // Include the session token as a Bearer token in the Authorization header
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})
```

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
