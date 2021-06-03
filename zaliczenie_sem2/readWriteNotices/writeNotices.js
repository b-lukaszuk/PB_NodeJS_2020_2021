const fs = require("fs");

// import notice definition
const nt = require("../customClasses/notice.js");
// class Notice itself
const Notice = nt.Notice;

/**
 * writes down dictionary of Notice objects to file
 * { "0": { "id": 0, title: "xxx1", author: "yyy1", etc. },
 * "1": {"id": 1, title: "xxx1", author: "yyy2", etc. } }
 * @param {string} path - where to write the dictionary
 * @param {Object}  dictNotices - dictionary of Notice
 * @return {string} blad lub komunikat o zapisie danych do pliku (console.log())
 */
function saveNotices(path, dictNotices) {
    let notices = JSON.stringify(dictNotices);
    return new Promise((resolve, reject) => {
        fs.writeFile(path, notices, (err, data) => {
            if (err) {
                reject(err);
            } else {
                console.log("\nData saved to file: " + path);
            }
        });
    });
}

module.exports = { saveNotices: saveNotices };
