///////////////////////////////////////////////////////////////////////////////
//                                  imports                                  //
///////////////////////////////////////////////////////////////////////////////
const express = require("express");
const router = express.Router();


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
//                                 api/routes                                //
///////////////////////////////////////////////////////////////////////////////
// here / stands for
// http://localhost:4700/heartbeat (see index.js where we use routes)
router.get("/", (req, res) => {
    res.send(nowDateTime());
});

module.exports = router;
