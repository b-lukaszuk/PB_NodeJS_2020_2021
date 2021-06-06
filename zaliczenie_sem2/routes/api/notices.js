///////////////////////////////////////////////////////////////////////////////
//                                  imports                                  //
///////////////////////////////////////////////////////////////////////////////
const express = require("express");
const router = express.Router();

// notice class
const Notice = require("../../customClasses/notice.js").Notice;
// read notices
const getNotices = require("../../readWriteNotices/readNotices.js").getNotices;
// write notices
const saveNotices = require("../../readWriteNotices/writeNotices.js").saveNotices;


///////////////////////////////////////////////////////////////////////////////
//                         global constants/variables                        //
///////////////////////////////////////////////////////////////////////////////
let notices = [];
const dbPath = "./noticesDb/notices.json";


///////////////////////////////////////////////////////////////////////////////
//                                 functions                                 //
///////////////////////////////////////////////////////////////////////////////
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

function objFillsRequirementsOfNotice(obj) {
    let reqFields = ["title", "description",
        "author", "category", "tags", "price"];
    for (let i = 0; i < reqFields.length; i++) {
        if (obj[reqFields[i]] === undefined) {
            return false;
        }
    }
    return true;
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
//                             notices api/routes                            //
///////////////////////////////////////////////////////////////////////////////
// get all notices
// here / stands for
// http://localhost:4700/api/notices (see index.js where we use routes)
router.get("/", (req, res) => {
    getNotices(dbPath).then((theNotices) => {
        notices = theNotices;
        res.json(notices);
    })
});

router.delete("/", (req, res) => {
    notices = [];
    saveNotices(dbPath, notices);
    res
        .status(200)
        .json({ "msg": `All notices have been deleted` });
});

router.get("/:noticeId", (req, res) => {
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

router.delete("/:noticeId", (req, res) => {
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

router.patch("/:noticeId", (req, res) => {
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

router.post("/add", (req, res) => {
    getNotices(dbPath).then((theNotices) => {
        notices = theNotices;
        if (objFillsRequirementsOfNotice(req.body)) {
            addNotice(req.body, notices);
            saveNotices(dbPath, notices);
            res
                .status(201)
                .json({ "msg": "posted object has been added to the database" });
        } else {
            res
                .status(400)
                .json({ "msg": "object does not have all the required fields" });
        }
    })
});

module.exports = router;
