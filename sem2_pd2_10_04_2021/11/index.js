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
            // nothing to do here
        }
    });
}

///////////////////////////////////////////////////////////////////////////////
//                             program execution                             //
///////////////////////////////////////////////////////////////////////////////
app.get("/", (req, res) => {
    res.send("The main page");
})

app.get("/users/:userId", (req, res, next) => {
    axios.get(dbUrl + req.params.userId)
        .then((response) => {
            res.status(200);
            // https://www.geeksforgeeks.org/express-js-res-json-function/
            res.json(response.data);
        })
        .catch((error) => {
            console.log("An error ocurred. Details to be found in a log file");
            next(error);
        })
})

// required middleware with error handling
app.use((error, req, res, next) => {
    addToLogs(`${new Date().toTimeString()}: `, logsPath);
    let msg = error.config.url + " => statusCode: " + error.response.status;
    addToLogs(msg + "\n\n", logsPath);
    return res.status(error.response.status).json({
        error: {
            nonTechnicalDescription: "An error occured. Sorry",
            technicalDetails:
            {
                url: error.config.url,
                code: error.response.status,
                textDescription: error.response.statusText
            }
        }
    });
});

app.listen(port, () => {
    console.log(`Server started at: localhost://${port}`);
})
