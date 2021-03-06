// https://nodejs.org/api/index.html
const fs = require("fs");

// z dokumentacji wynika, ze bede potrzebowal:
// stats.birthtimeMs
// stats.mtimeMs
// stats.size
// odpowiednio do: file creation time, file modification time, file size

// rowniez z dokumentacji
// Objects returned from fs.stat(), fs.lstat() and fs.fstat() and
// their synchronous counterparts are of this type.

// z dokumentacji wynika, ze mamy 2 zmienne __dirname i __filename
// do zwrotu nazwy folderu w ktorym jest plik i samego pliku

fs.stat(__filename, (err, stats) => {
  if (err) {
    console.log("Error! Please check file path");
  } else {
    // __filename to absolute path (przytniemy ja troche aby lepiej wygladalo)
    // prosty regex wyprobowany w: https://regex101.com/
    // pisany samodzielnie pod linux-a (u mnie Linux Mint),
    // moze nie obslugiwac wymyslnych nazw plikow lub sciezek z innych systemow
    console.log("File: " + __filename.replace(/^.+\/(.+)$/, "$1"));

    // systemy unixowe (linux jest unixopodobny) moga nie przechowywac
    // daty utworzenia pliku
    // https://unix.stackexchange.com/questions/20460/how-do-i-do-a-ls-and-then-sort-the-results-by-date-created
    // mozna to obejsc np. cos doinstalowujac (patrz link wyzej)
    // i wywolac z noda/JS-a komende bashowa i regexem wydobyc co sie chce
    console.log("\tcreation time: " + new Date(stats.birthtimeMs).toString());
    console.log("\tlast modified: " + new Date(stats.mtimeMs).toString());
    console.log("\tsize [Bytes]: " + stats.size);
  }
});
