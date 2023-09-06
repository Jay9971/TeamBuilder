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
      bankList.push(usedList[i]);
      usedList[i] = transp_link;
    }
  }
  updateBank();
  sendMySquares();
}
