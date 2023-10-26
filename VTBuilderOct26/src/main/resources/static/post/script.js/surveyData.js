//done
updateFontSize();
document.getElementById('save-button').addEventListener('click', function () {
    slider1Value = document.getElementById('slider1').value;
    slider2Value = document.getElementById('slider2').value;

    showPage(2);
    startAnimation();
    sendSurveyData();

    // Here, you can send the data to a server or perform any other necessary action.
});

// Show the first popup initially
showPopup(1,2);