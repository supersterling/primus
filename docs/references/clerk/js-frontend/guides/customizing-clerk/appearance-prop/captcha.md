# captcha prop

The `captcha` property can be used to change the appearance of the CAPTCHA widget.

## Properties

| Name                                                        | Type                                                                                                                                                                                                                                | Description                                  |
| ----------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| theme                                                       | 'auto' | 'light' | 'dark'                                                                                                                                                                                                         | The CAPTCHA widget theme. Defaults to auto.  |
| size                                                        | 'normal' | 'flexible' | 'compact'                                                                                                                                                                                                 | The CAPTCHA widget size. Defaults to normal. |
| appearance.captcha.language: Set by this language property. | localization.locale: Set by the localization prop on <ClerkProvider>. Some languages are supported by Clerk but not by Cloudflare Turnstile, which is used for the CAPTCHA widget. See Cloudflare Turnstile's supported languages. |                                              |

## Usage

To customize the CAPTCHA widget, pass the `appearance` prop to the [`clerk.load()`](https://clerk.com/docs/reference/javascript/clerk.md#load) method. The `appearance` prop accepts the property `captcha`, which can be used to apply different changes to the widget.

In the following example, the CAPTCHA is customized to use the dark theme, a flexible size, and Spanish as the display language.

Use the following tabs to view the code necessary for each file.

**main.js**

```js {{ mark: [[8, 12]], collapsible: true }}
import { Clerk } from '@clerk/clerk-js'

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

const clerk = new Clerk(clerkPubKey)
await clerk.load({
  appearance: {
    captcha: {
      theme: 'dark',
      size: 'flexible',
      language: 'es-ES',
    },
  },
})

if (clerk.isSignedIn) {
  document.getElementById('app').innerHTML = `
      <div id="user-button"></div>
    `

  const userButtonDiv = document.getElementById('user-button')

  clerk.mountUserButton(userButtonDiv)
} else {
  document.getElementById('app').innerHTML = `
      <div id="sign-in"></div>
    `

  const signInDiv = document.getElementById('sign-in')

  clerk.mountSignIn(signInDiv)
}
```

**index.html**

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Clerk + JavaScript App</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="main.js" async crossorigin="anonymous"></script>
  </body>
</html>
```

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
