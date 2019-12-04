// cookies
var banner = document.querySelector('.cookies-banner');
var button = document.querySelector('.cookies-accept');

var cookiesAccepted = window.localStorage.getItem('cookiesAccepted');

if (cookiesAccepted) {
	banner.remove();
} else {
	button.addEventListener('click', acceptCookies);
}

function acceptCookies() {
	// Set cookues
	// document.cookie = "username=John Doe; expires=Thu, 18 Dec 2013 12:00:00 UTC; path=/";
	
	banner.remove();
	// Avoid banner to appear again
	window.localStorage.setItem('cookiesAccepted', new Date());
}