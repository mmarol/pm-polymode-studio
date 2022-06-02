import $ from "jquery";
import "slick-carousel/slick/slick";
import imagesLoaded from "imagesloaded";

export { setupSliders, setupTabs };

function setupSliders(carouselItem, arrowLeftId, arrowRightId, variableWidth) {
	let arrowLeftObject;
	let arrowRightObject;
	let carouselSize = $(carouselItem).size();
	// for each carousel
	$(carouselItem).each(function (index) {
		// add suffix to the arrow id if there are more than one of a carousel type
		arrowLeftObject = $(arrowLeftId + "--" + (index + 1));
		arrowRightObject = $(arrowRightId + "--" + (index + 1));
		// initiate slider
		$(this).slick({
			infinite: true,
			variableWidth: variableWidth,
			adaptiveHeight: false,
			dots: true,
			prevArrow: arrowLeftObject,
			nextArrow: arrowRightObject,
			centerMode: true,
		});
	});
}

function setupTabs(buttons, content) {
	// get all tab buttons
	let tabButtons = $(buttons);
	// get all tab content
	let tabContent = $(content);
	// on clicking a button
	tabButtons.on("click", function () {
		// make record of the button
		let tabButton = $(this);
		// get the data attribute
		let tabButtonData = $(this).attr("data-for-tab");
		// for each tab content
		tabContent.each(function (index) {
			// make record of the content item
			let tabContent = $(this);
			// get the data attribute
			let tabContentData = $(this).attr("data-tab");
			// if the content data attribute matches the tab attribute
			if (tabContentData == tabButtonData) {
				// add active class to the button
				tabButton.addClass("active");
				// remove active class to the button
				tabButton.siblings().removeClass("active");
				// add active class to the content item
				tabContent.addClass("active");
				// remove active class to the content item
				tabContent.siblings().removeClass("active");
			}
		});

		$(".project__carousel--" + tabButtonData).slick("refresh");
	});
}
