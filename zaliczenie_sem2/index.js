//////////////////////////////////////////////////////////////////////////////
//                                  imports                                  //
///////////////////////////////////////////////////////////////////////////////
const express = require("express");
const app = express();

// read notices
const getNotices = require("./readWriteNotices/readNotices.js").getNotices;

const Notice = require("./customClasses/notice.js").Notice;

// write notices
const saveNotices = require("./readWriteNotices/writeNotices.js").saveNotices;


///////////////////////////////////////////////////////////////////////////////
//                         global constants/variables                        //
///////////////////////////////////////////////////////////////////////////////
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({ path: "./sample.env" });
}
const PORT = process.env.PORT || 4701;
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

function removeNoticeFromNotices(id, notices) {
    delete notices[id];
}

/**
 * @param {Object} fields - fields to replace in the object of id, like:
 * {"author": "ala", "title": "ma kota"}
 */
function modifyNoticeFields(id, fields, notices) {
    let noticeToModify = notices[id];

    Object.keys(fields).forEach((key) => {
        noticeToModify.setField(key, fields[key]);
    });
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

app.get("/notices", (req, res) => {
    getNotices(dbPath).then((theNotices) => {
        notices = theNotices;
        res.json(notices);
    })
});

app.get("/notices/:noticeId", (req, res) => {
    getNotices(dbPath).then((theNotices) => {
        let notice = theNotices[req.params.noticeId];
        if (notice !== undefined) {
            res.json(notice);
        } else {
            res
                .status(400)
                .json({ "msg": `Notice of id: ${req.params.noticeId} not found` });
        }
    })
});

app.delete("/notices/:noticeId", (req, res) => {
    getNotices(dbPath).then((tabNotices) => {
        let notice = tabNotices[req.params.noticeId];
        if (notice !== undefined) {
            removeNoticeFromNotices(req.params.noticeId, notices);
            saveNotices(dbPath, notices);
            res
                .status(200)
                .json({ "msg": `Notice of id: ${req.params.noticeId} deleted` });
        } else {
            res
                .status(400)
                .json({ "msg": `Notice of id: ${req.params.noticeId} not found` });
        }
    })
});

app.patch("/notices/:noticeId", (req, res) => {
    getNotices(dbPath).then((theNotices) => {
        notices = theNotices;
        let notice = theNotices[req.params.noticeId];
        if (notice !== undefined) {
            modifyNoticeFields(req.params.noticeId, req.body, notices);
            saveNotices(dbPath, notices);
            res
                .status(200)
                .json({ "msg": `Notice ${req.params.noticeId} was modified` });
        } else {
            res
                .status(400)
                .json({ "msg": `Notice of id: ${req.params.noticeId} not found` });
        }
    })
});

app.post("/notices/add", (req, res) => {
    getNotices(dbPath).then((theNotices) => {
        notices = theNotices;
        addNotice(req.body, notices);
        saveNotices(dbPath, notices);
    })
    res
        .status(201)
        .json({ "msg": "posted object has been added to the database" });
});

app.listen(PORT, () => {
    console.log(`Server started on port localhost://${PORT}`);
})
