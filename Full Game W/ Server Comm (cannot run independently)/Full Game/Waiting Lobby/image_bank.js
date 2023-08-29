
//commenting needed
function updateFontSize() {
  
  const elements = document.querySelectorAll('.control-button');
  
  elements.forEach(element => {
    let tempWidth = element.offsetWidth;
    let tempFont = tempWidth * 0.1;
    // Change the background color of each element when the window is resized
    element.style.fontSize = tempFont + 'px';
    /*
    if ((0.12*tempFont) < 1) {
      element.style.webkitTextStroke = '1px black';
    } else {
      element.style.webkitTextStroke = 0.12*tempFont +'px black';
    }
    */
    
  });

  
  const row = document.getElementById('player-row');
  const text = document.getElementById('player-title');
  const rowWidth = row.offsetWidth;
  const font = rowWidth * 0.105; // Adjust the multiplier as needed
  text.style.fontSize = font + 'px';

  // Apply the calculated font size to the title
  
}

// Call the updateFontSize function on window resize
window.addEventListener('resize', updateFontSize);

// Call the updateFontSize function initially to set the font size

document.addEventListener("DOMContentLoaded", function () {
  updateFontSize();
});