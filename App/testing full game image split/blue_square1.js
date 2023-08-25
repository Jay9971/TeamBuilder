const blueSquare = document.getElementById("blueSquare");
const bank = document.getElementById("bank");

/* recieve original url from server. request function or whatever. returns a string */
const original_server_data = "09https://wallpaper-house.com/data/out/7/wallpaper2you_201539.jpgCOORDINATES030409";

const ind = original_server_data.indexOf("COORDINATES");

const img_url = original_server_data.slice(4, ind);
const total_squares = parseInt(original_server_data.slice(0, 2)); // Parse to integer
const transp_link = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/HD_transparent_picture.png/1200px-HD_transparent_picture.png";
var overall_image = new Image();
overall_image.src = img_url;

const original_square_length = 1280/total_squares;

const bankList = [];

const numbersString = original_server_data.slice(ind + "COORDINATES".length, original_server_data.length);
for (let i = 0; i < numbersString.length; i += 2) {
  const substring = numbersString.substring(i, i + 2);
  const intValue = parseInt(substring);
  bankList.push(intValue);
}


const usedList = [];
for (let i=0; i<total_squares;i++) {
  usedList.push(0);
}

let selected = null;
let server_occupied_list = [0,2,0,0,2,2,0,0,0]

/*0 = unoccupied, 1 =occupied by user, 2 = occupied by someone else*/


function updateImages(obj, cont, im, number) {
  cont.fillStyle = "gray";
  cont.fillRect(0, 0, canvas.width, canvas.height);
  if (server_occupied_list[number] === 2) {
    obj.style.backgroundColor = 'red'
  }

  obj.addEventListener("mouseenter", () => {
    if (server_occupied_list[number] === 0) {
      cont.fillStyle = "gray";
      cont.fillRect(0, 0, canvas.width, canvas.height);
    }
  });
  obj.addEventListener("click", () => {
    if (selected && server_occupied_list[number] !== 2) {
      if (server_occupied_list[number] === 0) {

        drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
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
        updateColumns();
        usedList[number] = selected;
      }
      
      const temp = document.getElementById(selected);
      if (temp) {
        temp.remove();
      }
      selected = null;
      
    } else {
      if (server_occupied_list[number] === 1) {
        const temp = usedList[number]
        im.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/HD_transparent_picture.png/1200px-HD_transparent_picture.png";
        server_occupied_list[number] = 0;
        usedList[number] = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/HD_transparent_picture.png/1200px-HD_transparent_picture.png";
        bankList.push(temp);
        updateColumns();
      }
    }
  });
  obj.addEventListener("mouseleave", () => {
    if (server_occupied_list[number] === 0) {
      cont.fillStyle = "gray";
      cont.fillRect(0, 0, canvas.width, canvas.height);
    }
  });
  
    
}

function updateGridDimensions() {

    const rows = 3

    const blueWidth = blueSquare.offsetWidth;
    
    const gapSize = 1; // Adjust the gap between squares as needed
    const squareSize = (blueWidth/rows) - gapSize; // Adjust the size of each square as needed
    
    const totalSquares = rows * rows;
  
    blueSquare.style.gridTemplateColumns = `repeat(${rows}, ${squareSize}px)`;
    blueSquare.style.gridTemplateRows = `repeat(${rows}, ${squareSize}px)`;
  
    // Remove existing grid items
    while (blueSquare.firstChild) {
        blueSquare.removeChild(blueSquare.firstChild);
    }
  
    // Create new grid items
    for (let i = 0; i < totalSquares; i++) {
      const gridItem2 = document.createElement("div");
      const uniqueId = "gridItem2_" + i; 
      gridItem2.id = uniqueId;
      gridItem2.classList.add("grid-item2");

      const canvas = document.createElement("canvas");
      canvas.classList.add("canvas");
      const canvasID = "canvas_" + i; 
      canvas.id = canvasID;

      gridItem2.appendChild(canvas);
      const ctx = canvas.getContext("2d");

      updateImages(ctx, img, i);
      blueSquare.appendChild(gridItem2);
      
    }
    
  }
  

window.addEventListener('resize', updateGridDimensions);

// add event listener for recieving server info, update grid dimensions

updateGridDimensions();
  
