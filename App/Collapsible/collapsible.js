const button = document.querySelector('.collapsible-button');
const section = document.querySelector('.collapsible-section');

button.addEventListener('click', () => {
  section.classList.toggle('show');
});
