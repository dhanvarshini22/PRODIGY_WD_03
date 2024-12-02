const board = document.getElementById('board');
const statusDisplay = document.getElementById('status');
const resetButton = document.getElementById('reset');

let currentPlayer = 'X';
let gameState = Array(9).fill('');
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(event) {
    const cell = event.target;
    const cellIndex = cell.getAttribute('data-index');

    if (gameState[cellIndex] !== '' || checkWinner()) return;

    gameState[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add('taken');

    if (checkWinner()) {
        statusDisplay.textContent = `Player ${currentPlayer} Wins!`;
    } else if (gameState.every(cell => cell !== '')) {
        statusDisplay.textContent = 'It\'s a Draw!';
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
    }
}

function checkWinner() {
    return winningConditions.some(condition => 
        condition.every(index => gameState[index] === currentPlayer)
    );
}

function resetGame() {
    currentPlayer = 'X';
    gameState = Array(9).fill('');
    document.querySelectorAll('.cell').forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('taken');
    });
    statusDisplay.textContent = 'Player X\'s turn';
}

board.addEventListener('click', handleCellClick);
resetButton.addEventListener('click', resetGame);
