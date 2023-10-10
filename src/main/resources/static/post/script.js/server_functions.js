getStarterData();

//function specifically for the original data. calls rest of program (dependent on original data) after
async function getStarterData() {
    try {
        const response = await post("path", {
          userid: userID
        }, 'application/json');
        
        //change in MAIN GAME as well. link to original image
        img_url = "/get-image-from-server48281" + "?userid=" + userID;

        //number of squares on the grid (needed to get pieces of the image and make grid), and num of rows
        total_squares = (assembledList).length;
        rows = Math.sqrt(total_squares);

        //list of all the grid placements of the team assembled image
        assembledList = [];
        //adds all coordinates to the list
        numbersString = response;
        for (let i = 0; i < numbersString.length; i += 2) {
            const substring = numbersString.substring(i, i + 2);
            const intValue = parseInt(substring);
            assembledList.push(intValue);
        }
        
        //CREATE AND IMPLEMENT A STRINGIFY/LISTIFY FUNCTION

        //list for the corresponding urls. similar to tempDict, populated in final_grid
        assembledURLs = [];

        //calls program after image has loaded
        img_url.addEventListener('load', callFunctions);
             
    } catch (error) {
        console.error(error);
        // You can re-throw the error if needed
        throw error;
    }
}


//function for switching to the lobby screen 
async function lobbySwitch() {
    try {
        const response = await post("path", {
          userid: userID
        }, 'application/json');
        if (response.status === "0") {
            get(response.lobbyPath, userID);
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
        await post("path", {
          userid: userID
        }, 'application/json');

    } catch (error) {
        console.error(error);
        // You can re-throw the error if needed
        throw error;
    } 
}

//rest of program
function callFunctions() {
    /* the container in which the assembled grid resides*/
    assembledSquare = document.getElementById("assembled-square");

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

