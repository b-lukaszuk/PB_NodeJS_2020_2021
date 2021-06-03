///////////////////////////////////////////////////////////////////////////////
//                                  imports                                  //
///////////////////////////////////////////////////////////////////////////////
const express = require("express");
const app = express();


///////////////////////////////////////////////////////////////////////////////
//                         global constants/variables                        //
///////////////////////////////////////////////////////////////////////////////
const PORT = process.env.PORT || 4700;


///////////////////////////////////////////////////////////////////////////////
//                                 functions                                 //
///////////////////////////////////////////////////////////////////////////////
/**
 * returns string, date and time
 * my locale is english-US, may not work with other locales
 * @returns {string} string in format "day month year hh:mm:ss"
 */
function nowDateTime() {
    let now = new Date().toUTCString();
    let [garbage1, day, month, year, time, garbage2] = now.split(" ");
    let result = `${day} ${month} ${year} ${time}`;
    return result;
}


///////////////////////////////////////////////////////////////////////////////
//                             program execution                             //
///////////////////////////////////////////////////////////////////////////////
app.get("/", (req, res) => {
    res.send("Hello there!");
});

app.get("/heartbeat", (req, res) => {
    res.send(nowDateTime());
});

app.listen(PORT, () => {
    console.log(`Server started at: localhost://${PORT}`);
})
