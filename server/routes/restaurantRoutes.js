import express from "express";
import {
	addRestaurant,
	getAllRestaurant,
	getRestaurantById,
	updateRestaurant,
} from "../controllers/restaurantController.js";
const router = express.Router();

router.get("/", getAllRestaurant);
router.get("/:restaurantId", getRestaurantById);
router.post("/", addRestaurant);
router.patch("/:id", updateRestaurant);

export default router;
