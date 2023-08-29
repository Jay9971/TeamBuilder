function recieveFromServer() {
    /* recieve used list, set to server_occupied */
  }
  
  function sendToServer() {
    let newList = [];
    for (const item of usedList) {
      if (item === "grey") {
        newList.push(0);
  
      } else {
        newList.push(1);
      }    
    /* send newList to server */
    }
  }