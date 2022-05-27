import $ from "jquery";

let menuOpen = $("#header__hamburger--open");
let menuClose = $("#header__hamburger--close");
let menu = $(".header__secondary");
let menuLogo = $(".header__logo");
let pageTitle = $(".header__page-title");
let showClass = "show";

function openMenu() {
	menuOpen.attr("aria-expanded", "true");
	menuOpen.removeClass(showClass);
	pageTitle.removeClass(showClass);
	menuClose.addClass(showClass);
	menuLogo.addClass(showClass);
	menu.addClass(showClass);
}

function closeMenu() {
	menuOpen.attr("aria-expanded", "false");
	menuOpen.addClass(showClass);
	pageTitle.addClass(showClass);
	menuClose.removeClass(showClass);
	menuLogo.removeClass(showClass);
	menu.removeClass(showClass);
}

menuOpen.on("click", function () {
	openMenu();
});

menuClose.on("click", function () {
	closeMenu();
});

$(document).on("keyup", function (e) {
	if (e.key == "Escape") {
		closeMenu();
		addClass;
	}
});

$(document).on("load", function () {
	closeMenu();
});

$(window).on("load", function () {
	closeMenu();
});
