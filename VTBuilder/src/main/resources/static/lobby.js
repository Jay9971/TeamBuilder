function updateLayout() {
    const container = document.querySelector('.container');
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    if (windowWidth < windowHeight) {
      container.style.flexDirection = 'column';
      container.querySelectorAll('.column').forEach(column => {
        column.style.width = '100%';
        column.style.height = '50%';
      });
    } else {
      container.style.flexDirection = 'row';
      container.querySelectorAll('.column').forEach(column => {
        column.style.width = '50%';
        column.style.height = '100%';
      });
    }
  }
  
window.addEventListener('resize', updateLayout);
window.addEventListener('load', updateLayout);

console.log(window.location.search.substring(8));

const toggleButton = document.getElementById("toggleButton");
let variableValue = 0;

toggleButton.addEventListener("click", () => {
variableValue = 1 - variableValue; // Toggle the value between 0 and 1
toggleButton.classList.toggle("red"); // Toggle the red class
});

const startButton = document.getElementById("startButton");
const closeButton = document.getElementById("closeButton");

let gameStarted = 0;
let lobbyClosed = 0;

startButton.addEventListener("click", () => {
  if (gameStarted === 0) {
    gameStarted = 1;
    startButton.classList.add("clicked");
  }
});

closeButton.addEventListener("click", () => {
  if (lobbyClosed === 0) {
    lobbyClosed = 1;
    closeButton.classList.add("clicked");
  }
});
