// CONSTANTS AND VARIABLES //
//
//
//
//

/* internet link for a transparent overlay, can be downloaded file idk */
const transp_link = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/HD_transparent_picture.png/1200px-HD_transparent_picture.png";

/* tempBank: list for number coordinates of the images assigned to this user. The original image is split into a grid of squares.
each side length is equal to the sqrt of the total number of squares. the squares are designated one number, 0 through total_squares-1, 
left to right top to bottom*/
let tempBank = [];

//tempDict holds links as keys and their corresponding original grid placement as values. This is used when sendinf final grid placement data to server at the end of teh game
let tempDict = {};

/* list of all the links of the images assigned to this user. used to create the image selection options on the bottom left corner.*/
let bankList = [];

/* list of the image url being used at every square on the grid. empty squares, including ones occupied by other players, have a
transparent image. initialized with all transparent images*/
let usedList=  [];

/*0 = unoccupied, 1 =occupied by user, 2 = occupied by someone else*/
//list of squares currently occupied by a player
let server_occupied_list = [];

//list of players
let player_list = [];

//gets unique user id from the path or whatever
const userID = window.location.search.substring(8);

// first_request(original server data)
//gets a list from the server
const originalList = await getStarterData();

//full image link
let imageUrl;

//number of squares on the grid (needed to get pieces of the image and make grid)
const total_squares = parseInt(originalList[0]); 
for (let i=0; i<total_squares;i++) {
  usedList.push(transp_link);
}

//which pieces are assigned to this user specifically
const numbersString = originalList[2];
for (let i = 0; i < numbersString.length; i += 2) {
  const substring = numbersString.substring(i, i + 2);
  const intValue = parseInt(substring);
  tempBank.push(intValue);
}

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
        const response = await post("/get-game-initial-data", {
          userid: userID
        }, 'application/json');
        let temp = [response.numSquares, response.imageUrl, response.assignedSquares];
	const imageResponse = await fetch(temp[1]);

	if (!imageResponse.ok) {
	    throw new Error(`Failed to fetch image (${imageResponse.status} ${imageResponse.statusText})`);
	}

	const imageBlob = await imageResponse.blob();

	// Create a custom URL for the Blob
	imageUrl = URL.createObjectURL(imageBlob);
	    
    } catch (error) {
        console.error(error);
        // You can re-throw the error if needed
        throw error;
    }
}

//fucntion that gets final square placement and asks for post game path, redirects
async function sendFinalData() {
  let occupied = [];
  for (i=1;i<usedList.length;i++) {
    occupied.push(0);
    if (usedList[i] !== transp_link) {
      occupied[i] = tempDict[usedList[i]];
    }
  }
  let occupiedStr = "";
  for (i=0; i<occupied.length;i++) {
    if (occupied[i] < 10) {
      occupiedStr += ("0" + occupied[i]);
  } else {
      occupiedStr += occupied[i];
  }
  }
  try {
      const response = await post("path", {
          userid: userID,
          occupiedSquares: occupiedStr
      }, 'application/json');
      get(response.postGamePath, userID);
  } catch (error) {
      console.error(error);
      // You can re-throw the error if needed
      throw error;
  }
}

//function specifically for the grid status data
//add a function that says game over and waits a few seconds before actually switching screens (stage 2, dw rn)
async function getGameState() {
  try {
      const response = await post("path", {
        userid: userID
      }, 'application/json');

      //if game is over, send final data and switch to next page
      if (response.gameStatus === "1") {
        await sendFinalData();
      } 

      server_occupied_list = response.occupiedList;
      // filters out squares occupied by me (well techincally it just makes squares occupied by someone else 2 instead of 1)
      for (let i =0; i <server_occupied_list.length; i++) {
        if (server_occupied_list[i] === 1) {
          if (usedList[i] === transp_link) {
            server_occupied_list[i] = 2;
          }
        }
      }
      for (i=0;i<server_occupied_list.length;i++) {
        const id = "gridItem2_" + i;
        const object = document.getElementById(id);
        const image = object.firstChild;
        updateImages(object, image, i);
        //may have to define function earlier
      }

      //player list
      player_list = response.playerList;
      updatePlayers();
      //might need to add a load event listener, or define function earlier

  } catch (error) {
      console.error(error);
      // You can re-throw the error if needed
      throw error;
  }
}

//function specifically for when the leave game button is clicked
async function leaveGame() {
  try {
      await post("leave game", {
        userid: userID,
      }, 'application/json');
        
  } catch (error) {
      console.error(error);
  }  
}

//function specifically for sending my squares to the server when i make a placement
async function sendMySquares() {
  const occupiedString = "";
  for (let i = 0; i < usedList.length; i ++) {
    if (usedList[i] !== transp_link) {
      if (i>9) {
        occupiedString += ("0" + i);
      } else {
        occupiedString += i;
      }
    }
  }
  try {
    await post("/send-square-locations-data", {
      userid: userID,
      occupiedSquares : occupiedString
    }, 'application/json');
      
  } catch (error) {
      console.error(error);
  }  
}

const interval = 1000; // 1000 milliseconds = 1 second
const timerId = setInterval(getGameState, interval); // every second, calls getGameState, which assigns an updated value to server occupied list and checks if the game is over 

// if i need to stop the repeat at some point. dont think its needed bc this will stop running i think
/*
setTimeout(() => {
  clearInterval(timerId);
  console.log('Interval stopped');
}, 10000); // 10000 milliseconds = 10 seconds
*/

/*
post("/send-square-locations-data, /get-square-location-data", {name: "data", data: data});
*/
