
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
  image.classList.add("image");

  //adds event listener so if it is clicked, it is highlighted and selected is set to the right url
  //if selected and clicked it deselects, if something else is selected it replaces the url
  square.addEventListener("click", () => {
    var squareElements = document.getElementsByClassName("color-column");
    for (var i = 0; i < squareElements.length; i++) {
      squareElements[i].style.border = "none";
    }
    if (selected !== url) {
      selected = url;
      column.style.border = "1px solid black";
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