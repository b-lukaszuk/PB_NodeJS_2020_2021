const colors = require("colors");
// https://nodejs.org/api/readline.html
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(
  "Hello user\n" +
    "Please type your text below and" +
    "I will color it for you:\n",
  (answer) => {
    console.log(answer.rainbow);
    console.log("All done. See above\nGoodbye :)");
    rl.close();
  }
);

// przykladowe wywolanie z bash-a:
// > node main.js

// kolejno wyswietla na ekranie

// Hello user
// Please type your text below and I will color it for you:
// USER TYPES HIS/HERS TEXT HERE
// COLORED TEXT OF THE USER (RAINBOW STYLE)
// All done. See above.
// Goodbye :)
