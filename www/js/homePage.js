window.onload = function() {
	var windowWidth = $(window).width();
	var windowHeight = $(window).height();
	var app = document.getElementById("app");
	app.style.width = String(windowWidth) + "px";
	app.style.height = String(windowHeight) + "px";
}