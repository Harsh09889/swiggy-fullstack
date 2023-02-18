import express from "express";
import {
	addDish,
	getAllDishes,
	updateDish,
} from "../controllers/dishController.js";
const router = express.Router();

router.get("/", getAllDishes);
router.post("/", addDish);
router.patch("/:id", updateDish);

export default router;
