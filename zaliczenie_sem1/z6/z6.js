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
 * wyswietla liste todos-ow w konsoli
 */
function displayTodos() {
  console.log("Your todo list:\n");
  todos.forEach((item, index) => {
    console.log(index + ". " + item.toString());
  });
}

/**
 * dodaje obiekt klasy Todo do todosow, jesli go tam jeszcze nie ma
 * taskDesc musza byc unikalne
 * wyswietla monit w konsoli o powodzeniu operacji
 * @param {string} taskDesc - opis taska
 */
function addTask(taskDesc) {
  for (let i = 0; i < todos.length; i++) {
    if (taskDesc === todos[i].getDesc()) {
      console.log("Nothing to do. The task is already present\n");
      return;
    }
  }
  todos.push(new Todo(taskDesc, false));
  console.log("Task added\n");
}

/**
 * zmienia status, tj. pole taska done{Boolean} na wartosc przeciwna
 * wyswietla monit w konsoli o powodzeniu operacji
 * @param {number} taskId - id/nr porzadkowy taska (od 0 do n-1)
 * wyswietlany po lewej stronie przez funkcje wyswietlajaca taski
 */
function toggleTaskStatus(taskId) {
  let id = parseInt(taskId);
  if (isNaN(id)) {
    console.log("Nothing to do. Incorrect task id given.");
  } else if (id < 0 || id >= todos.length) {
    console.log("Nothing to do. Task id out of range");
  } else {
    todos[id].toggleStatus();
    console.log(`Toggled status for taskId: ${id}\n`);
  }
}

/**
 * usuwa dany task z listy taskow,
 * wyswietla monit w konsoli o powodzeniu operacji
 * @param {number} taskId - id/nr porzadkowy taska (od 0 do n-1)
 * wyswietlany po lewej stronie przez funkcje wyswietlajaca taski
 */
function removeTask(taskId) {
  let id = parseInt(taskId);
  if (isNaN(id)) {
    console.log("Nothing to do. Incorrect task id given.");
  } else if (id < 0 || id >= todos.length) {
    console.log("Nothing to do. Task id out of range");
  } else {
    console.log(`Removing task: ${todos[id].getDesc()}\n with taskId: ${id}`);
    todos.splice(id, 1);
    console.log("The task has been removed from the list\n");
  }
}

getTodos(dbPath)
  .then((tabTodos) => {
    // samo getTodos wyswietla monit o operacji
    todos = tabTodos;
    // dostepne komendy
    const argv = yargs
      .command({
        command: "display",
        aliases: ["d", "print", "p"],
        desc: "displays current todo list",
        handler: () => {
          displayTodos();
        },
      })
      .command({
        command: "add taskDesc",
        aliases: ["a"],
        desc: "adds taskDesc to todo list",
        handler: (argv) => {
          addTask(argv.taskDesc);
        },
      })
      .command({
        command: "togStatus taskId",
        aliases: ["ts", "t"],
        desc:
          "toggles status (done or not) of a task.\n" +
          "taskId - number on the left on task display",
        handler: (argv) => {
          toggleTaskStatus(argv.taskId);
        },
      })
      .command({
        command: "remove taskId",
        aliases: ["rm", "r"],
        desc:
          "removes given task from the list\n" +
          "taskId - number on the left on task display",
        handler: (argv) => {
          removeTask(argv.taskId);
        },
      })
      .help()
      .alias("help", "h").argv;

    saveTodos(dbPath, todos)
      .then((feedback) => {
        console.log(feedback);
      })
      .catch((err) => {
        console.log(err);
      });
  })
  .catch((err) => {
    console.log(err);
  });
