import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema({
	image: { type: String, required: true },
	name: { type: String, required: true },
	discription: { type: String, required: true },
	rating: { type: Number, required: true },
	deliverTime: { type: Number, required: true },
	cheapestPrice: { type: Number, required: true },
	discount: { type: String, required: true },
	menu: [{ category: String, foodItems: [mongoose.Types.ObjectId] }],
	city: { type: String, required: true },
});

export default mongoose.model("Restaurant", restaurantSchema);
