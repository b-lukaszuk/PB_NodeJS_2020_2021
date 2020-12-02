///////////////////////////////////////////////////////////////////////////////
//                                 zadanie 7                                 //
///////////////////////////////////////////////////////////////////////////////
// 7. Modyfikacja aplikacji z zadania 6 tak, by stworzone funkcje
// wywoływały funkcję `callback` podaną jako 3 parametr. Wynik
// powinien być przekazany jako parametr wywołania funkcji `callback`,
// przykład:

// function add(a, b, callback) {
// 	const result = ...;

// 	callback(result);
// }

// wywolanie:

// add(2, 4, function someCallback(wynik) {
// 	console.log(wynik)
// })

// przypomnienie:
// z6: stworz kalkulator wprowadzonych danych
// z6: biblioteka (yargs)
// z6: przyklad wywolania
// z6: > node app.js --a=5 --b=7 --operator=*

//// niejasnosci ////
// hmm, wywolanie jest troche dziwne, musi przeciez byc
// node app.js argumenty
// chyba ze chodzi o wywolanie w pliku app.js (tak zaloze)
// jaka to ma byc funkcja callback (sam mam sobie wybrac) (tak zrobie)
// czy ma byc zawsze taka sama, czy ma byc podana przy wywolaniu z bash-a
// rozumiem, ze chodzi tylko o to by pocwiczyc wywolywanie callback-ow

const yargs = require("yargs");
const args = yargs.argv;

console.log(args);

const a = args.a;
const b = args.b;
const operator = args.operator;

// callback fn
function addDeclar(numer) {
  return "Twoj wynik to: " + numer;
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

// zakladam, ze chodzilo o cos takiego
console.log(mathFuns[operator](a, b, addDeclar));
