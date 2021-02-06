// import my modules
const rd = require("./readData.js");
const wd = require("./writeData.js");
const td = require("./todoItem.js");

// get functions from my modules
const getTodos = rd.getTodos;
const saveTodos = wd.saveTodos;
const Todo = td.Todo; // class

// external modules
const yargs = require("yargs");

const dbPath = "./todoList.json";

let todos = [];

/**
 * zapisuje liste todos-ow do pliku
 * @param {Array<Object>} myTodos - lista obiektow klasy Todo
 */
function saveMyTodos(myTodos) {
  saveTodos(dbPath, myTodos)
    .then((feedback) => {
      // tu monit o zapisaniu danych do pliku
      // console.log(feedback);
    })
    .catch((err) => {
      console.log(err);
    });
}

/**
 * wyswietla liste todos-ow w konsoli
 * @param {Array<Object>} myTodos - lista obiektow klasy Todo
 */
function displayTodos(myTodos) {
  console.log("Your todo list:\n");
  if (!myTodos.length) {
    console.log("The list is empty. Nothing to display.");
  } else {
    myTodos.forEach((item, index) => {
      console.log(index + ". " + item.toString());
    });
  }
}

/**
 * dodaje obiekt klasy Todo do todosow, jesli go tam jeszcze nie ma
 * taskDesc musza byc unikalne
 * wyswietla monit w konsoli o powodzeniu operacji
 * @param {string} taskDesc - opis taska
 * @param {Array<Object>} myTodos - lista obiektow klasy Todo
 * @return {Array<Object>} lista ob klasy Todo z nowym obiektem appendowanym
 * podejscie funkcyjne - nie modyfikuje myTodos (zwraca kopie)
 */
function addTask(taskDesc, myTodos) {
  for (let i = 0; i < myTodos.length; i++) {
    if (taskDesc === myTodos[i].getDesc()) {
      console.log("Nothing to do. The task is already present.");
      return myTodos;
    }
  }
  let tmpTodos = [...myTodos, new Todo(taskDesc, false)];
  console.log("Task added");
  return tmpTodos;
}

/**
 * zmienia status, tj. pole taska done{Boolean} na wartosc przeciwna
 * wyswietla monit w konsoli o powodzeniu operacji
 * @param {number} taskId - id/nr porzadkowy taska (od 0 do n-1)
 * wyswietlany po lewej stronie przez funkcje wyswietlajaca taski
 * @param {Array<Object>} myTodos - lista obiektow klasy Todo
 * @return {Array<Object>} lista ob klasy Todo (1 ob o zmienionym statusie)
 * podejscie funkcyjne - nie modyfikuje myTodos (zwraca kopie)
 */
function toggleTaskStatus(taskId, myTodos) {
  let id = parseInt(taskId);
  if (isNaN(id)) {
    console.log("Nothing to do. Incorrect task id given.");
    return myTodos;
  } else if (!myTodos.length) {
    console.log("Nothing to do. The list is empty.");
    return myTodos;
  } else if (id < 0 || id >= myTodos.length) {
    console.log("Nothing to do. Task id out of range.");
    return myTodos;
  } else {
    let tmpTodos = myTodos.map((t, indx) => {
      if (indx === taskId) {
        return new Todo(t.taskDesc, !t.done);
      } else {
        return new Todo(t.taskDesc, t.done);
      }
    });
    console.log(`Toggled status for taskId: ${id}`);
    return tmpTodos;
  }
}

/**
 * usuwa dany task z listy taskow,
 * wyswietla monit w konsoli o powodzeniu operacji
 * @param {number} taskId - id/nr porzadkowy taska (od 0 do n-1)
 * wyswietlany po lewej stronie przez funkcje wyswietlajaca taski
 * @param {Array<Object>} myTodos - lista obiektow klasy Todo
 * @return {Array<Object>} lista ob klasy Todo bez 1 obiektu
 * podejscie funkcyjne - nie modyfikuje myTodos (zwraca kopie)
 */
function removeTask(taskId, myTodos) {
  let id = parseInt(taskId);
  if (isNaN(id)) {
    console.log("Nothing to do. Incorrect task id given.");
    return myTodos;
  } else if (!myTodos.length) {
    console.log("Nothing to do. The list is already empty.");
    return myTodos;
  } else if (id < 0 || id >= todos.length) {
    console.log("Nothing to do. Task id out of range.");
    return myTodos;
  } else {
    console.log(`Removing taskDesc: ${todos[id].getDesc()}\ntaskId: ${id}`);
    let tmpTodos = [];
    for (let i = 0; i < myTodos.length; i++) {
      if (i !== taskId) {
        tmpTodos.push(myTodos[i]);
      }
    }
    console.log("The task has been removed from the list");
    return tmpTodos;
  }
}

/**
 * usuwa wszystkie taski z listy taskow,
 * wyswietla monit w konsoli o powodzeniu operacji
 * @param {Array<Object>} myTodos - lista obiektow klasy Todo
 * @return {Array<Object>} lista ob klasy Todo bez 1 obiektu
 * podejscie funkcyjne - nie modyfikuje myTodos (zwraca pusty Array)
 */
function remAllTasks(myTodos) {
  if (!myTodos.length) {
    console.log("Nothing to do. The list is already empty.");
    return myTodos;
  } else {
    let tmpTodos = [];
    console.log("All tasks have been removed.");
    return tmpTodos;
  }
}

getTodos(dbPath)
  .then((tabTodos) => {
    todos = tabTodos;
  })
  .then(() => {
    // dostepne komendy
    // dokumentacja yargs.command, tj.
    // https://yargs.js.org/docs/#api-reference-commandmodule
    // jest taka sobie,
    // ale dalem rade
    const argv = yargs
      .command({
        command: "display",
        aliases: ["d", "print", "p"],
        desc: "displays current todo list",
        handler: () => {
          displayTodos(todos);
        },
      })
      .command({
        command: "add taskDesc",
        aliases: ["a"],
        desc: "adds taskDesc to todo list",
        handler: (argv) => {
          todos = addTask(argv.taskDesc, todos);
          saveMyTodos(todos);
        },
      })
      .command({
        command: "togStatus taskId",
        aliases: ["ts", "t"],
        desc:
          "toggles status (done or not) of a task.\n" +
          "taskId - number on the left of the task display",
        handler: (argv) => {
          todos = toggleTaskStatus(argv.taskId, todos);
          saveMyTodos(todos);
        },
      })
      .command({
        command: "remove taskId",
        aliases: ["rm", "r"],
        desc:
          "removes given task from the list\n" +
          "taskId - number on the left of the task display",
        handler: (argv) => {
          todos = removeTask(argv.taskId, todos);
          saveMyTodos(todos);
        },
      })
      .command({
        command: "removeAll",
        aliases: ["ra"],
        desc: "removes all tasks from the list",
        handler: () => {
          todos = remAllTasks(todos);
          saveMyTodos(todos);
        },
      })
      .help()
      .alias("help", "h")
      .demandCommand(1)
      .strict(true).argv;
  })
  .catch((err) => {
    console.log(err);
  });
