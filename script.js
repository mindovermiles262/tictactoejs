const container = document.querySelector('.container');

// -----  PERSON FACTORY  -----
const personFactory = (name, marker, playerNumber) => {
  const sayHello  = () => {
    console.log(`Hello my name is ${name}`);
  };

  const displayPerson = () => {
    document.querySelector(`#player${playerNumber}`).innerText = `${name}, ${marker}`
  };

  displayPerson();
  
  return { name, marker, sayHello, displayPerson };
};



// -----  GAME FACTORY  -----
const gameFactory = (player1, player2) => {
  let currentPlayer = player1;
  let gameArray = ["", "", "", "", "", "", "", "", ""];

  // Checks if all items in array are the same
  //   [1, 1, 1].allSameValues => true
  //   [1, 1, 2].allSameValues => false
  Array.prototype.allSameValues = function() {
    if (this[0] === "") {
      return false;
    }
    for (let i = 1; i < this.length; i++) {
      if (this[i] !== this[0]) {
        return false;
      }
    } 
    return true;
  }

  const validChoice = (target) => {
    const targetIndex = target.id.slice(-1);
    if (gameArray[targetIndex] === "") {
      return true;
    } else {
      return false;
    }
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
    if (currentPlayer === player1) {
      return player2;
    } else {
      return player1;
    };
  };

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
    const tieGame = () => {
      console.log("TIE GAME")
    }

    const winner = () => {
      console.log(`You Win ${player.name}!`)
    }

    player === undefined ? tieGame() : winner()
    
  }

  container.addEventListener('click', (event) => {
    const target = event.target;
    if (target.className === "box") {
      let valid = validChoice(target)
      if (valid) {
        playerChoose(currentPlayer, target);
        renderBoard();
        // Check for tie game
        const win = checkForWin(gameArray, currentPlayer);
        if (win) {
          gameOver(currentPlayer);
        } else {
          currentPlayer = switchPlayer(currentPlayer);
        }
      }
    };
  });
};



// ----- INIT GAME -----
let hugo = personFactory("Hugo", "X", 1);
let mark = personFactory("Mark", "O", 2);

gameFactory(hugo, mark);
