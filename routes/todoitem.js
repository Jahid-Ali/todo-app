const express = require('express');
const router = express.Router();

// import model/collection
const todoItemModel = require("../models/todoSchema");


//create our first route -- add TODO Item in database
router.post("/api/item", async (req, res) => {
	try {
		const { item } = req.body;

		const newItem = new todoItemModel({
			item: item
		})

		// save this item in database
		const saveItem = await newItem.save();
		res.status(200).json(saveItem)
	} catch (error) {
		res.json(error);
	}
})


//create our second route -- get TODO Item in database
router.get("/api/item", async (req, res) => {
	try {
		const allTodoItem = await todoItemModel.find();
		res.status(200).json(allTodoItem)
	} catch (error) {
		res.json(error);
	}
})


//create our third route -- update TODO Item in database
router.put("/api/item/:id", async (req, res) => {
	try {
		// find the item by it's id and update its
		const updateItem = await todoItemModel.findByIdAndUpdate(req.params.id, { $set: req.body });
		res.status(200).json("Update Item Successfully!")
	} catch (error) {
		res.json(error);
	}
})


//create our fourth route -- delete TODO Item in database
router.delete("/api/item/:id", async (req, res) => {
	try {
		// find the item by it's id and delete its
		const deleteItem = await todoItemModel.findByIdAndDelete(req.params.id);
		res.status(200).json("Deleted Item Successfully!")
	} catch (error) {
		res.json(error);
	}
})


module.exports = router;