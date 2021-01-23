const fs = require("fs");

// import modulu z definicja klasy Todo
const td = require("./todoItem.js");
// sama klasa Todo
const Todo = td.Todo;

/**
 * zamienia tablice obiektow klasy Todo na obiekt obiektow klasy Todo
 * @param {Array<Todo>} tabTodos tablica obiektow klasy Todo
 * @return {Object} obiekt z obiektami klasy todo w srodku, np.
 * { 0: { taskDesc: "make dinner", done: false },
 * 1: { taskDesc: "enjoy life", done: true } }
 */
function tabTodosToObjTodos(tabTodos) {
  let obTodos = {};
  for (let i = 0; i < tabTodos.length; i++) {
    obTodos[i] = tabTodos[i];
  }
  return obTodos;
}

/**
 * zapisuje tablice obiektow klasy Todo do pliku JSON
 * po zapisaniu tablica ta przyjmuje postac
 * { "0": { "taskDesc": "make dinner", "done": false },
 * "1": { "taskDesc": "enjoy life", "done": true } }
 * @param {Array<Todo>} tabTodos tablica obiektow klasy Todo
 * @return {string} blad lub komunikat o zapisie danych do pliku
 */
function saveTodos(path, tabTodos) {
  let todos = tabTodosToObjTodos(tabTodos);
  todos = JSON.stringify(todos);
  return new Promise((resolve, reject) => {
    fs.writeFile(path, todos, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve("\nData saved to file: " + path);
      }
    });
  });
}

module.exports = { saveTodos: saveTodos };
