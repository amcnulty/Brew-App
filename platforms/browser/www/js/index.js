window.onload = function() {
	// List of functions
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
	
	function setInlineNoteMargins() {
		for (var i = 0; i < notes.length; i++) {
			negHalfHeight = -1 * (notes[i].clientHeight / 2);
			notes[i].style.marginTop = String(negHalfHeight) + "px";
		}
	}
	
	function autoHideMenu() {
		optionsMenu.style.display = "none";
		$(".optionsList").toggleClass("optionsList-change");
	}
	
	function hideOptionsMenu(menu) {
		menu.style.display = "none";
	}
	
	function showOptionsMenu(menu) {
		menu.style.display = "block";
	}
	
	// Toggles the options menu
	function toggleOptionsMenu(menu) {
		// if menu is hidden
		if(isHidden(menu)) {
			showOptionsMenu(menu);
		}
		// else if menu is showing
		else {
			hideOptionsMenu(menu);
		}
	}
	
	// Checks to see if element is visible
	// Returns a boolean value true if visible otherwise false.
	function isHidden(el) {
    var style = window.getComputedStyle(el);
    return (style.display === 'none')
	}
	
	// Resets all the mugs to empty
	function resetMugs() {
		for (var i = 0; i < emptyMugs.length; i++) {
			emptyMugs[i].className = "emptyMug";
			emptyMugs[i].src = "/img/beerMugs/emptyMug.png";
		}
	}
	
	// Varables for lining up the notes.
	var negHalfHeight;
	var notes = document.getElementsByClassName("inlineNotes");
	var optionsMenu = document.getElementById("optionsList");
	
	// Event Listeners
	window.addEventListener("orientationchange", function() {
		// Change the margins to make text vertically centered
		setInlineNoteMargins();
	}, false);
	
	document.getElementById("optionsButton").addEventListener("click", function() {
		toggleOptionsMenu(optionsMenu);
	}, false);
	
	// Toggles a class when options button is pressed
	$(function() {
		$("#optionsButton").click(function() {
			$(".optionsList").toggleClass("optionsList-change");
		});
	});
	
	// Add event listeners for every menu option
	var menuLinks = document.getElementById("optionsList").children;
	for (var i = 0; i < menuLinks.length; i++) {
		menuLinks[i].firstElementChild.addEventListener("click", autoHideMenu, false);
	};
	
	document.getElementById("resetMugs").addEventListener("click", resetMugs, false);
	
	// Event listeners for transition ends
	var emptyMugs = document.getElementsByClassName("emptyMug");
	
	for (var i = 0; i < emptyMugs.length; i++) {
		emptyMugs[i].addEventListener("click", function() {
			this.className += " emptyMug-change";
		}, false);
	};
	
	// Toggle the images
	for (var i = 0; i < emptyMugs.length; i++) {
		emptyMugs[i].addEventListener("transitionend", function() {
			if (this.src.indexOf("empty") != -1 && this.className.indexOf("change") != -1) {
				this.src = "/img/beerMugs/fullMug.png";
				this.className = "emptyMug";
			}
			else if (this.src.indexOf("full") != -1 && this.className.indexOf("change") != -1) {
				this.src = "/img/beerMugs/emptyMug.png";
				this.className = "emptyMug";
			}
		}, false);
	};
	
	// Smooth Scrolling
	$('a[href^="#"]').on('click', function(event) {
    	var target = $($(this).attr('href'));
    	if( target.length ) {
			event.preventDefault();
			$('html, body').animate({
            	scrollTop: target.offset().top
			}, 1000);
    	}
	});
	
	// Function calls
	hideOptionsMenu(document.getElementById("optionsList"));
	setBackgrounds();
	setInlineNoteMargins();
	
};