const express = require("express");
const app = express();
const port = 4700;

function pauseXms(milisecs) {
    let start = new Date();
    while ((new Date() - start) <= milisecs) {
        // nothing to do here, just wait
    }
}

const myMid = (req, res, next) => {
    let reqReceivedTime = new Date().toLocaleTimeString();
    console.log("Request received: ", reqReceivedTime);
    next();
}

app.use(myMid);

app.get("/", (req, res) => {
    res.send("The main page");
    pauseXms(1000);
    let resSendTime = new Date().toLocaleTimeString();
    console.log("Response send: ", resSendTime);
})

app.listen(port, () => {
    console.log(`Server started at: localhost://${port}`);
})
