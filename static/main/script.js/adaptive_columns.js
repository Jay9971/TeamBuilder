//LeTired of commenting. this just makes the two boxes stacked vertically if the window is narrow, and next to each other if its wide.

function updateLayout() {
  //gets container of both columns
  const container = document.querySelector('.container');

  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  const con2 = document.getElementById('column-two');
  const con1 = document.getElementById('column-one');

  //if screen is vertical, makes it stack the two containers. 
  if (windowWidth < windowHeight) {
    container.style.flexDirection = 'column';
    container.querySelectorAll('.column').forEach(column => {
      column.style.width = '90%';
      column.style.height = '50%';
    });
    con2.style.justifyContent = 'center';
    con1.style.justifyContent = 'center';
  } else { // if screen is horizontal, puts the containers next to each other
    container.style.flexDirection = 'row';
    container.querySelectorAll('.column').forEach(column => {
      column.style.width = '45%';
      column.style.height = '90%';
    });
    con2.style.justifyContent = 'left';
    con1.style.justifyContent = 'right';
  }

  //this code sets the size of the squares based on their limiting factor
  // if the height of their column is larger than the width, then the size is 80% of the width
  //vice versa for height
  const columnWidth = con2.offsetWidth;
  const columnHeight = con2.offsetHeight;

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

updateLayout(); //initial call
window.addEventListener('resize', updateLayout);
window.addEventListener('load', updateLayout);
