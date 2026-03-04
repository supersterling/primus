> ## Documentation Index
> Fetch the complete documentation index at: https://polar.sh/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Meters

> Creating and managing meters for Usage Based Billing

Meters are there to filter and aggregate the events that are ingested. Said another way, this is how you define what usage you want to charge for, based on the events you send to Polar. For example:

* AI usage meter, which filters the events with the name `ai_usage` and sums the `total_tokens` field.
* Video streaming meter, which filters the events with the name `video_streamed` and sums the `duration` field.
* File upload meter, which filters the events with the name `file_uploaded` and sums the `size` field.

You can create and manage your meters from the dashboard. Polar is then able to compute the usage over time, both globally and per customer.

## Creating a Meter

To create a meter, navigate to the Meters page in the sidebar and click the "Create Meter" button.

<img className="block dark:hidden" src="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/create-meter.light.png?fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=0145ac51bc8100b038482d31612f3ea6" data-og-width="3598" width="3598" data-og-height="2070" height="2070" data-path="assets/features/usage/create-meter.light.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/create-meter.light.png?w=280&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=06564195b986ffcc5e117fe8d9811a5a 280w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/create-meter.light.png?w=560&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=68bed5ae2b654f960df4cfd9f89067df 560w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/create-meter.light.png?w=840&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=b4eae2ac77588c804de04f46f9bb0ea0 840w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/create-meter.light.png?w=1100&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=7a869fe027539a8cecb45c92c5781031 1100w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/create-meter.light.png?w=1650&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=e661f4bf96776191db89ceaf6f74c4bd 1650w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/create-meter.light.png?w=2500&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=ed97c0b4c66e04ccee501693c309a6bc 2500w" />

<img className="hidden dark:block" src="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/create-meter.dark.png?fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=2293c25c2e2c014abcf6c8a761568f95" data-og-width="3590" width="3590" data-og-height="2066" height="2066" data-path="assets/features/usage/create-meter.dark.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/create-meter.dark.png?w=280&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=b5dfdb7fff99d88e7ab1e071dc3b1c49 280w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/create-meter.dark.png?w=560&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=cb463be35ab687fc710735ecc25115a7 560w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/create-meter.dark.png?w=840&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=81913de1ce93b114391ef2e3e47e7326 840w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/create-meter.dark.png?w=1100&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=3517924ffa89faf0a672ded7ebfce07b 1100w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/create-meter.dark.png?w=1650&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=121d7076d48d16cc60d6f8d01da93b83 1650w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/create-meter.dark.png?w=2500&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=3a90619357124a1d53198daeb6cac936 2500w" />

## Filters

A filter is a set of clauses that are combined using conjunctions. They're used to filter events that you've ingested into Polar.

<img className="block dark:hidden" src="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/filter.light.png?fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=77aca67ac7630a38fefa9a6d567a58f3" data-og-width="1274" width="1274" data-og-height="922" height="922" data-path="assets/features/usage/filter.light.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/filter.light.png?w=280&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=63aa8d2fcf57607d894e4197508ac471 280w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/filter.light.png?w=560&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=d490a459b8e9337775da489d8eca6479 560w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/filter.light.png?w=840&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=a9194a1390f970bfb6e6b6ce3dbe5f91 840w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/filter.light.png?w=1100&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=f77a2c146f613ff58848c7f061b21032 1100w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/filter.light.png?w=1650&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=fd58c1a2958502970dd1be8186c23008 1650w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/filter.light.png?w=2500&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=f2856bd8129920878767bfa7220a50fd 2500w" />

<img className="hidden dark:block" src="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/filter.dark.png?fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=6c855b483334dba4b7f26e54c2878080" data-og-width="1276" width="1276" data-og-height="914" height="914" data-path="assets/features/usage/filter.dark.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/filter.dark.png?w=280&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=08917a3bdf591a0fbf9935baa877c923 280w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/filter.dark.png?w=560&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=cc350040cb98987f87fa45533bed74d8 560w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/filter.dark.png?w=840&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=1c069e1bc97edf426a6f52c394ba172a 840w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/filter.dark.png?w=1100&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=e90bf35497aa55d2ddaee0bb890a5339 1100w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/filter.dark.png?w=1650&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=2f6b218e91faa3c76ad587c943ffab61 1650w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/filter.dark.png?w=2500&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=ea95d3313fd786655c0071a4fea0eaaa 2500w" />

### Clauses

A clause is a condition that an event must meet to be included in the meter.

#### Property

Properties are the properties of the event that you want to filter on.

If you want to match on a metadata field, you can use the metadata key directly. No need to include a `metadata.` prefix.

#### Operator

Operators are the operators that you want to use to filter the events.

* **Equals**
* **Not equals**
* **Greater Than**
* **Greater Than or Equals**
* **Less Than**
* **Less Than or Equals**
* **Contains**
* **Does Not Contain**

#### Value

Values are automatically parsed in the filter builder. They're parsed in the following order:

1. Number — Tries to parse the value as number
2. Boolean — Checks if value is "true" or "false"
3. String — Treats value as string as fallback

### Conjunctions

A conjunction is a logical operator that combines two or more clauses.

* **and** — All clauses must be true for the event to be included.
* **or** — At least one clause must be true for the event to be included.

## Aggregation

The aggregation is the function that is used to aggregate the events that match the filter.

For example, if you want to count the number of events that match the filter, you can use the **Count** aggregation. If you want to sum the value of a metadata field, you can use the **Sum** aggregation.

* **Count** — Counts the number of events that match the filter.
* **Sum** — Sums the value of a property.
* **Average** — Computes the average value of a property.
* **Minimum** — Computes the minimum value of a property.
* **Maximum** — Computes the maximum value of a property.
* **Unique** — Counts the number of unique values of a property.

<AccordionGroup>
  <Accordion title="Example">
    Consider the following events:

    ```json  theme={null}
    [
      {
        "name": "ai_usage",
        "external_customer_id": "cus_123",
        "metadata": {
          "total_tokens": 10
        }
      },
      {
        "name": "ai_usage",
        "external_customer_id": "cus_123",
        "metadata": {
          "total_tokens": 20
        }
      },
      {
        "name": "ai_usage",
        "external_customer_id": "cus_123",
        "metadata": {
          "total_tokens": 30
        }
      },
      {
        "name": "ai_usage",
        "external_customer_id": "cus_123",
        "metadata": {
          "total_tokens": 30
        }
      }
    ]
    ```

    Here is the result of each aggregation function, over the `total_tokens` metadata property:

    * **Count**: 4 units
    * **Sum**: 90 units
    * **Average**: 22.5 units
    * **Minimum**: 10 units
    * **Maximum**: 30 units
    * **Unique**: 3 units
  </Accordion>
</AccordionGroup>

If you want to use a metadata property in the aggregation, you can use the metadata property directly. No need to include a `metadata.` prefix.

## Example

The following Meter Filter & Aggregation will match events that have the name `openai-usage` and sum units over metadata property `completionTokens`.

<img className="block dark:hidden" src="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/meter.light.png?fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=2c4ba244ceee17f9bda8665f6a22a6b6" data-og-width="1108" width="1108" data-og-height="936" height="936" data-path="assets/features/usage/meter.light.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/meter.light.png?w=280&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=b2a94e81c180337d7ee2009a44bc2785 280w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/meter.light.png?w=560&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=eed0481a8ba7ccd18c11926272a102cd 560w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/meter.light.png?w=840&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=36c75ae39756a3e7a432d7e820321647 840w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/meter.light.png?w=1100&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=548601de5159c35205887b849fbf5e1d 1100w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/meter.light.png?w=1650&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=e5c3046097cc051d249d43da23ff2f74 1650w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/meter.light.png?w=2500&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=75af4ab8b61038d26c2bf1f0b92dfa96 2500w" />

<img className="hidden dark:block" src="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/meter.dark.png?fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=ef46a2a0420e3e01d7a181d3e7ddf118" data-og-width="1116" width="1116" data-og-height="928" height="928" data-path="assets/features/usage/meter.dark.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/meter.dark.png?w=280&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=1c1c57db0b50e0894c152e6fa5efce1c 280w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/meter.dark.png?w=560&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=a798552d1ead623238cc00e12de88cf3 560w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/meter.dark.png?w=840&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=cbcf411fe67a5142b614989510ae9952 840w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/meter.dark.png?w=1100&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=7c6db5a8ea7a281cdfc14291a96082c1 1100w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/meter.dark.png?w=1650&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=88a0ffbfa69bf627373eca1f00b73557 1650w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/meter.dark.png?w=2500&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=f76c0904beb7ecb5a83c2da8f27b1704 2500w" />

<Tip>
  You can **Preview** the events matched by the meter while creating it.
</Tip>

## Good to know

A few things to keep in mind when creating and managing meters:

### Updating a Meter

You may update a meter's filters or aggregation function as long as the meter doesn't have any processed events or does not have any customer purchase associated with it.
