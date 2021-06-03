const fs = require("fs");

// Notice class definition
const nt = require("../customClasses/notice.js");
// the Notice class itself
const Notice = nt.Notice;

/**
 * changes inline object, like {title: "xxx", author: "yyy", etc.}
 * to object of class notice
 * @param {number} id - id of a notice
 * @param {Object} obj inline postaci {title: "xxx", author: "yyy", etc.}
 * @return {Object<Notice>} object of class notice
 */
function objToNotice(id, obj) {
    return new Notice(parseInt(id), obj.title, obj.description, obj.author,
        obj.category, obj.tags, obj.price);
}

/**
 * returns an array of Notice objects
 * @param {Object} dbNotices database in the form of
 * { 0: { title: "xxx1", author: "yyy1", etc. },
 * 1: { title: "xxx1", author: "yyy2", etc. } }
 * @return {Object} dictionary of notices {"id1": notice1, "id2": notice2}
 */
function jsonToDictOfNotices(dbNotices) {
    let objNotices = {};
    Object.keys(dbNotices).forEach((key) => {
        objNotices[key] = objToNotice(key, dbNotices[key]);
    });
    return objNotices;
}

/**
 * returns an array of Notice objects
 * @param {string} path - path to notices.json
 * file notices.json: content, e.g.
 * { 0: { title: "xxx1", author: "yyy1", etc. },
 * 1: { title: "xxx1", author: "yyy2", etc. } }
 * @return {Notices[]} array of objects of class Notice
 */
function getNotices(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, (err, data) => {
            if (err) {
                reject(err);
            } else {
                const readData = JSON.parse(data);
                resolve(jsonToDictOfNotices(readData));
            }
        });
    });
}

module.exports = { getNotices: getNotices };
