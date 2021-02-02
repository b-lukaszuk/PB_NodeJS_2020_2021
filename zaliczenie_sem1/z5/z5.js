// import node modules
const ps = require("process");

// import my modules
const userModule = require("./user.js");
const userAlbums = require("./albums.js");
const albumPhotos = require("./albumPhotos.js");

// get functions from my modules
const getUsrEmail = userModule.getUsrEmail;
const getUsrAlbums = userAlbums.getUsrAlbums;
const getAlbumPhotos = albumPhotos.getAlbumPhotos;

/**
 * przyjmuje najlepiej liczbe, ew string do konwersji
 * jesli skonwertuje poprawnie to zwraca ta liczbe
 * jesli nie to zwraca wartosc domyslna (liczba)
 * @param {any} maybeDigit - cos co powinno byc liczba
 * @param {number} defaultDigit - Int do zwr jesli maybeDigit jest niepopr
 */
function correctOrDefault(maybeDigit, defaultDigit) {
  const parsedDigit = parseInt(maybeDigit);
  if (isNaN(parsedDigit) || parsedDigit <= 0) {
    return defaultDigit;
  } else {
    return parsedDigit;
  }
}

const defDigit = 2;

// argv[0] exec node-a, argv[1] sciezka tego pliku
// w razie braku wartosc domyslna
const userId = correctOrDefault(ps.argv[2], defDigit);
const albumId = correctOrDefault(ps.argv[3], defDigit);

// informacje poczatkowe dla uzytkownika
console.log("searching for:");
console.log(
  `\tuser id (if incor. or no input search for id = ${defDigit}): ${userId}`
);
console.log(
  `\talbum id: (if incor. or no input search for id = ${defDigit}): ${albumId}`
);
console.log("=====");

// 1. adres mailowy urzytkownika
getUsrEmail(userId)
  .then((response) => {
    console.log("user email: " + response);
    // 2. liczba albumow uzytkownika
    getUsrAlbums(userId)
      .then((response) => {
        console.log("No of user albums: " + response.length);
        console.log("=====");
      })
      .catch((error) => console.log(error));
    // 3. tytuly fotek z danegeo albumu
    getAlbumPhotos(albumId)
      .then((response) => console.log("Album photos:\n" + response))
      .catch((err) => console.log(err));
  })
  .catch((error) => console.log(error));

// przyklad wywolania funkcji
// > node z5.js [usrId] [albumId]
