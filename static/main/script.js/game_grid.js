//only called ONCE!
/* populates bankList with links to smaller images */
function populateBankList() {

  /* creates a canvas object but doesn't place it anywhere*/
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  // Set canvas size to the same as the linked image
  canvas.width = refImage.width;
  canvas.height = refImage.height;
 
  // Draw the linked image on the canvas
  ctx.drawImage(refImage, 0, 0);

  // Loop through the coordinates in the tempBank to create the corresponding images
  for (number of tempBank) {

    /*width and height are always gonna be 1280, but just in case :) */
    const squareWidth = canvas.width / rows;
    const squareHeight = canvas.height / rows;
    
    /* row number and column number (coordinate) of an image square based on original number*/
    const row = Math.floor(number / rows);
    const col = number % rows;

    // Create a new canvas for each square
    const squareCanvas = document.createElement("canvas");
    squareCanvas.width = squareWidth;
    squareCanvas.height = squareHeight;
    const squareCtx = squareCanvas.getContext("2d");
    
    // Extract the square from the original image and draw it on the new canvas
    squareCtx.drawImage(
      canvas,
      col * squareWidth, row * squareHeight,
      squareWidth, squareHeight,
      0, 0,
      squareWidth, squareHeight
    );
    
    // Generate a new image URL for the square and add it to the image bank
    const newImageUrl = squareCanvas.toDataURL("image/jpeg"); // Or "image/png"
    bankList.push(newImageUrl);
    tempDict[newImageUrl] = number;
  }
}

//these next few functions are only used in resizing!!!
//hovering effect
function gridEnterListener(obj,number) {
  if (server_occupied_list[number] === 0) {
      obj.style.backgroundColor = "white";
  }
}

function gridExitListener(obj,number) {
  if (server_occupied_list[number] === 0) {
      obj.style.backgroundColor = "transparent";
  }
}

//changes bankList, usedList, and server_occupied_list when a square is clicked
function gridClickListener(number) {

  if (server_occupied_list[number] !== 2) {
      if (selected) {
          if (server_occupied_list[number] === 0) {

              //changes the image at that spot to the selected image, updates usedList with img link, server_occupied_list with 1
              usedList[number] = selected;
              server_occupied_list[number] = 1;

              //removes selected link from bankList
              let index = bankList.indexOf(selected);
              if (index !== -1) {
                  bankList.splice(index, 1); 
              }

          }

          if (server_occupied_list[number] === 1) {
              //adds replaced square to banklist
              bankList.push(usedList[number]);

              //removes placed square from bankList
              let index = bankList.indexOf(selected);
              if (index !== -1) {
                  bankList.splice(index, 1); 
              }

              //updates grid
              usedList[number] = selected;
  
          }
          updateAllImages();

      } else {
          //adds removed square to banklist
          bankList.push(usedList[number]);

          server_occupied_list[number] = 0;
          usedList[number] = transp_link;
      }
  }
   
}

function addListenersForGrid(obj) {
obj.addEventListener('mouseenter', gridEnterListener);
obj.addEventListener('mouseleave', gridExitListener);
obj.addEventListener('click', gridClickListener);
}

//updates the font size for the buttons and the player list title. need to add resizing for the listbox content text.
//this needs to be fixed later, idrc at this point.
function updateFontSize() {
  //button font code
  const titleContainer = document.getElementById('bank-row');
  const title = document.getElementById('title-2');

  const elements = document.querySelectorAll('.control-button');

  elements.forEach(element => {
      let tempWidth = element.offsetWidth;
      let tempFont = tempWidth * 0.1;
      element.style.fontSize = tempFont + 'px';

  });

  //image bank title resizing
  const containerWidth = titleContainer.offsetWidth;
  const fontSize = containerWidth * 0.05; // Adjust the multiplier as needed
  title.style.fontSize = fontSize + 'px';

  //playerlist title resizing
  const row = document.getElementById('player-row');
  const text = document.getElementById('player-title');
  const rowWidth = row.offsetWidth;
  const font = rowWidth * 0.105; // Adjust the multiplier as needed
  text.style.fontSize = font + 'px';
}

//ONLY WHEN SOMETHING IS RESIZED
function updateGridSize() {

    //find width of the current game grid and calculate each square size
    const gameWidth = gameSquare.offsetWidth;
    const squareSize = (gameWidth/rows) - gapSize; // Adjust the size of each square as needed
  
    // add style for number of rows, columns (figure out what exactly is going on lol)
    gameSquare.style.gridTemplateColumns = `repeat(${rows}, ${squareSize}px)`;
    gameSquare.style.gridTemplateRows = `repeat(${rows}, ${squareSize}px)`;
  
    // Remove existing grid items
    while (gameSquare.firstChild) {
        gameSquare.removeChild(gameSquare.firstChild);
    }
  
    // Create new grid squares
    //gridItem2 is a terrible class name, but its to differentiate between the grid items from the background
    for (let i = 0; i < total_squares; i++) {
      const gridItem2 = document.createElement("div");
      gridItem2.classList.add("grid-item2");
      gridItem2.id = "gridItem2_" + i;

      const img = document.createElement("img");
      img.classList.add("image");
      img.src = usedList[i]; 

      gridItem2.appendChild(img); 
      gameSquare.appendChild(gridItem2);

      addListenersForGrid(gridItem2);
    }
    updateFontSize();
}
//above functions only used in resizing!!!  

//called every interval
//just checks server and used list and updates all grid images. call every ms
function updateGridImages() {

  //update game grid images
  for (i=0;i<server_occupied_list.length;i++) {

      //gets HTML objects
      const id = "gridItem2_" + i;
      const object = document.getElementById(id);
      const image = object.firstChild;

      //updates backgrounds for those needed
      if (server_occupied_list[i] === 0) {
          object.style.backgroundColor = "transparent";
      } else if (server_occupied_list[i] === 2) {
          object.style.backgroundColor = "red";
      }

      //plots all images
      image.src = usedList[i];
  }

}
