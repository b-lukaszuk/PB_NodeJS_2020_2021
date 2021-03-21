"use strict";
///////////////////////////////////////////////////////////////////////////////
//                                  imports                                  //
///////////////////////////////////////////////////////////////////////////////
const http = require("http");

// moje importy
const urlUtilities = require("./utilities/urlUtilities.js");
const isQueryInUrl = urlUtilities.isQueryInUrl;
const getArgsFromUrl = urlUtilities.getArgsFromUrl;
const getArgsValsInt = urlUtilities.getArgsValsInt;
const basicMathOper = require("./utilities/basicMathOper.js");
const perfMathOper = basicMathOper.perfMathOper;
const mathOpers = basicMathOper.availableMathOpers;

///////////////////////////////////////////////////////////////////////////////
//                              global variables                             //
///////////////////////////////////////////////////////////////////////////////
const port = 4700;
const host = "localhost";
let statusCode = 200;
let headers = { "Content-type": "text/plain;charset=utf-8" };
let body = "Hello there! How can I help you!";
const reqListn = (req, res) => {
  // url typed by user
  const typedUrl = new URL(`http://${req.headers.host}${req.url}`);
  const urlArgsNames = getArgsFromUrl(typedUrl.toString());
  // jesli jest zapytanie to costam
  if (isQueryInUrl(typedUrl.toString())) {
    let results = getResOfMathOpers(mathOpers, typedUrl.toString());
    let urlArgs = getArgsFromUrl(typedUrl.toString());
    if (results.some(incorrectArrayElt)) {
      body = "your query is correct";
      statusCode = 400;
      res.writeHead(statusCode, headers);
      res.end(body); // end the connection
    } else {
      body = getDescrForMathOpers(mathOpers, urlArgsNames, results);
      res.writeHead(statusCode, headers);
      res.end(body); // end the connection
    }
  } else {
    res.writeHead(statusCode, headers);
    res.end(body); // end the connection
  }
};
const server = http.createServer(reqListn);

///////////////////////////////////////////////////////////////////////////////
//                           functions declarations                          //
///////////////////////////////////////////////////////////////////////////////
function getResOfMathOpers(mathOpers, urlString) {
  let results = [];
  if (isQueryInUrl(urlString)) {
    let urlArgs = getArgsFromUrl(urlString);
    let urlArgsNums = getArgsValsInt(urlString);
    for (let i = 0; i < mathOpers.length; i++) {
      results.push(perfMathOper(mathOpers[i], ...urlArgsNums));
    }
  }
  return results;
}

function incorrectArrayElt(elt) {
  return !isFinite(elt) || isNaN(elt);
}

function getDescrForMathOpers(mathOpers, fnArgs, fnResults) {
  let description = "";
  for (let i = 0; i < mathOpers.length; i++) {
    description +=
      "after applying " +
      mathOpers[i] +
      " to: " +
      fnArgs.toString() +
      " we get: " +
      fnResults[i] +
      "\n";
  }
  return description;
}

///////////////////////////////////////////////////////////////////////////////
//                             program execution                             //
///////////////////////////////////////////////////////////////////////////////
server.listen(port, host, () => {
  console.log(`listening on port: ${port} and host: ${host}`);
});
