const gridContainer = document.querySelector('.background-grid');
let elements = document.querySelectorAll('.text');
/* the container in which the gameplay grid resides*/
const gameSquare = document.getElementById("gameSquare");

function updateGrid() {
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
  for (let i = 0; i < numRows; i++) {
    for (let k = 0; k <numColumns;k++) {

      const circle = document.createElement('div');
      const radius = (i*k/totalSquares * 100 + 10 );
      circle.style.width = `${radius}%`; 
      circle.style.height = `${radius}%`;
      circle.setAttribute("data-type", "mode");
      
      circle.classList.add("background-circle");
      gridContainer.appendChild(circle);
    }
    
  }
}

function updateFontSize() {
  

  let font = elements[1].offsetHeight * 0.20;
  elements.forEach(element => {
    // Change the background color of each element when the window is resized
    element.style.fontSize = font + 'px';
  });
  
  if (document.querySelector('.playert')) {
    let playerelements = document.querySelectorAll('.playert');
    let playerfont = playerelements[0].offsetHeight*0.9;
    playerelements.forEach(element => {
      // Change the background color of each element when the window is resized
      element.style.fontSize = playerfont + 'px';
    });
  }
}

function updateLayout() {
  const container = document.getElementById('largeColumnContainer');

  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  const columnOne = document.getElementById('column-one');
  const columnTwo = document.getElementById('column-two');

  if (windowWidth < windowHeight) {
    container.style.flexDirection = 'column';
    
      columnOne.style.width = '100%';
      columnOne.style.height = '48%';
      columnOne.style.justifyContent = 'center';

      columnTwo.style.width = '100%';
      columnTwo.style.height = '48%';
      columnTwo.style.justifyContent = 'center';
    
 
  } else {
    container.style.flexDirection = 'row';

    columnOne.style.width = '48%';
    columnOne.style.height = '100%';

    columnTwo.style.width = '48%';
    columnTwo.style.height = '100%';
    
    columnOne.style.justifyContent = 'right';
    columnTwo.style.justifyContent = 'left';
    
  }

  
  const columnWidth = columnOne.offsetWidth;
  const columnHeight = columnOne.offsetHeight;

  if ((columnWidth) < columnHeight) {
    
    const squareContainer = document.getElementById('gameSquare');
    squareContainer.style.width = '80%';
    squareContainer.style.height = squareContainer.offsetWidth + 'px';

    const left = document.getElementById("left-square");
    left.style.width = "80%";
    left.style.height = left.offsetWidth + "px";

    
  
  } else {
   
    const squareContainer = document.getElementById('gameSquare');
    squareContainer.style.height = '80%';
    squareContainer.style.width = squareContainer.offsetHeight + 'px';

    const left = document.getElementById("left-square");
    left.style.height = "80%";
    left.style.width = left.offsetHeight + "px";

  };

}

function resizeElements() {
  updateGrid();
  if (document.getElementById('largeColumnContainer')) {
	  updateLayout();
  }
    updateFontSize();
  
}

function darkMode() {
  darkModeToggle = document.getElementById("darkModeToggle");    
  body = document.body;
  light = true;
  darkModeToggle.addEventListener("click", function () {
      const logo = document.getElementById("logo");
      
      if (light === true) {
        logo.src = "images/gameLogo.png";
        light = false;
      } else if (light === false) {
        logo.src = "images/darkgameLogo.png";
        light = true;
      }
      body.classList.toggle("dark-mode");
      
  });
}

darkMode();
resizeElements();
window.addEventListener('resize',resizeElements);