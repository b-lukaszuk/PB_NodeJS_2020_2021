"use strict";
///////////////////////////////////////////////////////////////////////////////
//                                  imports                                  //
///////////////////////////////////////////////////////////////////////////////
const express = require("express");
const router = express.Router();

const utils = require("./utils/utils.js");

// functions
const readAdds = require("../../readWriteAdds/readAdds.js").getAdds;
const saveAdds = require("../../readWriteAdds/writeAdds.js").saveAdds;

const getArrOfValues = utils.getArrOfValues;
const addObjToAdds = utils.addObjToAdds;
const removeAddFromAdds = utils.removeAddFromAdds;
const missingFieldsToBeAdd = utils.missingFieldsToBeAdd;
const modifyAddFields = utils.modifyAddFields;
const isEmpty = utils.isEmpty;
const getAddsWhereFieldContainsValue = utils.getAddsWhereFieldContainsValue;
const getAddsWithPriceBetween = utils.getAddsWithPriceBetween;


///////////////////////////////////////////////////////////////////////////////
//                         global constants/variables                        //
///////////////////////////////////////////////////////////////////////////////
let adds = [];
const pathToAddsDb = "./addsDb/adds.json";

const users = ["admin", "ala", "adam"];
Object.freeze(users);


///////////////////////////////////////////////////////////////////////////////
//                                 middleware                              //
///////////////////////////////////////////////////////////////////////////////
function verifyPasswordMiddleware(req, res, next) {
    if (req.headers.password === undefined) {
        res.status(401).json({ "msg": "authorization by password required" });
    } else if (req.headers.password === "1234") {
        next();
    } else {
        res.status(401).json({ "msg": "incorrect password, try again" });
    }
}

// varifyUserMiddleware reads the adds from (pseudo)DB
async function verifyUserMiddleware(req, res, next) {
    let user = req.headers.user;
    let addId = req.params.addId;
    if (!users.includes(user)) {
        res.status(401).json({ "msg": "unknown user" });
    } else { // for known users
        adds = await readAdds(pathToAddsDb);
        // admin can remove Adds (all at once | one by one) no matter the author
        if (user === "admin") {
            next();
        } else if (addId === undefined) { // remove all Adds at once
            res.status(401)
                .json({ "msg": "only admin can delete all the Adds" });
        } else {
            let add = adds.filter((add) => {
                return add.getField("id") === parseInt(addId);
            })[0]; // Add to remove or undefined
            if (add === undefined) {
                res.status(400)
                    .json({ "msg": `Add of id: ${addId} not found` });
            } else if (add.getField("author") === user) {
                next(); // user removes their own add
            } else {
                res.status(401)
                    .json({ "msg": "you can only remove/modify own Adds" });
            }
        }
    }
}


///////////////////////////////////////////////////////////////////////////////
//                             adds api/routes                               //
///////////////////////////////////////////////////////////////////////////////
// get all adds (array of Add)
// here / stands for
// http://localhost:4700/api/adds (see index.js where we use routes)
router.get("/", (req, res) => {
    readAdds(pathToAddsDb).then((theAdds) => {
        adds = theAdds;
        if (!isEmpty(req.query)) { // handle query
            let queryField = Object.keys(req.query)[0];
            let queryValue = req.query[queryField];
            if (queryField === "price") {
                adds = getAddsWithPriceBetween(...queryValue, adds);
            } else {
                adds = getAddsWhereFieldContainsValue(queryField,
                    queryValue, adds);
            }
        }
        if (adds.length !== 0) {
            res.json(adds);
        } else {
            res.send("No adds found");
        }
    })
});

// get add of specific ID
router.get("/:addId", (req, res) => {
    readAdds(pathToAddsDb).then((theAdds) => {
        adds = theAdds;
        adds = getAddsWhereFieldContainsValue("id", req.params.addId, adds)
        if (adds.length !== 0) {
            res.json(adds);
        } else {
            res
                .status(400)
                .json({ "msg": `Add of id: ${req.params.addId} not found` });
        }
    })
});

// delete all adds - only admin can do that (see middleware)
// requires password="1234"
// varifyUserMiddleware reads the adds from (pseudo)DB
router.delete("/", verifyPasswordMiddleware,
    verifyUserMiddleware, (req, res) => {
        adds = [];
        saveAdds(pathToAddsDb, adds);
        res
            .status(200)
            .json({ "msg": `All adds have been deleted` });
    });

// delete single add, only if user === Add.author, unless the user is admin
// (see middleware)
// requires password="1234"
// varifyUserMiddleware reads the adds from (pseudo)DB
router.delete("/:addId", verifyPasswordMiddleware, verifyUserMiddleware,
    (req, res) => {
        let availableIds = getArrOfValues(adds, "id");
        if (availableIds.includes(parseInt(req.params.addId))) {
            adds = removeAddFromAdds(req.params.addId, adds);
            saveAdds(pathToAddsDb, adds);
            res
                .status(200)
                .json({ "msg": `Add of id: ${req.params.addId} deleted` });
        } else {
            res
                .status(400)
                .json({ "msg": `Add of id: ${req.params.addId} not found` });
        }
    });

// modify single add, only if user === Add.author, unless the user is admin
// (see middleware)
// requires password="1234"
// varifyUserMiddleware reads the adds from (pseudo)DB
router.patch("/:addId", verifyPasswordMiddleware, verifyUserMiddleware,
    (req, res) => {
        let availableIds = getArrOfValues(adds, "id");
        if (availableIds.includes(parseInt(req.params.addId))) {
            adds = modifyAddFields(req.params.addId, req.body, adds);
            saveAdds(pathToAddsDb, adds);
            res
                .status(200)
                .json({ "msg": `Add ${req.params.addId} was modified` });
        } else {
            res
                .status(400)
                .json({ "msg": `Add of id: ${req.params.addId} not found` });
        }
    });

// add new Add
router.post("/addNew", (req, res) => {
    readAdds(pathToAddsDb).then((theAdds) => {
        adds = theAdds;
        let missingFields = missingFieldsToBeAdd(req.body);
        if (missingFields.length === 0) {
            adds = addObjToAdds(req.body, adds);
            saveAdds(pathToAddsDb, adds);
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
