const board = document.querySelectorAll(".cell");
const status = document.getElementById("status");
const resetButton = document.getElementById("reset");
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]
];

board.forEach(cell => {
    cell.addEventListener("click", () => {
        const index = cell.getAttribute("data-index");
        if (gameState[index] === "" && gameActive) {
            gameState[index] = currentPlayer;
            cell.textContent = currentPlayer;
            if (checkWin()) {
                status.textContent = `Player ${currentPlayer} wins!`;
                gameActive = false;
            } else if (gameState.includes("")) {
                currentPlayer = currentPlayer === "X" ? "O" : "X";
                status.textContent = `Player ${currentPlayer}'s turn`;
            } else {
                status.textContent = "It's a draw!";
                gameActive = false;
            }
        }
    });
});

function checkWin() {
    return winPatterns.some(pattern => {
        return pattern.every(index => gameState[index] === currentPlayer);
    });
}

resetButton.addEventListener("click", () => {
    gameState.fill("");
    board.forEach(cell => cell.textContent = "");
    gameActive = true;
    currentPlayer = "X";
    status.textContent = `Player X's turn`;
});
