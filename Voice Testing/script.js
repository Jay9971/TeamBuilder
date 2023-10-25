let mediaRecorder;
let audioChunks = [];
let isRecording = false;
let audioBlob = null;
let audioURL = null;

/*
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');

startButton.addEventListener('click', startRecording);
stopButton.addEventListener('click', stopRecording);
*/

function startRecording() {
    // Clear the previous recording data
    audioChunks = [];
    audioBlob = null;
    audioURL = null;

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

            /*
            startButton.disabled = true;
            stopButton.disabled = false;
            */
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

            //startButton.disabled = false;
            //stopButton.disabled = true;

            if (audioChunks.length > 0) {
                audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
                audioURL = URL.createObjectURL(audioBlob);

                // Enable the "Play Recorded Audio" button
                //playButton.disabled = false;

                
            }
        };
    }
}

/*
const playButton = document.getElementById('playButton');
const sendButton = document.getElementById('sendButton');

playButton.disabled = true; // Initially disabled

playButton.addEventListener('click', playRecordedAudio);

sendButton.disabled = true; // Initially disabled

sendButton.addEventListener('click', sendAudioDataToServer);
*/

function playRecordedAudio() {
    if (audioURL) {
        const audioElement = new Audio(audioURL);
        audioElement.play();
    }
}

function sendAudioDataToServer() {
    // Create a FormData object to send the audio data to the server
    const formData = new FormData();
    formData.append('audioData', audioBlob);

    // Make an HTTP request to your server endpoint to send the audio data
    fetch('/your-server-endpoint', {
        method: 'POST',
        body: formData
    })
        .then((response) => {
            if (response.ok) {
                console.log('Audio data sent to the server.');
            }
        })
        .catch((error) => {
            console.error('Error sending audio data:', error);
        });
}

function myTimerFunction() {
    stopRecording();
    sendAudioDataToServer();
    startRecording();
}

function receiveAudioDataFromServer() {
    // Define the URL of the server endpoint to request audio data from
    const serverEndpoint = '/your-audio-endpoint'; // Replace with the actual server endpoint

    // Make an HTTP POST request to the server to request audio data
    fetch(serverEndpoint, {
        method: 'POST',
        // You can add headers or other request options here as needed
    })
    .then((response) => {
        if (response.ok) {
            // The response from the server can be processed here
            return response.blob(); // Assuming the server returns audio data as a binary blob
        } else {
            throw new Error('Failed to fetch audio data from the server.');
        }
    })
    .then((audioBlob) => {
        // Process the received audio data (audioBlob) as needed
        // For example, play the received audio data
        const audioURL = URL.createObjectURL(audioBlob);
        const audioElement = new Audio(audioURL);
        audioElement.play();
    })
    .catch((error) => {
        console.error('Error receiving audio data:', error);
    });
}

function myOtherTimerFunction() {
    receiveAudioDataFromServer();
}

// Set up the timer to call the function every 10 milliseconds

startRecording();
const timerInterval = 10; // 10 milliseconds
const timer = setInterval(myTimerFunction, timerInterval);

const timerTwo = setInterval(myOtherTimerFunction, timerInterval);