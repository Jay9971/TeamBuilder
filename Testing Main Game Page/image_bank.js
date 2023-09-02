
//creates a column in which an image resides, in which an  image resides (redundant, can be reduced), with event listeners for when it is selected
function createBankItem(url) {
  const column = document.createElement("div");
  column.classList.add("bank-column");
  column.id = url;

  const square = document.createElement("div");
  square.classList.add("square");
  square.id = url;
  square.classList.add("square");

  const image = document.createElement("img");
  image.id = url; 
  image.src = url; 
  image.classList.add("bank-image");

  //adds event listener so if it is clicked, it is highlighted and selected is set to the right url
  //if selected and clicked it deselects, if something else is selected it replaces the url
  square.addEventListener("click", () => {
    var squareElements = document.getElementsByClassName("bank-column");
    for (var i = 0; i < squareElements.length; i++) {
      squareElements[i].style.border = "3px solid transparent";
    }
    if (selected !== url) {
      selected = url;
      column.style.border = "3px solid white";
    } else {
      selected = null;
    }
  });

  square.appendChild(image); 
  column.appendChild(square);
  bank.appendChild(column);
}

//creates bank item for every item in banklist, clears al previous items
function createBank() {
  bank.innerHTML = ""; // Clear existing columns
  for (const link of bankList) {
    createBankItem(link);
  }
}

// only creates bank after original image loads
refImage.addEventListener("load", function () {
  createBank();
});

//creates grid for first time
updateGame();



//commenting needed
function updateFontSize() {
  const titleContainer = document.getElementById('bank-row');
  const title = document.getElementById('title-2');
  
  const elements = document.querySelectorAll('.control-button');
  
  elements.forEach(element => {
    let tempWidth = element.offsetWidth;
    let tempFont = tempWidth * 0.1;
    // Change the background color of each element when the window is resized
    element.style.fontSize = tempFont + 'px';
    /*
    if ((0.12*tempFont) < 1) {
      element.style.webkitTextStroke = '1px black';
    } else {
      element.style.webkitTextStroke = 0.12*tempFont +'px black';
    }
    */
    
  });

  const containerWidth = titleContainer.offsetWidth;
  const fontSize = containerWidth * 0.05; // Adjust the multiplier as needed
  
  const row = document.getElementById('player-row');
  const text = document.getElementById('player-title');
  const rowWidth = row.offsetWidth;
  const font = rowWidth * 0.105; // Adjust the multiplier as needed
  text.style.fontSize = font + 'px';

  // Apply the calculated font size to the title
  title.style.fontSize = fontSize + 'px';
}

// Call the updateFontSize function on window resize
window.addEventListener('resize', updateFontSize);

// Call the updateFontSize function initially to set the font size

document.addEventListener("DOMContentLoaded", function () {
  updateFontSize();
});