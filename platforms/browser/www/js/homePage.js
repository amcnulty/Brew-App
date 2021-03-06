window.onload = function() {
	function setButtonColors() {
		var lightBeer = "rgb(251, 177, 17)";
		var darkBeer = "rgb(191, 75, 00)";
		for (var i = 0; i < buttons.length; i++) {
			if (i % 2 === 0) buttons[i].style.backgroundColor = lightBeer;
			else buttons[i].style.backgroundColor = darkBeer;
		}
	}
	
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
		// TODO: Change setButtonPadding() to calcButtonSize() so all buttons are same size.
		setButtonPadding();
	}
	
	// checkFile() looks to see if the user has any recipes.
	// TODO: vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
	// If recipes are present then link sends you to your recipes.
	// Else the link sends you to the recipe creation form.
	function checkFile() {
        readFromFile('recipes.json');
	}
    
    // Reads from the dataDirectory file path plus the filename that is passed to it.
    // Has an onLoaded callback within that does the actions required after loading.
    // Calls errorHandler if there is a problem loading.
    function readFromFile(fileName) {
        var pathToFile = cordova.file.dataDirectory + fileName;
        // alert(pathToFile);
        window.resolveLocalFileSystemURL(pathToFile, function (fileEntry) {
            // fileEntry.remove();
            fileEntry.file(function (file) {
                var reader = new FileReader();
                reader.onloadend = function (e) {
                    loadedRecipes = JSON.parse(this.result);
                    recipeLink.href = "html/recipes.html";
                    // alert("Success");
                    return this.result;
                };
                reader.readAsText(file);
            }, errorHandler.bind(null, fileName));
        }, errorHandler.bind(null, fileName));
    }
    
    // If there is an error while loading this function is called.
    var errorHandler = function (fileName, e) {  
        var msg = '';
        recipeLink.href = "html/recipeForm.html";
        recipeLink.href = "html/recipes.html";
        switch (e.code) {
        case FileError.QUOTA_EXCEEDED_ERR:
            msg = 'Storage quota exceeded';
            break;
        case FileError.NOT_FOUND_ERR:
            msg = 'File not found';
            break;
        case FileError.SECURITY_ERR:
            msg = 'Security error';
            break;
        case FileError.INVALID_MODIFICATION_ERR:
            msg = 'Invalid modification';
            break;
        case FileError.INVALID_STATE_ERR:
            msg = 'Invalid state';
            break;
        default:
            msg = 'Unknown error';
            break;
        };
        console.log("Error Loading: " + fileName + " " + msg);
	}
	
	//		VARIABLES
	var windowWidth = $(window).width();
	var windowHeight = $(window).height();
	var app = document.getElementById("app");
	var horizontalPadding = null;
	var verticalPadding = null;
	var buttons = document.getElementsByClassName("navButs");
	var recipeLink = document.getElementById("recipesLink");
    var loadedRecipes = {
        recipes: []
    };
	
	// Event Listener for orientation change
	$(window).resize(orientChange);
    
    // Event listener for checking the file system when device is ready.
    document.addEventListener("deviceready", checkFile, false);
	
    //      Function calls on startup
	setButtonColors();
	orientChange();
}