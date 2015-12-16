window.onload = function() {
	
	function calculateWindowSize() {
		windowWidth = $(window).width();
		windowHeight = $(window).height();
		app.style.width = String(windowWidth) + "px";
		app.style.height = String(windowHeight) + "px";
	}
	
	function setButtonPadding() {
		horizontalPadding = String(windowWidth / 8) + "px";
		verticalPadding = String(windowHeight / 20) + "px";
		for (var i = 0; i < buttons.length; i++) {
			buttons[i].style.padding = verticalPadding + " " + horizontalPadding + " " + verticalPadding + " " + horizontalPadding;
		}
	}
	
	function orientChange() {
		calculateWindowSize();
		setButtonPadding();
	}
	
	//		VARIABLES
	var windowWidth = $(window).width();
	var windowHeight = $(window).height();
	var app = document.getElementById("app");
	var horizontalPadding = 0;
	var verticalPadding = 0;
	var buttons = document.getElementsByClassName("navButs");
	
	// Event Listener for orientation change
	window.addEventListener("orientationchange", orientChange, false);
	
	orientChange();
}