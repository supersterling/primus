> ## Documentation Index
> Fetch the complete documentation index at: https://polar.sh/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Product Updates

> Stay up to date with the latest changes and improvements to Polar.

<Update label="2026-01-31">
  ## Team Member Management (B2B)

  Complete team member management system for B2B customers:

  * Owner and billing managers can add/remove team members
  * Role-based access control (owner, billing\_manager, member)
  * Member-specific benefit grants and portal access
  * Team portal page with member list and management
  * Member sessions (`polar_mst_`) preserve identity and permissions
  * Members tab on customer detail pages

  Perfect for B2B customers managing team access and permissions.

  ### Explicit Currency Display

  Currency symbols now show explicitly (e.g., `USD 123.45`) instead of just `$123.45` to prevent confusion for non-US dollar users.

  ## Event & Metering Enhancements

  ### Member-Level Event Attribution

  Events now support member tracking:

  * `member_id` and `external_member_id` fields
  * Member validation during event ingestion
  * B2B usage tracking at member level

  ### Timezone Handling

  Fixed timezone issues in meter quantities endpoint:

  * Added `timezone` parameter
  * Set database session timezone properly
  * Correct date grouping for non-UTC users

  ## Customer Portal Enhancements

  ### Benefit Grants UI

  * Complex benefit grants list with search and pagination
  * Better display for benefit details
  * Improved OAuth benefit grant buttons

  ### Payment Retry Fixes

  * 3DS modal display (popup instead of redirect)
  * Retry persistence after 3DS cancellation
  * Proper dunning management on manual retries

  ## Discount Management

  ### Redemption Count Optimization

  * Added `redemptions_count` column to discounts table
</Update>

<Update label="2025-12-31">
  ## System Events for Subscriptions

  Expanded system events to provide detailed subscription lifecycle tracking:

  * **Subscription cycled** - when billing periods roll over
  * **Subscription canceled** - when subscriptions are canceled
  * **Subscription past due** - when payment fails (separate from permanent revocation)
  * All events include product IDs and relevant metadata
  * Perfect for analytics and building custom workflows

  ## iOS Widget

  New iOS home screen and lock screen widget:

  * Real-time revenue display
  * Support for dark and light mode
  * Multiple widget sizes
  * Quick glance at your sales without opening the app

  Built with `@bacons/apple-targets` for native iOS integration.

  ## Product Management Improvements

  Major UX improvements for managing products:

  ### Sorting & Filtering

  * Sort products by name, creation date, update date, and end date
  * Custom pagination size (20, 50, 100 items per page)
  * Product rows are clickable links for cmd+click support

  ### Editing Experience

  * Unsaved changes alert prevents accidental data loss
  * Update button at top right for easier access
  * Auto-save for most settings
  * Fixed empty state flashing when sorting/filtering

  ### File Management

  * Client-side pagination for downloadable benefit files (10 per page)
  * Better file upload error messages
  * Fixed React state issues in benefit forms

  ### Product Duplication

  * Re-uploads images when duplicating to prevent shared references
  * Deleting an image from a duplicate no longer affects the original

  ## Search Improvements

  Significant search infrastructure updates:

  * Search vectors for full-text search
  * Union queries for better performance
  * PostgreSQL text search capabilities

  ## Member Management

  Enhanced member endpoint functionality:

  * Added `member_id` to relevant API endpoints
  * Improved B2B customer management

  ## Mobile App Improvements

  ### iOS Updates

  * iOS widget for home and lock screen
  * App rating prompts at appropriate times
  * Login screen animations (fade in, Ken Burns effect)
  * Fixed multi-account crash on settings
  * Fixed scroll issues with many organizations
  * Version bumped to 1.1.0

  ### Android Support

  * Full Android build support
  * App store ready for both platforms
  * Consistent design system across iOS and Android

  ## Customer Meter Enhancements

  Significant improvements to customer meter calculation:

  * Speed improvements with optimized queries (avoided cartesian joins)
  * Better activation logic for meters with events
  * Fixed organization ID tracking
  * Increased lock time to 30s for slow queries
  * Debug information in window event spans
  * Proper external customer ID handling

  ## Webhook Management

  Better webhook health tracking:

  * Discord rate limit logging
  * Missing event types added to schema
  * Improved error handling
  * Repository-based webhook service

  ## Checkout Links

  * Added checkout links to mobile app
  * Better link management
  * Share and track checkout performance on mobile

  ## OAuth2 Improvements

  * First-party clients auto-save grants
  * No authorization prompt for trusted apps
  * Better user experience for internal tools

  ## Bug Fixes

  * Fixed undefined organization in dashboard sidebar
  * Fixed customer meter updates for soft-deleted customers
  * Fixed seat and trial end updates for seat-based products
  * Fixed tax calculation error handling
  * Fixed product empty state flashing
  * Fixed notifications on iOS simulator
  * Fixed Switch rendering on Android
  * Fixed Polar logo not linking to home
  * Fixed image duplication on product creation
  * Handle null Stripe refund reasons
  * Fixed subscription fields in system events
</Update>

<Update label="2025-12-07">
  ## Dispute & Chargeback Management

  Complete dispute tracking and prevention system:

  * Dispute model to track chargebacks from Stripe
  * Chargeback Stop integration for rapid dispute resolution (RDR)
  * Auto-refund on RDR disputes to prevent chargebacks
  * Link refunds to disputes for better tracking
  * Improved dispute event handling from Stripe webhooks

  Helps reduce chargeback fees and protect your account standing.

  ## Metrics API

  New metrics filtering system:

  * `metrics` query parameter to filter specific metrics
  * Removed deprecated `focus_metrics` parameter
  * Better performance by only calculating requested metrics

  ## iOS App Updates

  * App rating prompts at appropriate times
  * iOS upsell banner on homepage
  * Animations on login screen (fade in, Ken Burns effect, staggered elements)
  * Fixed multi-account crash on settings screen
  * Fixed onboarding redirect after org creation
  * Fixed scroll issue with many orgs
  * Version bumped to 1.1.0

  ## Mobile App (Android)

  Added Android support:

  * Android targets in build scripts
  * App store ready for both iOS and Android

  ## Email Improvements

  * Updated Polar logo in all emails
  * Better email DNS validation
  * Fixed invalid email domain issues

  ## Worker Queue Management

  Better task prioritization:

  * Low, medium, and high priority queues
  * Separate workers for different priorities
  * Schedule tasks moved to high priority worker
</Update>

<Update label="2025-11-28">
  ## Downloads Page

  New dedicated downloads page at polar.sh/downloads for easy access to desktop and mobile apps.

  ## Customer Balance Refunds

  * Handle refunds on orders with customer balance applied
  * Proper balance credit restoration
  * Block refunds on specific orders via API flag

  ## Worker Priority Queues

  Introduced task prioritization system:

  * Low priority queue for background tasks
  * Medium priority queue for standard tasks
  * High priority queue for time-sensitive operations
  * Separate workers consuming from each queue

  Ensures critical tasks get processed first.

  ## Rate Limiting

  * New restricted rate limit group for abusive patterns
  * Better rate limit handling across endpoints

  ## Email Validation

  Added DNS validation for email addresses across checkout, customer creation, and user management to prevent typos and invalid domains.

  ## Event Query Optimization

  Massive performance improvements:

  * Removed unnecessary ordering from event queries (3x faster)
  * Better customer latest event queries
  * New indexes on events table
  * Optimized IN queries for customer meters

  ## Mobile App Improvements

  * Account deletion functionality
  * Proper logout and login flow fixes
  * Better error handling
  * Login screen animations with Ken Burns effect

  ## Bug Fixes

  * Fixed settings scroll with many organizations
  * Fixed app onboarding redirect
  * Fixed organization service name in Logfire
  * Fixed customer meter organization ID tracking
  * Fixed bitwise SQL operator parentheses
</Update>

<Update label="2025-11-21">
  ## Customer Balance

  Customer balance system built on top of wallet infrastructure:

  * Track customer credit balances
  * Apply balances automatically to invoices
  * API support for balance management
  * Foundation for store credit and refund credits

  ## Members API

  New members management system for B2B customers:

  * GET `/v1/members` endpoint with pagination
  * Filter members by customer ID
  * Auto-create owner member when customer is created
  * Override owner member details via API
  * Members included in customer endpoints
  * Proper organization scoping and access control

  Perfect for managing team members across B2B customer accounts.

  ## Sign in with Apple

  Added Apple OAuth for authentication:

  * Apple OAuth integration

  ## Ad-hoc Checkout Pricing

  Create checkouts with dynamic pricing that override catalog prices:

  * Useful for custom deals, usage-based pricing, or testing
  * Supports all price types (fixed, free, custom)
  * Full API and SDK support

  [Read more](/docs/features/checkout/session#ad-hoc-prices)

  ## Churn Rate

  New churn rate metric on analytics dashboard:

  * Track subscription cancellations over time
  * Understand retention patterns
  * Available on homepage and customers page

  ## Event Labels

  Events now have customizable labels:

  * System events get readable labels automatically
  * User events can have custom labels
  * Labels shown throughout events UI
  * Edit labels via event type settings

  Makes events more readable and meaningful for your team.

  ## Spans View

  New spans interface for hierarchical event tracking (hidden for now):

  * List and detail views for event spans
  * Charts and sparklines for visualization
  * Time-series data with proper timezone handling
  * Cost aggregation across event hierarchies

  ## Metrics Performance

  Significant performance improvements for analytics:

  * Optimized metrics queries with window functions
  * Better date range bounds handling
  * Indexes on subscription date columns
  * Cumulative revenue includes full history
  * Fixed timezone and interval issues

  ## Invoice Numbering

  Changed default invoice numbering to per-customer (was organization-wide):

  * Each customer starts invoice numbering at 1
  * Hides sales volume from individual customers
  * Can still switch to organization-wide in settings

  ## Tax & Billing

  * Show taxable amount after discount in checkout
  * Fixed tax ID formatting (was showing raw strings)
  * Fixed Stripe coupon name length validation
  * Fixed conflicting invoice numbering issues

  ## Checkout Improvements

  * Persist business name across checkouts
  * Hide cookie consent banner when logging in via app
  * Fixed expired checkout intent handling

  ## Bug Fixes

  * Fixed 404 after deleting customers, benefits, or checkout links
  * Fixed product price configurator validation
  * Fixed custom field number constraint validation
  * Fixed benefit capitalization in customer portal
  * Fixed organization cache after profile picture update
  * Fixed social link parsing

  ## Mobile App

  * Continue with Apple support
  * Disabled tablet support (phone-only for now)
  * Fixed EAS build configuration
  * Removed demo mode
  * Better workspace integration
</Update>

<Update label="2025-11-14">
  ## Trial Abuse Prevention

  Prevent customers from redeeming multiple trials with email aliases or different payment methods:

  * Email normalization strips `+aliases` to detect duplicates
  * Payment method fingerprinting tracks card usage
  * Enable via Settings → Subscription → "Prevent trial abuse"
  * Blocked customers see error and can still subscribe without trial
  * Checkout parameter `allow_trial` to force disable trials

  Perfect for controlling trial costs while still allowing new customers to subscribe.

  ## Event Types & Aggregation

  New event types system for better organization and analytics:

  * Event types automatically created for events with the same name
  * Custom display names for better readability
  * Statistics endpoint for event aggregation
  * Event closure tables for efficient hierarchy queries

  ## Mobile App (Beta)

  Polar mobile app added to the monorepo:

  * React Native implementation with Expo
  * Expo workflow for development and builds
  * Shared workspace with web dashboard
  * Foundation for mobile-first experiences

  ## Webhook Events

  Skipped events now properly tracked:

  * Events skipped when endpoint disabled no longer count as failures
  * Prevents false positives in health checks
  * Better webhook reliability metrics

  ## File Uploads

  Large file upload support:

  * Handles files larger than memory limits
  * Multipart upload handling
  * SHA256 validation per part
  * Better progress tracking

  ## Subscription Management

  ### Billing Period Control

  New API to change current billing period end date:

  * Useful for custom billing arrangements
  * Prorations calculated automatically
  * Prevented on already-cancelled subscriptions

  ### Payout Improvements

  * Increased minimum payout amounts for certain currencies
  * Better error logging for Stripe payout failures

  ## UI & UX

  ### Analytics Improvements

  * Fixed timezone issues with date range selection
  * Better interval formatting in legends
  * Improved preset intervals ("this year", "last year")
  * Consistent date handling across dashboard

  ### Customer Portal

  * Fixed overflowing invoice action buttons
  * Improved mobile experience

  ### Settings

  * Auto-prefix social media URLs
  * Removed seat-based billing toggle (now standard)

  ## Bug Fixes

  * Fixed `allow_trial` parameter handling
  * Fixed dark mode colors across dashboard
  * Fixed tax rate limiting in sandbox environment
  * Fixed Stripe trial redemption error handling
  * Fixed member invitation dialog Enter key submission
  * Fixed large file upload memory issues
  * Fixed metrics organization filtering
</Update>

<Update label="2025-11-07">
  ## Hierarchical Events & Spans

  Events can now be organized hierarchically with parent-child relationships, perfect for tracking complex workflows:

  * Create event spans with `parent_id` reference
  * Use `external_id` as idempotency key to prevent duplicate events
  * View nested events in the dashboard
  * Navigate event hierarchies with dedicated event detail pages
  * Query transitive closure for efficient sub-hierarchy analysis

  This enables use cases like tracking LLM requests with multiple steps, or multi-phase order fulfillment workflows.

  ## Master-Detail Layout

  New master-detail layout pattern across the dashboard:

  * List view on the left, detail view on the right
  * Proper nested routing for direct linking
  * Better navigation and state management
  * Improved querystring handling

  Applied to customers, subscriptions, events, and more.

  ## Improved Date Range Picker

  Better date range selection throughout analytics:

  * Fixed "this year" and "last year" presets
  * Smart interval selection based on date range
  * Consistent behavior across all views
  * Better timezone handling

  ## Settings Auto-Save

  Settings now auto-save as you type instead of requiring manual save button clicks. Includes proper debouncing and error handling for a smoother experience.

  ## Customer Management Enhancements

  ### Product Subscription View

  Product overview now shows active subscriptions table, making it easier to see who's using each product.

  ### Customer Filtering

  Filter subscriptions by cancellation status - find subscriptions that will cancel at period end.

  ### Benefit Grants

  Added direct links to customers and subscriptions from benefit grants overview for easier navigation.

  ## Account Management

  * Email notifications when unlinking accounts from organizations
  * Fixed OAuth account disconnection for users with multiple accounts on the same platform

  ## Bug Fixes

  * Fixed customer update trying to set email to None when explicitly provided
  * Fixed payment method handling when soft-deleted methods are updated from Stripe
  * Added maximum length validation to customer names
  * Fixed customer portal theming
  * Fixed subscription double cycling with proper locking mechanisms
  * Fixed Mintlify docs CSP configuration
</Update>

<Update label="2025-10-31">
  ## Cost Insights

  We've launched Cost Insights - a powerful way to track and analyze costs associated with usage. Now you can:

  * Track costs per event with sub-cent precision
  * View cost analytics across your dashboard
  * See cost breakdowns by customer and product
  * Monitor cost trends with dedicated charts

  Perfect for understanding unit economics and profitability of your usage-based offerings.

  [Read more](/features/usage-billing/cost-insights)

  ## Webhook Management

  ### Auto-Disable Failing Webhooks

  Webhooks that continuously fail (10+ consecutive failures by default) are now automatically disabled to save resources. You can manually re-enable them from the dashboard once the issue is fixed.

  ### Email Notifications for Webhook Failures

  When webhooks are automatically disabled due to continuous failures, all organization members receive an email notification with details and steps to re-enable.

  ## Benefit Revocation Grace Period

  Configure a grace period for benefit revocation when subscription payments fail. Instead of immediately revoking benefits, you can now give customers time to resolve payment issues:

  * Immediate revocation (default)
  * Grace period matching payment retry window

  This applies to both regular benefits and customer seat benefits.

  ## Customer Portal Enhancements

  ### Upcoming Charge Display

  Subscription detail pages now show the upcoming charge amount and date, including:

  * Trial end dates with first charge amount
  * Next billing cycle charges for active subscriptions
  * Automatic updates when subscriptions change

  ### Usage & Metering View

  Improved the customer usage view:

  * Respect archived meters - they no longer appear in usage tracking
  * Better empty states for customers with granted credits
  * Create customer meters automatically when meter credits are granted

  ### Navigation & UX Improvements

  * Fixed navigation highlighting on mobile
  * Better handling of expired login codes
  * Removed unnecessary scrolling
  * Can't switch plans during trial period (not supported yet)

  ## Seat Management Updates

  * API support for assigning seats programmatically
  * \$0/seat pricing now allowed for seat-based tiers
  * Fixed eager loading issues with customer seats
  * Better webhooks for customer seat events

  ## Invoice Numbering

  Two invoice numbering modes:

  * **Organization-wide** (default) - Sequential across all customers
  * **Per-customer** - Each customer has independent invoice numbering starting at 1

  Useful when you want to hide sales volume from customers.

  ## System Events

  New system events automatically created for:

  * Orders paid
  * Orders refunded
  * Customer creation
  * Customer updates

  These events are available in the events explorer with cost tracking where applicable.

  ## Discount Management

  Improved discount code selection with a searchable combobox instead of a dropdown, making it easier to find specific codes.

  ## Bug Fixes

  * Fixed customer meter matching to include external customer IDs
  * Fixed Indian GST tax validation
  * Fixed subscription dunning process when payment is deleted
  * Fixed order confirmation emails for orders without products
</Update>

<Update label="2025-10-24">
  ## Seat-Based Pricing for One-Time Products

  You can now offer seat-based pricing for one-time purchases, not just subscriptions. Customers can select the number of seats during checkout, and you can manage seats for one-time orders through both the dashboard and API.

  This extends our seat management capabilities to all product types, giving you more flexibility in how you price and package your offerings.

  ## Ability to Change Subscription Seats

  Customers can now change the number of seats on their active subscriptions directly from the Customer Portal. The changes are prorated automatically, making it easy for teams to scale up or down as needed.

  ## Flexible Subscription Intervals

  We've added support for flexible subscription intervals beyond monthly and yearly. You can now create subscriptions with custom billing periods:

  * Daily subscriptions
  * Weekly subscriptions
  * Custom intervals (e.g., every 2 weeks, every 3 months)

  Configure the interval count when creating or updating subscription products through both the dashboard and API.

  ## Subscription Creation API

  We've launched a new API endpoint to create subscriptions programmatically. This enables you to set up subscriptions directly without requiring customers to go through the checkout flow.

  [Read more](/api-reference/subscriptions/create)

  ## Enhanced Email Confirmations

  Order confirmation emails now include:

  * **Invoice PDFs attached** - Invoices are automatically generated and attached to confirmation emails for one-time purchases
  * **Order details** - Complete breakdown of what was purchased
  * **Benefits list** - Clear view of all benefits the customer will receive

  ## Customer Portal Improvements

  ### Seat Management

  Customers with seat-based subscriptions can now:

  * View all active seats
  * Add or remove seats (with automatic proration)
  * Manage team members directly from the portal

  ### URL Encoding Fix

  Fixed an issue where email addresses with special characters (like `+` signs in email aliases) weren't properly encoded in customer portal links, causing the wrong email to be pre-filled.

  ## Events & Metering

  ### Cost Tracking

  Events can now include cost metadata, enabling you to track costs associated with usage. Costs are displayed throughout the events explorer and analytics.

  ### Event Explorer Enhancements

  * Metadata filtering - Search and filter events by metadata fields
  * Customer filtering - Filter events by specific customers
  * Query search - Full-text search across event data
  * Improved event cards with better timestamps and cost visualization

  ## Order Export

  You can now export orders to CSV directly from the dashboard. Filter by product and the export will respect your current filters, making it easy to analyze sales data.

  ## OAuth2 Flow Improvements

  * If no scope is passed in the authorize request, the client's default scope is now used automatically
  * Improved organization selector UI in the OAuth2 authorization flow

  ## Checkout Improvements

  * Fixed seat selector visibility on mobile devices
  * Server-side prefilling of checkout link query parameters
  * Improved discount code validation flow

  ## Statement Descriptor Enhancement

  First payments after a trial period now include "TRIAL OVER" in the statement descriptor, making it clearer to customers why they're being charged.

  ## Bug Fixes

  * Fixed customer state API for trialing subscriptions
  * Fixed broken customer links in events explorer
  * Fixed discount duration calculation for very long durations (capped at 999 months)
</Update>

<Update label="2025-10-17">
  ## Ability to update subscription to an updated price of the product

  Merchants can now [update existing subscriptions](https://polar.sh/docs/api-reference/subscriptions/update#subscriptionupdateproduct) from archived pricing schemes to current ones within the same product.

  * Enables migration from grandfathered pricing to current pricing schemes
  * Prorations calculated using active subscription prices
  * In the dashboard, a small badge **Upgrade pricing** will indicate that you can update to the same product, but with the new pricing scheme.

  <img class="rounded" src="https://mintcdn.com/polar/P14Bx1Nt4rA16sHk/assets/changelog/2025-10-17/update-subscription.png?fit=max&auto=format&n=P14Bx1Nt4rA16sHk&q=85&s=84b0f80f4c5d6c6ede3fb478d93febb9" data-og-width="1026" width="1026" data-og-height="1044" height="1044" data-path="assets/changelog/2025-10-17/update-subscription.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/polar/P14Bx1Nt4rA16sHk/assets/changelog/2025-10-17/update-subscription.png?w=280&fit=max&auto=format&n=P14Bx1Nt4rA16sHk&q=85&s=3883b6fb1705fb66a6bd711c1d465d29 280w, https://mintcdn.com/polar/P14Bx1Nt4rA16sHk/assets/changelog/2025-10-17/update-subscription.png?w=560&fit=max&auto=format&n=P14Bx1Nt4rA16sHk&q=85&s=7cba24c5d8795b7fb92361b32162075d 560w, https://mintcdn.com/polar/P14Bx1Nt4rA16sHk/assets/changelog/2025-10-17/update-subscription.png?w=840&fit=max&auto=format&n=P14Bx1Nt4rA16sHk&q=85&s=9771c2705febeda2b6bcbc5a48b9a36a 840w, https://mintcdn.com/polar/P14Bx1Nt4rA16sHk/assets/changelog/2025-10-17/update-subscription.png?w=1100&fit=max&auto=format&n=P14Bx1Nt4rA16sHk&q=85&s=775f2d95c6cb9a2c1312a8888f39d84c 1100w, https://mintcdn.com/polar/P14Bx1Nt4rA16sHk/assets/changelog/2025-10-17/update-subscription.png?w=1650&fit=max&auto=format&n=P14Bx1Nt4rA16sHk&q=85&s=8af4ce16db55fa74f8d65fa1ee55604d 1650w, https://mintcdn.com/polar/P14Bx1Nt4rA16sHk/assets/changelog/2025-10-17/update-subscription.png?w=2500&fit=max&auto=format&n=P14Bx1Nt4rA16sHk&q=85&s=7d06860644d6194437a0cf671a6af013 2500w" />

  ## New IP ranges

  From **October 27th, 2025**, [new IP ranges](https://polar.sh/docs/integrate/webhooks/delivery#ip-allowlist) will be added.

  ## Improved Subscription Cancellation Flow

  [Benefits](https://polar.sh/docs/features/benefits/introduction) attached to the subscription [are now automatically revoked](https://github.com/polarsource/polar/pull/7271) when the subscription is canceled.

  ## Ability to specify External ID

  [External ID can now be specified](https://github.com/polarsource/polar/pull/7275) during creation of a customer via the dashboard.

  <img class="border rounded" src="https://mintcdn.com/polar/P14Bx1Nt4rA16sHk/assets/changelog/2025-10-17/create-customer.png?fit=max&auto=format&n=P14Bx1Nt4rA16sHk&q=85&s=4f96d098affca55b7140c26196e16852" data-og-width="1034" width="1034" data-og-height="1030" height="1030" data-path="assets/changelog/2025-10-17/create-customer.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/polar/P14Bx1Nt4rA16sHk/assets/changelog/2025-10-17/create-customer.png?w=280&fit=max&auto=format&n=P14Bx1Nt4rA16sHk&q=85&s=c71ce04bc18bfe24a2076b8b3fa85fe7 280w, https://mintcdn.com/polar/P14Bx1Nt4rA16sHk/assets/changelog/2025-10-17/create-customer.png?w=560&fit=max&auto=format&n=P14Bx1Nt4rA16sHk&q=85&s=01efa2ee281c648d78f630578f5e0959 560w, https://mintcdn.com/polar/P14Bx1Nt4rA16sHk/assets/changelog/2025-10-17/create-customer.png?w=840&fit=max&auto=format&n=P14Bx1Nt4rA16sHk&q=85&s=d86240a390a690e1afa75a64de709274 840w, https://mintcdn.com/polar/P14Bx1Nt4rA16sHk/assets/changelog/2025-10-17/create-customer.png?w=1100&fit=max&auto=format&n=P14Bx1Nt4rA16sHk&q=85&s=0e2537c9c9912bcad0cbc7d3f1533656 1100w, https://mintcdn.com/polar/P14Bx1Nt4rA16sHk/assets/changelog/2025-10-17/create-customer.png?w=1650&fit=max&auto=format&n=P14Bx1Nt4rA16sHk&q=85&s=72db1acc1262b9d2092c80622b140131 1650w, https://mintcdn.com/polar/P14Bx1Nt4rA16sHk/assets/changelog/2025-10-17/create-customer.png?w=2500&fit=max&auto=format&n=P14Bx1Nt4rA16sHk&q=85&s=85fbba7f8319319a35a524599a780cac 2500w" />

  ## Ability to set Return URL for Checkouts and Customer Portal

  A Return URL can now be set while generating a [checkout session](https://polar.sh/docs/api-reference/checkouts/create-session#body-return-url-one-of-0) or a [customer portal session](https://polar.sh/docs/api-reference/customer-portal/sessions/create#body-one-of-0-return-url-one-of-0). This allows you to preserve the context for the end users who visit either if they wish to go back to the application.

  ## Ability to search Customers via their External ID

  The [List Customers API](https://polar.sh/docs/api-reference/customers/list) now accepts Customer's External ID [in the **query** parameter](https://polar.sh/docs/api-reference/customers/list#parameter-one-of-0).

  ## Ability to disable automatic customer emails

  Via the organization settings, you can now disable the emails we automatically send to customers on certain events. This gives you the ability to own the communications with the customers.

  <img class="border rounded" src="https://mintcdn.com/polar/P14Bx1Nt4rA16sHk/assets/changelog/2025-10-17/email-settings.png?fit=max&auto=format&n=P14Bx1Nt4rA16sHk&q=85&s=d64d9fd9fa62439c370ca5a39a62a47a" data-og-width="1660" width="1660" data-og-height="1522" height="1522" data-path="assets/changelog/2025-10-17/email-settings.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/polar/P14Bx1Nt4rA16sHk/assets/changelog/2025-10-17/email-settings.png?w=280&fit=max&auto=format&n=P14Bx1Nt4rA16sHk&q=85&s=34406692e3c5ca7e20df5e2b462e9eae 280w, https://mintcdn.com/polar/P14Bx1Nt4rA16sHk/assets/changelog/2025-10-17/email-settings.png?w=560&fit=max&auto=format&n=P14Bx1Nt4rA16sHk&q=85&s=b8b8bb4d93d5091951214acb0bde2f3a 560w, https://mintcdn.com/polar/P14Bx1Nt4rA16sHk/assets/changelog/2025-10-17/email-settings.png?w=840&fit=max&auto=format&n=P14Bx1Nt4rA16sHk&q=85&s=39502fece8fb05eadc3a000f2a73ae61 840w, https://mintcdn.com/polar/P14Bx1Nt4rA16sHk/assets/changelog/2025-10-17/email-settings.png?w=1100&fit=max&auto=format&n=P14Bx1Nt4rA16sHk&q=85&s=103d7726ff4f901bf0d453e285555b5e 1100w, https://mintcdn.com/polar/P14Bx1Nt4rA16sHk/assets/changelog/2025-10-17/email-settings.png?w=1650&fit=max&auto=format&n=P14Bx1Nt4rA16sHk&q=85&s=7243575a6645fb7f11c95a80fc559c5e 1650w, https://mintcdn.com/polar/P14Bx1Nt4rA16sHk/assets/changelog/2025-10-17/email-settings.png?w=2500&fit=max&auto=format&n=P14Bx1Nt4rA16sHk&q=85&s=a81081e7c15f762563781a0b2556c9c2 2500w" />
</Update>

<Update label="2025-10-10">
  ## Launched In-Product Chat Support for Merchants

  <img src="https://mintcdn.com/polar/BSq8s4sf_HNjO0FK/assets/changelog/2025-10-10/launched-merchant-support.jpg?fit=max&auto=format&n=BSq8s4sf_HNjO0FK&q=85&s=8d424a428d041a57cd35ea2e3128071f" data-og-width="4291" width="4291" data-og-height="2632" height="2632" data-path="assets/changelog/2025-10-10/launched-merchant-support.jpg" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/polar/BSq8s4sf_HNjO0FK/assets/changelog/2025-10-10/launched-merchant-support.jpg?w=280&fit=max&auto=format&n=BSq8s4sf_HNjO0FK&q=85&s=c78c874694d6f94ad123370b637fd3c3 280w, https://mintcdn.com/polar/BSq8s4sf_HNjO0FK/assets/changelog/2025-10-10/launched-merchant-support.jpg?w=560&fit=max&auto=format&n=BSq8s4sf_HNjO0FK&q=85&s=b4fea1eb74ad72346c0096b6c7f21bac 560w, https://mintcdn.com/polar/BSq8s4sf_HNjO0FK/assets/changelog/2025-10-10/launched-merchant-support.jpg?w=840&fit=max&auto=format&n=BSq8s4sf_HNjO0FK&q=85&s=287b7597e37f6554ebc5a45894585b1e 840w, https://mintcdn.com/polar/BSq8s4sf_HNjO0FK/assets/changelog/2025-10-10/launched-merchant-support.jpg?w=1100&fit=max&auto=format&n=BSq8s4sf_HNjO0FK&q=85&s=65836546055f23909a482d19145813aa 1100w, https://mintcdn.com/polar/BSq8s4sf_HNjO0FK/assets/changelog/2025-10-10/launched-merchant-support.jpg?w=1650&fit=max&auto=format&n=BSq8s4sf_HNjO0FK&q=85&s=decd651383ea8e53a884211992c8c97a 1650w, https://mintcdn.com/polar/BSq8s4sf_HNjO0FK/assets/changelog/2025-10-10/launched-merchant-support.jpg?w=2500&fit=max&auto=format&n=BSq8s4sf_HNjO0FK&q=85&s=025c6d15aa49af9754f0d44dd61783e0 2500w" />

  We're excited to introduce a chat widget to the Polar dashboard, making it easier than ever for merchants to get help directly within the product.

  ## Improved Checkout Flow for Invalid Discount Code

  Previously, if you entered an invalid discount code during checkout, you couldn't continue even after removing the code. Now, clearing the discount input lets you proceed smoothly with the checkout process.

  ## Improved Customer Portal Rate Limits

  We've made several improvements to the Customer Portal to handle authentication rate limits more gracefully:

  * The portal now clearly shows 401 and 429 errors on the OTP (one-time password) page.
  * If you hit a 429 (too many requests), you'll be redirected to a clear `/too-many-requests` page.
</Update>

<Update label="2025-10-01">
  ## Launched Subscription Trials

  You can now offer [trial periods](/docs/features/trials) for new subscriptions! This highly requested feature allows you to let customers experience your product before their first payment is due. Trials can be configured in both the dashboard and API when creating or updating subscription products.

  ## Always display taxes line item in the checkout

  We've improved our checkout experience to always display taxes (vs lazy loading them on country selection), making charges more transparent for your customers regardless of whether taxes apply to their purchase.

  ## Do not calculate taxes on free or zero-amount orders

  Orders with a zero amount (such as promotional products) will no longer have taxes calculated, resulting in a clearer and more accurate order summary for your customers.

  ## Add confirmation modal for deleting discounts

  When deleting a discount, you'll now see a confirmation modal to help prevent accidental deletions and provide extra clarity on the impact of your actions.

  ## Fix infinite rendering loop with date picker

  Resolved a bug where selecting dates in the date picker could cause an infinite rendering loop, improving reliability for date-related forms.

  ## Require opt-in if you will be charged immediately

  Users must now explicitly confirm immediate charges or credits when switching subscription intervals, with the UI providing clearer, contextual explanations of invoicing outcomes.

  ## Check for `expires_at` when activating license keys

  License key activation now correctly checks the `expires_at` date, ensuring that only valid, non-expired license keys can be activated.

  ## Fix customer state for trialing subscriptions

  The [Customer State API](/docs/api-reference/customers/state) now properly handles customers with `trialing` subscriptions, so your integrations and dashboards always show an accurate subscription status.
</Update>

<Update label="2025-09-22">
  ## Improved preview of next invoice in Customer Portal

  We've enhanced the Customer Portal to provide a clearer and more accurate preview of your next invoice. The overview now updates automatically after subscription changes, and you can preview upcoming charges with all relevant taxes and discounts included.

  ## Cancellation metrics

  <img src="https://mintcdn.com/polar/KPDvrxuIefIR_xN_/assets/changelog/2025-09-22/cancellation-metrics-example.png?fit=max&auto=format&n=KPDvrxuIefIR_xN_&q=85&s=03281906e75a2f354a6636e54d226296" data-og-width="2490" width="2490" data-og-height="1186" height="1186" data-path="assets/changelog/2025-09-22/cancellation-metrics-example.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/polar/KPDvrxuIefIR_xN_/assets/changelog/2025-09-22/cancellation-metrics-example.png?w=280&fit=max&auto=format&n=KPDvrxuIefIR_xN_&q=85&s=6ae19ffbdaba4c7c0fe0d526ace61321 280w, https://mintcdn.com/polar/KPDvrxuIefIR_xN_/assets/changelog/2025-09-22/cancellation-metrics-example.png?w=560&fit=max&auto=format&n=KPDvrxuIefIR_xN_&q=85&s=42b4d9d3462985ebbe5caf58f19ecbe1 560w, https://mintcdn.com/polar/KPDvrxuIefIR_xN_/assets/changelog/2025-09-22/cancellation-metrics-example.png?w=840&fit=max&auto=format&n=KPDvrxuIefIR_xN_&q=85&s=fb4c1227797e8c4a7b87470f359b745e 840w, https://mintcdn.com/polar/KPDvrxuIefIR_xN_/assets/changelog/2025-09-22/cancellation-metrics-example.png?w=1100&fit=max&auto=format&n=KPDvrxuIefIR_xN_&q=85&s=8a7543565cb1ecfc64d1646cbc314f09 1100w, https://mintcdn.com/polar/KPDvrxuIefIR_xN_/assets/changelog/2025-09-22/cancellation-metrics-example.png?w=1650&fit=max&auto=format&n=KPDvrxuIefIR_xN_&q=85&s=364f0ea64944d70c3cf8d1dafb791c60 1650w, https://mintcdn.com/polar/KPDvrxuIefIR_xN_/assets/changelog/2025-09-22/cancellation-metrics-example.png?w=2500&fit=max&auto=format&n=KPDvrxuIefIR_xN_&q=85&s=db2266c6f032f8d0c503f06ea1de3ffa 2500w" />

  We've added detailed cancellation metrics, giving you clearer insights into subscription cancellations and their impact on your business performance.
</Update>

<Update label="2025-09-12">
  ## Webhooks payload now includes timestamp

  We've updated our webhooks server implementation to [include a timestamp in each payload](https://github.com/polarsource/polar/pull/6770), in line with the Standard Webhooks specification.

  This change ensures that every webhook payload contains precise event timing, making it easier to trace and debug webhook deliveries, and to meet integration requirements for external platforms.
</Update>

<Update label="2025-09-05">
  ## Meter management improvements

  We've made it easier to manage your meters with new UI functionality for archiving and unarchiving meters directly from the dashboard.

  You can now archive meters that are no longer needed, which helps keep your meter list organized. Archived meters can be unarchived if you need to use them again. Note that meters cannot be archived if they are still attached to active products or referenced by active benefits.

  ## Metrics accuracy improvements

  We've improved the accuracy of our metrics by excluding unpaid orders from all calculations. Previously, orders in pending status were included in metrics, which could lead to inflated numbers.

  Now, only successfully paid and refunded orders are included in metrics calculations, giving you a more accurate view of your actual business performance.

  ## Enhanced customer email branding

  We've improved the branding of emails sent to your customers by using organization-specific 'From' and 'Reply-to' addresses.

  Customer emails now appear to come from your organization (e.g., "YourOrg (via Polar)") with replies directed to your organization's email address, providing a more professional and branded experience for your customers.
</Update>

<Update label="2025-06-12">
  ## Update subscription discount

  We've added the ability to update the discount on a subscription. This allows you to add, remove, or change the discount applied to a subscription at any time.

  This feature is both available through the [API](/api-reference/subscriptions/update) and the dashboard.
</Update>

<Update label="2025-06-05">
  ## Payout Reverse Invoices

  We've added the ability to generate reverse invoices for payouts directly from the Payouts page. This feature allows you to easily create an invoice that details the sales made on your behalf, minus our fees.

  [Read more](/features/finance/payouts#reverse-invoices)
</Update>

<Update label="2025-05-22">
  ## Business Purchase Option on Checkout

  We've added a new "I'm purchasing as a business" checkbox to the Checkout flow. When selected, customers are required to provide their business billing name and complete billing address.
</Update>

<Update label="2025-05-19">
  ## Enhanced Attribution for Checkout Links

  We've added support for `reference_id` and UTM parameters (`utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`) as query parameters for Checkout Links. These parameters are automatically stored in the Checkout metadata, allowing you to track the source of your traffic and conversions more effectively.

  [Read more](/features/checkout/links#store-attribution-and-reference-metadata)
</Update>

<Update label="2025-05-15">
  ## Checkouts and payments insights

  We've added a new **Checkouts** tab under the **Sales**, where you can review all the checkout sessions, successful or not. You can filter them by customer email, status, and product. You can also see the payment attempts for each checkout session, including the reason for any failed or declined payments.

  <img className="block dark:hidden" src="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/orders/checkout.light.png?fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=4672cafc0b218d34a55c5cc006fdb153" data-og-width="3840" width="3840" data-og-height="2403" height="2403" data-path="assets/features/orders/checkout.light.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/orders/checkout.light.png?w=280&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=bcf9dd8baf9fae7b84d2d046e9b4f811 280w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/orders/checkout.light.png?w=560&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=1ac73955d12edfb9a605799d246d5237 560w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/orders/checkout.light.png?w=840&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=4c931b7de4121f568d1ebefe90f42792 840w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/orders/checkout.light.png?w=1100&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=87c8d57825f9c084f1b3664402629a23 1100w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/orders/checkout.light.png?w=1650&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=21eb74aed158f9b11a2015bcfa763039 1650w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/orders/checkout.light.png?w=2500&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=d51d0053a32db9f505742b4d4203854c 2500w" />

  <img className="hidden dark:block" src="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/orders/checkout.dark.png?fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=d8ebc400902b1179700e7348745793e8" data-og-width="3840" width="3840" data-og-height="2403" height="2403" data-path="assets/features/orders/checkout.dark.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/orders/checkout.dark.png?w=280&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=5b1783d55724d4260dab83ba63b66a77 280w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/orders/checkout.dark.png?w=560&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=a0cf5741f10810ab68d2dd1962511895 560w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/orders/checkout.dark.png?w=840&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=189ed0cb4d1ec19a9daf370f778dfea1 840w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/orders/checkout.dark.png?w=1100&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=115d82a958ab384611b9fa868566d104 1100w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/orders/checkout.dark.png?w=1650&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=479d59cc8717b0f6330996e2f04915dd 1650w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/orders/checkout.dark.png?w=2500&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=af86f31f76639dc114a243f54495601f 2500w" />

  The payment attempts information is also available on each order.

  Besides, we've also added new analytics around checkouts: total number of checkouts, successful checkouts, and conversion rate.
</Update>

<Update label="2025-03-11">
  ## Zapier integration officially launched

  We're excited to announce the official launch of our [Zapier integration](https://zapier.com/apps/polar/integrations)! Get started now and connect Polar to 2,000+ other web services.

  <Note>
    We've focused on **triggers** (webhooks) for now, so you can react to events in Polar and trigger actions in other apps.

    Need to perform actions in Polar? Tell us about your use case [here](https://github.com/orgs/polarsource/discussions/new?category=integrations\&labels=integrations%2Fzapier) and we'll consider adding more actions in the future.
  </Note>
</Update>

<Update label="2025-03-05">
  ## Customer State

  Maybe one of our neatest features to date! Customer State is a concept allowing you to query for the current state of a customer, including their **active subscriptions** and **granted [benefits](/features/benefits/introduction)**, in a single [API call](/api-reference/customers/state-external) or single [webhook event](/api-reference/webhooks/customer.state_changed).

  Combined with the [External ID](/features/customer-management#external-id) feature, you can get up-and-running in minutes.

  [Read more](/integrate/customer-state)
</Update>

<Update label="2025-03-04">
  ## Better Auth Plugin

  Integrating authentication and billing for your users has never been easier.

  <img src="https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/changelog/2025-03-04/better_auth.jpeg?fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=41206888e5c593cac95721d75ef3292c" data-og-width="3680" width="3680" data-og-height="3668" height="3668" data-path="assets/changelog/2025-03-04/better_auth.jpeg" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/changelog/2025-03-04/better_auth.jpeg?w=280&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=a3a315f319b6e462a42d1a4815c806df 280w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/changelog/2025-03-04/better_auth.jpeg?w=560&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=1c166f855f7dac6b29f212ed49793fa9 560w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/changelog/2025-03-04/better_auth.jpeg?w=840&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=45446626b116d984c78c9d821396cca6 840w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/changelog/2025-03-04/better_auth.jpeg?w=1100&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=06b67e75a228b7a33f5c1d60cafabedf 1100w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/changelog/2025-03-04/better_auth.jpeg?w=1650&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=e7315932501dc71542d1ea1bea1d495e 1650w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/changelog/2025-03-04/better_auth.jpeg?w=2500&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=6a2e2aacb09903b8be46f928e989d702 2500w" />

  [Better Auth](https://www.better-auth.com/) is an open source authentication framework for
  TypeScript that is quickly becoming a favorite amongst developers. Today, we're
  thrilled to have shipped a Polar plugin for Better Auth - in collaboration with them.

  Checkout our [integration guide](/integrate/sdk/adapters/better-auth).
</Update>

<Update label="2025-02-27">
  ## Customer External ID

  We've added support for an `external_id` field on Customers. We believe this will greatly simplify the reconciliation process between your system and Polar.

  Previously, the recommended way to reconcile with your users was to use `metadata`. However, this was not always the most convenient method, especially if you needed to fetch a Customer from our API.

  With `external_id`, you can now fetch a Customer directly by their external ID through dedicated `GET`, `PATCH`, and `DELETE` endpoints. You don't even need to store Polar's internal ID in your system anymore! [Read more](/features/customer-management#external-id)

  Of course, you can also directly preset `external_customer_id` when creating a Checkout Session, and it will automatically be set on the newly created Customer after a successful checkout. [Read more](/features/checkout/session#external-customer-id)
</Update>

<Update label="2025-02-19">
  ## Polar's take on Product variants

  We've released big changes to how we handle products and pricing, allowing us to support a unique approach to what the industry typically calls **variants** 🔥

  We believe having a single product with multiple pricing models and benefits adds unneccessary complexity to the user and to the API. Instead, we chose to treat everything as a product, giving you maximum flexibility about the pricing and benefits you want to offer.

  Thus, we introduce support for **multiple products** at checkout, allowing customers to switch between them before purchasing. Typically, you can offer a monthly and a yearly product, with specific pricing and benefits for each.

  {" "}

  <img className="block dark:hidden" src="https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/checkout/session/checkout_multiple_products.light.png?fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=36f88ae4e5e70735484c068f3605b713" data-og-width="3840" width="3840" data-og-height="2500" height="2500" data-path="assets/features/checkout/session/checkout_multiple_products.light.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/checkout/session/checkout_multiple_products.light.png?w=280&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=04994e58aef6964bcbad83136d7a623b 280w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/checkout/session/checkout_multiple_products.light.png?w=560&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=97436039cd7d08c4ca762d81dada1a73 560w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/checkout/session/checkout_multiple_products.light.png?w=840&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=3bf82c3989003e71f22a230a25db119f 840w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/checkout/session/checkout_multiple_products.light.png?w=1100&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=10505f70deec13a9097af4daa1d04b86 1100w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/checkout/session/checkout_multiple_products.light.png?w=1650&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=47784df3a7278ec4df21c13c3ff81b5c 1650w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/checkout/session/checkout_multiple_products.light.png?w=2500&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=f91a412a12601270ac3bfadd82832e7e 2500w" />

  <img className="hidden dark:block" src="https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/checkout/session/checkout_multiple_products.dark.png?fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=82f61a0c8e8108b64d214c223d9a0f67" data-og-width="3840" width="3840" data-og-height="2500" height="2500" data-path="assets/features/checkout/session/checkout_multiple_products.dark.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/checkout/session/checkout_multiple_products.dark.png?w=280&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=06d12edfe721f4ed1686a09110f935be 280w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/checkout/session/checkout_multiple_products.dark.png?w=560&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=7bfedd743a9e5a2e2924f072218a6d73 560w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/checkout/session/checkout_multiple_products.dark.png?w=840&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=d931de8df011738cedb1988f3c7adaee 840w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/checkout/session/checkout_multiple_products.dark.png?w=1100&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=bd13134692851f71dd9228f52558b8a6 1100w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/checkout/session/checkout_multiple_products.dark.png?w=1650&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=5396835651699c364b553bcc5ea9f34d 1650w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/checkout/session/checkout_multiple_products.dark.png?w=2500&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=8b2984d955958ad755028e2760028fcd 2500w" />

  This is available right now using the [Checkout Session API](/features/checkout/session) and [Checkout Links](/features/checkout/links).

  ### Depreciations

  * Products can no longer have both a monthly and yearly pricing. Existing products still work, but you'll see a warning like this when trying to edit their pricing:

  {" "}

  <Frame>
    <img className="block dark:hidden h-[200px]" src="https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/changelog/2025-02-19/deprecated_pricing.light.png?fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=49934d3505bcdc38dbeafe43f9a72b58" data-og-width="636" width="636" data-og-height="840" height="840" data-path="assets/changelog/2025-02-19/deprecated_pricing.light.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/changelog/2025-02-19/deprecated_pricing.light.png?w=280&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=e65d3de7ddfd5a6ab1769f4b6df49c86 280w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/changelog/2025-02-19/deprecated_pricing.light.png?w=560&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=5cd2637aa8693c489f61689bf9608b2c 560w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/changelog/2025-02-19/deprecated_pricing.light.png?w=840&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=f1848eed72e8996b801ca5ff2dd369a0 840w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/changelog/2025-02-19/deprecated_pricing.light.png?w=1100&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=cff67ee9261a7fa66266b23054905ce9 1100w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/changelog/2025-02-19/deprecated_pricing.light.png?w=1650&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=a41ef4b91020fd4ec3fcc1f52ba39e91 1650w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/changelog/2025-02-19/deprecated_pricing.light.png?w=2500&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=b642f0b6bfcbcb10d76b5e10d75cafe0 2500w" />

    <img className="hidden dark:block h-[200px]" src="https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/changelog/2025-02-19/deprecated_pricing.dark.png?fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=26006e80ef284cc79eb4bf7a434e166f" data-og-width="636" width="636" data-og-height="840" height="840" data-path="assets/changelog/2025-02-19/deprecated_pricing.dark.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/changelog/2025-02-19/deprecated_pricing.dark.png?w=280&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=4525f8a4779925efaf53ad5a21118c47 280w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/changelog/2025-02-19/deprecated_pricing.dark.png?w=560&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=7f79e8f8b5bdb4269b6bee2454466d45 560w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/changelog/2025-02-19/deprecated_pricing.dark.png?w=840&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=e29745dbd4d5b72a54b350560f24af76 840w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/changelog/2025-02-19/deprecated_pricing.dark.png?w=1100&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=30576f8854febabb8129d38f184b8361 1100w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/changelog/2025-02-19/deprecated_pricing.dark.png?w=1650&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=ca196f3fc92085b830bdc6dbba0375cb 1650w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/changelog/2025-02-19/deprecated_pricing.dark.png?w=2500&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=023941a6e7f1cf03e82c18376cd5c7b6 2500w" />
  </Frame>

  ### API changes

  * The `product_id` and `product_price_id` fields are deprecated in the [Checkout Session API](/api-reference/checkouts/create-session). You should now use the `products` field to specify the products you want to include in the checkout.
  * The `type` and `recurring_interval` fields on `ProductPrice` are deprecated. `recurring_interval` is now set directly on `Product`.
</Update>
