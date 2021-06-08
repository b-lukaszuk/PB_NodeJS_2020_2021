"use strict";

const fs = require("fs");

// class Add
const Add = require("../customClasses/add.js").Add;

/**
 * writes down an array of Add objects to a file with the content like:
 * [ { "id": 0, title: "xxx1", author: "yyy1", etc. },
 * {"id": 1, title: "xxx1", author: "yyy2", etc. } ]
 * @param {string} path - where to write the dictionary
 * @param {Add[]}  tabAdds - array of Adds
 */
function saveAdds(path, tabAdds) {
    let adds = JSON.stringify(tabAdds);
    return new Promise((resolve, reject) => {
        fs.writeFile(path, adds, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve("\nData saved to file: " + path);
            }
        });
    });
}

module.exports = { saveAdds: saveAdds };
