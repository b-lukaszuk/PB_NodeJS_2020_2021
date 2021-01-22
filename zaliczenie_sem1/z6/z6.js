// import my modules
const rd = require("./readData.js");
const wd = require("./writeData.js");

// get functions from my modules
const getTodos = rd.getTodos;
const saveTodos = wd.saveTodos;

const dbPath = "./todoList.json";

getTodos(dbPath)
  .then((response) => {
    console.log(response);
  })
  .catch((err) => {
    console.log(err);
  });

console.log("\u2714");
console.log("\u274c");

let todos2 = {
  3: { taskDesc: "enjoy life", done: true },
  4: { taskDesc: "be happy", done: true },
};

saveTodos(dbPath, todos2)
  .then((feedback) => {
    console.log(feedback);
  })
  .catch((err) => {
    console.log(err);
  });
