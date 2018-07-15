"use strict";

var VITA = VITA || {};


VITA.showJobDescription = function (event) {
	event.preventDefault();
	var description = event.target.parentNode;

	// FIXME: Not sure all browsers implement forEach below
	description.querySelectorAll("p").forEach(function(p) {
		p.style.display = "block";
	});

	description.removeChild(description.querySelector("button.read-more"));
}

VITA.sendEmail = function(event) {
	event.preventDefault();

	var form = document.getElementById("contact-form"); 
	var submitButton = form.querySelector("input[type=submit]");
	submitButton.disabled = true;
	submitButton.value = "Sending email..."

	var q = [];
	for (var i = 0; i < form.elements.length; i++) {
		var field = form.elements[i];
		 q.push(field.name + "=" + encodeURIComponent(field.value));
	}

	var http = new XMLHttpRequest();
	var url = form.action;
	var params = q.join("&");
	http.open('POST', url, true);

	http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

	http.onreadystatechange = function() {
		if(http.readyState == 4 && http.status == 200) {
			form.style.display = "none";
			document.getElementById("message-sent").classList.remove("hidden");
		} else if (http.status != 200) {
			document.getElementById("message-not-sent").classList.remove("hidden");
			submitButton.disabled = false;
			submitButton.value = "Try again";
		}
	}

	http.send(params);
}

window.onload = function() {
	
	document.querySelectorAll("section#experience button.read-more")
		.forEach(function(element) {
			element.addEventListener("click", VITA.showJobDescription);	
		});

	document.getElementById("contact-form").addEventListener("submit", VITA.sendEmail, true);

}

