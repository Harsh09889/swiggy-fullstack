import Dish from "../models/Dish.js";

export async function getAllDishes(req, res, next) {
	const filters = req.query;

	try {
		const savedDish = await Dish.find({
			...filters,
		}).sort({
			[filters._sort]: filters._order,
		});
		res.status(200).json(savedDish);
	} catch (error) {
		console.log(error.message);
		res.status(500).send("Internal server Error");
	}
}

export async function addDish(req, res, next) {
	const dish = new Dish(req.body);
	try {
		const savedDish = dish.save();
		res.status(200).json({ msg: "Dish created Successfully" });
	} catch (error) {
		console.log(error.message);
		res.status(500).send("Internal server Error");
	}
}

export async function updateDish(req, res, next) {
	const dishID = req.params.id.substring(10, req.params.id.length - 2);
	console.log("dishID is :", dishID);
	try {
		const savedDish = await Dish.findByIdAndUpdate(dishID, req.body);
		res.status(200).json({ msg: "Dish updated Successfully" });
	} catch (error) {
		console.log(error.message);
		res.status(500).send("Internal server Error");
	}
}
