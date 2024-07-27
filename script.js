const board = [
    ['5', '+', '3', '=', ''],
    ['+', '', '-', '', '-'],
    ['2', '+', '', '=', '3'],
    ['=', '', '=', '', '-'],
    ['', '-', '', '=', '']
];

const answers = {
    '0,4': '8',
    '2,2': '1',
    '4,0': '7',
    '4,2': '2',
    '4,4': '5'
};

const gameBoard = document.getElementById('gameBoard');
const messageEl = document.getElementById('message');
const restartButton = document.getElementById('restartButton');
const correctSound = document.getElementById('correctSound');

function createBoard() {
    gameBoard.innerHTML = '';
    board.forEach((row, i) => {
        row.forEach((cell, j) => {
            const cellEl = document.createElement('div');
            cellEl.classList.add('cell');
            
            if (cell === '') {
                if ((i === 1 && (j === 1 || j === 3)) || (i === 3 && (j === 1 || j === 3))) {
                    cellEl.classList.add('black');
                } else {
                    const input = document.createElement('input');
                    input.type = 'text';
                    input.maxLength = 2;
                    input.dataset.row = i;
                    input.dataset.col = j;
                    input.addEventListener('input', checkAnswer);
                    cellEl.appendChild(input);
                }
            } else {
                cellEl.textContent = cell;
            }
            
            gameBoard.appendChild(cellEl);
        });
    });
}

function checkAnswer(event) {
    const input = event.target;
    const row = input.dataset.row;
    const col = input.dataset.col;
    const value = input.value;

    if (value === answers[`${row},${col}`]) {
        input.classList.add('correct');
        correctSound.play();
    } else {
        input.classList.remove('correct');
    }

    checkAllAnswers();
}

function checkAllAnswers() {
    const inputs = gameBoard.querySelectorAll('input');
    let allCorrect = true;

    inputs.forEach(input => {
        const row = input.dataset.row;
        const col = input.dataset.col;
        if (input.value !== answers[`${row},${col}`]) {
            allCorrect = false;
        }
    });

    if (allCorrect) {
        messageEl.textContent = 'כל הכבוד!';
    } else {
        messageEl.textContent = '';
    }
}

function restartGame() {
    createBoard();
    messageEl.textContent = '';
}

createBoard();
restartButton.addEventListener('click', restartGame);
