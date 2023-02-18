import connectDB from "./database/connection.js";
import express, { urlencoded } from "express";
import cors from "cors";
import userRouter from "./routes/userRoutes.js";
import restaurantRouter from "./routes/restaurantRoutes.js";
import dishRouter from "./routes/dishesRoutes.js";
import cartRouter from "./routes/cartRoutes.js";

import cookieParser from "cookie-parser";

const app = express();

//middlewares
app.use(cors({ credentials: true, origin: true }));
app.use(cookieParser());
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "http://localhost:5173");
	res.header("Access-Control-Allow-Credentials", true);
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	next();
});

app.use("/users", userRouter);
app.use("/restaurants", restaurantRouter);
app.use("/dishes", dishRouter);
app.use("/cart", cartRouter);

const PORT = process.argv[2] || 8080;

app.listen(PORT, () => {
	console.log("Server running at port", PORT);
	connectDB();
});
