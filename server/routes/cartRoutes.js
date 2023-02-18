import express from "express";
import {
	addToCartHandler,
	getCartByUsername,
} from "../controllers/cartController.js";
import { verifyToken } from "../controllers/tokenController.js";

const router = express.Router();

router.post("/", verifyToken, addToCartHandler);
router.get("/:username", verifyToken, getCartByUsername);

export default router;
