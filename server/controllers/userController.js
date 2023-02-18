import User from "../models/User.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export async function registerController(req, res, next) {
	const user = new User(req.body);
	try {
		const salt = await bcrypt.genSalt(10);

		const hashedPwd = await bcrypt.hash(user.password, salt);

		user.password = hashedPwd;

		const savedUser = await user.save();
		res.status(200).json({ msg: "User created Successfully" });
	} catch (error) {
		console.log(error);
		if (error.code && error.code === 11000)
			return res
				.status(400)
				.send("Username of Phone number already registered");

		return res.status(500).send("Internal Server Error");
	}
}

export async function loginController(req, res, next) {
	let user = req.body;
	try {
		const userDB = await User.findOne({ phn: user.phn });

		if (!userDB) return res.status(404).send("Mobile number not Registered");

		//compare password
		const isMatched = await bcrypt.compare(user.password, userDB.password);

		if (!isMatched)
			return res.status(404).send("Mobile Number or Password is wrong");

		const userToBeReturned = {
			username: userDB.username,
			phn: userDB.phn,
			name: userDB.name,
		};

		const token = jwt.sign(userToBeReturned, process.env.ACCESS_TOKEN_SECRET);
		const refreshToken = jwt.sign(
			userToBeReturned,
			process.env.REFRESH_TOKEN_SECRET
		);

		res.cookie("accessToken", token, {
			maxAge: 9000000,
			httpOnly: false,
			sameSite: "none",
			secure: true,
		});
		res.status(200).json(userToBeReturned);
	} catch (error) {
		console.log(error.message);
		res.status(500).send("Internal Server Error");
	}
}
