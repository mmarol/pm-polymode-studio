import $ from "jquery";

export { randomize };

function randomize(selector) {
	// if the item exists
	if (selector) {
		// find the parent
		selector.parent().each(function () {
			// for each parent
			$(this)
				// find the children
				.children(selector)
				// get a random sort order
				.sort(function () {
					return Math.random() - 0.5;
				})
				// remove the children from the parent
				.detach()
				// append the children with the new order
				.appendTo(this);
		});
	}

	return this;
}
