const DEFAULT_SIZE = 16
const MAX_SIZE = 25
const DEFAULT_COLOR = 'black'
let currentColor = DEFAULT_COLOR
let currentSize = DEFAULT_SIZE
function updateSize(size) {
    if(!size) {
        currentSize = DEFAULT_SIZE
    } else if (size > MAX_SIZE) {
        currentSize = DEFAULT_SIZE
        console.error(`Maximum grid size is 100 x 100`)
    } else {
        currentSize = size
    }
    updateGrid()
}
function setupGrid(size) {
    let grid = document.querySelector('.grid')
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`
    for(let i = 0; i < size * size; i++) {
        let gridSquare = document.createElement('div')
        gridSquare.classList.add('grid-square')
        gridSquare.style.background = 'white'
        gridSquare.addEventListener('click', (e) => {
            let tempColor = e.target.style.background
            if(tempColor === 'white') {
                e.target.style.background = 'black'
            } else {
                e.target.style.background = 'white'
            }
        })
        grid.appendChild(gridSquare)
    }
}
function updateGrid() {
    destroyGrid()
    setupGrid(currentSize)
}
function destroyGrid() {
    let gridSquares = document.querySelectorAll('.grid-square')
    gridSquares.forEach(square => {
        square.remove()
    });
}
function updateSizeDisplay() {
    let display = document.querySelector('#grid-size-label')
    let currentvalue = document.querySelector('#grid-size-slider')
    currentvalue = currentvalue.value
    display.textContent = `Current Grid Size: ${currentvalue}`
}
function setupOptions() {
    let slider = document.getElementById('grid-size-slider')
    let output = document.getElementById('grid-size-label')
    let submitbutton = document.querySelector('button')
    output.innerHTML = `Current Grid Size: ${slider.value}`

    slider.oninput = () => {
        output.innerHTML = `Current Grid Size: ${document.getElementById('grid-size-slider').value}`
    }
    submitbutton.addEventListener('click', function() {
        let currentvalue = document.querySelector('#grid-size-slider').value
        currentSize = currentvalue
        updateGrid()
    })
}
function setup () {
    setupGrid(currentSize)
    setupOptions()
}
setup()
