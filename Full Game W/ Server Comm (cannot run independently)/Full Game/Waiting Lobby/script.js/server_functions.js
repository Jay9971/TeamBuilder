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

//function specifically for when the leave game button is clicked
async function leaveGame() {
    try {
        await post("/leave-game", {
          userid: userID,
        }, 'application/json');
           
    } catch (error) {
        console.error(error);
    }  
}

//function specifically for when the start game button is clicked
async function sendStartGame() {
    try {
        await post("/start-game", {
          userid: userID,
        }, 'application/json');
          
    } catch (error) {
        console.error(error);
    }  
}

//function called repeatedly for start game status and player list
async function startGame() {
    try {
        await post("/get-player-list-in-lobby", {
          userid: userID,
        }, 'application/json');

        playerList = (response.userList).slice(0,(response.userList).length-3);
        updatePlayers();

        //might need to add a load event listener, or define function earlier
        if (response.userList[(response.userList).length-2] === "1") {
            get(response.userList[(response.userList).length-1),userID);
        }  

    } catch (error) {
        console.error(error);
    }  
}

const interval = 1000; // 1000 milliseconds = 1 second
const timerId = setInterval(startGame, interval); // every second, calls getGameState, which assigns an updated value to server occupied list and checks if the game is over 

// if i need to stop the repeat at some point. dont think its needed bc this will stop running i think
/*
setTimeout(() => {
  clearInterval(timerId);
  console.log('Interval stopped');
}, 10000); // 10000 milliseconds = 10 seconds
*/
