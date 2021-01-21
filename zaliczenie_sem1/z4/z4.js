const fs = require("fs");
const request = require("request");
const util = require("util");
const requestPromisified = util.promisify(request);

const initFile = "./data.json";
const urlApi = "http://numbersapi.com/";

// obiekt 2 pola, number i filename
const fileContent = JSON.parse(fs.readFileSync(initFile));
// by default the file contains the number 42, i.e.
// the Answer to the Ultimate Question of Life, The Universe, and Everything
const numberToAsk = fileContent.number;
const outputFile = fileContent.filename;

requestPromisified(urlApi + numberToAsk)
  .then(({ body, statusCode }) => {
    if (statusCode === 200) {
      console.log("The request has succeeded.\nData were obtained via network");
      // body jest stringiem
      fs.writeFile(outputFile, body, (err) => {
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
