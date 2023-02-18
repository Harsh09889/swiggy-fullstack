import mongoose from "mongoose";

const userSchema = mongoose.Schema({
	name: {
		type: String,
		trim: true,
		required: true,
	},
	username: {
		type: String,
		trim: true,
		required: true,
		unique: true,
	},
	phn: {
		type: String,
		trim: true,
		required: true,
		maxlength: 10,
		unique: true,
	},
	password: {
		type: String,
		trim: true,
		required: true,
	},
});

export default mongoose.model("User", userSchema);
