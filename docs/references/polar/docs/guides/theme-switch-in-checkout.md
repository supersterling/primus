> ## Documentation Index
> Fetch the complete documentation index at: https://polar.sh/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# How to Switch Checkout Theme

> Learn how to switch the theme in a checkout session and a checkout link.

## Changing the Theme for a Checkout Session Created via the API

<Steps>
  <Step title="Create a Checkout Session">
    Create a Checkout Session by following our [How to Create Checkout Session](/guides/create-checkout-session) guide and obtain the `url`.
  </Step>

  <Step title="Switch to dark theme">
    To switch to the dark theme, append the query parameter <code>theme=dark</code> to your checkout session URL as obtained earlier. For example, if your checkout session URL is:\
    <code>[https://polar.sh/checkout/polar\_c\_ES7DwhlyvlYTPNaLiccKqiwJPda43FIzer](https://polar.sh/checkout/polar_c_ES7DwhlyvlYTPNaLiccKqiwJPda43FIzer)</code>

    You should use:\
    <code>[https://polar.sh/checkout/polar\_c\_ES7DwhlyvlYTPNaLiccKqiwJPda43FIzer?theme=dark](https://polar.sh/checkout/polar_c_ES7DwhlyvlYTPNaLiccKqiwJPda43FIzer?theme=dark)</code>

    The checkout session then looks like below:

    <img height="200" src="https://mintcdn.com/polar/C5Fvr5TyCIop5r-p/assets/guides/theme-switch-in-checkout/dark-theme.png?fit=max&auto=format&n=C5Fvr5TyCIop5r-p&q=85&s=733b69a76981dca8476348cdca31857f" data-og-width="1725" data-og-height="890" data-path="assets/guides/theme-switch-in-checkout/dark-theme.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/polar/C5Fvr5TyCIop5r-p/assets/guides/theme-switch-in-checkout/dark-theme.png?w=280&fit=max&auto=format&n=C5Fvr5TyCIop5r-p&q=85&s=22ec47b5d61ebef7acc71387e70041dd 280w, https://mintcdn.com/polar/C5Fvr5TyCIop5r-p/assets/guides/theme-switch-in-checkout/dark-theme.png?w=560&fit=max&auto=format&n=C5Fvr5TyCIop5r-p&q=85&s=c43f6b59ac8f6a0757410b737664f61e 560w, https://mintcdn.com/polar/C5Fvr5TyCIop5r-p/assets/guides/theme-switch-in-checkout/dark-theme.png?w=840&fit=max&auto=format&n=C5Fvr5TyCIop5r-p&q=85&s=6652bc9ba77c9d7e8059de845c7ba306 840w, https://mintcdn.com/polar/C5Fvr5TyCIop5r-p/assets/guides/theme-switch-in-checkout/dark-theme.png?w=1100&fit=max&auto=format&n=C5Fvr5TyCIop5r-p&q=85&s=e9ffb7787359ae6ebc0a4711bc5eaa31 1100w, https://mintcdn.com/polar/C5Fvr5TyCIop5r-p/assets/guides/theme-switch-in-checkout/dark-theme.png?w=1650&fit=max&auto=format&n=C5Fvr5TyCIop5r-p&q=85&s=8941f85d0f81ae69530bd294f1093129 1650w, https://mintcdn.com/polar/C5Fvr5TyCIop5r-p/assets/guides/theme-switch-in-checkout/dark-theme.png?w=2500&fit=max&auto=format&n=C5Fvr5TyCIop5r-p&q=85&s=d7ad7867098e65f0395a098e567ff54e 2500w" />
  </Step>

  <Step title="Switch to light theme">
    Similarly, to switch to the light theme, append the query parameter <code>theme=light</code> to your checkout session URL.

    For example:\
    <code>[https://polar.sh/checkout/polar\_c\_ES7DwhlyvlYTPNaLiccKqiwJPda43FIzer?theme=light](https://polar.sh/checkout/polar_c_ES7DwhlyvlYTPNaLiccKqiwJPda43FIzer?theme=light)</code>

    The checkout session then looks like below:

    <img height="200" src="https://mintcdn.com/polar/C5Fvr5TyCIop5r-p/assets/guides/theme-switch-in-checkout/light-theme.png?fit=max&auto=format&n=C5Fvr5TyCIop5r-p&q=85&s=928ed962755384be0e82a0535fd43125" data-og-width="1725" data-og-height="890" data-path="assets/guides/theme-switch-in-checkout/light-theme.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/polar/C5Fvr5TyCIop5r-p/assets/guides/theme-switch-in-checkout/light-theme.png?w=280&fit=max&auto=format&n=C5Fvr5TyCIop5r-p&q=85&s=85f038e03b2bef53adb07f05222ecc7a 280w, https://mintcdn.com/polar/C5Fvr5TyCIop5r-p/assets/guides/theme-switch-in-checkout/light-theme.png?w=560&fit=max&auto=format&n=C5Fvr5TyCIop5r-p&q=85&s=cb227f4e7b4f8dbc62d295c26f5a9118 560w, https://mintcdn.com/polar/C5Fvr5TyCIop5r-p/assets/guides/theme-switch-in-checkout/light-theme.png?w=840&fit=max&auto=format&n=C5Fvr5TyCIop5r-p&q=85&s=b3b4498668d098d42c54498546a63449 840w, https://mintcdn.com/polar/C5Fvr5TyCIop5r-p/assets/guides/theme-switch-in-checkout/light-theme.png?w=1100&fit=max&auto=format&n=C5Fvr5TyCIop5r-p&q=85&s=fffeae63e47f016b60deb1e0538cd0e9 1100w, https://mintcdn.com/polar/C5Fvr5TyCIop5r-p/assets/guides/theme-switch-in-checkout/light-theme.png?w=1650&fit=max&auto=format&n=C5Fvr5TyCIop5r-p&q=85&s=3a3e15d4d8facc5a0063e6049e2e1861 1650w, https://mintcdn.com/polar/C5Fvr5TyCIop5r-p/assets/guides/theme-switch-in-checkout/light-theme.png?w=2500&fit=max&auto=format&n=C5Fvr5TyCIop5r-p&q=85&s=54e41a74a71158de80e64f40fd2e6a54 2500w" />
  </Step>
</Steps>

## Switching Theme for a Checkout Link

<Steps>
  <Step title="Create a checkout link">
    Create a checkout link by referring to our [Create a checkout link](https://polar.sh/docs/features/checkout/links#create-a-checkout-link) guide.
  </Step>

  <Step title="Switch to dark theme">
    To switch to the dark theme, append the query parameter <code>theme=dark</code> to your checkout link.

    For example, if your checkout link is:\
    <code>[https://sandbox-api.polar.sh/v1/checkout-links/polar\_cl\_QHMjrDLsORxLIRfyQlfyqF1TWUR6Cy4afVcd/redirect](https://sandbox-api.polar.sh/v1/checkout-links/polar_cl_QHMjrDLsORxLIRfyQlfyqF1TWUR6Cy4afVcd/redirect)</code>

    You should use:\
    <code>[https://sandbox-api.polar.sh/v1/checkout-links/polar\_cl\_QHMjrDLsORxLIRfyQlfyqF1TWUR6Cy4afVcd/redirect?theme=dark](https://sandbox-api.polar.sh/v1/checkout-links/polar_cl_QHMjrDLsORxLIRfyQlfyqF1TWUR6Cy4afVcd/redirect?theme=dark)</code>

    The checkout session then looks like below:

    <img height="200" src="https://mintcdn.com/polar/C5Fvr5TyCIop5r-p/assets/guides/theme-switch-in-checkout/dark-theme.png?fit=max&auto=format&n=C5Fvr5TyCIop5r-p&q=85&s=733b69a76981dca8476348cdca31857f" data-og-width="1725" data-og-height="890" data-path="assets/guides/theme-switch-in-checkout/dark-theme.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/polar/C5Fvr5TyCIop5r-p/assets/guides/theme-switch-in-checkout/dark-theme.png?w=280&fit=max&auto=format&n=C5Fvr5TyCIop5r-p&q=85&s=22ec47b5d61ebef7acc71387e70041dd 280w, https://mintcdn.com/polar/C5Fvr5TyCIop5r-p/assets/guides/theme-switch-in-checkout/dark-theme.png?w=560&fit=max&auto=format&n=C5Fvr5TyCIop5r-p&q=85&s=c43f6b59ac8f6a0757410b737664f61e 560w, https://mintcdn.com/polar/C5Fvr5TyCIop5r-p/assets/guides/theme-switch-in-checkout/dark-theme.png?w=840&fit=max&auto=format&n=C5Fvr5TyCIop5r-p&q=85&s=6652bc9ba77c9d7e8059de845c7ba306 840w, https://mintcdn.com/polar/C5Fvr5TyCIop5r-p/assets/guides/theme-switch-in-checkout/dark-theme.png?w=1100&fit=max&auto=format&n=C5Fvr5TyCIop5r-p&q=85&s=e9ffb7787359ae6ebc0a4711bc5eaa31 1100w, https://mintcdn.com/polar/C5Fvr5TyCIop5r-p/assets/guides/theme-switch-in-checkout/dark-theme.png?w=1650&fit=max&auto=format&n=C5Fvr5TyCIop5r-p&q=85&s=8941f85d0f81ae69530bd294f1093129 1650w, https://mintcdn.com/polar/C5Fvr5TyCIop5r-p/assets/guides/theme-switch-in-checkout/dark-theme.png?w=2500&fit=max&auto=format&n=C5Fvr5TyCIop5r-p&q=85&s=d7ad7867098e65f0395a098e567ff54e 2500w" />
  </Step>

  <Step title="Switch to light theme">
    Similarly, to switch to the light theme, append the query parameter <code>theme=light</code> to your checkout link.

    For example:\
    <code>[https://sandbox-api.polar.sh/v1/checkout-links/polar\_cl\_QHMjrDLsORxLIRfyQlfyqF1TWUR6Cy4afVcd/redirect?theme=light](https://sandbox-api.polar.sh/v1/checkout-links/polar_cl_QHMjrDLsORxLIRfyQlfyqF1TWUR6Cy4afVcd/redirect?theme=light)</code>

    The checkout session then looks like below:

    <img height="200" src="https://mintcdn.com/polar/C5Fvr5TyCIop5r-p/assets/guides/theme-switch-in-checkout/light-theme.png?fit=max&auto=format&n=C5Fvr5TyCIop5r-p&q=85&s=928ed962755384be0e82a0535fd43125" data-og-width="1725" data-og-height="890" data-path="assets/guides/theme-switch-in-checkout/light-theme.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/polar/C5Fvr5TyCIop5r-p/assets/guides/theme-switch-in-checkout/light-theme.png?w=280&fit=max&auto=format&n=C5Fvr5TyCIop5r-p&q=85&s=85f038e03b2bef53adb07f05222ecc7a 280w, https://mintcdn.com/polar/C5Fvr5TyCIop5r-p/assets/guides/theme-switch-in-checkout/light-theme.png?w=560&fit=max&auto=format&n=C5Fvr5TyCIop5r-p&q=85&s=cb227f4e7b4f8dbc62d295c26f5a9118 560w, https://mintcdn.com/polar/C5Fvr5TyCIop5r-p/assets/guides/theme-switch-in-checkout/light-theme.png?w=840&fit=max&auto=format&n=C5Fvr5TyCIop5r-p&q=85&s=b3b4498668d098d42c54498546a63449 840w, https://mintcdn.com/polar/C5Fvr5TyCIop5r-p/assets/guides/theme-switch-in-checkout/light-theme.png?w=1100&fit=max&auto=format&n=C5Fvr5TyCIop5r-p&q=85&s=fffeae63e47f016b60deb1e0538cd0e9 1100w, https://mintcdn.com/polar/C5Fvr5TyCIop5r-p/assets/guides/theme-switch-in-checkout/light-theme.png?w=1650&fit=max&auto=format&n=C5Fvr5TyCIop5r-p&q=85&s=3a3e15d4d8facc5a0063e6049e2e1861 1650w, https://mintcdn.com/polar/C5Fvr5TyCIop5r-p/assets/guides/theme-switch-in-checkout/light-theme.png?w=2500&fit=max&auto=format&n=C5Fvr5TyCIop5r-p&q=85&s=54e41a74a71158de80e64f40fd2e6a54 2500w" />
  </Step>
</Steps>
