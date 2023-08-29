const gridContainer = document.getElementById("gridContainer");

function getRandomColor() {
    const shades = ["#f5f5dc", "#fff8dc", "#fdf5e6", "#faf0e6"]; // Add more shades if needed
    const randomIndex = Math.floor(Math.random() * shades.length);
    return shades[randomIndex];
}

function updateGridDimensions() {
  const squareSize = 50; // Adjust the size of each square as needed
  const gapSize = 0; // Adjust the gap between squares as needed

  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  const numColumns = Math.ceil(screenWidth / (squareSize + gapSize));
  const numRows = Math.ceil(screenHeight / (squareSize + gapSize));
  const totalSquares = numColumns * numRows;

  gridContainer.style.gridTemplateColumns = `repeat(${numColumns}, ${squareSize}px)`;
  gridContainer.style.gridTemplateRows = `repeat(${numRows}, ${squareSize}px)`;

  // Remove existing grid items
  while (gridContainer.firstChild) {
    gridContainer.removeChild(gridContainer.firstChild);
  }

  // Create new grid items
  for (let i = 0; i < totalSquares; i++) {
    const gridItem = document.createElement("div");
    gridItem.classList.add("grid-item");
    gridItem.style.backgroundColor = getRandomColor();
    gridContainer.appendChild(gridItem);
  }
}

// Listen for the resize event and update the grid dimensions
window.addEventListener('resize', updateGridDimensions);

// Initial call to set the initial grid dimensions
updateGridDimensions();

