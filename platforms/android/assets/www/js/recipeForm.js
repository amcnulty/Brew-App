window.onload = function() {
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
        loadedRecipes.recipes[loadedRecipes.recipes.length] = newRecipe;
        writeToFile('recipes.json', JSON.stringify(loadedRecipes, null, '\t'));
	}
    
	function writeToFile(fileName, data) {
        window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function (directoryEntry) {
            directoryEntry.getFile(fileName, { create: true }, function (fileEntry) {
                fileEntry.createWriter(function (fileWriter) {
                    fileWriter.onwriteend = function (e) {
                        // for real-world usage, you might consider passing a success callback
                    };
                    fileWriter.onerror = function (e) {
                        // you could hook this up with our global error handler, or pass in an error callback
                    };
                    try {
                        var blob = new Blob([data], { type: 'text/plain' });
                    }
                    catch (e) {
                        // TypeError old chrome and FF
                        window.BlobBuilder = window.BlobBuilder || 
                        window.WebKitBlobBuilder || 
                        window.MozBlobBuilder || 
                        window.MSBlobBuilder;
                        if(e.name == 'TypeError' && window.BlobBuilder){
                            var bb = new BlobBuilder();
                            bb.append([data]);
                            var blob = bb.getBlob('text/plain');
                        }
                        else if(e.name == "InvalidStateError"){
                            // InvalidStateError (tested on FF13 WinXP)
                            var blob = new Blob( [data], {type : 'text/plain'});
                        }
                        else{
                            // We're screwed, blob constructor unsupported entirely   
                        }
                    }
                    fileWriter.write(blob);
                }, errorHandler.bind(null, fileName));
            }, errorHandler.bind(null, fileName));
        }, errorHandler.bind(null, fileName));
    }
    
    function readFromFile(fileName) {
        var pathToFile = cordova.file.dataDirectory + fileName;
        window.resolveLocalFileSystemURL(pathToFile, function (fileEntry) {
            fileEntry.file(function (file) {
                var reader = new FileReader();
                reader.onloadend = function (e) {
                    loadedRecipes = JSON.parse(this.result);
                };
                reader.readAsText(file);
            }, errorHandler.bind(null, fileName));
        }, errorHandler.bind(null, fileName));
    }
    
    var errorHandler = function (fileName, e) {
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
        console.log("Error " + fileName + " : " + msg);
	}

	function loadFile() {
        readFromFile('recipes.json');
	}
    
    function showJSON() {
        for (var i = 0; i < loadedRecipes.recipes.length; i++) {
            alert(loadedRecipes.recipes[i].title);
        }
    }
	
	//		VARIABLES
    var loadedRecipes = {
        recipes: []
    };
	var saveButton = document.getElementById("saveBut");
	var loadButton = document.getElementById("loadBut");
    var showButton = document.getElementById("showBut");
	
	// 		EVENT LISTENERS
	saveButton.addEventListener("click", createObject, false);
	
	loadButton.addEventListener("click", loadFile, false);
    
    showButton.addEventListener("click", showJSON, false);
    
    // Event listener for checking the file system when device is ready.
    document.addEventListener("deviceready", loadFile, false);
}