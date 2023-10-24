

//done
//sends the two slider data points to the server. in another function, it switches to the loading page
async function sendSurveyData() {
    try {
		const val1 = slider1Value.toString();
		const val2 = slider2Value.toString();
        const response = await post("/send-survey-data", {
          userid: userID,
          selfRating: val1,
          teamRating: val2
        }, 'application/json');
		
		console.log(response.userid);
        getStarterData();
          
    } catch (error) {
        console.error(error);
        // You can re-throw the error if needed
        throw error;
    }
}

//function specifically for the original data. calls rest of program (dependent on original data) after
async function getStarterData() {
    try {
        const response = await post("/send-post-game-initial-data", {
          userid: userID
        }, 'application/json');
        
        

        //change in MAIN GAME as well. link to original image
        img_url = "/get-image-from-server48281" + "?userid=" + userID;

        //list of all the grid placements of the team assembled image
        assembledList = [];
        //adds all coordinates to the list
        numbersString = response.finalOccupiedList;
        console.log("string " + numbersString);
        for (let i = 0; i < numbersString.length; i += 2) {
            const substring = numbersString.substring(i, i + 2);
            let intValue;
            if (substring != "xx") {
                intValue = parseInt(substring);
            } else {
                intValue = "xx"
            }
            assembledList.push(intValue);
        }
        
        teamScore = response.teamAccuracy;
        analytics = response.analytics;

        //number of squares on the grid (needed to get pieces of the image and make grid), and num of rows
        total_squares = (assembledList).length;

        //CREATE AND IMPLEMENT A STRINGIFY/LISTIFY FUNCTION

        //list for the corresponding urls. similar to tempDict, populated in final_grid
        assembledURLs = [];

        //calls program after image has loaded
        
        
        refImage = document.createElement("img");
      	refImage.src = img_url;

      	//once images has loaded, the rest of the program is run
      	refImage.addEventListener("load", callFunctions);
             
    } catch (error) {
        console.error(error);
        // You can re-throw the error if needed
        throw error;
    }
}

//function for switching to the lobby screen 
async function lobbySwitch() {
    try {
        const response = await post("/switch-to-reflection", {
          userid: userID
        }, 'application/json');
        if (response.status === "3") {
            get(response.reflectionPath, userID);
        }
    } catch (error) {
        console.error(error);
        // You can re-throw the error if needed
        throw error;
    }
}

//function to signal to server to end this page
async function endPostGame() {
    try {
        await post("/end-post-game", {
          userid: userID
        }, 'application/json');

    } catch (error) {
        console.error(error);
        // You can re-throw the error if needed
        throw error;
    } 
}

//rest of program
//add button functions
function callFunctions() {
    endAnimation();
    showPage(3);

    /* the container in which the assembled grid resides*/
    assembledSquare = document.getElementById("gameSquare");
    gapSize = 0;

    /* constants for number of rows/columns*/
    rows = Math.sqrt(total_squares);

    //populates list of urls
    populateAssembledList();

    //resizing grid
    window.addEventListener('resize', updateGridDimensions);
    updateGridDimensions();

    //puts original image onto the screen
    finalImage = document.querySelector('.finalImage');
    finalImage.src = img_url;

    interval = 10; // 1000 milliseconds = 1 second
    setInterval(lobbySwitch, interval); // every second, calls lobbySwitch, which checks if someone has switched to the lobby yet
}


