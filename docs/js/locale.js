/**
 * Language chooser
 */
console.log('Localizing...');

// Config. Everything in lower case, please.
var LOCALES = ['en', 'es'];	// Available locales
var LOCALE_DEFAULT = 'es';	// Default locale
var PRODUCTION = false;

// End config. 
// User, don't touch anything from here on, please.

var userLang = navigator.language || navigator.userLanguage;

for (var i = 0; i < LOCALES.length; i += 1) {
	if (userLang.toLowerCase().indexOf(LOCALES[i]) > -1) {
		setLocale(LOCALES[i])
		break;
	}
}

/**	setLocale
 *	Set the website locale to a given one.
 *
 *	@param lang {string} String path with locale URI path.
 */
function setLocale(lang) {
	// console.log('setting locale to '+ lang);
	var newLocation = '';
	if (lang !== LOCALE_DEFAULT) {
		 newLocation += '/' + lang;
	}
	newLocation += cleanLocale(location.pathname);
	// console.log('Ready! Localized path is '+ newLocation);

	if (newLocation !== location.pathname) {
		// console.log('Redirecting...');
		location.pathname = newLocation;
	}
}

/**	cleanLocale
 *	For a given path, cleans the locale URI path.
 *	i.e. /EN/example/route.php -> /example/route.php
 *
 *	@param path {string} String with the path to clean.
 *	@return {string} String with the path cleaned.
 */
function cleanLocale(path) {
	// console.log('cleaning locale path '+ path)
	for (var j = 0; j < LOCALES.length; j += 1) {
		var localeUri = '/'+ LOCALES[j];
		// console.log('cleaning path '+ localeUri);
		if (path.indexOf(localeUri) > -1) {
			return path.replace(localeUri, '');
		}
	}

	return path;
}