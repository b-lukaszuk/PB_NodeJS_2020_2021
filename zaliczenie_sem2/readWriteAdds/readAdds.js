const fs = require("fs");

// Add class definition
const nt = require("../customClasses/add.js");
// the Add class itself
const Add = nt.Add;

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

/**
 * returns an array of Add objects
 * @param {Object} dbAdds database in the form of
 * { 0: { title: "xxx1", author: "yyy1", etc. },
 * 1: { title: "xxx1", author: "yyy2", etc. } }
 * @return {Object} dictionary of adds {"id1": add1, "id2": add2}
 */
function jsonToDictOfAdds(dbAdds) {
    let objAdds = {};
    Object.keys(dbAdds).forEach((key) => {
        objAdds[key] = objToAdd(key, dbAdds[key]);
    });
    return objAdds;
}

/**
 * returns an array of Add objects
 * @param {string} path - path to adds.json
 * file adds.json: content, e.g.
 * { 0: { title: "xxx1", author: "yyy1", etc. },
 * 1: { title: "xxx1", author: "yyy2", etc. } }
 * @return {Adds[]} array of objects of class Add
 */
function getAdds(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, (err, data) => {
            if (err) {
                reject(err);
            } else {
                const readData = JSON.parse(data);
                resolve(jsonToDictOfAdds(readData));
            }
        });
    });
}

module.exports = { getAdds: getAdds };
