///////////////////////////////////////////////////////////////////////////////
//                                 zadanie 8                                 //
///////////////////////////////////////////////////////////////////////////////
// 8. Dodanie do poprzedniej aplikacji zapisu do pliku przy użyciu
// modułu `fs` oraz funkcji asynchronicznej `writeFile`.

const fs = require("fs");
const yargs = require("yargs");
const args = yargs.argv;

// console.log(args);

const a = args.a;
const b = args.b;
const operator = args.operator;

// callback fn
function addDeclar(liczba) {
  return "Twoj wynik to: " + liczba;
}

// funkcje w slowniku (w JS obiekt) - sposob pythonowy
let mathFuns = {
  "+": (a, b, fn) => {
    let wynik = a + b;
    return fn(wynik);
  },
  "-": (a, b, fn) => {
    let wynik = a - b;
    return fn(wynik);
  },
  "*": (a, b, fn) => {
    let wynik = a * b;
    return fn(wynik);
  },
  "/": (a, b, fn) => {
    let wynik = a / b;
    return fn(wynik);
  },
};

const nazwa_pliku = "wynik.txt";

function zapiszWynDoPliku(n_pliku = nazwa_pliku) {
  fs.writeFile(n_pliku, mathFuns[operator](a, b, addDeclar), (err) => {
    if (err) {
      console.log("blad przy zapisie");
    } else {
      console.log("zapisywanie do pliku " + n_pliku + " trwa. Prosze czekac.");
    }
  });
}

// zakladam, ze chodzilo o cos takiego
// jesli jest asynchronicznosc to: "wynik zapisano [...]" pojawi
// sie w terminalu przed "[...] Prosze czekac"
setTimeout(zapiszWynDoPliku, 1500);
console.log("wynik zapisano do pliku " + nazwa_pliku);
