const fs = require("fs");

// import add definition
const nt = require("../customClasses/add.js");
// class Add itself
const Add = nt.Add;

/**
 * writes down dictionary of Add objects to file
 * { "0": { "id": 0, title: "xxx1", author: "yyy1", etc. },
 * "1": {"id": 1, title: "xxx1", author: "yyy2", etc. } }
 * @param {string} path - where to write the dictionary
 * @param {Object}  dictAdds - dictionary of Add
 * @return {string} blad lub komunikat o zapisie danych do pliku (console.log())
 */
function saveAdds(path, dictAdds) {
    let adds = JSON.stringify(dictAdds);
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
