import mongoose from "mongoose";

const dishSchema = new mongoose.Schema({
	category: String,
	name: String,
	image: String,
	price: Number,
	restaurant: [mongoose.SchemaTypes.ObjectId],
	veg: Boolean,
});

export default mongoose.model("Dish", dishSchema);
