import $ from "jquery";
import Masonry from "masonry-layout";
import imagesLoaded from "imagesloaded";

let projectGrid = ".project-grid";
let projectItem = ".project-grid__item";
let projectSpacer = ".project-grid__spacer";

if ($(projectGrid).length) {
	console.log("project grids exist");
	var projectMasonry = new Masonry(projectGrid, {
		itemSelector: projectItem,
		columnWidth: projectItem,
		gutter: projectSpacer,
		percentPosition: true,
		transitionDuration: 0,
		initLayout: true,
	});

	imagesLoaded($(projectGrid)).on("progress", function () {
		projectMasonry.layout();
	});
}

let opportunityGrid = ".opportunities";
let opportunityItem = ".opportunity";
let opportunitySpacer = ".opportunity__spacer";

if ($(opportunityGrid).length) {
	console.log("opportunity grid exists");
	var opportunityMasonry = new Masonry(opportunityGrid, {
		itemSelector: opportunityItem,
		columnWidth: opportunityItem,
		gutter: opportunitySpacer,
		percentPosition: true,
		transitionDuration: 0,
		initLayout: true,
	});

	imagesLoaded($(opportunityGrid)).on("progress", function () {
		opportunityMasonry.layout();
	});
}
