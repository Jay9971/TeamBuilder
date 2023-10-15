const audioUrl = '/get-audio-stream-from-server381845?userid=01'; 

fetch(audioUrl)
  .then(response => response.blob())
  .then(blob => {
    const audioBlob = new Blob([blob], { type: 'audio/mpeg' });
    const audioUrl = URL.createObjectURL(audioBlob);

    const audioElement = document.createElement('audio');
    audioElement.src = audioUrl;
    audioElement.controls = true;


    document.body.appendChild(audioElement);

    audioElement.play();
  })
  .catch(error => {
    console.error('Error fetching audio data:', error);
  });
  
  
  
  

/*let audioByteArray =         //get_l("/get-audio-stream-from-server381845");

refAudio = document.createElement("aud");
refAudio.src = img_url;
refAudio.addEventListener("load", callFunctions);

const audioBlob = new Blob([audioByteArray], { type: 'audio/mpeg' });
const audioUrl = URL.createObjectURL(audioBlob);

const audioElement = document.createElement('audioReceiver');
audioElement.src = audioUrl;
audioElement.controls = true;


document.body.appendChild(audioElement);

audioElement.play();
*/