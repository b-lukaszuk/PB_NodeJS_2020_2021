const express = require("express");
const app = express();
const PORT = 4700;
const fs = require("fs");
const path = require("path");

function getFileName(path) {
    let parts = path.split("/");
    return parts[parts.length - 1];
}


// const myMid = (req, res, next) => {
//     const pathToFile = path.join(__dirname, req.originalUrl);
//     // if pathToFile === "" then the main page
//     if (getFileName(req.originalUrl) !== "" && fs.existsSync(pathToFile)) {
//         express.static(pathToFile);
//     } else {
//         next();
//     }
// }

// app.use(myMid);
app.use(express.static("./"));

app.get("/", (req, res) => {
    res.send("The main page");
})

app.get("/:filename", (req, res) => {
    res.send(`The file: ${req.params.filename} does not exist`);
})

app.listen(PORT, () => {
    console.log(`Server started at: localhost://${PORT}`);
})
