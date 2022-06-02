import $ from "jquery";

let researchImages = $(".research__carousel");
setRandomPosition(researchImages);

function setRandomPosition(container) {
	console.log(container.children());
	container.css({
		height: 1000,
	});
	let containerHeight = 1000;
	container.children().each(function () {
		let imageWidth = $(this).width();
		let imageHeight = $(this).height();
		let maxWidth = container.width() - imageWidth;
		let maxHeight = containerHeight - imageHeight;
		let randX = Math.floor(Math.random() * (maxWidth - 0 + 1) + 0);
		let randY = Math.floor(Math.random() * (maxHeight - 0 + 1) + 0);
		let randXPercentage = (randX / container.width()) * 100;
		let randYPercentage = (randY / maxHeight) * 100;
		console.log(randXPercentage);
		console.log(randYPercentage);
		$(this).css({
			position: "absolute",
			left: randXPercentage + "%",
			top: randYPercentage + "%",
		});
	});
	console.log(
		isCollide(container.children().eq(1), container.children().eq(2))
	);
	// isCollide(container.children().eq(1), container.children().eq(2));

	function isCollide(a, b) {
		var aWidth = a.width();
		var aHeight = a.height();
		var bWidth = b.width();
		var bHeight = b.height();

		return !(
			a.position.top + a.height() < b.position.top ||
			a.position.top > b.position.top + b.height() ||
			a.position.left + a.width() < b.position.left ||
			a.position.left > b.position.left + b.width()
		);
	}
}
