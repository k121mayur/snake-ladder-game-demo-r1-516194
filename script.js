const boardSize = 10;
const snakes = { 16: 6, 47: 26, 49: 11, 56: 53, 62: 19, 64: 60, 87: 24, 93: 73, 95: 75, 98: 78 };
const ladders = { 1: 38, 4: 14, 9: 31, 21: 42, 28: 84, 36: 44, 51: 67, 71: 91, 80: 100 };
let playerPositions = [0, 0];
let currentPlayer = 0;

function createBoard() {
    const board = document.getElementById('board');
    for (let i = boardSize * boardSize; i > 0; i--) {
        const square = document.createElement('div');
        square.classList.add('square');
        square.id = 'square-' + i;
        square.innerText = i;
        board.appendChild(square);
    }
}

function rollDice() {
    const diceRoll = Math.floor(Math.random() * 6) + 1;
    const newPosition = playerPositions[currentPlayer] + diceRoll;
    if (newPosition <= 100) {
        playerPositions[currentPlayer] = newPosition;
        updatePosition();
        checkForWinner();
        currentPlayer = (currentPlayer + 1) % 2;
        document.getElementById('currentPlayer').innerText = 'Current Player: Player ' + (currentPlayer + 1);
    }
}

function updatePosition() {
    const playerToken = document.getElementById('player-' + (currentPlayer + 1));
    if (playerToken) playerToken.remove();
    const position = playerPositions[currentPlayer];
    const square = document.getElementById('square-' + position);
    const token = document.createElement('div');
    token.classList.add('player');
    token.id = 'player-' + (currentPlayer + 1);
    token.innerText = currentPlayer + 1;
    square.appendChild(token);
    if (snakes[position]) {
        playerPositions[currentPlayer] = snakes[position];
        updatePosition();
    } else if (ladders[position]) {
        playerPositions[currentPlayer] = ladders[position];
        updatePosition();
    }
}

function checkForWinner() {
    if (playerPositions[currentPlayer] === 100) {
        document.getElementById('message').innerText = 'Player ' + (currentPlayer + 1) + ' wins!';
        document.getElementById('rollDice').disabled = true;
    }
}

document.getElementById('rollDice').addEventListener('click', rollDice);
createBoard();