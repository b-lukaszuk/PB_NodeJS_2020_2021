///////////////////////////////////////////////////////////////////////////////
//                                  imports                                  //
///////////////////////////////////////////////////////////////////////////////
const express = require("express");
const router = express.Router();

// add class
const Add = require("../../customClasses/add.js").Add;
// read adds
const getAdds = require("../../readWriteAdds/readAdds.js").getAdds;
// write adds
const saveAdds = require("../../readWriteAdds/writeAdds.js").saveAdds;


///////////////////////////////////////////////////////////////////////////////
//                         global constants/variables                        //
///////////////////////////////////////////////////////////////////////////////
let adds = [];
const dbPath = "./addsDb/adds.json";


///////////////////////////////////////////////////////////////////////////////
//                                 functions                                 //
///////////////////////////////////////////////////////////////////////////////
function getFieldsValues(adds, keyOfAddObj) {
    let fields = [];
    Object.keys(adds).forEach((key) => {
        let field = adds[key].getField(keyOfAddObj);
        fields.push(field);
    });
    return fields
}

function getFirstFreeId(adds) {
    let takenIds = getFieldsValues(adds, "id");
    return Math.max(...takenIds) + 1;
}

/**
 * changes inline object, like {title: "xxx", author: "yyy", etc.}
 * to object of class add
 * @param {number} id - id of a add
 * @param {Object} obj inline postaci {title: "xxx", author: "yyy", etc.}
 * @return {Object<Add>} object of class add
 */
function objToAdd(id, obj) {
    return new Add(parseInt(id), obj.title, obj.description, obj.author,
        obj.category, obj.tags, parseFloat(obj.price));
}

function addAdd(obj, adds) {
    let freeId = getFirstFreeId(adds);
    adds[freeId] = objToAdd(parseInt(freeId), obj);
}

function removeAddFromAdds(id, adds) {
    delete adds[id];
}

/**
 * returns a list of fields that are missing in object
 * @param {Object} obj - inline object, e.g. {"author": "xxx", "title": "yyy"}
 * @returns {retValType} retValDescription
 */
function missingFieldsToBeAdd(obj) {
    let reqFields = ["title", "description",
        "author", "category", "tags", "price"];
    let missingFields = [];
    for (let i = 0; i < reqFields.length; i++) {
        if (obj[reqFields[i]] === undefined) {
            missingFields.push(reqFields[i]);
        }
    }
    return missingFields;
}

/**
 * @param {Object} fields - fields to replace in the object of id, like:
 * {"author": "ala", "title": "ma kota"}
 */
function modifyAddFields(id, fields, adds) {
    let addToModify = adds[id];

    Object.keys(fields).forEach((key) => {
        addToModify.setField(key, fields[key]);
    });
}


///////////////////////////////////////////////////////////////////////////////
//                             adds api/routes                            //
///////////////////////////////////////////////////////////////////////////////
// get all adds
// here / stands for
// http://localhost:4700/api/adds (see index.js where we use routes)
router.get("/", (req, res) => {
    getAdds(dbPath).then((theAdds) => {
        adds = theAdds;
        res.json(adds);
    })
});

router.delete("/", (req, res) => {
    adds = [];
    saveAdds(dbPath, adds);
    res
        .status(200)
        .json({ "msg": `All adds have been deleted` });
});

router.get("/:addId", (req, res) => {
    getAdds(dbPath).then((theAdds) => {
        let add = theAdds[req.params.addId];
        if (add !== undefined) {
            res.json(add);
        } else {
            res
                .status(400)
                .json({ "msg": `Add of id: ${req.params.addId} not found` });
        }
    })
});

router.delete("/:addId", (req, res) => {
    getAdds(dbPath).then((tabAdds) => {
        let add = tabAdds[req.params.addId];
        if (add !== undefined) {
            removeAddFromAdds(req.params.addId, adds);
            saveAdds(dbPath, adds);
            res
                .status(200)
                .json({ "msg": `Add of id: ${req.params.addId} deleted` });
        } else {
            res
                .status(400)
                .json({ "msg": `Add of id: ${req.params.addId} not found` });
        }
    })
});

router.patch("/:addId", (req, res) => {
    getAdds(dbPath).then((theAdds) => {
        adds = theAdds;
        let add = theAdds[req.params.addId];
        if (add !== undefined) {
            modifyAddFields(req.params.addId, req.body, adds);
            saveAdds(dbPath, adds);
            res
                .status(200)
                .json({ "msg": `Add ${req.params.addId} was modified` });
        } else {
            res
                .status(400)
                .json({ "msg": `Add of id: ${req.params.addId} not found` });
        }
    })
});

router.post("/addNew", (req, res) => {
    getAdds(dbPath).then((theAdds) => {
        adds = theAdds;
        let missingFields = missingFieldsToBeAdd(req.body);
        if (missingFields.length === 0) {
            addAdd(req.body, adds);
            saveAdds(dbPath, adds);
            res
                .status(201)
                .json({ "msg": "posted object was added to the database" });
        } else {
            res
                .status(400)
                .json({
                    "msg": "object does not have all the required fields",
                    "missingFields": missingFields
                });
        }
    })
});

module.exports = router;
