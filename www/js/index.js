window.onload = function() {
	//		FUNCTIONS
	
	// Sets the top style for the menu
	function setOptionsListTop(height) {
		optionsList.style.top = height + "em";
	}
	
	// Called on load to set the colors of all the backgrounds for the steps or tasks
	function setBackgrounds() {
		var lightBeer = "rgb(251, 177, 17)";
		var darkBeer = "rgb(191, 75, 00)";
		var tasks = document.getElementsByClassName("taskContainer");
		for (var i = 0; i < tasks.length; i++) {
			if (i % 2 === 0) {
				tasks[i].style.backgroundColor = lightBeer;
			}
			else {
				tasks[i].style.backgroundColor = darkBeer;
			}
		}
	}
	
	// Helps keep the notes that are between the steps centered.
	function setInlineNoteMargins() {
		setOptionsListTop(-$(optionsList).height() / 16);
		for (var i = 0; i < notes.length; i++) {
			negHalfHeight = -1 * (notes[i].clientHeight / 2);
			notes[i].style.marginTop = String(negHalfHeight) + "px";
		}
	}
	
	// Toggles the options menu
	function toggleOptionsMenu(menu) {
		$(".optionsList").toggleClass("optionsList-change");
		if (optionsList.className.indexOf("change") != -1) {
			optionsList.removeAttribute("style");
		}
		else {
			setOptionsListTop(-$(optionsList).height() / 16);
		}
	}
	
	// Resets all the mugs to empty
	function resetMugs() {
		for (var i = 0; i < mugs.length; i++) {
			mugs[i].className = "mug";
			mugs[i].src = "img/beerMugs/emptyMug.png";
		}
	}
	
	// Device ready callback. sets event listener to the menu button.
	function menuButtonListener() {
		document.addEventListener("menubutton", toggleOptionsMenu, false);
	}
	// Device ready callback. Sets event listener to the search button.
	function searchButtonListener() {
		document.addEventListener("searchbutton", toggleOptionsMenu, false);
	}
	
	// Callback function on transitionend for the mug images
	function transitionEnd(imgElement) {
		if (imgElement.src.indexOf("empty") != -1 && imgElement.className.indexOf("change") != -1) {
			imgElement.src = "img/beerMugs/fullMug.png";
			imgElement.className = "mug";
		}
		else if (imgElement.src.indexOf("full") != -1 && imgElement.className.indexOf("change") != -1) {
			imgElement.src = "img/beerMugs/emptyMug.png";
			imgElement.className = "mug";
		}
	}
	
	//		VARIABLES
	
	// Varables for lining up the notes.
	var negHalfHeight;
	var notes = document.getElementsByClassName("inlineNotes");
	
	// All the options on the drop-down menu
	var menuLinks = document.getElementById("optionsList").children;
	
	// All of the img tags that are used for the empty and full mugs
	var mugs = document.getElementsByClassName("mug");
	
	// The drop-down options menu
	var optionsList = document.getElementById("optionsList");
	
	//		EVENT LISTENERS
	
	// Event Listener for orientation change
	window.addEventListener("orientationchange", setInlineNoteMargins, false);
	
	// Event listener for the onscreen menu button
	document.getElementById("optionsButton").addEventListener("click", toggleOptionsMenu, false);
	
	// Event listener for the menu button
	document.addEventListener("deviceready", menuButtonListener, false);
	
	// Event listener for the search button
	document.addEventListener("deviceready", searchButtonListener, false);
	
	// Event listener for drop-down menu items after they are clicked they auto hide the menu
	for (var i = 0; i < menuLinks.length; i++) {
		menuLinks[i].firstElementChild.addEventListener("click", toggleOptionsMenu, false);
	};
	
	// Another menu item that also resets the images of the mugs on click
	document.getElementById("resetMugs").addEventListener("click", resetMugs, false);
	
	// Event listeners for when the mugs are clicked.
	// Adds another class name to start a css transition.
	for (var i = 0; i < mugs.length; i++) {
		mugs[i].addEventListener("click", function() {
			this.className += " mug-change";
		}, false);
	};
	
	// Event listeners for transitionend events cross platform
	for (var i = 0; i < mugs.length; i++) {
		mugs[i].addEventListener("webkitTransitionEnd", function() {
			transitionEnd(this);
		}, false);
		mugs[i].addEventListener("transitionend", function() {
			transitionEnd(this);
		}, false);
		mugs[i].addEventListener("oTransitionEnd", function() {
			transitionEnd(this);
		}, false);
		mugs[i].addEventListener("MSTransitionEnd", function() {
			transitionEnd(this);
		}, false);
	}
	
	// Smooth scrolling to anchor's href
	$('a[href^="#"]').on('click', function(event) {
    	var target = $($(this).attr('href'));
    	if( target.length ) {
			event.preventDefault();
			$('html, body').animate({
            	scrollTop: target.offset().top
			}, 1000);
    	}
	});
	
	//		FUNCTION CALLS
	setBackgrounds();
	setInlineNoteMargins();
	setOptionsListTop(-$(optionsList).height() / 16);
};