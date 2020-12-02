///////////////////////////////////////////////////////////////////////////////
//                                 zadanie 10                                //
///////////////////////////////////////////////////////////////////////////////
// 10. Modyfikacja zadanie 9 tak aby zapisać nasze przywitanie do
// pliku używając funkcji `writeFile`.

const os = require("os");
const fs = require("fs");

const nazwa_pliku = "powitanie.txt";

function zapiszPowitDoPliku(n_pliku = nazwa_pliku) {
  fs.writeFile(n_pliku, "Witaj " + os.userInfo().username, (err) => {
    if (err) {
      console.log("blad przy zapisie powitania do pliku " + n_pliku);
    } else {
      console.log("zapisano powitanie uzytkownika do pliku " + n_pliku);
    }
  });
}

console.log("uruchomiono program wynik ukaze sie za 5 sekund");

setTimeout(zapiszPowitDoPliku, 5000);
