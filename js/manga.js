/* On element load, size page correctly and show first image */
var manga_box = null;
var nav_bar = null;

window.onload = function () {
	initialize ();
}

function initialize () {
	manga_box = document.getElementById ("manga_box");
	nav_bar = document.getElementById ("navbar");
	
	// Set the size of the manga view window
	manga_box Height = Viewport height - nav_bar height;
	
}