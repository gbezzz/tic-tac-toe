// Factory for squares on the grid
const Cell = function () {
  let value = "";

  const getValue = () => value;

  const addMarker = (playerMarker) => {
    value = playerMarker;
  };

  return { getValue, addMarker };
};

// Factory for the board
const GameBoard = (function () {
  const rows = 3;
  const columns = 3;
  const grid = [];

  for (let i = 0; i < rows; i++) {
    grid[i] = [];
    for (let j = 0; j < columns; j++) {
      grid[i].push(Cell());
    }
  }

  const getBoard = () => grid;

  const placeMarker = (row, column, player) => {
    const notValidMove = getBoard()[row][column].getValue() !== "";

    if (notValidMove) {
      console.log("Illegal move!!! Place your marker in an empty spot!");
    } else {
      getBoard()[row][column].addMarker(player);
      console.log(`${player}'s marker placed at (${row}, ${column})`);
      game.switchPlayerTurn();
    }
  };

  const printGameBoard = () => {
    const gameDisplay = grid.map((row) => row.map((cell) => cell.getValue()));
    console.log(gameDisplay);
  };

  return { getBoard, placeMarker, printGameBoard };
})();

// Factory for creating players
const Player = (function () {
  let playerNames = ["Player One", "Player Two"];
  let playerMarkers = ["X", "O"];
  const players = [];

  const createPlayers = () => {
    for (let i = 0; i < playerNames.length; i++) {
      players.push({
        playerName: playerNames[i],
        playerMarker: playerMarkers[i],
      });
    }
  };

  const getPlayers = () => players;

  return { playerNames, createPlayers, getPlayers };
})();

// Object to control game flow
const GameController = function () {
  const gameBoard = GameBoard;

  const players = Player;
  players.createPlayers();

  let activePlayer = players.getPlayers()[0];

  const switchPlayerTurn = () => {
    if (activePlayer === players.getPlayers()[0]) {
      activePlayer = players.getPlayers()[1];
    } else {
      activePlayer = players.getPlayers()[0];
    }
  };

  const getActivePlayer = () => activePlayer;

  const printNewRound = () => {
    gameBoard.printGameBoard();
    console.log(`${getActivePlayer().playerName}'s turn.`);
  };

  const checkWin = () => {
    const boardValues = gameBoard
      .getBoard()
      .map((row) => row.map((cell) => cell.getValue()));

    // Check rows
    for (let i = 0; i < 3; i++) {
      if (
        boardValues[i][0] !== "" &&
        boardValues[i][0] === boardValues[i][1] &&
        boardValues[i][1] === boardValues[i][2] &&
        boardValues[i][2] === "X"
      ) {
        return `${players.getPlayers()[0].playerName} wins!`;
      }
    }
    for (let i = 0; i < 3; i++) {
      if (
        boardValues[i][0] !== "" &&
        boardValues[i][0] === boardValues[i][1] &&
        boardValues[i][1] === boardValues[i][2] &&
        boardValues[i][2] === "O"
      ) {
        return `${players.getPlayers()[1].playerName} wins!`;
      }
    }

    // Check columns
    for (let i = 0; i < 3; i++) {
      if (
        boardValues[0][i] !== "" &&
        boardValues[0][i] === boardValues[1][i] &&
        boardValues[1][i] === boardValues[2][i] &&
        boardValues[2][i] === "X"
      ) {
        return `${players.getPlayers()[0].playerName} wins!`;
      }
    }
    for (let i = 0; i < 3; i++) {
      if (
        boardValues[0][i] !== "" &&
        boardValues[0][i] === boardValues[1][i] &&
        boardValues[1][i] === boardValues[2][i] &&
        boardValues[2][i] === "O"
      ) {
        return `${players.getPlayers()[1].playerName} wins!`;
      }
    }

    // Check diagonals
    if (
      boardValues[0][0] !== "" &&
      boardValues[0][0] === boardValues[1][1] &&
      boardValues[1][1] === boardValues[2][2] &&
      boardValues[2][2] === "X"
    ) {
      return `${players.getPlayers()[0].playerName} wins!`;
    }
    if (
      boardValues[0][0] !== "" &&
      boardValues[0][0] === boardValues[1][1] &&
      boardValues[1][1] === boardValues[2][2] &&
      boardValues[2][2] === "O"
    ) {
      return `${players.getPlayers()[1].playerName} wins!`;
    }

    if (
      boardValues[0][2] !== "" &&
      boardValues[0][2] === boardValues[1][1] &&
      boardValues[1][1] === boardValues[2][0] &&
      boardValues[2][0] === "X"
    ) {
      return `${players.getPlayers()[0].playerName} wins!`;
    }
    if (
      boardValues[0][2] !== "" &&
      boardValues[0][2] === boardValues[1][1] &&
      boardValues[1][1] === boardValues[2][0] &&
      boardValues[2][0] === "O"
    ) {
      return `${players.getPlayers()[1].playerName} wins!`;
    }
    const isBoardFull = () => {
      return gameBoard
        .getBoard()
        .every((row) => row.every((cell) => cell.getValue() !== ""));
    };
    const status = isBoardFull();
    if (status) {
      return "TIE !!";
    }

    return;
  };

  const playRound = (row, column) => {
    const marker = getActivePlayer().playerMarker;
    gameBoard.placeMarker(row, column, marker);

    // Add check win implementation here
    const winner = checkWin();
    if (winner) {
      console.log(winner);
      return; // Stop further actions if there's a winner
    }

    printNewRound();
  };

  printNewRound();

  return { gameBoard, playRound, getActivePlayer, switchPlayerTurn };
};

const game = GameController();
