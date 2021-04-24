const express = require("express");
const app = express();
const port = 4700;
const fs = require("fs");
const path = require("path");

// here localhost://4700/images/kite.svg would work
// app.use(express.static("./"));

// app.use(express.static mid);
app.use(express.static("./images"));

app.get("/", (req, res) => {
    res.send("The main page");
})

app.get("/:filename", (req, res) => {
    res.send(`The file: ${req.params.filename} does not exist`);
})

app.listen(port, () => {
    console.log(`Server started at: localhost://${port}`);
})
