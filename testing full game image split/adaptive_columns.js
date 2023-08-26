//LeTired of commenting. this just makes the two boxes stacked vertically if the window is narrow, and next to each other if its wide.

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
