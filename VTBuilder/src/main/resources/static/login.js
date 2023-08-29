document.addEventListener('DOMContentLoaded', () => {
    const saveButton = document.getElementById('saveButton');
    const joinLobbyButton = document.getElementById('joinLobbyButton');
    const createLobbyButton = document.getElementById('createLobbyButton');

    saveButton.addEventListener('click', () => {
        const nicknameInput = document.getElementById('nickname');
        const nickname = nicknameInput.value;
        // Store the nickname to a variable or perform other actions
    });

    joinLobbyButton.addEventListener('click', async () => {
        const lobbyCodeInput = document.getElementById('lobbyCode');
        const lobbyCode = lobbyCodeInput.value;
        
        // this code handles the post request
        try {
	        const response = await post("/send_data", {
				name: nickname.value,
				code: lobbyCode
			}, 'application/json');
			console.log(response.code);
        	get(response.url, response.code);
        	
		} catch (error) {
			console.error(error);
		}
    });

    createLobbyButton.addEventListener('click', () => {
        // Implement logic to create a private lobby
    });
});



// yo naman this is the json format (javascript object):
//  {key: val,
//   key: val}


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



const gridContainer = document.getElementById("gridContainer");

function getRandomColor() {
    const shades = ["#f5f5dc", "#fff8dc", "#fdf5e6", "#faf0e6"]; // Add more shades if needed
    const randomIndex = Math.floor(Math.random() * shades.length);
    return shades[randomIndex];
}

function updateGridDimensions() {
  const squareSize = 50; // Adjust the size of each square as needed
  const gapSize = 0; // Adjust the gap between squares as needed

  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  const numColumns = Math.ceil(screenWidth / (squareSize + gapSize));
  const numRows = Math.ceil(screenHeight / (squareSize + gapSize));
  const totalSquares = numColumns * numRows;

  gridContainer.style.gridTemplateColumns = `repeat(${numColumns}, ${squareSize}px)`;
  gridContainer.style.gridTemplateRows = `repeat(${numRows}, ${squareSize}px)`;

  // Remove existing grid items
  while (gridContainer.firstChild) {
    gridContainer.removeChild(gridContainer.firstChild);
  }

  // Create new grid items
  for (let i = 0; i < totalSquares; i++) {
    const gridItem = document.createElement("div");
    gridItem.classList.add("grid-item");
    gridItem.style.backgroundColor = getRandomColor();
    gridContainer.appendChild(gridItem);
  }
}

// Listen for the resize event and update the grid dimensions
window.addEventListener('resize', updateGridDimensions);

// Initial call to set the initial grid dimensions
updateGridDimensions();

