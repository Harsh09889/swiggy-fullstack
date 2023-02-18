import mongoose from "mongoose";

mongoose.set("strictQuery", true);

const connectDB = (URI = "mongodb://127.0.0.1:27017/swiggy-backend") => {
	mongoose.connect(URI);
};

mongoose.connection.addListener("connected", () => {
	console.log("Connected to Database");
});

mongoose.connection.addListener("disconnected", () => {
	console.log("Disonnected from Database");
});

export default connectDB;
