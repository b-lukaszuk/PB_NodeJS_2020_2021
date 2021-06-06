//////////////////////////////////////////////////////////////////////////////
//                                  imports                                  //
///////////////////////////////////////////////////////////////////////////////
const express = require("express");
const app = express();


///////////////////////////////////////////////////////////////////////////////
//                         global constants/variables                        //
///////////////////////////////////////////////////////////////////////////////
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({ path: "./sample.env" });
}
const PORT = process.env.PORT || 4701;


///////////////////////////////////////////////////////////////////////////////
//                                 functions                                 //
///////////////////////////////////////////////////////////////////////////////
/**
 * returns string, date and time
 * my locale is english-US, may not work with other locales
 * @returns {string} string in format "day month year hh:mm:ss"
 */
function nowDateTime() {
    let now = new Date().toUTCString();
    let [garbage1, day, month, year, time, garbage2] = now.split(" ");
    let result = `${day} ${month} ${year} ${time}`;
    return result;
}


///////////////////////////////////////////////////////////////////////////////
//                             program execution                             //
///////////////////////////////////////////////////////////////////////////////
// allowing for json post-s
app.use(express.json({ extended: true }));

// using routes
app.use("/api/notices", require("./routes/api/notices.js"));

app.get("/", (req, res) => {
    res.send("Hello there!");
});

app.get("/heartbeat", (req, res) => {
    res.send(nowDateTime());
});


app.listen(PORT, () => {
    console.log(`Server started on port localhost://${PORT}`);
})
