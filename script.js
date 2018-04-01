const container = document.querySelector('.container');

// -----  PERSON FACTORY  -----
const personFactory = (name, marker, playerNumber) => {
  const displayPerson = () => {
    document.querySelector(`#player${playerNumber}`).innerText = `${name}, ${marker}`
  };

  displayPerson();
  
  return { name, marker, displayPerson };
};



// -----  GAME FACTORY  -----
const gameFactory = (player1, player2) => {
  document.querySelector('.gameInformation').classList.remove('hidden');
  document.querySelector('.getPlayerInfo').classList.add('hidden')

  let currentPlayer = player1;
  let gameArray = Array(9).fill('');

  // Checks if all items in array are the same
  Array.prototype.allSameValues = function() {
    if (this[0] === "") { return false; }
    for (let i = 1; i < this.length; i++) {
      if (this[i] !== this[0]) { return false; }
    } 
    return true;
  }

  const validChoice = (target) => {
    const targetIndex = target.id.slice(-1);
    return (gameArray[targetIndex] === "") ? true : false;
  }

  const playerChoose = (currentPlayer, target) => {
    const targetIndex = target.id.slice(-1);
    const playerMarker = currentPlayer.marker;
    if (gameArray[targetIndex] === "") {
      gameArray[targetIndex] = playerMarker;
    }
  }

  const renderBoard = () => {
    const boxes = document.querySelectorAll('.box')
    boxes.forEach(function(box, index) {
      box.innerHTML = `<p>${gameArray[index]}</p>`
    })
  };

  const switchPlayer = (currentPlayer) => {
    return (currentPlayer === player1) ? player2 : player1;
  };

  const checkForTie = (gameArray) => {
    let tieGame = true;
    gameArray.forEach(function(position) {
      if (position === "") { tieGame = false; }
    })
    return tieGame;
  }

  const checkForWin = (gameArray) => {
    let win = false;

    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    winningCombos.forEach(arr => {
      const a = gameArray[arr[0]];
      const b = gameArray[arr[1]];
      const c = gameArray[arr[2]];
      if ([a, b, c].allSameValues()) {
        win = true;
        return;
      };
    });

    return win;
  }

  const gameOver = player => {
    // If not passed ARG, tie game is displayed
    const messageAnchor = document.querySelector(".message")
    const gameInformation = document.querySelector('.gameInformation')

    const changeScreen = (displayMessage) => {
      container.style.display = 'none';
      gameInformation.style.display = 'none';
      messageAnchor.innerHTML = `<h1>${displayMessage}</h1>`
    }

    const tieGame = () => { changeScreen("Tie Game"); }

    const winner = () => { changeScreen(`You Win ${player.name}!`); }
    
    player === undefined ? tieGame() : winner()
  }

  container.addEventListener('click', (event) => {
    const target = event.target;
    if (target.className === "box") {
      let valid = validChoice(target)
      if (valid) {
        playerChoose(currentPlayer, target);
        renderBoard();
        const tie = checkForTie(gameArray);
        const win = checkForWin(gameArray, currentPlayer);
        if (tie) {
          gameOver();
        } else if (win) {
          gameOver(currentPlayer);
        } else {
          currentPlayer = switchPlayer(currentPlayer);
        }
      }
    };
  });
};



// ----- INIT GAME -----
document.querySelector('#startGame').addEventListener('click', function() {
  const player1Name = document.querySelector('#player1Name').value
  const player2Name = document.querySelector('#player2Name').value
  let player1 = personFactory(player1Name, "X", 1);
  let player2 = personFactory(player2Name, "O", 2);
  gameFactory(player1, player2);
})
