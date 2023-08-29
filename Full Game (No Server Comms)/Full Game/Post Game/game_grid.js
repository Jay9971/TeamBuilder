/* request for starting data, assign to original_server_data */
const original_server_data = "09wallpaper2you_201539.jpegCOORDINATES030004060708";
/* internet link for a transparent overlay, can be downloaded file idk */
const transp_link = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/HD_transparent_picture.png/1200px-HD_transparent_picture.png";

/* list of the image url being used at every square on the grid. empty squares, including ones occupied by other players, have a
transparent image. initialized with all transparent images*/
let usedList=  [0,3,5,6,4,1,2,7,8];
let bankList=  [];

/*seperates original data into pieces: link, number of squares, coordinate of squares*/
const ind = original_server_data.indexOf("COORDINATES");
const img_url = original_server_data.slice(2, ind);
const total_squares = parseInt(original_server_data.slice(0, 2)); 
for (let i=0; i<total_squares;i++) {
  usedList.push(transp_link);
}


/* creates HTML image element to be used later in order to create smaller images*/
const refImage = document.createElement("img");
refImage.src = img_url;

/* the container in which the gameplay grid resides*/
const gameSquare = document.getElementById("gameSquare");

/* constants for number of rows/columns and the gap between gridded images */
const rows = Math.sqrt(total_squares);
const gapSize = 0; // Adjust the gap between squares as needed

const final = document.createElement("img");
final.style.width = '100%';
final.style.height = '100%';
final.src = img_url;

const left_square = document.getElementById('left-square');
left_square.appendChild(final);

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
  for (number of usedList) {

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
  }
}

// updates all the images in the game grid. adds new event listeners to each item in the grid. hovering over produces white, occupied grids are red, and grid spots with previously placed images are the same
// obj is the square grid object, im is the image object on top, number is the single coordinate number of the image/grid object
function updateImages(obj, im, number) {
  // sets all backgrounds to gray by default with a transparent image
  obj.style.backgroundColor = "transparent";
  im.src = bankList[number];
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
      const img = document.createElement("img");
      img.classList.add("image");
      img.src = usedList[i]; // Set an initial empty source link
      gridItem2.appendChild(img); 
      //add all the event listeners
      updateImages(gridItem2, img, i);
      gameSquare.appendChild(gridItem2);
    }
  }
  
// populate bankList only after the image has loaded, or else the image will just be black */
refImage.addEventListener("load", function () {
  populateBankList();
});

//resize the grid and remake event listeners with a screen resize
window.addEventListener('resize', updateGame);

// timer for repeated requests; 
/*
const interval = 1000; // 1000 milliseconds = 1 second
const timerId = setInterval(request (within request function, update the grid), interval);
*/

// if i need to stop the repeat at some point
/*
setTimeout(() => {
  clearInterval(timerId);
  console.log('Interval stopped');
}, 10000); // 10000 milliseconds = 10 seconds
*/


