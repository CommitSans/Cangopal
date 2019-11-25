# cangopal
Landing page for Cangopal

## TL;DR:
- Execute `npm install` to install dependecies
- To build the website, just type `npm run build`
- If you want to update something, run `npm start` and update whatever in `www` or `locales` folders.
	- You can see the changes in `docs` folder.
- Once is finished, the built version of the website is in `docs` folder.

## Main structure
The project is structured in three main folders: 

 - `www`: The source code for the website.
 - `locales`: The languages and localization. 
 - `docs`: The "dist" folder (called docs to deploy on gh-pages)

Also, there is a file called `gulpfile.js`, which is in charge of automating the build process, and a `package.json` with the npm info (dependencies, scripts...).

Let's see in depth every single folder.

### www
This folder contains the main website structure. This is not the final source, but the templates to build from.

There are some folders, such as `img`, `js`, `css` or `fonts`, to keep everything structured. Inside it, just files.

Every `.html` file does not contain any literal text, or any locale dependant information. Instead of it, we're using the [**static-i18n** package](https://www.npmjs.com/package/static-i18n). This means, every literal will be setted this way:

```html
<p data-t> title </p>
```

or

```html
<p data-t> home.title </p>
```

To use some translation as value of a property (i.e. `<html lang="en">`) just type:

```html
<html data-attr-t lang-t="html.lang>
  <!-- ... -->
 </html>
```

All the translation literals are in the `locales` folder. Let's see more about it.

### locales
This folder contains the language and localization data. Each language is a JSON file, with all the key value pairs. The name of the file will be the shortcode of the language. 

This means, we can have `es.json` for Spanish and `en.json` for English.

Keys shall be the same in every language, and values are the literals we want to setup in each website version.

> If you add a new language, remember updating the [`gulpfile.json` config](#gulpfile), so it's included in the build proccess.

### docs
This folder is the typical **dist** folder. Is called _docs_, so we can easily deploy on github pages. Folder name can be updated in the [`gulpfile.js` config](gulpfile).

There's a default version, and a folder for each other language. So, the website are available as a static version of the default lang in `example.com` and the localized version in `example.com/en` (or any locale shortcode).

Don't touch anything inside here, or changes will be lost in the next build. To update somethig, go to [`www` folder](#www) if is a markup/styles thing, or to [`locales` folder](#locales) if is something related with a text or literal

### gulpfile
This is the file with all the automated tasks for building the website from templates, to final versions. Let's see the existing tasks.

This script is configurable, so you can change the origin or destiny folder names, and also the locales folder name. To do so, open it, and update whatever you need. The config variables are setted in the middle of some comments like this:

```js
// #### CONFIGS ####
const dist_folder = 'docs';
const source_folder = 'www';
const locales_folder = 'locales';
// ## END CONFIGS ##
```

#### json
Lints all the json files (specially in `locales` folder), to ensure the following tasks don't fail becouse of this.

#### compileI18N
Compile templates in `www` folder to final html into `docs` folder

#### i18n
Execute, in series, **json** and **compileI18N**

#### styles
Move css styles from origin folder (`www`) to `docs` folder.

#### scripts
Move js scripts from origin folder (`www`) to `docs` folder.

#### build
Execute, in series, **i18n**, **styles** and **scripts**

#### watch
Actively listens changes on every file in `www` and execute the task required to update the changes in `docs` folder. If a `.css` file is changed, it executes **styles** task. If a locale `.json` file is updated, or an `.html`, it executes **i18n** task. Same with `.js` and **scripts**.

This task is specially usefull to keep it running while developing, so you work on `www` and `locales` files, and can see the changes automatically in `docs` folder.
