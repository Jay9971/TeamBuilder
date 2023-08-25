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
    /* this is where you write code to send shit to the server*/
});

/* add another thing so that every time the client recieves data, it calls printmessage with that data */