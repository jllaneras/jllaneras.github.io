"use strict";

var VITA = VITA || {};

VITA.showJobDescription = function(event) {
	event.preventDefault();
	var description = event.target.parentNode;

	var ps = description.querySelectorAll("p");
	for (var i = 0; i < ps.length; i++) {
  		ps[i].style.display = "block";
	}

	description.removeChild(description.querySelector("button.read-more"));
}

VITA.initReadMoreButtons = function() {
	var readMoreButtons = document.querySelectorAll("section#experience button.read-more");
	for (var i = 0; i < readMoreButtons.length; i++) {
		readMoreButtons[i].addEventListener("click", VITA.showJobDescription);
	}
}

VITA.sendEmail = function() {
	document.getElementById("message-not-sent").classList.add("hidden");

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
			document.getElementById("message-not-sent").classList.add("hidden");
		} else if (http.status != 200) {
			VITA.onSendEmailError();
		}
	}

	http.send(params);
}

VITA.onSendEmailError = function() {
	var form = document.getElementById("contact-form");
	var submitButton = form.querySelector("input[type=submit]");

	document.getElementById("message-not-sent").classList.remove("hidden");
	submitButton.disabled = false;
	submitButton.value = "Try again";
}

window.addEventListener("load", VITA.initReadMoreButtons, false);
