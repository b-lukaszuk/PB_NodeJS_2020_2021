const fs = require("fs");

// import modulu z definicja klasy Todo
const td = require("./todoItem.js");
// sama klasa Todo
const Todo = td.Todo;

/**
 * zamienia obiekt inline/pisany z palca {taskDesc: "xxx", done: true|false}
 * na obiekt klasy Todo
 * @param {Object} obj obiekt inline postaci {taskDesc: "xxx", done: true|false}
 * @return {Object<Todo>} obiekt klasy Todo
 */
function objToTodo(obj) {
  return new Todo(obj.taskDesc, obj.done);
}

/**
 * zwraca tablice obiektow Todo, tj. {taskDesc: "xxx", done: true|false}
 * @param {Object} dbTodos baza danych formatu
 * { 0: { taskDesc: "make dinner", done: false },
 * 1: { taskDesc: "enjoy life", done: true } }
 * @return {Array<Todo>} tablica obiektow klasy Todo
 */
function jsonToTabTodos(dbTodos) {
  let tabTodos = [];
  Object.keys(dbTodos).forEach((key) => {
    tabTodos.push(objToTodo(dbTodos[key]));
  });
  return tabTodos;
}

/**
 * zwraca tablice obiektow Todo, tj. {taskDesc: "xxx", done: true|false}
 * @param {string} path - sciezka do pliku todoList.json
 * plik todoList.json przykladowa zawartosc
 * { "0": { "taskDesc": "make dinner", "done": false },
 * "1": { "taskDesc": "enjoy life", "done": true } }
 * @return {Array<Todo>} tablica obiektow klasy Todo
 */
function getTodos(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if (err) {
        reject(err);
      } else {
        const dane = JSON.parse(data);
        console.log("Todo list read from file: " + path + "\n");
        resolve(jsonToTabTodos(dane));
      }
    });
  });
}

module.exports = { getTodos: getTodos };
