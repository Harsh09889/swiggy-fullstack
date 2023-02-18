import mongoose from "mongoose";

const cartSchema = mongoose.Schema({
	username: { type: String, required: true, unique: true },
	cartItems: [
		{
			dishId: mongoose.Types.ObjectId,
			restaurantId: mongoose.Types.ObjectId,
			quantity: Number,
			price: Number,
			totalPrice: Number,
		},
	],
});

export default mongoose.model("Cart", cartSchema);
