# VC bots finder browser extension

## Getting started

Navigate to the project directory and install the dependencies.

```
$ yarn
```

## To build the extension for Chrome and Opera, run

```
$ yarn release-webkit
```

## To build the extension for Safari

Follow instructions for [Chrome](https://github.com/backmeupplz/vc-bots-finder/#to-build-the-extension-for-chrome-and-opera-run), then follow these instructions from Apple:

https://developer.apple.com/documentation/safariservices/safari_web_extensions/converting_a_web_extension_for_safari. The command you need to use is probably going to look like this:

```
xcrun safari-web-extension-converter /Volumes/Experiments/vc-bots-finder/dist/
```

If you don't have developer certificate, you'll also need to follow these instructions:
https://developer.apple.com/documentation/safariservices/safari_app_extensions/building_a_safari_app_extension#2957926 (see "Enable Your App Extension in Safari")

## To build the extension for Firefox, run

```
$ yarn release-firefox
```

After the project has been built, a directories named `dist` and `build` (with build archive) have been created.


