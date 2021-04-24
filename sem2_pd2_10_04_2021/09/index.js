const express = require("express");
const app = express();
const port = 4700;
const fs = require("fs");
const path = require("path");

app.get("/", (req, res) => {
    res.send("The main page");
})

app.listen(port, () => {
    console.log(`Server started at: localhost://${port}`);
})
