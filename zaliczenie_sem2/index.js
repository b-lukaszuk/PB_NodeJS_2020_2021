///////////////////////////////////////////////////////////////////////////////
//                                  imports                                  //
///////////////////////////////////////////////////////////////////////////////
const express = require("express");
const app = express();

const rn = require("./readWriteNotices/readNotices.js");
const getNotices = rn.getNotices;
const nt = require("./customClasses/notice.js");
const Notice = nt.Notice;


///////////////////////////////////////////////////////////////////////////////
//                         global constants/variables                        //
///////////////////////////////////////////////////////////////////////////////
const PORT = process.env.PORT || 4700;
const dbPath = "./noticesDb/notices.json";

let notices = [];


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

app.get("/notices", (req, res) => {
    getNotices(dbPath).then((tabNotices) => {
        notices = tabNotices;
        res.send(notices);
    })
});

app.get("/notices/:noticeId", (req, res) => {
    getNotices(dbPath).then((tabNotices) => {
        notices = tabNotices;
        let notice = notices[req.params.noticeId];
        if (notice === undefined) {
            res.status(404);
            res.send(`No announcement with id: ${req.params.noticeId}`);
        } else {
            res.send(notices[req.params.noticeId]);
        }
    })
});

app.listen(PORT, () => {
    console.log(`Server started at: localhost://${PORT}`);
})
