var VITA = VITA || {};


VITA.showJobDescription = function (description, event) {
	event.preventDefault();
	// FIXME: Not sure all browsers implement forEach below
	description.querySelectorAll("p").forEach(function(p) {
		p.style.display = "block";
	});

	description.removeChild(description.querySelector("button.read-more"));
}

