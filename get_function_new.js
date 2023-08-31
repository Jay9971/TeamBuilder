function get(path, lobby_code, userid, method='get') {
	
    const form = document.createElement('form');
    form.method = method;
    form.action = path;

    const hiddenField = document.createElement('input');
    hiddenField.type = 'hidden';
    hiddenField.name = 'userid'; 
    hiddenField.value = lobby_code;
    form.appendChild(hiddenField);
    
    const hiddenField2 = document.createElement('input');
    hiddenField2.type = 'hidden';
    hiddenField2.name = 'lobby'; 
    hiddenField2.value = userid;
    form.appendChild(hiddenField2);

    document.body.appendChild(form);
    form.submit();
    
}







// Implementation

    joinLobbyButton.addEventListener('click', async () => {
        const lobbyCodeInput = document.getElementById('lobbyCode');
        const lobbyCode = lobbyCodeInput.value;
        
        // this code handles the post request
        try {
	        const response = await post("/send-join-lobby-data", {
				name: nickname.value,
				code: lobbyCode
			}, 'application/json');
        	get(response.url, response.code, response.lobby);
        	
		} catch (error) {
			console.error(error);
		}
    });

    createLobbyButton.addEventListener('click', async () => {
        try {
			const response = await post("/create-lobby", {
				name: nickname.value
			}, 'application/json');
			get(response.url, response.code, response.lobby);
		} catch (error) {
			console.error(error);
		}
    });