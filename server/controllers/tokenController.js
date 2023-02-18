import jwt from "jsonwebtoken";

export function verifyToken(req, res, next) {
	const cookies = req.cookies;

	const token = cookies.accessToken;

	if (!token) return res.status(402).send("You are not authenticated");

	const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

	if (!verified) return res.status(402).send("Your Token is Expired");

	return next();
}
