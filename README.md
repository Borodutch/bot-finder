<h1 align="center">Bot finder</h1>

<p align="center">
  <img src="https://raw.githubusercontent.com/backmeupplz/bot-finder/main/img/screenshot.png" alt="Screenshot" />
</p>

<p align="center">
Web extension that shows account creation date and other info for users of vc.ru, TJ and DTF in the comments. 
</p>
<p align="center">
  <strong>
		<a href="https://bot-finder.com/">Website</a> • <a href="https://chrome.google.com/webstore/detail/vc-%D1%8D%D1%82%D0%BE-%D0%B1%D0%BE%D1%82/fbjbccjcmmnegakmjkklplmijeilnbhd">Chrome Web Store</a> • <a href="https://addons.mozilla.org/en-US/firefox/addon/bot-finder/">Firefox Browser Add-ons</a>
	</strong>
</p>

## Getting started

Navigate to the project directory and install the dependencies.

```
$ yarn
```

### To build the extension for Chrome and Opera, run

```
$ yarn build-webkit && yarn archive
```

### To build the extension for Safari

You need to have XCode installed on your Mac.

Follow instructions for [Chrome](https://github.com/backmeupplz/bot-finder/#to-build-the-extension-for-chrome-and-opera-run), then follow these instructions from Apple:

https://developer.apple.com/documentation/safariservices/safari_web_extensions/converting_a_web_extension_for_safari. The command you need to use is probably going to look like this:

```
xcrun safari-web-extension-converter /Volumes/Experiments/bot-finder/dist/
```

If you don't have developer certificate, you'll also need to follow these instructions:
https://developer.apple.com/documentation/safariservices/safari_app_extensions/building_a_safari_app_extension#2957926 (see "Enable Your App Extension in Safari").

### To build the extension for Firefox, run

```
$ yarn build-firefox && yarn archive
```

After the project has been built, a directories named `dist` and `build` (with build archive) have been created.

## Publications
- [vc.ru](https://vc.ru/tribuna/226020-eto-bot-rasshirenie-dlya-brauzera-pokazyvayushchee-bolshe-informacii-o-kommentatorah-na-vc-ru?comments=)
- [TJ](https://tjournal.ru/flood/362516-my-napisali-rasshirenie-dlya-brauzera-pokazyvayushchee-bolshe-informacii-o-kommentatorah-na-tjournal?comment=5264653)
