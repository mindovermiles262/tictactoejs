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
      box.innerText = gameArray[index];
    })
  };

  const switchPlayer = (currentPlayer) => {
    if (currentPlayer === player1) {
      return player2;
    } else {
      return player1;
    };
  };

  container.addEventListener('click', (event) => {
    const target = event.target;
    if (target.className === "box") {
      let valid = validChoice(target)
      if (valid) {
        playerChoose(currentPlayer, target);
        renderBoard();
        // TODO: Check if game has been won
        currentPlayer = switchPlayer(currentPlayer);
      }
    };
  });
};



// ----- INIT GAME -----
let hugo = personFactory("Hugo", "X", 1);
let mark = personFactory("Mark", "O", 2);

gameFactory(hugo, mark);
