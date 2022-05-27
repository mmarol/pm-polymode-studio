import $ from "jquery";
import Masonry from "masonry-layout";
import imagesLoaded from "imagesloaded";

export { toggleBios };

function toggleBios(person, masonryObject) {
	person.on("click", function () {
		$(this).toggleClass("person__show--open");
		$(this)
			.siblings(".person__secondary-information")
			.toggleClass("person__secondary-information--open");
		masonryObject.layout();
	});
}
