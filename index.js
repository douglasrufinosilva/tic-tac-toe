const allCell = document.querySelectorAll('.cell')
const board = document.querySelector('.board')
const winMessageTxt = document.querySelector('.winMessageTxt')
const winnerMessage = document.querySelector('.winnerMessage')
const restartBtn = document.querySelector('.restartBtn')

let isCircleTurn

const winCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

const startGame = () => {
    isCircleTurn = false

    for (const cell of allCell) {
        cell.classList.remove('circle')
        cell.classList.remove('x')
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, { once: true})
}


    setBoardHoverclass()
    winnerMessage.classList.remove('showWinnerMessage')
}

const endGame = (isDraw) => {
    if(isDraw) {
        winMessageTxt.innerText = 'Empate!'
    } else {
        winMessageTxt.innerText = isCircleTurn ? 'O Venceu!' : 'X Venceu!'
    }

    winnerMessage.classList.add('showWinnerMessage')
}

const checkForWin = (currentPlayer) => {
    return winCombinations.some((combination) => {
        return combination.every((index) => {
            return allCell[index].classList.contains(currentPlayer)
        })
    })
}

const checkForDraw = () => {
    return [...allCell].every((cell) => {
        return cell.classList.contains('x') || cell.classList.contains('circle')
    })
}

const placeMark = (cell, classToAdd) => {
    cell.classList.add(classToAdd)
}

const setBoardHoverclass = () => {
    board.classList.remove('circle')
    board.classList.remove('x')

    if (isCircleTurn) {
        board.classList.add('circle')
    } else {
        board.classList.add('x')
    }

    }

const swapTurns = () => {
    isCircleTurn = !isCircleTurn

    setBoardHoverclass()
}

const handleClick = (e) => {
    // Colocar a marcar (X ou O)
    const cell = e.target 
    const classToAdd = isCircleTurn ? 'circle' : 'x'


    placeMark(cell, classToAdd)

    //Verificar vitótia
    const isWin = checkForWin(classToAdd)

    // Verificar Empate
    const isDraw = checkForDraw()

    if (isWin) {
        endGame(false)
    } else if (isDraw) {
        endGame(true)
    } else {
    // Mudança de vez, alternar entre X e O.
        swapTurns()
    }
}

startGame()

restartBtn.addEventListener('click', startGame)
