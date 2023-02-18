import Cart from "../models/Cart.js";

export async function getCartByUsername(req, res, next) {
	const { username } = req.params;

	try {
		const cart = await Cart.findOne({ username });
		if (!cart) {
			const c = await Cart.create({ username });
			return res.status(200).json(c);
		}
		return res.status(200).json(cart);
	} catch (error) {
		res.status(500).send("internal server Error");
	}
}

export async function addToCartHandler(req, res, next) {
	try {
		// console.log("function called");
		const prevCart = await Cart.findOne({ username: req.body.username });

		// console.log(prevCart);

		if (!prevCart) {
			const savedCart = await Cart.create(req.body);
			return res.status(200).json({ msg: "Items updated in the cart" });
		}
		// console.log("Previous", req.body.cartItems);

		// console.log("Current", req.body.cartItems);
		prevCart.cartItems = [];
		prevCart.cartItems.push(...req.body.cartItems);

		const resp = await prevCart.save();

		return res.status(200).json({ msg: "Items updated in the cart" });
	} catch (error) {
		console.log(error.message);
		return res.status(500).send("internal server error");
	}
}
