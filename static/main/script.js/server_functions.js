// CONSTANTS AND VARIABLES //
//
//
//
//

/* internet link for a transparent overlay and a downloaded link for a striped overlay, can be downloaded file idk */
const transp_link = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/HD_transparent_picture.png/1200px-HD_transparent_picture.png";
const stripe_link = 'images/stripeOverlay.png';

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
let server_occupied_list = [];
/*0 = unoccupied, 1 =occupied by user, 2 = occupied by someone else*/
//list of squares currently occupied by a player

//live occupied list
let occupied_id_list = "";

//list of players
let player_list;

//gets unique user id from the path or whatever
const userID = window.location.search.substring(8);

/* the container in which the gameplay grid resides*/
const gameSquare = document.getElementById("gameSquare");

/* bank refers to image bank, like a wordbank on a worksheet but for images lol */
const bank = document.getElementById("bank");

const gapSize = 1; // Adjust the gap between squares as needed

// link to the currently selected image
let selected = null;

// first_request(original server data)
//gets a list from the server


getStarterData();

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

function get_l(path, method='get') {
	
  const form = document.createElement('form');
  form.method = method;
  form.action = path;

  document.body.appendChild(form);
  form.submit();
  
}


//function specifically for the original data
//function specifically for the original data
async function getStarterData() {
  try {
      
      const response = await post("/get-game-initial-data", {
        userid: userID
      }, 'application/json');
      
      //number of squares on the grid (needed to get pieces of the image and make grid)
      total_squares = parseInt(response.numSquares); 
      for (let i=0; i<total_squares;i++) {
        usedList.push(transp_link);
        server_occupied_list.push(0);
      }

      //which pieces are assigned to this user specifically
      numbersString = response.assignedSquares;
      for (let i = 0; i < numbersString.length; i += 2) {
        const substring = numbersString.substring(i, i + 2);
        const intValue = parseInt(substring);
        tempBank.push(intValue);
      }

      /* creates HTML image element to be used later in order to create smaller images*/
      img_url = response.imageUrl+"?userid=" + userID;
      refImage = document.createElement("img");
      refImage.src = img_url;

      refImage.addEventListener("load", callFunctions);

                
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
    if (usedList[i] !== transp_link && usedList[i] !== stripe_link) {
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
      get(response.path, userID);
  } catch (error) {
      console.error(error);
      // You can re-throw the error if needed
      throw error;
  }
}

//function specifically for the grid status data
//add a function that says game over and waits a few seconds before actually switching screens (stage 2, dw rn)
//add a function that says game over and waits a few seconds before actually switching screens (stage 2, dw rn)
async function getGameState() {
  try {
      const response = await post("/get-square-locations-data", {
        userid: userID
      }, 'application/json');

      //if game is over, send final data and switch to next page
      if (response.gameStatus === "2") {
        await sendFinalData();
      } 
	  
      let new_server_occupied_list = [];
      occupied_id_list = response.occupiedList;
      
      //updates server occupied list and used list with any changes made by other players
      for (let i=0; i<occupied_id_list.length;i+=2) {
        if (occupied_id_list.substring(i,i+2) === userID) {
          new_server_occupied_list.push(1);
        } else if (occupied_id_list.substring(i,i+2) === "00") {
          new_server_occupied_list.push(0);
        } else {
          new_server_occupied_list.push(2);
        }
      }
	
      if (new_server_occupied_list !== server_occupied_list) {
        
	for (let i=0;i<new_server_occupied_list.length;i++) {
          if (server_occupied_list[i] !== 1) {
            if (new_server_occupied_list[i] === 0) {
              usedList[i] = transp_link;
            } else if (new_server_occupied_list[i] === 2) {
              usedList[i] = stripe_link;
            }
            server_occupied_list[i] = new_server_occupied_list[i];
          }
        }
	

        updateGridImages();
      }
      //this uopdates all images every interval, which accounts for user and server changes
      console.log("my occupied : " + server_occupied_list);
      console.log("server occupied : " + new_server_occupied_list);
      console.log("used list: " + usedList);


      
      
      //player list. needs to be fixed later
      const player = response.userList;
      let playerList = [];
      for (let i=0;i<(player.length)/8;i++) {
        const sub = player.substring(8*i,8*i+8);
        playerList.push(sub);
      }      
      player_list = playerList;    
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
        await post("/leave-game", {
          userid: userID
        }, 'application/json');
          
    } catch (error) {
        console.error(error);
    }  
    get_l("/login");
}

//function specifically for sending my squares to the server when i make a placement
async function sendMySquares() {

  let occupiedString = "";


  for (let i=0;i<server_occupied_list.length;i++) {
    if (server_occupied_list[i] > 9) {
      occupiedString += server_occupied_list[i];
    } else {
      occupiedString += "0" + server_occupied_list[i]; 
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

// if i need to stop the repeat at some point. dont think its needed bc this will stop running i think
/*
setTimeout(() => {
  clearInterval(timerId);
  console.log('Interval stopped');
}, 10000); // 10000 milliseconds = 10 seconds
*/

function callFunctions() {

  /* constants for number of rows/columns and the gap between gridded images */
  rows = Math.sqrt(total_squares);

  // populate bankList only after the image has loaded, or else the image will just be black */
  populateBankList();
  updateBank();
  updateGridSize();

  //resize the grid and remake event listeners with a screen resize
  window.addEventListener('resize', updateGridSize);
  
  //changes state of mic button based on whether or not it is toggled. Add voice chat stuff here later
  const micButton = document.getElementById('micButton');
  let isMuted = false; // You can change this based on your actual state

  micButton.addEventListener('click', () => {
    isMuted = !isMuted;
    micButton.classList.toggle('muted');
  });
  
  const interval = 1; // 1000 milliseconds = 1 second
  setInterval(getGameState, interval); // every second, calls getGameState, which assigns an updated value to server occupied list and checks if the game is over 
}
