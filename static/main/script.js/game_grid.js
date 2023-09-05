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

// updates all the images in the game grid. adds new event listeners to each item in the grid. hovering over produces white, occupied grids are red, and grid spots with previously placed images are the same
// obj is the square grid object, im is the image object on top, number is the single coordinate number of the image/grid object
function updateImages(obj, im, number) {
  // sets all backgrounds to gray by default with a transparent image
  obj.style.backgroundColor = "transparent";
  im.src = usedList[number];

  //all occupied squares are set to red with no event listeners
  if (server_occupied_list[number] === 2) {
    obj.style.background = 'rgb(255,100,100)';
    im.src=stripe_link;
    usedList[number] = stripe_link;
  }

  // could be rewritten a little more efficiently so there is no event listener for every single square. put if conditions outside event listeners

  // make white when hovering over unoccupied square
  obj.addEventListener("mouseenter", () => {
    if (server_occupied_list[number] === 0) {
      obj.style.backgroundColor = "white";
    }
  });

  //when clicked
  obj.addEventListener("click", () => {

    // if something is selected and its not occupied by someone else, place selected image, remove it from bank. if theres already an image, replace their bank and grid positions
    if (selected && server_occupied_list[number] !== 2) {
      if (server_occupied_list[number] === 0) {
        im.src = selected;
        server_occupied_list[number] = 1;
        usedList[number] = selected;
        let index = bankList.indexOf(selected);
        if (index !== -1) {
          bankList.splice(index, 1); 
        }
        usedList[number] = selected;
      } else  if (server_occupied_list[number] === 1){
        const temp = usedList[number];
        im.src = selected;
        let index = bankList.indexOf(selected);
        if (index !== -1) {
          bankList.splice(index, 1); 
        }
        bankList.push(temp);
        createBank();
        usedList[number] = selected;
      }
      

      // removes placed image from bank
      const temp = document.getElementById(selected);
      if (temp) {
        temp.remove();
      }
      selected = null;
      
      //send server occupied list to server (may need two variables)
      // post();

    } else {

      //if nothing is selected and your own img is selected, remove and put it in bank
      if (server_occupied_list[number] === 1) {
        const temp = usedList[number]
        im.src = transp_link;
        server_occupied_list[number] = 0;
        usedList[number] = transp_link;
        bankList.push(temp);
        createBank();
      }
    }
    sendMySquares();
  });

  //remove white color when mouse is not hovering
  obj.addEventListener("mouseleave", () => {
    if (server_occupied_list[number] === 0) {
      obj.style.backgroundColor = "transparent";
    }
  });  
}

function updateGame() {

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
      img.src = usedList[i]; // Set an initial empty source link
      gridItem2.appendChild(img); 
      //add all the event listeners
      updateImages(gridItem2, img, i);
      gameSquare.appendChild(gridItem2);
    }
    updateFontSize();
  }
  
