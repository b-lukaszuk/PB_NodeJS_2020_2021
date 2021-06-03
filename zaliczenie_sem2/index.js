///////////////////////////////////////////////////////////////////////////////
//                                  imports                                  //
///////////////////////////////////////////////////////////////////////////////
const express = require("express");
const app = express();

// read notices
const rn = require("./readWriteNotices/readNotices.js");
const getNotices = rn.getNotices;

const nt = require("./customClasses/notice.js");
const Notice = nt.Notice;

// write notices
const wn = require("./readWriteNotices/writeNotices.js");
const saveNotices = wn.saveNotices;


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

function getFieldsValues(notices, keyOfNoticeObj) {
    let fields = [];
    Object.keys(notices).forEach((key) => {
        let field = notices[key].getField(keyOfNoticeObj);
        fields.push(field);
    });
    return fields
}

function getFirstFreeId(notices) {
    let takenIds = getFieldsValues(notices, "id");
    return Math.max(...takenIds) + 1;
}

/**
 * changes inline object, like {title: "xxx", author: "yyy", etc.}
 * to object of class notice
 * @param {number} id - id of a notice
 * @param {Object} obj inline postaci {title: "xxx", author: "yyy", etc.}
 * @return {Object<Notice>} object of class notice
 */
function objToNotice(id, obj) {
    return new Notice(parseInt(id), obj.title, obj.description, obj.author,
        obj.category, obj.tags, parseFloat(obj.price));
}

function addNotice(obj, notices) {
    let freeId = getFirstFreeId(notices);
    notices[freeId] = objToNotice(parseInt(freeId), obj);
}


///////////////////////////////////////////////////////////////////////////////
//                             program execution                             //
///////////////////////////////////////////////////////////////////////////////
// allowing for json post-s
app.use(express.json({ extended: true }));

app.get("/", (req, res) => {
    res.send("Hello there!");
});

app.get("/heartbeat", (req, res) => {
    res.send(nowDateTime());
});

app.get("/announcements", (req, res) => {
    getNotices(dbPath).then((tabNotices) => {
        notices = tabNotices;
        res.send(notices);
    })
});

app.get("/announcements/:noticeId", (req, res) => {
    getNotices(dbPath).then((tabNotices) => {
        notices = tabNotices;
        let notice = notices[req.params.noticeId];
        if (notice === undefined) {
            res.status(404);
            res.send(`Announcement #${req.params.noticeId} was not found`);
        } else {
            res.send(notices[req.params.noticeId]);
        }
    })
});

app.post("/announcements/add", (req, res) => {
    getNotices(dbPath).then((tabNotices) => {
        notices = tabNotices;
        addNotice(req.body, notices);
        saveNotices(dbPath, notices);
    })
    res.status(201).send("posted object has been added");
});

app.listen(PORT, () => {
    console.log(`Server started at: localhost://${PORT}`);
})
