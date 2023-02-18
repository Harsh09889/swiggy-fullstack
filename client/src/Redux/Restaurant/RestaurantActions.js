export const ADD_RESTAURANT = "ADD_RESTAURANT";
export const ADD_DISHES = "ADD_DISHES";

export function addRestaurant(payload) {
	return {
		type: ADD_RESTAURANT,
		payload,
	};
}

export function addDishes(payload) {
	return {
		type: ADD_DISHES,
		payload,
	};
}
