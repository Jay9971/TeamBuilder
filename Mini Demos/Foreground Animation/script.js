document.addEventListener("DOMContentLoaded", function () {
    const gridContainer = document.getElementById("gridContainer");

    for (let i = 0; i < 10000; i++) {
        const pixel = document.createElement("div");
        pixel.classList.add("pixel");
        const delay = Math.random() * 2 + 3; // Random delay between 0 and 5 seconds
        pixel.style.animationDelay = `${delay}s`;
        gridContainer.appendChild(pixel);
    }
});


