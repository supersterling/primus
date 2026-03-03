# Build a custom flow for creating Organizations

> This guide is for users who want to build a custom flow. To use a _prebuilt_ UI, use the [Account Portal pages](https://clerk.com/docs/guides/account-portal/overview.md) or [`prebuilt components`](https://clerk.com/docs/nextjs/reference/components/overview.md).

This guide demonstrates how to use Clerk's API to build a custom flow for creating Organizations.

The following example uses these hooks:

- The [`useOrganizationList()`](https://clerk.com/docs/nextjs/reference/hooks/use-organization-list.md) hook to access the `createOrganization()` method. This method is used to create a new Organization with the provided name.
- The [`useOrganizationCreationDefaults()`](https://clerk.com/docs/nextjs/reference/hooks/use-organization-creation-defaults.md) hook to pre-populate the form with a suggested organization name based on your application's [default naming rules](https://clerk.com/docs/guides/organizations/configure.md#default-naming-rules), and to display a warning if an organization with that name or domain already exists.

  ```tsx {{ filename: 'app/components/CreateOrganization.tsx' }}
  'use client'

  import { useOrganizationCreationDefaults, useOrganizationList } from '@clerk/nextjs'
  import { FormEventHandler, useEffect, useState } from 'react'

  export default function CreateOrganization() {
    const { isLoaded, createOrganization, setActive } = useOrganizationList()
    const { data: defaults, isLoading: isLoadingDefaults } = useOrganizationCreationDefaults()
    const [organizationName, setOrganizationName] = useState('')

    // Pre-populate the form with suggested organization name
    useEffect(() => {
      if (defaults?.form.name) {
        setOrganizationName(defaults.form.name)
      }
    }, [defaults?.form.name])

    if (!isLoaded || isLoadingDefaults) return <p>Loading...</p>

    // Check if an organization with this name/domain already exists
    const advisory = defaults?.advisory
    const showWarning = advisory?.code === 'organization_already_exists'
    const existingOrgName = advisory?.meta?.organization_name
    const existingOrgDomain = advisory?.meta?.organization_domain

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
      e.preventDefault()
      try {
        const newOrganization = await createOrganization?.({ name: organizationName })
        // Set the created Organization as the Active Organization
        if (newOrganization) setActive({ organization: newOrganization.id })
      } catch (err) {
        // See https://clerk.com/docs/guides/development/custom-flows/error-handling
        // for more info on error handling
        console.error(JSON.stringify(err, null, 2))
      }
      setOrganizationName('')
    }

    return (
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={organizationName}
          onChange={(e) => setOrganizationName(e.currentTarget.value)}
          placeholder="Organization name"
        />
        {showWarning && (
          <p style={{ color: 'orange' }}>
            An organization "{existingOrgName}" already exists for the domain "{existingOrgDomain}".
          </p>
        )}
        <button type="submit">Create organization</button>
      </form>
    )
  }
  ```

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
