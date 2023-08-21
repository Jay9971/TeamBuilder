

const blueSquare = document.getElementById("blueSquare");
const bank = document.getElementById("bank");

/* recieve original bankList from server */

const bankList = ["blue", "yellow", "orange"];
const usedList = ["grey","grey","grey","grey","grey","grey","grey","grey","grey","grey"];

let selected = null;
let server_occupied_list = [0,2,0,0,2,2,0,0,0]

/*0 = unoccupied, 1 =occupied by user, 2 = occupied by someone else*/
function recieveFromServer() {
  /* recieve used list, set to server_occupied */
}

function sendToServer() {
  let newList = [];
  for (const item of usedList) {
    if (item === "grey") {
      newList.push(0);

    } else {
      newList.push(1);
    }    
  console.log("sending");
  fetch('10.0.0.49:8080/sendData', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: "hello"
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  
  /* send newList to server */
  }
}


function updateImages(obj, number) {
  obj.style.backgroundColor = usedList[number];
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
        obj.style.backgroundColor = selected;
        server_occupied_list[number] = 1;
        usedList[number] = selected;
        let index = bankList.indexOf(selected);
        if (index !== -1) {
          bankList.splice(index, 1); 
        }
        usedList[number] = selected;
      } else  if (server_occupied_list[number] === 1){
        const temp = usedList[number];
        obj.style.backgroundColor = selected;
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
        obj.style.backgroundColor = "grey";
        server_occupied_list[number] = 0;
        usedList[number] = "grey";
        bankList.push(temp);
        updateColumns();
      }
    }
    sendToServer();
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
      updateImages(gridItem2,i);
      blueSquare.appendChild(gridItem2);
      
    }
    
  }
  

window.addEventListener('resize', updateGridDimensions);
window.addEventListener('click', sendData);
// add event listener for recieving server info, update grid dimensions

updateGridDimensions();
  
