const sketchArea = document.getElementById("sketch-area");
const colorInput = document.getElementById("color-input");
const gridValue = document.getElementById("grid-value");
const gridValueText = document.getElementById("grid-value-text");

let gridSize = 16;
let color = "#000000";
let eraserColor = "#FFFFFF";
let pencilColor = colorInput;
let activePixel;

gridValue.addEventListener("input", () => {
    changeSketchArea();
});

function changeSketchArea() {
    if (document.getElementById("grid-value").value != 0) {
        gridSize = document.getElementById("grid-value").value;
        gridValueText.textContent = `Grid size: ${gridSize} x ${gridSize}`
        sketchArea.innerHTML = "";
    }

    for (let i = 0; i < gridSize ** 2; i++) {
        sketchArea.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
        sketchArea.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;

        let pixel = document.createElement("div");
        sketchArea.append(pixel);
        pixel.classList.add("pixel");
        pixel.classList.add(`pixel${i}`);
    }
}

// Get active pixel 
sketchArea.onmouseenter = () => {
    const pixels = document.querySelectorAll(".pixel");

    for (let i = 0; i < gridSize ** 2; i++) {
        setTimeout(() => {
            pixels[i].addEventListener("mouseover", () => {
                activePixel = pixels[i];
            });
        }, 0);
    }
}

// Detect if mouse click is down
let mouseDown = false;

sketchArea.onmousedown = () => {
    mouseDown = true
    // Draw first pixel when mouse clicked
    Draw();
}

document.onmouseup = () => {
    mouseDown = false;
}

// Draw
sketchArea.onmouseover = () => {
    Draw();
}

function Draw() {
    if (mouseDown) {
        const pixels = document.querySelectorAll(".pixel");

        activePixel.style.backgroundColor = color;
    }
}

function changeColor() {
    pencilColor = colorInput.value;
    color = pencilColor;
}

function changeToEraser() {
    color = eraserColor;
}

// When the page loads
window.onload = () => {
    changeSketchArea();
};