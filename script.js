const container = document.querySelector('.container')

const personFactory = (name, marker, playerNumber) => {
  const sayHello  = () => {
    console.log(`Hello my name is ${name}`);
  }

  const displayPerson = () => {
    document.querySelector(`#player${playerNumber}`).innerText = `${name}, ${marker}`
  }

  displayPerson();
  
  return { name, marker, sayHello, displayPerson }
}

const writeBox = (box, marker) => {
  box.innerText = marker;
}

container.addEventListener('click', (event) => {
  const target = event.target;
  if (target.className === "box") {
    writeBox(target, "x")
  }
});

let hugo = personFactory("Hugo", "X", 1)
let mark = personFactory("Mark", "O", 2)