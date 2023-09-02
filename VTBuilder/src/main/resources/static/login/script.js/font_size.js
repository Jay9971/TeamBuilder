//gets all three buttons and updates their font and border size to sort of arbitrary percents. Need to add function for font size of input field
const elements = document.querySelectorAll('.gold-button');
function updateFontSize() {
  let i = 0;
  let tempFont;
  elements.forEach(element => {
    let tempWidth = element.offsetWidth;
    if (i==2) {
      tempFont = tempWidth * 0.045;
    } else {
      tempFont = tempWidth * 0.1;
    }
    // Change the background color of each element when the window is resized
    element.style.fontSize = tempFont + 'px';
    i++;
  });
}

// Call the updateFontSize function on window resize
window.addEventListener('resize', updateFontSize);

// Call the updateFontSize function initially to set the font size
document.addEventListener("DOMContentLoaded", function () {
  updateFontSize();
});