window.onload = function() {
	function addDivs() {
		for (var i = 0; i < titles.length; i++) {
			var newDiv = document.createElement('div');
			newDiv.className = "hidden";
			newDiv.innerHTML = titles[i];
			var color = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';;
			newDiv.style.backgroundColor = color;
			newDiv.style.left = "100%";
			body.appendChild(newDiv);
		}
		divs = document.getElementsByClassName("hidden");
		current = divs[0];
		previous = current; // might be able to take this out.
	}
	
	function goLeft() {
		navigate(-1);
	}
	
	function goRight() {
		navigate(1);
	}
	
	function navigate(direction) {
		previous = current;
		previous.className = "hidden";
		counter += direction;
		// extreme left
		if (direction === -1 && counter < 0) {
			counter = 0;
			current.className = "current";
			for (var i = 0; i < titles.length - 1; i++) {
				navigate(1);
			}
			return;
		}
		// extreme right
		if (direction === 1 && !divs[counter]) {
			counter = divs.length - 1;
			current.className = "current";
			for (var i = 0; i < titles.length - 1; i++) {
				navigate(-1);
			}
			return;
		}
		current = divs[counter];
		// right button
		if (direction === 1) {
			previous.style.left = "-100%";
		}
		// left button
		else if (direction === -1) {
            previous.style.left = "100%";
		}
		current.className = "current";
		current.style.left = "0%";
	}
    
    function handleswipe(isrightswipe, isleftswipe){
        if (isrightswipe) {
            navigate(-1);
        }
        else if (isleftswipe) {
            navigate(1);
        }
    }
    
    function touchStarting(e) {
        var touchobj = e.changedTouches[0];
        dist = 0;
        startX = touchobj.pageX;
        startY = touchobj.pageY;
        startTime = new Date().getTime();
    }
    
	document.body.addEventListener('touchmove', function(e) {
        window.scroll(0, window.scrollY);
    }, false);
    
    function touchEnding(e) {
        window.scroll(0, window.scrollY);
        var touchobj = e.changedTouches[0];
        dist = touchobj.pageX - startX;
        elapsedTime = new Date().getTime() - startTime;
        var swiperightBol = (elapsedTime <= allowedTime && dist >= threshold && Math.abs(touchobj.pageY - startY) <= 100);
        var swipeleftBol = (elapsedTime <= allowedTime && dist <= -threshold && Math.abs(touchobj.pageY - startY) <= 100);
        handleswipe(swiperightBol, swipeleftBol);
    }
	
	var body = document.getElementById("body");
	var divs;
	var current;
	var previous;
	var counter = 0;
	var titles = [];
	titles[0] = "I'm a Div!!";
	titles[1] = "Look at me!";
	titles[2] = "Don't forget This guy";
	titles[3] = "Another page";
	titles[4] = "More pages";
	titles[5] = "Stuff and junk";
	titles[6] = "Are you serious?";
	titles[7] = "LOL great!";
	titles[8] = "Welcome HOME";
	titles[9] = "TINY RICK";
	titles[10] = "dude sick";
    var startX;
    var startY;
    var dist;
    var threshold = 120;
    var allowedTime = 400;
    var elapsedTime;
    var startTime;
	
	document.getElementById("left").addEventListener("click", goLeft, false);
	document.getElementById("right").addEventListener("click", goRight, false);
	
    document.addEventListener("scroll", function() {
        window.scroll(0, window.scrollY);
    }, false);
    
    document.addEventListener("touchstart", touchStarting, false);
    
    document.addEventListener("touchend", touchEnding, false);
    
	addDivs();
	navigate(0);
}