

function createColumn(color) {
  const column = document.createElement("div");
  column.classList.add("color-column");
  column.id = color;

  const square = document.createElement("div");
  square.classList.add("square");
  square.id = color;

  
  square.classList.add("square");

  const image = document.createElement("img");
  image.id = color; // Create an ID for the img element based on i
  image.src = color; // Set an initial empty source link
  image.classList.add("image");
  square.appendChild(image); 

  square.addEventListener("click", () => {
    var squareElements = document.getElementsByClassName("color-column");
    for (var i = 0; i < squareElements.length; i++) {
      squareElements[i].style.border = "none";
  
    }
    if (selected !== color) {
      selected = color;
      column.style.border = "1px solid black";
    } else {
      selected = null;
    }
  });
  column.appendChild(square);
  bank.appendChild(column);
}

function updateColumns() {
  bank.innerHTML = ""; // Clear existing columns

  for (const color of bankList) {
    createColumn(color);
  }
}

updateColumns();
