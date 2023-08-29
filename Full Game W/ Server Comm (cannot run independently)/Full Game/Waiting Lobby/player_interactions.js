//add commenting

//add function for leave lobby button
// pretty much just send a post to the server with a seperate code. it will remove your id from the lobby and return you to the login page
//should everyone be able to start the game and leave lobby? AKA no host. ID is only used for the current participants

//add function for player list
//while constantly asking for the occupied list, it will also have a list of players at the very end
//display list in the listbox or whatever idk crying emoji


const micButton = document.getElementById('micButton');
let isMuted = false; // You can change this based on your actual state

micButton.addEventListener('click', () => {
  isMuted = !isMuted;
  micButton.classList.toggle('muted');
});

// You can perform your mic mute/unmute functionality here
