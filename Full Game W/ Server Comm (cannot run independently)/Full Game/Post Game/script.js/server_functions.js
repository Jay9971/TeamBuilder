// FUNCTIONS //
//
//
//
//

// used to ask the server for something and recieve something back, or to just send it something
function post(path, requestData, content_type) {
	return new Promise((resolve, reject) => {
		fetch(path, {
		method: 'POST',
		headers: {
			'Content-Type': content_type
		},
		body: JSON.stringify(requestData)
		}).then(response => response.json())
		.then(data => {
			resolve(data);
		})
		.catch(error => {
			reject(error);
		});
	});
}

// used specifically to ask the server to switch pages
function get(path, lobby_code, method='get') {
	
    const form = document.createElement('form');
    form.method = method;
    form.action = path;

    const hiddenField = document.createElement('input');
    hiddenField.type = 'hidden';
    hiddenField.name = 'userid'; 
    hiddenField.value = lobby_code;
    form.appendChild(hiddenField);

    document.body.appendChild(form);
    form.submit();
    
}

//function specifically for the original data
async function getStarterData() {
    try {
        const response = await post("path", {
          userid: userID
        }, 'application/json');
        return [response.imgPath, response.finalOccupiedList];
    } catch (error) {
        console.error(error);
        // You can re-throw the error if needed
        throw error;
    }
}

//variables for data needed for the assembled square assembly
const tempList = getStarterData();
//full image link
const img_url = tempList[0];
//number of squares on the grid (needed to get pieces of the image and make grid)
const total_squares = (tempList[1]).length;
//list of all the grid placements of the team assembled image
const assembledList = tempList[1];
//list for the corresponding urls
let assembledURLs = [];

//function for switching to the lobby screen 
async function lobbySwitch() {
    try {
        const response = await post("path", {
          userid: userID
        }, 'application/json');
        if (response.status === "1") {
            get(response.lobbyPath, userID);
        }
    } catch (error) {
        console.error(error);
        // You can re-throw the error if needed
        throw error;
    }
}

//checks every second if the lobby needs to be switched to. ideally after ten
//seconds, it should switch to the lobby screen
const interval = 1000; // 1000 milliseconds = 1 second
const timerId = setInterval(lobbySwitch, interval); // every second, calls getGameState, which assigns an updated value to server occupied list and checks if the game is over 
