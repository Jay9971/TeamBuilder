const popup = document.getElementById("popup");
const submitButton = document.getElementById("submitButton");

// Show the popup
function showPopup() {
  popup.style.display = "flex";
}

// Hide the popup
function hidePopup() {
  popup.style.display = "none";
}

submitButton.addEventListener("click", () => {
  
    hidePopup();
  
  
});

document.addEventListener('DOMContentLoaded', () => {
    const saveButton = document.getElementById('saveButton');
    const joinLobbyButton = document.getElementById('joinLobbyButton');
    const createLobbyButton = document.getElementById('createLobbyButton');

    saveButton.addEventListener('click', () => {
        const nicknameInput = document.getElementById('nickname');
        const nickname = nicknameInput.value;
        // Store the nickname to a variable or perform other actions
    });

    joinLobbyButton.addEventListener('click', () => {
        const lobbyCodeInput = document.getElementById('lobbyCode');
        const lobbyCode = lobbyCodeInput.value;

        const nicknameInput = document.getElementById('nickname');
        const nickname = nicknameInput.value;

        // handle some exceptions better (for later tho not rly imprortant rn)
        if (nickname !== "" && lobbyCode !== "") {
          // Implement logic to join the lobby using the code
        } else {
          showPopup();
        }
        
    });

    createLobbyButton.addEventListener('click', () => {
      if (nickname !== "") {
        // Implement logic to join the lobby using the code
      } else {
        showPopup();
      }
    });
});


const gridContainer = document.getElementById("gridContainer");

function getRandomColor() {
    const shades = ["red", "pink", "orange", "yellow","goldenrod"]; // Add more or different shades if needed

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

function updateFontSize() {
  const titleContainer = document.getElementById('input-group');
  
  const elements = document.querySelectorAll('.gold-button');
  let i = 0;
  let tempFont;
  elements.forEach(element => {
    let tempWidth = element.offsetWidth;
    if (i==2) {
      tempFont = tempWidth * 0.045;
    } else {
      tempFont = tempWidth * 0.1;
    }
    
    // Change the background color of each element when the window is resized
    element.style.fontSize = tempFont + 'px';
    /*
    if ((0.12*tempFont) < 1) {
      element.style.webkitTextStroke = '1px black';
    } else {
      element.style.webkitTextStroke = 0.12*tempFont +'px black';
    }
    */
    i++;
  });

  
}

// Call the updateFontSize function on window resize
window.addEventListener('resize', updateFontSize);

// Call the updateFontSize function initially to set the font size

document.addEventListener("DOMContentLoaded", function () {
  updateFontSize();
});