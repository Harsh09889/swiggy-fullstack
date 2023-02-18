export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const UPDATE_CART = "UPDATE_CART";

export function addToCart(payload) {
	return {
		type: ADD_TO_CART,
		payload,
	};
}

export function updateCart(payload) {
	return {
		type: UPDATE_CART,
		payload,
	};
}

export function removeFromCart(payload) {
	return {
		type: REMOVE_FROM_CART,
		payload,
	};
}
