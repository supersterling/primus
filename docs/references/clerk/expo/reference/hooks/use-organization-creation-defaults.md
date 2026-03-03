# useOrganizationCreationDefaults()

The `useOrganizationCreationDefaults()` hook retrieves the organization creation defaults for the current user. This includes a suggested organization name based on your application's [default naming rules](https://clerk.com/docs/guides/organizations/configure.md#default-naming-rules), and an advisory if an organization with that name or domain already exists.

## Parameters

`useOrganizationCreationDefaults()` accepts a single object with the following optional properties:

| Property                                          | Type      | Description                                                                                         |
| ------------------------------------------------- | --------- | --------------------------------------------------------------------------------------------------- |
| <a id="enabled"></a> `enabled?`                   | `boolean` | If `true`, a request will be triggered when the hook is mounted. Defaults to `true`.                |
| <a id="keeppreviousdata"></a> `keepPreviousData?` | `boolean` | If true, the previous data will be kept in the cache until new data is fetched. Defaults to `true`. |

## Returns

| Property                             | Type                                                                                                                                                                                                                      | Description                                                                                                  |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| <a id="data"></a> `data`             | <code>undefined | null | <a href="https://clerk.com/docs/expo/reference/hooks/use-organization-creation-defaults.md#organization-creation-defaults-resource">`OrganizationCreationDefaultsResource`</a></code> | The organization creation defaults resource, `undefined` before the first fetch, or `null` if not available. |
| <a id="error"></a> `error`           | `null | ClerkAPIResponseError`                                                                                                                                                                                 | Any error that occurred during the data fetch, or `null` if no error occurred.                               |
| <a id="isfetching"></a> `isFetching` | `boolean`                                                                                                                                                                                                                 | A boolean that indicates whether any request is still in flight, including background updates.               |
| <a id="isloading"></a> `isLoading`   | `boolean`                                                                                                                                                                                                                 | A boolean that indicates whether the initial data is still being fetched.                                    |

### `OrganizationCreationDefaultsResource`

| Name                                                                      | Type                                                     | Description |
| ------------------------------------------------------------------------- | -------------------------------------------------------- | ----------- |
| name - The suggested organization name.                                   | slug - The suggested organization slug.                  |             |
| code - The advisory type. Currently only 'organization\_already\_exists'. | severity - The severity level. Currently only 'warning'. |             |

## Examples

### Basic usage

The following example demonstrates how to use the `useOrganizationCreationDefaults()` hook to pre-populate an organization creation form with suggested values.

```tsx {{ filename: 'components/CreateOrganization.tsx' }}
import { useOrganizationCreationDefaults, useOrganizationList } from '@clerk/clerk-expo'
import { useEffect, useState } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'

export default function CreateOrganization() {
  const { createOrganization } = useOrganizationList()
  const { data: defaults, isLoading } = useOrganizationCreationDefaults()
  const [organizationName, setOrganizationName] = useState('')

  // Pre-populate the form with suggested organization name
  useEffect(() => {
    if (defaults?.form.name) {
      setOrganizationName(defaults.form.name)
    }
  }, [defaults?.form.name])

  if (isLoading) return <Text>Loading...</Text>

  const handleSubmit = async () => {
    await createOrganization?.({ name: organizationName })
  }

  return (
    <View>
      <TextInput
        value={organizationName}
        onChangeText={setOrganizationName}
        placeholder="Organization name"
      />
      <TouchableOpacity onPress={handleSubmit}>
        <Text>Create organization</Text>
      </TouchableOpacity>
    </View>
  )
}
```

### Display advisory warnings

The following example demonstrates how to use the `advisory` property to display a warning when an organization with the suggested name or domain already exists.

```tsx {{ filename: 'components/CreateOrganizationWithWarning.tsx' }}
import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import { useOrganizationCreationDefaults, useOrganizationList } from '@clerk/clerk-expo'
import { useEffect, useState } from 'react'
import { Pressable, StyleSheet, TextInput } from 'react-native'

export default function CreateOrganizationWithWarning() {
  const { isLoaded, createOrganization, setActive } = useOrganizationList()
  const { data: defaults, isLoading } = useOrganizationCreationDefaults()
  const [organizationName, setOrganizationName] = useState('')

  useEffect(() => {
    if (defaults?.form.name) {
      setOrganizationName(defaults.form.name)
    }
  }, [defaults?.form.name])

  if (!isLoaded || isLoading) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>Loading...</ThemedText>
      </ThemedView>
    )
  }

  // Check if an organization with this name/domain already exists
  const advisory = defaults?.advisory
  const showWarning = advisory?.code === 'organization_already_exists'
  const existingOrgName = advisory?.meta?.organization_name
  const existingOrgDomain = advisory?.meta?.organization_domain

  const handleSubmit = async () => {
    try {
      const newOrganization = await createOrganization?.({ name: organizationName })
      // Set the created Organization as the Active Organization
      if (newOrganization) setActive({ organization: newOrganization.id })
    } catch (err) {
      // See https://clerk.com/docs/guides/development/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.label}>Organization name</ThemedText>
      <TextInput
        style={styles.input}
        value={organizationName}
        onChangeText={setOrganizationName}
        placeholder="Organization name"
        placeholderTextColor="#666666"
      />
      {showWarning && (
        <ThemedText style={styles.warning}>
          An organization "{existingOrgName}" already exists for the domain "{existingOrgDomain}".
        </ThemedText>
      )}
      <Pressable
        style={({ pressed }) => [
          styles.button,
          !organizationName && styles.buttonDisabled,
          pressed && styles.buttonPressed,
        ]}
        onPress={handleSubmit}
        disabled={!organizationName}
      >
        <ThemedText style={styles.buttonText}>Create organization</ThemedText>
      </Pressable>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  label: {
    fontWeight: '600',
    fontSize: 14,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#0a7ea4',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonPressed: {
    opacity: 0.7,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  warning: {
    color: '#f57c00',
    fontSize: 14,
    marginTop: -4,
  },
})
```

## Next steps

- [Build a custom flow for creating Organizations](https://clerk.com/docs/guides/development/custom-flows/organizations/create-organizations.md): Learn how to build a custom flow for creating Organizations.
- [Configure default naming rules](https://clerk.com/docs/guides/organizations/configure.md#default-naming-rules): Learn how to configure default naming rules for your Organizations.

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
