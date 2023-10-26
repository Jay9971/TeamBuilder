

async function sendAudio() {
try {
	console.log("sending ", audioString);
const response = await post("/send-audio", {
userid: userID,
audioData: audioString
}, 'application/json');
} catch (error) {
console.error(error);
}
}


async function getAudio() {
	try {
	const response = await post("/get-audio", {
	userid: userID
	}, 'application/json');
	;
	serverAudio = response.audioData;
	console.log("playing ", serverAudio);
	playAllAudio(serverAudio);
	} catch (error) {
	console.error(error);
	}
}










let mediaRecorder;
let audioChunks = [];
let isRecording = false;
let audioBlob = null;
let audioString = null;
let serverAudio = null;


function startRecording() {
// Clear the previous recording data
audioChunks = [];
audioBlob = null;
audioString = null;


navigator.mediaDevices.getUserMedia({ audio: true })
.then((stream) => {
mediaRecorder = new MediaRecorder(stream);
mediaRecorder.ondataavailable = (event) => {
if (event.data.size > 0) {
audioChunks.push(event.data);
}
};
mediaRecorder.start();
isRecording = true;




})
.catch((error) => {
console.error('Error accessing microphone:', error);
});
}


function stopRecording() {
if (mediaRecorder && isRecording) {
mediaRecorder.stop();
mediaRecorder.onstop = () => {
isRecording = false;




if (audioChunks.length > 0) {
audioBlob = new Blob(audioChunks, { type: 'audio/wav' });


// Convert the Blob to a base64 string
const reader = new FileReader();
reader.onloadend = () => {
audioString = reader.result;
sendAudio();
};
reader.readAsDataURL(audioBlob);
}
};
}
}






function playAllAudio(audioList) {
	for (item of audioList) {
		if (item != "") {
			const audioElement = new Audio(item);
			audioElement.play();
		}
		
	
	
	}
}








startRecording();
function myTimerFunction() {
stopRecording();
startRecording();
}


// Set up the timer to call myTimerFunction every 10 milliseconds
const timerIntervalVoice = 500; // 0 milliseconds
const timer = setInterval(myTimerFunction, timerIntervalVoice);
const timer2 = setInterval(getAudio, timerIntervalVoice);
