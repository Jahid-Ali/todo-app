const mongoose = require("mongoose");
//secure
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const DATABASE = process.env.DATABASE;

mongoose.connect(DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("database connection successfull");
}).catch((err) => {
    console.log("error connecting", err);
})
