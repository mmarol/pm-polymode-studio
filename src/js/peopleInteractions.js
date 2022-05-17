import $ from "jquery";
import Masonry from "masonry-layout";
import imagesLoaded from "imagesloaded";

let personGrid = ".people";
let personItem = ".person";
let personSizer = ".person--small";
let personSpacer = ".person__spacer";

if ($(personGrid).length) {
	console.log("person grids exist");
	var personMasonry = new Masonry(personGrid, {
		itemSelector: personItem,
		columnWidth: personSizer,
		gutter: personSpacer,
		percentPosition: true,
		transitionDuration: 0,
		initLayout: true,
	});

	imagesLoaded($(personGrid)).on("progress", function () {
		personMasonry.layout();
	});

	let person = $(".person__show");

	person.on("click", function () {
		$(this).toggleClass("person__show--open");
		$(this)
			.siblings(".person__secondary-information")
			.toggleClass("person__secondary-information--open");
		personMasonry.layout();
	});
}
