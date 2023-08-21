// Get elements from the DOM
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const messageBox = document.querySelector('.message-box');

// Function to print a message to the screen
function printMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.textContent = message;
    messageBox.appendChild(messageElement);
}

// Add event listener to the send button (not implemented)
sendButton.addEventListener('click', () => {
    // This function will be called when the button is clicked
    // You can implement the logic to send the message here
});

// You can call the printMessage function to print messages to the screen
// Example: printMessage('Hello, world!');
