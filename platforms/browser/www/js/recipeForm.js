window.onload = function() {
    alert("Javascript is alive");
	function Recipe(title, fermentables, hops, yeast, instructions) {
		this.title = title;
		this.fermentables = fermentables;
		this.hops = hops;
		this.yeast = yeast;
		this.instructions = instructions;
	};
	
	
	//		FUNCTIONS
	function createObject() {
		var title = document.getElementsByName("recipeTitle")[0].value;
		var fermentables = [];
		for (var i = 0; i < document.getElementsByName("ferment").length; i++) {
			fermentables[i] = document.getElementsByName("ferment")[i].value;
		}
		var hops = [];
		for (var i = 0; i < document.getElementsByName("hops").length; i++) {
			hops[i] = document.getElementsByName("hops")[i].value;
		}
		var yeast = document.getElementsByName("yeast")[0].value;
		var instructions = document.getElementsByName("instructions")[0].value;
		var newRecipe = new Recipe(title, fermentables, hops, yeast, instructions);
        addNewRecipeToSaveFile(newRecipe);
		saveObjectToJSON(loadedRecipes);
	}
    
    function addNewRecipeToSaveFile(newRecipe) {
        loadedRecipes.recipes[loadedRecipes.recipes.length] = newRecipe;
    }
	
	function saveObjectToJSON(newRecipe) {
		var JSONString = JSON.stringify(newRecipe, null, '\t');
		writeToFile('recipes.json', JSONString);
	}
	
	function submitForm() {
        alert("trying to submit");
		createObject();
		// TODO:
		// 1. Save to a JSON file.
		// 2. Fill in an empty recipe on the recipe.html page.
		// 3. Notify the user recipe has been saved.
	}
	
	function writeToFile(fileName, data) {
        // data = JSON.stringify(data, null, '\t');
        window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function (directoryEntry) {
            alert("resolveLocalFileSystemURL" + directoryEntry.name);
            directoryEntry.getFile(fileName, { create: true }, function (fileEntry) {
                alert("getFile" + fileEntry.name);
                fileEntry.createWriter(function (fileWriter) {
                    alert("createWriter" + fileWriter);
                    fileWriter.onwriteend = function (e) {
                        // for real-world usage, you might consider passing a success callback
                        alert('Write of file "' + fileName + '"" completed.');
                    };

                    fileWriter.onerror = function (e) {
                        // you could hook this up with our global error handler, or pass in an error callback
                        alert('Write failed: ' + e.toString());
                    };

                    try {
                        var blob = new Blob([data], { type: 'text/plain' });
                    }
                    catch (e) {
                        // TypeError old chrome and FF
                        console.log("!!!!!!!!!!!@@@@@@@@@@@@@@@@@@@##################$$$$$$$$$$$$$$$$%%%%%%%%%%%%%%%%  : CATCHING ERROR");
                        window.BlobBuilder = window.BlobBuilder || 
                        window.WebKitBlobBuilder || 
                        window.MozBlobBuilder || 
                        window.MSBlobBuilder;
                        if(e.name == 'TypeError' && window.BlobBuilder){
                            console.log("!!!!!!!!!!!@@@@@@@@@@@@@@@@@@@##################$$$$$$$$$$$$$$$$%%%%%%%%%%%%%%%%  : FIRST IF STATEMENT NEW BLOBBUILDER()");
                            var bb = new BlobBuilder();
                            bb.append([data]);
                            var blob = bb.getBlob('text/plain');
                        }
                        else if(e.name == "InvalidStateError"){
                            console.log("!!!!!!!!!!!@@@@@@@@@@@@@@@@@@@##################$$$$$$$$$$$$$$$$%%%%%%%%%%%%%%%%  : INVALID STATE ERROR LOL");
                            // InvalidStateError (tested on FF13 WinXP)
                            var blob = new Blob( [data], {type : 'text/plain'});
                        }
                        else{
                            // We're screwed, blob constructor unsupported entirely   
                            console.log("!!!!!!!!!!!!!!@@@@@@@@@@@@#################$$$$$$$$$$$$$$%%%%%%%%%%%%%%%  :  " + e);
                        }
                    }
                    fileWriter.write(blob);
                }, errorHandler.bind(null, fileName));
            }, errorHandler.bind(null, fileName));
        }, errorHandler.bind(null, fileName));
    }
    
    function checkFile() {
        alert("Checking file");
        readFromFile('recipes.json');
	}
    
    function readFromFile(fileName) {
        var pathToFile = cordova.file.dataDirectory + fileName;
        window.resolveLocalFileSystemURL(pathToFile, function (fileEntry) {
            fileEntry.file(function (file) {
                var reader = new FileReader();
                reader.onloadend = function (e) {
                    alert("Success");
                    // loadedRecipes = JSON.parse(this.result);
                };
                reader.readAsText(file);
            }, errorHandler.bind(null, fileName));
        }, errorHandler.bind(null, fileName));
    }
    
    var errorHandler = function (fileName, e) {
        alert("Error");
        var msg = '';
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
	}

	function reloadFile() {
        readFromFile('recipes.json');
        // alert(readFromFile('recipes.json'));
		// alert(loadedJSONString);
	}
    
    function showJSON() {
        for (var i = 0; i < loadedRecipes.recipes.length; i++) {
            alert(loadedRecipes.recipes[i].title);
        }
    }
	
	//		VARIABLES
    var loadedRecipes = {
        recipes: [];   
    };
	var saveButton = document.getElementById("saveBut");
	var loadButton = document.getElementById("loadBut");
    var showButton = document.getElementById("showBut");
	
	// 		EVENT LISTENERS
	saveButton.addEventListener("click", submitForm, false);
	
	loadButton.addEventListener("click", reloadFile, false);
    
    showButton.addEventListener("click", showJSON, false);
    
    // Call to load the file when window loads
    checkFile();
}