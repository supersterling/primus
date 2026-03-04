> ## Documentation Index
> Fetch the complete documentation index at: https://polar.sh/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# PHP SDK

A fully-featured PHP SDK for the Polar API.

### Quickstart

```bash Terminal theme={null}
composer require polar-sh/sdk
```

```php  theme={null}
declare(strict_types=1);

require 'vendor/autoload.php';

use Polar;

$sdk = Polar\Polar::builder()
    ->setSecurity('<YOUR_BEARER_TOKEN_HERE>')
    ->build();

$responses = $sdk->organizations->list(
    page: 1,
    limit: 10
);

foreach ($responses as $response) {
    if ($response->statusCode === 200) {
        // handle response
    }
}
```

[Read more](https://github.com/polarsource/polar-php)

### Sandbox Environment

You can configure the SDK so it hits the [sandbox environment](/integrate/sandbox) instead of the production one. You just need to set the server when building the client:

```php  theme={null}
$sdk = Polar\Polar::builder()
    ->setServer('sandbox')
    ->setSecurity('<YOUR_BEARER_TOKEN_HERE>')
    ->build();
```
