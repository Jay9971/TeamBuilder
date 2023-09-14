

//function specifically for when the start game button is clicked
async function sendStartGame() {
    try {
        await post("/start-game", {
          userid: userID
        }, 'application/json');
          
    } catch (error) {
        console.error(error);
    }  
}

//function called repeatedly for start game status and player list
async function startGame() {
    try {
        const response = await post("/get-player-list-in-lobby", {
          userid: userID
        }, 'application/json');
    //might need to add a load event listener, or define function earlier
    if (response.isStarted === "1") {
        get(response.url,userID);
    }  

    playerListUpdater(response.userList);

    } catch (error) {
        console.error(error);
    }  
}

const lobbyID = window.location.search.substring(17,21);
const codeDisplay = document.getElementById("lobbyCode");
codeDisplay.textContent = "Code: " + lobbyID;

const interval = 1000; // 1000 milliseconds = 1 second
const timerId = setInterval(startGame, interval); // every second, calls getGameState, which assigns an updated value to server occupied list and checks if the game is over 
