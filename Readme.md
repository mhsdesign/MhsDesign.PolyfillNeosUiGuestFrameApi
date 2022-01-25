> Neos Ui

## MhsDesign.PolyfillNeosUiGuestFrameApi

> When Neos.Ui version greater or equal to 7.2 is installed, this package does 'nothing' ^^ (no js will be loaded)

This package provides a polyfill to access the package `'@neos-project/neos-ui-guest-frame'` via the custom consumerApi solution of the Neos.Ui on earlier Ui versions.

Neos.Ui supports since [FEATURE: Consumer Api for @neos-project/neos-ui-guest-frame #2945](https://github.com/neos/neos-ui/pull/2945/)
the possibility to import from `'@neos-project/neos-ui-guest-frame'` in a custom extension.

The Feature was merged with https://github.com/neos/neos-ui/releases/tag/7.2.0 and can be used in a custom extension with `"@neos-project/neos-ui-extensibility": "^7.2"`.
But that will work only work when the extension is used with a Neos.Ui host with at least version 7.2 but not older.

This package serves as a polyfill for previous Neos.Ui Version (back to 5.3).

The implementation is rather hacky as we need to implement in the Host Ui what will later be implemented here:
https://github.com/neos/neos-ui/blob/master/packages/neos-ui/src/apiExposureMap.js#L148

So we intercept what is exported via the consumer API and add the exports of the `'@neos-project/neos-ui-guest-frame'` package.

Of course, this makes use of global javascript objects and functions internally used by the consumer api, but unless the implementation doesn't change (what is unlikely) for the past targeted Neos.Ui versions (5.3, 7.0, 7.1) that polyfill will continue to work.
If something were to be changed, the javascript will tell you with nice crafted messages in the console ;)

When Neos.Ui version greater or equal to 7.2 is installed, this package does nothing  ^^ (no js will be loaded)
