// used to ask the server for something and recieve something back, or to just send it something

/*
function post(path, requestData, content_type) {
	return new Promise((resolve, reject) => {
		fetch(path, {
		method: 'POST',
		headers: {
			'Content-Type': content_type
		},
		body: JSON.stringify(requestData)
		}).then(response => response.json())
		.then(data => {
			resolve(data);
		})
		.catch(error => {
			reject(error);
		});
	});
}

// used specifically to ask the server to switch pages
function get(path, lobby_code, method='get') {
	
    const form = document.createElement('form');
    form.method = method;
    form.action = path;

    const hiddenField = document.createElement('input');
    hiddenField.type = 'hidden';
    hiddenField.name = 'userid'; 
    hiddenField.value = lobby_code;
    form.appendChild(hiddenField);

    document.body.appendChild(form);
    form.submit();
    
}

async function getStarterData(userID) {
    try {
        const response = await post("/send_data", {
            ID: userID,
        }, 'application/json');
        return [response.numSquares, response.link, response.assignedSquares];
    } catch (error) {
        console.error(error);
        // You can re-throw the error if needed
        throw error;
    }
}
*/

/*
post("/send-square-locations-data, /get-square-location-data", {name: "data", data: data});
*/

// first_request(original server data), assign to variable original server data


// if i need to stop the repeat at some point
/*
setTimeout(() => {
  clearInterval(timerId);
  console.log('Interval stopped');
}, 10000); // 10000 milliseconds = 10 seconds
*/

function post() {

}

function request() {
  
}