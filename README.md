# VC, TJ and DTF bots finder browser extension

<p align="center">
  <img src="https://raw.githubusercontent.com/backmeupplz/bot-finder/main/img/screenshot.png" alt="Screenshot" />
</p>

Try it in [Chrome Web Store](https://chrome.google.com/webstore/detail/vc-%D1%8D%D1%82%D0%BE-%D0%B1%D0%BE%D1%82/fbjbccjcmmnegakmjkklplmijeilnbhd) and [Firefox Browser Add-ons](https://addons.mozilla.org/en-US/firefox/addon/bot-finder/).

## Getting started

Navigate to the project directory and install the dependencies.

```
$ yarn
```

## To build the extension for Chrome and Opera, run

```
$ yarn build-webkit && yarn archive
```

## To build the extension for Safari

You need to have XCode installed on your Mac.

Follow instructions for [Chrome](https://github.com/backmeupplz/bot-finder/#to-build-the-extension-for-chrome-and-opera-run), then follow these instructions from Apple:

https://developer.apple.com/documentation/safariservices/safari_web_extensions/converting_a_web_extension_for_safari. The command you need to use is probably going to look like this:

```
xcrun safari-web-extension-converter /Volumes/Experiments/bot-finder/dist/
```

If you don't have developer certificate, you'll also need to follow these instructions:
https://developer.apple.com/documentation/safariservices/safari_app_extensions/building_a_safari_app_extension#2957926 (see "Enable Your App Extension in Safari").

## To build the extension for Firefox, run

```
$ yarn build-firefox && yarn archive
```

After the project has been built, a directories named `dist` and `build` (with build archive) have been created.
