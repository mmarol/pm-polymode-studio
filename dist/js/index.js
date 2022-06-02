import $ from "jquery";
import "lazysizes";

import "./navigation";
// import "./randomizePosition";
import { randomize } from "./randomizeOrder";
import { setupMasonry } from "./masonry";
import { setupSliders, setupTabs } from "./projectInteractions";
import { toggleBios } from "./peopleInteractions";

$(document).on("ready", function () {
	// for project grid
	let projectGrid = ".project-grid";
	let projectItem = ".project-grid__item";
	let projectSizer = ".project-grid__item--small";
	let projectSpacer = ".project-grid__spacer";
	if (projectItem) {
		// randomize order
		// randomize($(projectItem));
		// apply masonry
		setupMasonry(projectGrid, projectItem, projectSizer, projectSpacer);
	}

	// for teaching grid
	let opportunityGrid = ".opportunities";
	let opportunityItem = ".opportunity";
	let opportunitySpacer = ".opportunity__spacer";
	if (opportunityItem) {
		// apply masonry
		setupMasonry(
			opportunityGrid,
			opportunityItem,
			opportunityItem,
			opportunitySpacer
		);
	}

	// for people grid
	let personGrid = ".people";
	let personItem = ".person";
	let personSizer = ".person--small";
	let personSpacer = ".person__spacer";
	let peopleMasonry;
	if (personItem) {
		// apply masonry
		peopleMasonry = setupMasonry(
			personGrid,
			personItem,
			personSizer,
			personSpacer
		);
	}

	// initialize tabs
	// if the url has a hash
	if (window.location.hash) {
		// get the hash value
		let hash = window.location.hash.replace("#", "");
		// get the related button
		let buttonToActivate = $(
			".project__deliverable-button[data-hash-target='" + hash + "']"
		);
		// trigger a click on the button
		buttonToActivate.trigger("click");
	}

	// trigger tabs on button click
	let deliverableButtons = ".project__deliverable-button";
	let deliverableContent = ".project__deliverable-content";
	if (deliverableButtons) {
		setupTabs(deliverableButtons, deliverableContent);
	}

	// for project sliders
	let projectSlider = ".project__carousel";
	let projectLeftArrow = "#project__arrow--left";
	let projectRightArrow = "#project__arrow--right";
	if (projectSlider) {
		setupSliders(projectSlider, projectLeftArrow, projectRightArrow, false);
	}

	// for project research sliders
	let researchSlider = ".research__carousel";
	let researchLeftArrow = "#research__arrow--left";
	let researchRightArrow = "#research__arrow--right";
	if (researchSlider) {
		setupSliders(researchSlider, researchLeftArrow, researchRightArrow, true);
	}

	let person = $(".person__show");
	if (person) {
		toggleBios(person, peopleMasonry);
	}

	// $(".carousel__image-loader").each(function () {
	// 	let carouselImage = $(this);
	// 	carouselImage.imagesLoaded(function () {
	// 		carouselImage.addClass("show");
	// 	});
	// });
});
