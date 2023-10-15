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




const audioPlayer = document.getElementById("audioPlayer");

let mediaRecorder;
let audioChunks = [];

let audioPath = "/send-audio-stream481";

let userID = document.getElementById("userid");

navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
        mediaRecorder = new MediaRecorder(stream);

        mediaRecorder.ondataavailable = event => {
			if (event.data instanceof ArrayBuffer) {
				const audioData = new Uint8Array(event.data);
				post(audioPath, {
					userid: userID,
					audio: audioData
				}, 'application/json');
				console.log("data sent");
			}
        };

        mediaRecorder.onstart = () => {
            console.log("Recording started.");
        };
        
        mediaRecorder.onstop = () => {
            console.log("Recording stopped.");
        };
        
        mediaRecorder.onerror = () => {
            console.log("Recording had an error.");
        };

        mediaRecorder.start();

        audioPlayer.srcObject = stream;
        //audioPlayer.play();
    })
    .catch(error => {
        console.error("Error accessing microphone:", error);
    });



