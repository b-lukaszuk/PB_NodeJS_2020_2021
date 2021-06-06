const fs = require("fs");

// import add definition
const nt = require("../customClasses/add.js");
// class Add itself
const Add = nt.Add;

/**
 * writes down array of Add objects to a file with the content like:
 * [ { "id": 0, title: "xxx1", author: "yyy1", etc. },
 * {"id": 1, title: "xxx1", author: "yyy2", etc. } ]
 * @param {string} path - where to write the dictionary
 * @param {Add[]}  tabAdds - array of Add
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
