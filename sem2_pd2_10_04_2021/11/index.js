///////////////////////////////////////////////////////////////////////////////
//                                  imports                                  //
///////////////////////////////////////////////////////////////////////////////
const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const axios = require("axios");


///////////////////////////////////////////////////////////////////////////////
//                         global constants/variables                        //
///////////////////////////////////////////////////////////////////////////////
const port = 4700;
let logsPath = path.join(__dirname, "logs/",
    "logs_" + todayDate() + ".txt");
const dbUrl = "https://jsonplaceholder.typicode.com/users/";


///////////////////////////////////////////////////////////////////////////////
//                              helper functions                             //
///////////////////////////////////////////////////////////////////////////////
/**
 * returns string, appropriate todays date format for logsPath
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
}

function addToLogs(message, logsPath) {
    fs.appendFile(logsPath, message, "utf8", (err) => {
        if (err) {
            throw err;
        } else {
            console.log("log saved");
        }
    });
}


///////////////////////////////////////////////////////////////////////////////
//                                 middleware                                //
///////////////////////////////////////////////////////////////////////////////
const myMid = (req, res, next) => {
    let reqReceivedTime = new Date().toLocaleTimeString();
    let logMsg = `Request received: ${reqReceivedTime}\n`
    addToLogs(logMsg, logsPath);
    next();
}

///////////////////////////////////////////////////////////////////////////////
//                             program execution                             //
///////////////////////////////////////////////////////////////////////////////
app.use(myMid);

app.get("/", (req, res) => {
    res.send("The main page");
})

app.get("/users/:userId", (req, res) => {
    axios.get(dbUrl + req.params.userId)
        .then((response) => {
            res.json(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
})

app.listen(port, () => {
    console.log(`Server started at: localhost://${port}`);
})
