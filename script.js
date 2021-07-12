//making array for winning combination
const Winnning_Combination = [
    [0, 1, 2],
    [0, 3, 6],
    [2, 5, 8],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [1, 4, 7],
    [3, 4, 5]
]
let cells = document.querySelectorAll('.cell')
let circleTurn
const cellElements = document.querySelectorAll('[data-cell]')
let winnner = document.getElementById('winner')
let resetbtn = document.getElementById('reset')
let message = document.getElementById('message')



cells.forEach(cell => {
    cell.addEventListener('click', handleclick, { once: true })
})

function handleclick(e) {
    const cell = e.target;
    let currentClass = circleTurn ? 'circle' : 'x';
    placemark(cell, currentClass)
    if (checkWin(currentClass)) {
        endgame(false)
        message.classList.add('show')
    } else if (isdraw()) {
        endgame(true)
        message.classList.add('show')
    }
    swapTurns()

}

//reset btn function
resetbtn.addEventListener('click', reset)

function reset() {
    cells.forEach(cell => {
        cell.classList.remove('x')
        cell.classList.remove('circle')
        cell.removeEventListener('click', handleclick)
        cell.addEventListener('click', handleclick, { once: true })
        message.classList.remove('show')
    })

}

// placing X & O function
function placemark(cell, currentClass) {
    cell.classList.add(currentClass)
}

//switching X || O
function swapTurns() {
    circleTurn = !circleTurn
}

// winnner checkinging function
function checkWin(currentClass) {
    return Winnning_Combination.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(currentClass)

        })
    })
}

//draw function
function isdraw() {
    return [...cells].every(cell => {
        return cell.classList.contains("x") || cell.classList.contains('circle')
    })
}

//message displaying function
function endgame(draw) {
    if (draw) {
        winnner.innerText = 'Match Draw'
    } else {
        winnner.innerText = `${circleTurn ? 'O wins' : 'X wins' }`
    }
}