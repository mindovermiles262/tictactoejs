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

  const writeBox = (box, marker) => {
    box.innerText = marker;
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
      writeBox(target, currentPlayer.marker);
      currentPlayer = switchPlayer(currentPlayer);
    };
  });
};



// ----- INIT GAME -----
let hugo = personFactory("Hugo", "X", 1);
let mark = personFactory("Mark", "O", 2);

gameFactory(hugo, mark);
