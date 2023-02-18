import Restaurant from "../models/Restaurant.js";

export async function getAllRestaurant(req, res, next) {
	const filters = req.query;

	try {
		const restaurants = await Restaurant.find().sort({
			[filters._sort]: filters._order,
		});
		return res.status(200).json(restaurants);
	} catch (error) {
		return res.status(500).send("Internal Server Error");
	}
}

export async function getRestaurantById(req, res, next) {
	try {
		const restaurant = await Restaurant.findById(req.params.restaurantId);
		return res.status(200).json(restaurant);
	} catch (error) {
		return res.status(500).send("Internal Server Error");
	}
}

export async function addRestaurant(req, res, next) {
	const restaurant = new Restaurant(req.body);

	try {
		const savedRestaurant = await restaurant.save();
		return res.status(200).json({ msg: "Restaurant created Successfully" });
	} catch (error) {
		return res.status(500).send("Internal Server Error");
	}
}

export async function updateRestaurant(req, res, next) {
	const restaurantID = req.params.id.substring(10, req.params.id.length - 2);

	try {
		const restaurant = await Restaurant.findById(restaurantID);

		restaurant.menu.push(req.body);

		restaurant.save();

		res.status(200).json({ msg: "restaurant updated Successfully" });
	} catch (error) {
		console.log(error.message);
		res.status(500).send("Internal server Error");
	}
}
