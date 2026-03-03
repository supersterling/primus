# Build a custom flow for managing API keys

> API keys is currently in beta. The API may change before general availability.

> This guide is for users who want to build a custom flow. To use a _prebuilt_ UI, use the [Account Portal pages](https://clerk.com/docs/guides/account-portal/overview.md) or [`prebuilt components`](https://clerk.com/docs/nextjs/reference/components/overview.md).

This guide will demonstrate how to use the Clerk API to build a custom flow for managing [API keys](https://clerk.com/docs/guides/development/machine-auth/api-keys.md). API keys allow your application's users to create keys that grant third-party services access to your application's API endpoints on their behalf.

**This example is written for Next.js App Router but it can be adapted for any React-based framework, such as React Router or Tanstack React Start.**

The following example:

1. Uses the `useAPIKeys()` hook from `@clerk/nextjs/experimental` to retrieve and manage API keys. It will use `subject` if provided; otherwise it falls back to the Active Organization, then the current user.
2. Displays the API keys in a table with options to create new keys and revoke existing ones.
3. Provides a form to create new API keys using [`clerk.apiKeys.create()`](https://clerk.com/docs/reference/javascript/api-keys.md#create) with an optional expiration (subject defaults to active org, then user).
4. Allows revoking API keys using [`clerk.apiKeys.revoke()`](https://clerk.com/docs/reference/javascript/api-keys.md#revoke).

```jsx {{ filename: 'app/components/APIKeysManager.tsx', collapsible: true }}
'use client'

import { useClerk } from '@clerk/nextjs'
import { useAPIKeys } from '@clerk/nextjs/experimental'
import React, { useMemo, useState } from 'react'

export default function APIKeysManager() {
  const clerk = useClerk()
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    expirationSeconds: '',
  })

  const { data: apiKeys, isLoading, revalidate } = useAPIKeys()

  const handleCreate = async (e) => {
    e.preventDefault()

    try {
      const expiration =
        formData.expirationSeconds.trim() === '' ? null : Number(formData.expirationSeconds)

      const newApiKey = await clerk.apiKeys.create({
        name: formData.name,
        secondsUntilExpiration: expiration,
      })

      // Store the secret immediately - it won't be available again
      alert(
        `API key created! Secret: ${newApiKey.secret}\n\nMake sure to save this secret - it won't be shown again.`,
      )

      setFormData({ name: '', expirationSeconds: '' })
      setShowCreateForm(false)
      revalidate()
    } catch (error) {
      console.error('Error creating API key:', error)
      alert('Failed to create API key')
    }
  }

  const handleRevoke = async (apiKeyId) => {
    if (!confirm('Are you sure you want to revoke this API key?')) {
      return
    }

    try {
      await clerk.apiKeys.revoke({
        apiKeyId,
        revocationReason: 'Revoked by user',
      })
      revalidate()
    } catch (error) {
      console.error('Error revoking API key:', error)
      alert('Failed to revoke API key')
    }
  }

  if (isLoading) {
    return <div>Loading API keys...</div>
  }

  return (
    <div>
      <h1>API Keys</h1>
      <button onClick={() => setShowCreateForm(!showCreateForm)}>
        {showCreateForm ? 'Cancel' : 'Create API Key'}
      </button>

      {showCreateForm && (
        <form onSubmit={handleCreate}>
          <div>
            <label>
              Name:
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </label>
          </div>
          <div>
            <label>
              Expiration (seconds, optional):
              <input
                type="number"
                min="0"
                value={formData.expirationSeconds}
                onChange={(e) => setFormData({ ...formData, expirationSeconds: e.target.value })}
              />
            </label>
          </div>
          <button type="submit">Create</button>
        </form>
      )}

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Expiration</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {!apiKeys || apiKeys.length === 0 ? (
            <tr>
              <td colSpan="3">No API keys found</td>
            </tr>
          ) : (
            apiKeys.map((apiKey) => (
              <tr key={apiKey.id}>
                <td>{apiKey.name}</td>
                <td>
                  {apiKey.expiration
                    ? new Date(apiKey.expiration).toLocaleDateString()
                    : 'No expiration'}
                </td>
                <td>
                  <button onClick={() => handleRevoke(apiKey.id)}>Revoke</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
```

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
