// used to ask the server for something and recieve something back, or to just send it something
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

/* internet link for a transparent overlay, can be downloaded file idk */
const transp_link = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/HD_transparent_picture.png/1200px-HD_transparent_picture.png";

/* tempBank: list for number coordinates of the images assigned to this user. The original image is split into a grid of squares.
each side length is equal to the sqrt of the total number of squares. the squares are designated one number, 0 through total_squares-1, 
left to right top to bottom*/
let tempBank = [];

/* list of all the links of the images assigned to this user. used to create the image selection options on the bottom left corner.*/
let bankList = [];

/* list of the image url being used at every square on the grid. empty squares, including ones occupied by other players, have a
transparent image. initialized with all transparent images*/
let usedList=  [];

const user_ID = window.location.search.substring(8);
const originalList = await getStarterData(user_ID);
const img_url = originalList[1];
const total_squares = parseInt(originalList[0]); 
for (let i=0; i<total_squares;i++) {
  usedList.push(transp_link);
}
const numbersString = originalList[2];
for (let i = 0; i < numbersString.length; i += 2) {
  const substring = numbersString.substring(i, i + 2);
  const intValue = parseInt(substring);
  tempBank.push(intValue);
}

/*
post("/send-square-locations-data, /get-square-location-data", {name: "data", data: data});
*/

// first_request(original server data), assign to variable original server data

const interval = 1000; // 1000 milliseconds = 1 second
const timerId = setInterval(request, interval); //assign to server occupied, write logic for server occupied list



// if i need to stop the repeat at some point
/*
setTimeout(() => {
  clearInterval(timerId);
  console.log('Interval stopped');
}, 10000); // 10000 milliseconds = 10 seconds
*/