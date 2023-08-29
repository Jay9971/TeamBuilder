const blueSquare = document.getElementById("blueSquare");
const bank = document.getElementById("bank");

/* recieve original bankList from server */

const bankList = ["https://preview.redd.it/os361x7rfy151.png?auto=webp&s=3d3dc9584c9b9c1d59eef3a336125032812992b8", "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Crystal_128_babelfish.svg/768px-Crystal_128_babelfish.svg.png", "https://pbs.twimg.com/media/D69dJueXkAAgIsZ.png"];
const usedList = ["https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/HD_transparent_picture.png/1200px-HD_transparent_picture.png","https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/HD_transparent_picture.png/1200px-HD_transparent_picture.png","https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/HD_transparent_picture.png/1200px-HD_transparent_picture.png","https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/HD_transparent_picture.png/1200px-HD_transparent_picture.png","https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/HD_transparent_picture.png/1200px-HD_transparent_picture.png","https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/HD_transparent_picture.png/1200px-HD_transparent_picture.png","https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/HD_transparent_picture.png/1200px-HD_transparent_picture.png","https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/HD_transparent_picture.png/1200px-HD_transparent_picture.png","https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/HD_transparent_picture.png/1200px-HD_transparent_picture.png","https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/HD_transparent_picture.png/1200px-HD_transparent_picture.png"];

let selected = null;
let server_occupied_list = [0,2,0,0,2,2,0,0,0]

/*0 = unoccupied, 1 =occupied by user, 2 = occupied by someone else*/

function updateImages(obj, im, number) {
  obj.style.backgroundColor = "gray";
  if (server_occupied_list[number] === 2) {
    obj.style.backgroundColor = 'red'
  }

  obj.addEventListener("mouseenter", () => {
    if (server_occupied_list[number] === 0) {
      obj.style.backgroundColor = "white";
    }
  });
  obj.addEventListener("click", () => {
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
      obj.style.backgroundColor = "grey";
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
      const img = document.createElement("img");
      img.classList.add("image");
      img.id = "image_" + i; // Create an ID for the img element based on i
      img.src = usedList[i]; // Set an initial empty source link
      
      gridItem2.appendChild(img); 
      updateImages(gridItem2, img, i);
      blueSquare.appendChild(gridItem2);
      
    }
    
  }
  

window.addEventListener('resize', updateGridDimensions);

// add event listener for recieving server info, update grid dimensions

updateGridDimensions();
  
