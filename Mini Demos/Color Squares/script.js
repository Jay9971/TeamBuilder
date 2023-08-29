const bank = document.getElementById("bank");
const colorList = ["red", "green", "blue", "yellow", "orange"];

function createColumn(color) {
  const column = document.createElement("div");
  column.classList.add("column");

  const square = document.createElement("div");
  square.classList.add("square");
  square.style.backgroundColor = color;

  column.appendChild(square);
  bank.appendChild(column);
}

function updateColumns() {
  bank.innerHTML = ""; // Clear existing columns

  for (const color of colorList) {
    createColumn(color);
  }
}

updateColumns();

// Example: Add a new color to the list and update columns
colorList.push("purple");
updateColumns();

// Example: Remove a color from the list and update columns
colorList.pop();
updateColumns();
