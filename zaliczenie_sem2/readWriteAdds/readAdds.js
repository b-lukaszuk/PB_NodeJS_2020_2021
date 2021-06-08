"use strict";
const fs = require("fs");

// the Add class
const Add = require("../customClasses/add.js").Add;

/**
 * changes inline object, like {title: "xxx", author: "yyy", etc.}
 * to object of class add
 * @param {number} id - unique id of a add (assigned in adds.js)
 * @param {Object} obj inline object, like {title: "xxx", author: "yyy", etc.}
 * @return {Object<Add>} object of class Add
 */
function objToAdd(id, obj) {
    return new Add(parseInt(id), obj.title, obj.description, obj.author,
        obj.category, obj.tags, parseInt(obj.price));
}

/**
 * returns an array of Add objects
 * @param {Object[]} dbAdds database of inline objects, like:
 * [
 * { id: 1, title: "xxx1", author: "yyy1", etc. },
 * { id: 2, title: "xxx1", author: "yyy2", etc. } 
 * ] 
 * @return {Add[]} array of Adds [add1, add2, add3]
 */
function tabObjsToTabAdds(tabObjs) {
    let tabAdds = [];
    for (let obj of tabObjs) {
        tabAdds.push(objToAdd(obj.id, obj));
    }
    return tabAdds;
}

/**
 * returns an array of Add objects
 * @param {string} path - path to adds.json
 * file adds.json: content, e.g.
 * [{ id: 1, title: "xxx1", author: "yyy1", etc. },
 * { id: 2, title: "xxx1", author: "yyy2", etc. } ]
 * @return {Adds[]} array of objects of class Add
 */
function getAdds(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, (err, data) => {
            if (err) {
                reject(err);
            } else {
                const dataFromDb = JSON.parse(data);
                resolve(tabObjsToTabAdds(dataFromDb));
            }
        });
    });
}

module.exports = { getAdds: getAdds };
