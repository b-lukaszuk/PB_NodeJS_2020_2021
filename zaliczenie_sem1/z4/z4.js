const fs = require("fs");
const request = require("request");
const util = require("util");
const requestPromisified = util.promisify(request);

const initFile = "./data.json";
const urlApi = "http://numbersapi.com/";

let fileContent = "";

// obiekt 2 pola, number i filename
try {
  fileContent = JSON.parse(fs.readFileSync(initFile, { encoding: "utf-8" }));
} catch (error) {
  console.log(
    "Could not read data from file: " +
      initFile +
      "\nNo information obtained via network.\nThe program will now exit."
  );
  // zakonczenie programu (sugestia prowadzacego, aby jakos zakonczyc)
  // inaczej kod ponizej i tak sie wykona
  // (mozna zmienic initFile na nie istniejacy i
  // dac konsol loga kilka linijek nizej aby to zobaczyc)
  process.exit(1);
}

// by default the file contains the number 42, i.e.
// the Answer to the Ultimate Question of Life, The Universe, and Everything
const numberToAsk = fileContent.number;
const outputFile = fileContent.filename;

requestPromisified(urlApi + numberToAsk)
  .then(({ body, statusCode }) => {
    if (statusCode === 200) {
      console.log("The request has succeeded.\nData were obtained via network");
      // body jest stringiem
      fs.writeFile(outputFile, body, { encoding: "utf-8" }, (err) => {
        if (err) {
          console.log("An error ocurred. Data hasn't been saved");
        } else {
          console.log(
            "Data regarding number: -" +
              numberToAsk +
              "- has been saved to file: -" +
              outputFile +
              "-"
          );
        }
      });
    }
  })
  .catch((error) => console.log("An error occured"));
