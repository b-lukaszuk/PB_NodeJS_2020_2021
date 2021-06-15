"use strict";
//////////////////////////////////////////////////////////////////////////////
//                                  imports                                  //
///////////////////////////////////////////////////////////////////////////////
const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");


///////////////////////////////////////////////////////////////////////////////
//                         global constants/variables                        //
///////////////////////////////////////////////////////////////////////////////
// in real setting ./environmentalVariables/sample.env
// should be added to .gitignore
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({ path: "./environmentalVariables/sample.env" });
}
const PORT = process.env.PORT || 4701;

const debugMode = process.argv[2] === "debug";

let getLogsPath = () => {
    return path.join(__dirname, "logs/", "logs_" + todayDate() + ".txt");
}


///////////////////////////////////////////////////////////////////////////////
//                                 functions                                 //
///////////////////////////////////////////////////////////////////////////////
function addToLogs(message, logsPath) {
    fs.appendFile(logsPath, message, "utf8", (err) => {
        if (err) {
            throw err;
        } else {
            console.log("log saved");
        }
    });
}

/**
 * returns a string, appropriate today date format for logsPath
 * my locale is english-US, may not work with other locales
 * @returns {string} string in format "day_month_year"
 */
function todayDate() {
    // returns, e.g. 24-04-2021
    // since I've got an operating system with english locale
    let today = new Date().toLocaleDateString();
    let [month, day, year, garbage] = today.split("/");
    let result = `${day}_${month}_${year}`;
    return result;
    // dawac format iso rok/miesiac/dzien
}

///////////////////////////////////////////////////////////////////////////////
//                                 middleware                                //
///////////////////////////////////////////////////////////////////////////////
// if z debugiem na zewnatrz middleware - lepsza opcja
function loggerMiddleware(req, res, next) {
    if (debugMode) {
        let reqReceivedTime = new Date().toLocaleString();
        let logMsg = `${reqReceivedTime}, http method: ` +
            `${req.method}, address: ${req.originalUrl}\n`;
        addToLogs(logMsg, getLogsPath());
    }
    next();
}

function pageNotFoundMiddleware(req, res, next) {
    res.status(404);
    next();
}

function errorHandlingMiddleware(error, req, res, next) {
    console.log(error.message); // wymagane, moze chodzilo o zapis do log.txt?
    res.status(500);
    res.json({ error: { message: error.message } });
}


///////////////////////////////////////////////////////////////////////////////
//                             program execution                             //
///////////////////////////////////////////////////////////////////////////////
app.use(loggerMiddleware);

// set static folder
app.use(express.static(path.join(__dirname, "public")));

// allowing for json post-s
app.use(express.json({ extended: true }));

// using routes
app.use("/api/adds", require("./routes/api/adds.js"));

app.use("/heartbeat", require("./routes/heartbeat.js"));

app.get("/error", (req, res) => {
    throw new Error("serwer error (generated for test purposes)");
});

app.use("*", pageNotFoundMiddleware,
    express.static(path.join(__dirname, "public/pageNotFound.html")));

app.use(errorHandlingMiddleware);

app.listen(PORT, () => {
    console.log(`Server started on port localhost://${PORT}`);
})
