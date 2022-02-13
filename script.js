// Default global values
let gridSize = 32;

function createGrid(size) {
    size = Number(size);
    const container = document.querySelector('.grid-container');

    for (let i = 0; i < (size); i++) {
        const row = document.createElement('div');
        row.style.cssText = `flex: 1 1 auto;
            display: flex;
            align-items: stretch;`;
        row.style.height = String(100/size) + "%";
        row.setAttribute("class", "row");

        for (let j = 0; j < size; j++){
            const box = document.createElement('div');
            box.style.cssText = `flex: 1 1 auto;
                flex-basis: 100%`
            box.style.width = String(100/size) + "%";
            box.style.backgroundColor = 'white';
            box.setAttribute("class", "box")

            box.addEventListener("mouseover", changeBgColorBlack)
            row.appendChild(box);
        }

        container.appendChild(row);
    }
}

function deleteGrid() {
    const container = document.querySelector('.grid-container');
    while (container.firstChild) {
        container.removeChild(container.lastChild);
    }
}


function randomizeRGBValue() {
    let max = 255;
    return Math.floor(Math.random() * max);
}

function changeBgColorRandom(event) {
    let red = randomizeRGBValue();
    let green = randomizeRGBValue();
    let blue = randomizeRGBValue();
    let rgbString = "rgb(" + String(red) + ", " + String(green) + ", " + String(blue) + ")"
    event.target.style.backgroundColor = rgbString;
}

function changeBgColorBlack(event) {
    event.target.style.backgroundColor = "black";
}

function eraser(event) {
    event.target.style.backgroundColor = "white";
}

function clear() {
    const boxes = document.querySelectorAll(".box");
    boxes.forEach((box) => {
        box.style.backgroundColor = "white";
    })
}


function resetEventListener(boxes) {
    boxes.forEach((box) => {
        box.removeEventListener("mouseover", changeBgColorBlack);
        box.removeEventListener("mouseover", changeBgColorRandom);
        box.removeEventListener("mouseover", eraser);
    })
}

function enableMode(boxes, mode) {
    boxes.forEach((box) => {
        box.addEventListener('mouseover', mode);
    })
}

function chooseModeWrapper(event) {
    let mode = event.target.getAttribute("id");
    chooseMode(mode);
}

function chooseMode(mode) {
    const boxes = document.querySelectorAll(".box");
    
    resetEventListener(boxes);

    switch(mode) {
        case 'eraser':
            return enableMode(boxes, eraser);
        case 'black':
            return enableMode(boxes, changeBgColorBlack);
        case 'rainbow':
            return enableMode(boxes, changeBgColorRandom);
    }
}

function createGridWrapper(size) {
    console.log("creating grid")
    deleteGrid();
    createGrid(size);
}

createGrid(gridSize);

// Select Buttons
const btnClear = document.querySelector("#clear");

const buttons = document.querySelectorAll("button.mode");

// Select range input
const sizeInput = document.querySelector("#grid-size");
sizeInput.addEventListener('mouseup', () => createGridWrapper(sizeInput.value));

btnClear.addEventListener('click', clear);

buttons.forEach((button) => {
    button.addEventListener('click', chooseModeWrapper);
})