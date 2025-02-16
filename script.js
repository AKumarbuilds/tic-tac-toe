const urlParams = new URLSearchParams(window.location.search);
const mode = urlParams.get('mode'); // "local" or "ai"

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

// Make a move
function makeMove(index) {
    if (!gameActive || board[index] !== "") return;

    board[index] = currentPlayer;
    document.getElementsByClassName("cell")[index].innerText = currentPlayer;
    document.getElementsByClassName("cell")[index].classList.add("taken");

    if (checkWinner()) {
        document.getElementById("turn-indicator").innerText = `Player ${currentPlayer} Wins!`;
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    document.getElementById("turn-indicator").innerText = `Player ${currentPlayer}'s Turn`;

    if (mode === "ai" && currentPlayer === "O") {
        setTimeout(aiMove, 500);
    }
}

// AI Move using Minimax Algorithm
function aiMove() {
    let bestMove = minimax(board, "O").index;
    makeMove(bestMove);
}

// Minimax Algorithm
function minimax(newBoard, player) {
    let availableMoves = newBoard.map((val, idx) => val === "" ? idx : null).filter(val => val !== null);

    if (checkWinner()) return { score: player === "O" ? -10 : 10 };
    if (availableMoves.length === 0) return { score: 0 };

    let moves = [];
    for (let i of availableMoves) {
        let move = {};
        move.index = i;
        newBoard[i] = player;

        if (player === "O") {
            let result = minimax(newBoard, "X");
            move.score = result.score;
        } else {
            let result = minimax(newBoard, "O");
            move.score = result.score;
        }

        newBoard[i] = "";
        moves.push(move);
    }

    return moves.reduce((bestMove, move) => {
        if ((player === "O" && move.score > bestMove.score) || (player === "X" && move.score < bestMove.score)) {
            return move;
        }
        return bestMove;
    }, { score: player === "O" ? -Infinity : Infinity });
}

// Check Winner
function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    return winPatterns.some(pattern => {
        if (board[pattern[0]] && board[pattern[0]] === board[pattern[1]] && board[pattern[0]] === board[pattern[2]]) {
            gameActive = false;
            return true;
        }
        return false;
    });
}

// Restart Game
function restartGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    document.querySelectorAll(".cell").forEach(cell => {
        cell.innerText = "";
        cell.classList.remove("taken");
    });
    currentPlayer = "X";
    gameActive = true;
    document.getElementById("turn-indicator").innerText = `Player X's Turn`;
}
