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

//called when clear grid button is clicked to reset player placements
function clearGrid() {
  for (let i = 0; i < server_occupied_list.length; i++) {
    const currentItem = server_occupied_list[i];
    if (currentItem === 1) {
      server_occupied_list[i] = 0;
      const link = usedList[i];
      const imageElement = document.querySelector(`img[src="${link}"]`);
      imageElement.src = transp_link;
      
      bankList.push(link);
      usedList[i] = transp_link;
      createBank();
      updateGame();
    }
  }
}

//changes state of mic button based on whether or not it is toggled. Add voice chat stuff here later
const micButton = document.getElementById('micButton');
let isMuted = false; // You can change this based on your actual state

micButton.addEventListener('click', () => {
  isMuted = !isMuted;
  micButton.classList.toggle('muted');
});

// You can perform your mic mute/unmute functionality here
