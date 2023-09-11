//gets unique user id from the path or whatever
const userID = window.location.search.substring(8,10);

let player_list = ["Players"];

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

function playerListUpdater(names) {
    let playerList = ["Players"];
	    
	for (let i=0;i<(names.length);i+=8) {
		const sub = names.substring(i,i+8);
		playerList.push(sub);
	}
	
    if (JSON.stringify(player_list) !== JSON.stringify(playerList)) {
		console.log("updating");
        player_list = playerList;
        updatePlayers();
        updateFontSize();   
    }
}

//updates list of players on the screen. Called in the game status function, which is called every second
function updatePlayers() {
    const listBox = document.getElementById("player-list");
    listBox.innerHTML = ""; // Clear previous content
  
    player_list.forEach((player, index) => {
      const playerElement = document.createElement("div");
      const playerHolder = document.createElement("div");
      playerHolder.classList.add("playerRow")
      playerHolder.classList.add("row-container")
      
      playerElement.classList.add("input");
      playerElement.classList.add("playert");
      playerElement.id = "player";
      playerElement.textContent = player;
  
      if (index === 0) {
        playerHolder.id = "player-title";
      }
      if (index === 1) {
        playerHolder.id = "first-player";
      }
      playerHolder.appendChild(playerElement)
      listBox.appendChild(playerHolder);
    });
  }