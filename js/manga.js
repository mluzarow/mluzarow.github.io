/* On element load, size page correctly and show first image */
var manga_img = null;
var page_images = new Array ();
var index = 0;

window.onload = function () {
	initialize ();
}

function initialize () {
	manga_img = document.getElementById ("manga_img");
	
	page_images.push ("../img/art/mangaColors/c005colorp007.png");
    page_images.push ("../img/art/mangaColors/c005colorp008.png");
    page_images.push ("../img/art/mangaColors/c005colorp009.png");
    page_images.push ("../img/art/mangaColors/c005colorp010.png");
    page_images.push ("../img/art/mangaColors/c005colorp011.png");
    page_images.push ("../img/art/mangaColors/c005colorp012.png");
    page_images.push ("../img/art/mangaColors/c005colorp013.png");
    page_images.push ("../img/art/mangaColors/c005colorp014.png");
    page_images.push ("../img/art/mangaColors/c005colorp015.png");
}

function left () {
    index -= 1;
    
    if (index < 0) {
        index = 0;
    } else {
        manga_img.src = page_images[index];
    }
}

function right () {
    index += 1;
    
    if (index >= page_images.length) {
        index = page_images.length - 1;
    } else {
        manga_img.src = page_images[index];
    }   
}