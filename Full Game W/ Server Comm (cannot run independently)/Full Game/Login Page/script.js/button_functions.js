//popup if the nickname or code arent filled out. Need to write logic later for if an invalid code is entered. (stage 192871092, unimportant rn)
const popup = document.getElementById("popup");
const submitButton = document.getElementById("submitButton");
let nickname;
let lobby;

// Show the popup
function showPopup() {
  popup.style.display = "flex";
}
// Hide the popup
function hidePopup() {
  popup.style.display = "none";
}
submitButton.addEventListener("click", () => {
    hidePopup();
});

//adds listeners for clicking all three buttons and performs the right functions. if a required field isnt filled, it does a popup.
document.addEventListener('DOMContentLoaded', () => {
    const saveButton = document.getElementById('saveButton');
    const joinLobbyButton = document.getElementById('joinLobbyButton');
    const createLobbyButton = document.getElementById('createLobbyButton');

    saveButton.addEventListener('click', () => {
        const nicknameInput = document.getElementById('nickname');
        nickname = nicknameInput.value;
        if (nickname.length > 8) {
          nickname = null;
          console.log("retry with a shorter name");
        }
      if (nickname.length < 8) {
        const diff = 8-nickname.length;
        for (let i=0;i<diff;i++) {
          nickname += " ";
        }
    });

    joinLobbyButton.addEventListener('click', () => {
        const lobbyCodeInput = document.getElementById('lobbyCode');
        lobby = lobbyCodeInput.value;

        // handle some exceptions better (for later tho not rly imprortant rn)
        if (nickname && lobbyCode) {
          joinLobby();
        } else {
          showPopup();
        }    
    });

    createLobbyButton.addEventListener('click', () => {
      if (nickname) {
        joinLobby();
      } else {
        showPopup();
      }
    });
});
