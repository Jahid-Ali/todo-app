const mongoose = require("mongoose");

// create Schema
const TodoSchema = new mongoose.Schema({
	item:{
		type:String,
		required:true
	}
})

// create model/collection
module.exports = mongoose.model("todo", TodoSchema);

 