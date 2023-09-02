
//add commenting

//updates list of players on the screen. Called in the game status function, which is called every second
function updatePlayers() {
  const listBox = document.getElementById("listbox");
  listBox.innerHTML = ""; // Clear previous content

  player_list.forEach((player, index) => {
    const playerElement = document.createElement("div");
    playerElement.classList.add("player");
    playerElement.textContent = player;

    if (index === 0) {
      playerElement.classList.add("first-player");
    }

    listBox.appendChild(playerElement);
  });
}

const micButton = document.getElementById('micButton');
let isMuted = false; // You can change this based on your actual state

micButton.addEventListener('click', () => {
  isMuted = !isMuted;
  micButton.classList.toggle('muted');
});

// You can perform your mic mute/unmute functionality here
