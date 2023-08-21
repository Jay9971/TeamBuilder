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


function post(path, params, method='post') {
	const form = document.createElement('form');
    form.method = method;
    form.action = path;
    
    const hiddenField = document.createElement('input');
    hiddenField.type = 'hidden';
    
    hiddenField.value = params.data;
    hiddenField.name = params.name;
    form.appendChild(hiddenField);
    
    document.body.appendChild(form);
    //console.log(form);
    form.submit();
    
}

// Add event listener to the send button (not implemented)
sendButton.addEventListener('click', () => {
    let data = document.querySelector("input").value;
    post("#", {name: "data", data: data});
    
});

/* add another thing so that every time the client recieves data, it calls printmessage with that data */
