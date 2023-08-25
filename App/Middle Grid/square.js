
const blueSquare = document.getElementById("blueSquare");

function updateGridDimensions() {

    const rows = 3

    const blueWidth = blueSquare.offsetWidth;
    console.log(blueWidth)
    
    
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
      blueSquare.appendChild(gridItem2);
      gridItem2.addEventListener("mouseenter", () => {
        gridItem2.style.backgroundColor = "white";
      });
      gridItem2.addEventListener("mouseleave", () => {
        gridItem2.style.backgroundColor = "gray";
      });
    }
    
  }
  

  // Listen for the resize event and update the grid dimensions
  window.addEventListener('resize', updateGridDimensions);
  
  // Get all elements with the class "myClass"



  // Initial call to set the initial grid dimensions
updateGridDimensions();
  
