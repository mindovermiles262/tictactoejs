console.log("Script Loaded")

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

let hugo = personFactory("Hugo", "H", 1)
let mark = personFactory("Mark", "M", 2)
