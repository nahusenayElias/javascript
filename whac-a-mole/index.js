const squares  = document.querySelectorAll('.square')
const mole = document.querySelector('.mole')
const timeLeft = document.querySelector('#time-left')
const score = document.querySelector('#score')

let result = 0
let hitPosition
let currentTime = 60
let timerId = null

function randomeSquare() {
    squares.forEach(square => {
        square.classList.remove('mole')
    })

    let randomeSquare = squares[Math.floor(Math.random() * 9)]
    randomeSquare.classList.add('mole')

    hitPosition = randomeSquare.id
}
squares.forEach(square => {
    square.addEventListener('mousedown', () => {
        if (square.id == hitPosition) {
            result++
            console.log(result)
            score.textContent = result
            hitPosition = null
        }
    })
})
function moveMole() {
    
    timerId = setInterval(randomeSquare, 1000)
}
moveMole()

function countDown() {
currentTime--
timeLeft.textContent = currentTime

if (currentTime == 0) {
    clearInterval(countDownTimerId)
    clearInterval(timerId)
    alert('Game over! Your final score is ' + result)
}
}
let countDownTimerId = setInterval(countDown, 1000)

