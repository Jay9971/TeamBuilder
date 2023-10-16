function showAnanytics() {
    console.log("nun");
}

async function returnToLobby() {
    try {
        await post("/return-to-lobby", {
          userid: userID,
        }, 'application/json');
        get(response.lobbyPath, userID);
    } catch (error) {
        console.error(error);
        // You can re-throw the error if needed
        throw error;
    } 
}