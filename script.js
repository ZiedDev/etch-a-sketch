const sketchArea = document.getElementById("sketch-area");
const gridValue = document.getElementById("grid-value");
const gridValueText = document.getElementById("grid-value-text");
const body = document.getElementById("body");

const colorInput = document.getElementById('color-input');
const pencilInput = document.getElementById('pencil');
const eraserInput = document.getElementById('eraser');
const clearInput = document.getElementById('clear');

let gridSize = 16;
let color = "#24B4FF";
let eraserColor = "#FFFFFF";
let pencilColor = colorInput;
let activePixel;

gridValue.addEventListener("input", () => {
    changeSizeText(gridValue.value);
});

gridValue.addEventListener("change", () => {
    let confirmClear = confirm('are you sure you want to clear the sketch board');

    if (confirmClear) {
        changeSketchArea();
    }

    changeSizeText(gridSize);
    gridValue.value = gridSize;
});

function changeSketchArea() {
    gridSize = gridValue.value;
    sketchArea.innerHTML = "";

    for (let i = 0; i < gridSize ** 2; i++) {
        sketchArea.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
        sketchArea.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;

        let pixel = document.createElement("div");
        sketchArea.append(pixel);
        pixel.classList.add("pixel");
        pixel.classList.add(`pixel${i}`);
    }
}

function changeSizeText(val) {
    if (val != 0) {
        gridValueText.textContent = `Grid size: ${val} x ${val}`
    }
}

// Detect if mouse click is down
let pointerDown = false;

sketchArea.addEventListener('mousedown', e => {
    pointerDown = true

    // Draw first pixel when mouse clicked
    Draw(e.target);
})

document.addEventListener('mouseup', e => {
    pointerDown = false;
})

// Mobile 
sketchArea.addEventListener('touchstart', e => {
    body.classList.add('overflow-hidden');
    pointerDown = true;
})

document.addEventListener('touchend', e => {
    body.classList.remove("overflow-hidden");
    pointerDown = false;
})

// Draw
sketchArea.addEventListener('mouseover', e => {
    Draw(e.target);
})

sketchArea.addEventListener('touchmove', e => {
    Draw(document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY));
})

function Draw(activePixel) {
    if (pointerDown) {
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

colorInput.addEventListener('change', changeColor)
pencilInput.addEventListener('click', changeColor)
eraserInput.addEventListener('click', changeToEraser)
clearInput.addEventListener('click', () => {
    let confirmClear = confirm('are you sure you want to clear the sketch board');

    if (confirmClear) {
        changeSketchArea();
    }
})

// When the page loads
window.onload = () => {
    changeSketchArea();
};