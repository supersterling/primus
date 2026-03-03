# <PlanDetailsButton /> component

![The <PlanDetailsButton /> component renders a button that opens the Plan details drawer.](https://clerk.com/docs/images/ui-components/plan-details.svg){{ style: { maxWidth: '460px' } }}

The `<PlanDetailsButton />` component renders a button that opens the Plan details drawer, allowing users to view detailed information about a specific Plan, including pricing, Features, and other Plan-specific details.

> Billing is currently in Beta and its APIs are experimental and may undergo breaking changes. To mitigate potential disruptions, we recommend [pinning](https://clerk.com/docs/pinning.md) your SDK and `clerk-js` package versions.

## Usage

`<PlanDetailsButton />` preserves any click handlers attached to custom button elements, while maintaining the Plan details drawer functionality.

```tsx
<PlanDetailsButton planId="cplan_xxx">
  <button onClick={() => console.log('Button clicked')} className="custom-button">
    View Plan
  </button>
</PlanDetailsButton>
```

`<PlanDetailsButton />` supports rendering the Plan details drawer in a custom portal container.

```tsx {{ prettier: false }}
const portalRoot = document.getElementById('custom-portal')

<PlanDetailsButton
  planId="cplan_xxx"
  planDetailsProps={{
    portalId: 'custom-portal',
    portalRoot: portalRoot,
  }}
/>
```

### Examples

```vue {{ filename: 'pricing.vue' }}
<script setup lang="ts">
import { PlanDetailsButton } from '@clerk/vue/experimental'
</script>

<template>
  <div>
    <!-- Basic usage with Plan ID -->
    <PlanDetailsButton planId="cplan_xxx" />

    <!-- Customizes the appearance of the Plan details drawer -->
    <PlanDetailsButton
      planId="cplan_xxx"
      initialPlanPeriod="month"
      :planDetailsProps="{
        appearance: {
          /* custom theme */
        },
      }"
    />

    <!-- Custom button -->
    <PlanDetailsButton planId="cplan_xxx">
      <button class="custom-button">View Plan Features</button>
    </PlanDetailsButton>
  </div>
</template>
```

## Properties

| Name                                                                                                                                    | Type                | Description                                                                                            |
| --------------------------------------------------------------------------------------------------------------------------------------- | ------------------- | ------------------------------------------------------------------------------------------------------ |
| planId?                                                                                                                                 | string              | The ID of the Plan to display details for. It is required if plan is not provided.                     |
| plan?                                                                                                                                   | BillingPlanResource | The Plan to display details for. It is used as initial data until the Plan is fetched from the server. |
| children?                                                                                                                               | React.ReactNode     | Optional custom button element. If not provided, defaults to a button with the text "Plan details".    |
| initialPlanPeriod?                                                                                                                      | 'month' | 'annual' | Optional prop to set the initial billing period view when the Plan details drawer opens.               |
| appearance: an object used to style your components. For example: <PlanDetailsButton planDetailsProps={{ appearance: { ... } }} />. |                     |                                                                                                        |

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
