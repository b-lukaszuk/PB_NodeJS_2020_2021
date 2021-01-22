const fs = require("fs");

function saveTodos(path, todos) {
  todos = JSON.stringify(todos);
  return new Promise((resolve, reject) => {
    fs.writeFile(path, todos, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve("Data saved to file: " + path);
      }
    });
  });
}

module.exports = { saveTodos: saveTodos };
