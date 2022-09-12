const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const PORT = process.env.PORT || 5000

const app = express();
app.use(cors());


// import database
require("./db/connect");
// import model/collection
require("./models/todoSchema");


//use express.json() to get data into json format 
app.use(express.json());

// import routes
app.use(require("./routes/todoitem"));



// HEROKU 

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"))

    const path = require('path')
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

app.listen(PORT, () => {
    console.log(`server running at http://localhost:${PORT}`);
})