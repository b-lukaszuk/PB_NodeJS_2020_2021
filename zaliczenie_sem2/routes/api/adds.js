"use strict";
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
    for (let anAdd of adds) {
        let field = anAdd.getField(keyOfAddObj);
        fields.push(field);
    }
    return fields;
}

function getFirstFreeId(adds) {
    let takenIds = getFieldsValues(adds, "id");
    return Math.max(...takenIds) + 1;
}

/**
 * changes inline object, like {title: "xxx", author: "yyy", etc.}
 * to object of class Add
 * @param {number} id - id of a add
 * @param {Object} obj inline postaci {title: "xxx", author: "yyy", etc.}
 * @return {Object<Add>} object of class add
 */
function objToAdd(id, obj) {
    return new Add(parseInt(id), obj.title, obj.description, obj.author,
        obj.category, obj.tags, parseInt(obj.price));
}

/**
 * adds inline object, like {title: "xxx", author: "yyy", etc.}
 * first converts it to object of class Add
 * @param {Object} obj inline object like {title: "xxx", author: "yyy"} to add
 * @param {Add[]} adds previous array of objects of class Add
 * @returns {Add[]} adds with new object added
 */
function addObjToAdds(obj, adds) {
    let result = [...adds];
    let freeId = getFirstFreeId(adds);
    result.push(objToAdd(freeId, obj));
    return result;
}

function removeAddFromAdds(id, adds) {
    let result = adds.filter((add) => { return add.id !== parseInt(id) });
    return result;
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
 * @returns {Add[]} - adds with the one looked for modified
 */
function modifyAddFields(id, fields, adds) {
    let result = [...adds];
    for (let add of result) {
        if (add.id === parseInt(id)) {
            Object.keys(fields).forEach((key) => {
                add.setField(key, fields[key]);
            });
        }
    }
    return result;
}

function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

/**
 * returns notices that satisfy condition
 * @param {string} field name of field from object of class Add
 * @param {number|string} value - to be contained in the field (see above)
 * @param {Add[]} adds array of objects of class Add to filter
 * @returns {Add[]} - filtered adds
 */
function getAddsWhereFieldContains(field, value, adds) {
    let result = [];
    for (let anAdd of adds) {
        if (typeof anAdd[field] === "string") {
            if (anAdd[field].toLocaleLowerCase().includes(
                value.toLocaleLowerCase())) {
                result.push(anAdd);
            }
        }
        if (typeof anAdd[field] === "number") {
            if (anAdd[field] === parseInt(value)) {
                result.push(anAdd);
            }
        }
        if (anAdd[field] instanceof Array) {
            let lowercasedTags = anAdd[field].map((tag) => tag.toLocaleLowerCase());
            for (let tag of lowercasedTags) {
                if (tag.includes(value.toLocaleLowerCase())) {
                    result.push(anAdd);
                    break;
                }
            }
        }
    }
    return result;
}

function isBetween(numToCompare, minIncl, maxIncl) {
    return (numToCompare >= minIncl) && (numToCompare <= maxIncl);
}

function getAddsWithPriceBetween(minIncl, maxIncl, adds) {
    return adds.filter(
        (add) => { return isBetween(add.price, minIncl, maxIncl) });
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
        if (!isEmpty(req.query)) {
            let queryField = Object.keys(req.query)[0];
            let queryValue = req.query[queryField];
            if (queryField === "price") {
                adds = getAddsWithPriceBetween(...queryValue, adds);
            } else {
                adds = getAddsWhereFieldContains(queryField, queryValue, adds);
            }
        }
        if (adds.length !== 0) {
            res.json(adds);
        } else {
            res.send("No adds found");
        }
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
        adds = theAdds;
        adds = getAddsWhereFieldContains("id", req.params.addId, adds)
        if (adds.length !== 0) {
            res.json(adds);
        } else {
            res
                .status(400)
                .json({ "msg": `Add of id: ${req.params.addId} not found` });
        }
    })
});

router.delete("/:addId", (req, res) => {
    getAdds(dbPath).then((theAdds) => {
        let availableIds = getFieldsValues(theAdds, "id");
        if (availableIds.includes(parseInt(req.params.addId))) {
            adds = removeAddFromAdds(req.params.addId, adds);
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
        let availableIds = getFieldsValues(theAdds, "id");
        if (availableIds.includes(parseInt(req.params.addId))) {
            adds = theAdds;
            adds = modifyAddFields(req.params.addId, req.body, adds);
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
            adds = addObjToAdds(req.body, adds);
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
