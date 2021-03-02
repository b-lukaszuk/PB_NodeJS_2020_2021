///////////////////////////////////////////////////////////////////////////////
//                                 zadanie 8                                 //
///////////////////////////////////////////////////////////////////////////////
// console.log("\n==zadanie 8==");

// const fs = require("fs");

// const a = parseInt(fs.readFileSync("./a.txt"));
// const b = parseInt(fs.readFileSync("./b.txt"));

// const fnTab = [["Dodawanie", (x, y) => x + y],
// 	       ["Odejmowanie", (x, y) => x - y],
// 	       ["Mnozenie", (x, y) => x * y],
// 	       ["Dzielenie", (x, y) => x / y]];

// for (let i = 0; i < fnTab.length; i++) {
//     let wiadomosc = fnTab[i][0] + " liczb " + a + " i " + b +
// 	" daje w wyniku " + fnTab[i][1](a, b) + "\n";
//     fs.appendFileSync("wynik.txt", wiadomosc);
// }

// console.log("wczytano liczby z plikow a.txt i b.txt");
// console.log("wynik dzialan mat na liczbach zapisano do pliku: wynik.txt");

///////////////////////////////////////////////////////////////////////////////
//                                 zadanie 9                                 //
///////////////////////////////////////////////////////////////////////////////
// console.log("\n==zadanie 9==");

// const ps = require("process");

// argv[0] exec node-a, argv[1] sciezka danego pliku
// if(ps.argv.length === 2) {
//     console.log("hello");
// } else {
//     console.log("hello " + ps.argv[2]);
// }

///////////////////////////////////////////////////////////////////////////////
//                                 zadanie 10                                //
///////////////////////////////////////////////////////////////////////////////
// console.log("\n==zadanie 10==");

// const fs = require("fs");
// const ps = require("process");

// argv[0] exec node-a, argv[1] sciezka danego pliku
// const a = parseInt(fs.readFileSync(ps.argv[2]));
// const b = parseInt(fs.readFileSync(ps.argv[3]));

// const fnTab = [["Dodawanie", (x, y) => x + y],
// 	       ["Odejmowanie", (x, y) => x - y],
// 	       ["Mnozenie", (x, y) => x * y],
// 	       ["Dzielenie", (x, y) => x / y]];

// for (let i = 0; i < fnTab.length; i++) {
//     let wiadomosc = fnTab[i][0] + " liczb " + a + " i " + b +
// 	" daje w wyniku " + fnTab[i][1](a, b) + "\n";
//     fs.appendFileSync("wynik.txt", wiadomosc);
// }

// console.log("wczytano liczby z plikow " + ps.argv[2] + " i " + ps.argv[3]);
// console.log("wynik dzialan mat na liczbach zapisano do pliku: wynik.txt");

///////////////////////////////////////////////////////////////////////////////
//                                 zadanie 11                                //
///////////////////////////////////////////////////////////////////////////////
// console.log("\n==zadanie 11==");

// const fs = require("fs");
// const ps = require("process");

// if (ps.argv.length < 4) {
//     console.log("zbyt malo parametrow!");
// } else if (ps.argv.length > 4) {
//     console.log("zbyt duzo parametrow!");
// } else {
//     // w JS to obiekt, ale w Pythonie slownik
//     const funDict = {"Dodawanie": (x, y) => x + y,
//                    "Odejmowanie": (x, y) => x - y,
//                    "Mnozenie": (x, y) => x * y,
//                    "Dzielenie": (x, y) => x / y};

//     // argv[0] exec node-a, argv[1] sciezka danego pliku
//     const a = parseInt(fs.readFileSync(ps.argv[2]));
//     const b = parseInt(fs.readFileSync(ps.argv[3]));

//     // Object.keys(funDict) zwraca tablice kluczy (tu: stringi)
//     for (klucz of Object.keys(funDict)) {
//     	let wiadomosc = klucz + " liczb " + a + " i " + b +
//     	    " daje w wyniku " + funDict[klucz](a, b) + "\n";
//     	fs.appendFileSync("wynik.txt", wiadomosc);
//     }

//     console.log("wczytano liczby z plikow " + ps.argv[2] + " i " +
//                 ps.argv[3]);
//     console.log("wynik dzialan mat na liczbach zapisano do pliku: wynik.txt");
// }

///////////////////////////////////////////////////////////////////////////////
//                                 zadanie 12                                //
///////////////////////////////////////////////////////////////////////////////
console.log("==zadanie 12==");

const fs = require("fs");
const ps = require("process");

// argv[0] exec node-a, argv[1] sciezka danego pliku
if (ps.argv.length < 3) {
    console.log("zbyt malo parametrow!");
} else if (ps.argv.length > 3) {
    console.log("zbyt duzo parametrow!");
} else {
    const szukFold = ps.argv[2];

    fs.readdir(szukFold, (blad, pliki) => {
	if (blad) {
	    throw "wystapil jakis blad. sprawdz sciezke do podanego folderu";
	}
	console.log("Pliki w folderze: " + ps.argv[2] + ":");
	// files object contains all files names
	// log them on console
	pliki.forEach((plik) => console.log(plik));
    });
}

