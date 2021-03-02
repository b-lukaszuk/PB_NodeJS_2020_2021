///////////////////////////////////////////////////////////////////////////////
//                                 zadanie 9                                 //
///////////////////////////////////////////////////////////////////////////////
// 9. Stworzenie aplikacji, która wyświetli na ekranie przywitanie
// użytkownika aktualnie zalogowanego na komputerze po 5 sekundach od
// uruchomienia aplikacji.  Do wykorzystania moduł `os`, funkcja
// `userInfo()`, oraz funkcja `setTimeout()`.

const os = require("os");

console.log("uruchomiono program, wynik ukaze sie za 5 sekund");

setTimeout(() => {
  console.log("Witaj " + os.userInfo().username);
}, 5000);
