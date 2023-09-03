
Login Page
    Join Lobby Data
        Client Sends: {name: (nickname string), code: (lobby code, a string of numbers)} /create-lobby
        Server Responds: {path: (path to existing lobby, embed user ID in URL), ID: userID} 
        Client Responds with get(path, userID)
        Server Responds by redirecting to lobby page with the user ID in the URL. lobby code should also be in the URL, before the user ID
    Create Lobby Data
        Client Sends: {name: nickname} /send-join-lobby-data
        Server Responds: {path (to new lobby): le path, ID: userID}
        Client Responds with get(path, userID)
        Server Responds with new lobby page (should create a new lobby in your database and assign it a code. Embed this code into the URL before the user ID. this is needed so this player can send the join code to other people (i will display it in the corner or something))
        