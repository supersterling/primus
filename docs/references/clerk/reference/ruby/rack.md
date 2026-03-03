# Ruby with Rack

The Clerk Ruby SDK provides a Rack middleware to integrate Clerk into your Rack-based application.

1. ## Install `clerk-sdk-ruby`

   The [`Clerk Ruby SDK`](https://clerk.com/docs/reference/ruby/overview.md) provides a range of backend utilities to simplify user authentication and management in your application.

   1. Add the following code to your application's `Gemfile`.
      ```ruby {{ filename: 'Gemfile' }}
      gem 'clerk-sdk-ruby', require: "clerk"
      ```
   2. Run the following command to install the SDK:
      ```sh {{ filename: 'terminal' }}
      bundle install
      ```
2. ## Configuration

   The configuration object provides a flexible way to configure the SDK. When a configuration value is not explicitly provided, it will fall back to checking the corresponding [`environment variable`](https://clerk.com/docs/reference/ruby/overview.md#available-environment-variables). You must provide your Clerk Secret Key.

   The following example shows how to set up your configuration object:

   ```ruby
   Clerk.configure do |c|
     c.secret_key = `{{secret}}` # if omitted: ENV["CLERK_SECRET_KEY"] - API calls will fail if unset
     c.logger = Logger.new(STDOUT) # if omitted, no logging
   end
   ```

   For more information, see [Faraday's documentation](https://lostisland.github.io/faraday/#/).
3. ## Add Clerk's Rack middleware

   Add the Clerk middleware to your Rack application by updating your `config.ru` file with the following code:

   ```ruby {{ filename: 'config.ru' }}
   require "rack"
   require "clerk/rack"

   require_relative "app"

   use Clerk::Rack::Middleware
   run App.new
   ```
4. ## Access the `clerk` object

   Once you've added the middleware, you can access the `clerk` object in your actions and views. The `clerk` object provides access to the [`Ruby SDK's available methods`](https://clerk.com/docs/reference/ruby/overview.md#available-methods).

   The following example demonstrates a simple Rack application that protects all routes. If the user is authenticated, it returns the user's first name and ID. If the user is not authenticated, it returns a `401` status code.

   ```ruby {{ filename: 'app.rb' }}
   require "erb"
   require "clerk"

   class App
     def call(env)
       clerk = env["clerk"]

       # Check if the user is authenticated
       user = clerk.user
       user ?
         [200, {"Content-Type" => "text/plain"}, ["Authenticated User: #{user.first_name} (#{user.id})"]]:
         [401, {"Content-Type" => "text/plain"}, ["Not Authenticated"]]
     end
   end
   ```

## Example: Reverification

The reverification feature provides an additional layer of security by requiring users to reverify their session before accessing sensitive routes.

There are two ways to handle reverification in a Rack application:

1. [`In your middleware`](https://clerk.com/docs/reference/ruby/rack.md#in-your-middleware)
2. [`In your application logic`](https://clerk.com/docs/reference/ruby/rack.md#in-your-application-logic)

### In your middleware

To handle reverification in your Rack middleware, use the `Clerk::Rack::Reverification` middleware. It accepts an optional [`preset`](https://clerk.com/docs/reference/ruby/overview.md#reverification) parameter to customize the reverification requirements and an optional `routes` parameter to specify which routes should be protected.

In the following example, the reverification preset is set to `LAX` and reverification is required for all routes that match the `/*` pattern.

```ruby {{ filename: 'config.ru' }}
require "rack"
require "clerk/rack"

require_relative "app"

use Clerk::Rack::Middleware
# Reverification preset is set to `LAX`
use Clerk::Rack::Reverification,
  preset: Clerk::StepUp::Preset::LAX,
  routes: ["/*"]

run App.new
```

### In your application logic

To handle reverification in your app logic,

- Use the `clerk.user_needs_reverification?` method to check if the user needs to reverify their session, which accepts an optional [`preset`](https://clerk.com/docs/reference/ruby/overview.md#reverification) parameter to customize the reverification requirements.
- Use the `clerk.user_reverification_rack_response` method to get the response.

The following example demonstrates a simple Rack application that requires authentication and reverification for all routes.

```ruby {{ filename: 'app.rb' }}
require "erb"
require "clerk"

STEP_UP_PRESET = Clerk::StepUp::Preset::LAX

class App
  def call(env)
    clerk = env["clerk"]

    # Check if the user needs to reverify their session
    if clerk.user_needs_reverification?(STEP_UP_PRESET)
      # Get the response
      return clerk.user_reverification_rack_response(STEP_UP_PRESET)
    end

    # Check if the user is authenticated
    user = clerk.user
    user ?
      [200, {"Content-Type" => "text/plain"}, ["Authenticated User: #{user.first_name} (#{user.id})"]]:
      [401, {"Content-Type" => "text/plain"}, ["Not Authenticated"]]
  end
end
```

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
