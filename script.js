//your JS code here. If required.

let player1 = "";
let player2 = "";
let currentPlayer = "";
let currentSymbol = "x";

const submitBtn = document.getElementById("submit");
const startScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("game-screen");
const messageDiv = document.querySelector(".message");
const cells = document.querySelectorAll(".cell");

submitBtn.addEventListener("click", () => {
  player1 = document.getElementById("player-1").value.trim();
  player2 = document.getElementById("player-2").value.trim();

  if (player1 === "" || player2 === "") {
    alert("Enter both player names!");
    return;
  }

  currentPlayer = player1;

  startScreen.classList.add("hidden");
  gameScreen.classList.remove("hidden");

  messageDiv.textContent = `${currentPlayer}, you're up`;
});

cells.forEach(cell => {
  cell.addEventListener("click", () => {
    if (cell.textContent !== "") return;

    cell.textContent = currentSymbol;

    if (checkWin()) {
      messageDiv.textContent = `${currentPlayer}, congratulations you won!`;
      highlightWin();
      disableBoard();
      return;
    }

    switchPlayer();
  });
});

function switchPlayer() {
  if (currentPlayer === player1) {
    currentPlayer = player2;
    currentSymbol = "o";
  } else {
    currentPlayer = player1;
    currentSymbol = "x";
  }
  messageDiv.textContent = `${currentPlayer}, you're up`;
}

const winningPatterns = [
  [1,2,3], [4,5,6], [7,8,9],
  [1,4,7], [2,5,8], [3,6,9],
  [1,5,9], [3,5,7]
];

let winningSet = [];

function checkWin() {
  for (let pattern of winningPatterns) {
    const [a,b,c] = pattern;
    if (
      getCell(a) === currentSymbol &&
      getCell(b) === currentSymbol &&
      getCell(c) === currentSymbol
    ) {
      winningSet = pattern;
      return true;
    }
  }
  return false;
}

function getCell(num) {
  return document.getElementById(num).textContent;
}

function highlightWin() {
  winningSet.forEach(num => {
    document.getElementById(num).classList.add("winner");
  });
}

function disableBoard() {
  cells.forEach(cell => cell.style.pointerEvents = "none");
}
