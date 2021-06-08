"use strict";

const Add = require("../../../customClasses/add.js").Add;

/**
 * returns array of values of a given field from each of the adds (Add[])
 */
function getArrOfValues(adds, keyOfAddObj) {
    let fields = [];
    for (let anAdd of adds) {
        let field = anAdd.getField(keyOfAddObj);
        fields.push(field);
    }
    return fields;
}

function getFirstFreeId(adds) {
    let takenIds = getArrOfValues(adds, "id");
    return Math.max(...takenIds) + 1;
}

/**
 * changes inline object, like {title: "xxx", author: "yyy", etc.}
 * to object of class Add
 * @param {number} id - unique id of an add
 * @param {Object} obj inline object like {title: "xxx", author: "yyy", etc.}
 * @return {Object<Add>} object of class Add
 */
function objToAdd(id, obj) {
    return new Add(parseInt(id), obj.title, obj.description, obj.author,
        obj.category, obj.tags, parseInt(obj.price));
}

/**
 * adds (pushes) inline object, like {title: "xxx", author: "yyy", etc.}
 * first converts it to object of class Add
 * @param {Object} obj inline object {title: "xxx", etc.} to push to adds
 * @param {Add[]} adds previous array of objects of class Add
 * @returns {Add[]} array of Adds with new object pushed
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
 * returns a list of fields that are missing in object to be a full proofed Add
 * @param {Object} obj - inline object, e.g. {"author": "xxx", "title": "yyy"}
 * @returns {string[]} array of missing fields (properties)
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
 * @param {number} id - id of an Add object to be modified
 * @param {Object} fields - fields to replace in the object of id, like:
 * {"author": "ala", "title": "ma kota"}
 * @param {Add[]} adds - array of Add objects
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
 * returns Adds that satisfy a condition
 * @param {string} field name of a field from object of class Add
 * @param {number|string} value - to be contained in the field (see above)
 * @param {Add[]} adds array of objects of class Add to filter
 * @returns {Add[]} - filtered adds
 */
function getAddsWhereFieldContainsValue(field, value, adds) {
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

function isNumBetween(numToCompare, minIncl, maxIncl) {
    return (numToCompare >= minIncl) && (numToCompare <= maxIncl);
}

function getAddsWithPriceBetween(minIncl, maxIncl, adds) {
    return adds.filter(
        (add) => { return isNumBetween(add.price, minIncl, maxIncl) });
}

module.exports = {
    getArrOfValues: getArrOfValues,
    addObjToAdds: addObjToAdds,
    removeAddFromAdds: removeAddFromAdds,
    missingFieldsToBeAdd: missingFieldsToBeAdd,
    modifyAddFields: modifyAddFields,
    isEmpty: isEmpty,
    getAddsWhereFieldContainsValue: getAddsWhereFieldContainsValue,
    getAddsWithPriceBetween: getAddsWithPriceBetween,
};
