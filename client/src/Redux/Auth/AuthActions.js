import { useToast } from "@chakra-ui/react";
import axios from "axios";
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const REGISTER = "REGISTER";
export const REGISTER_FAILED = "REGISTER_FAILED";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";

export function login(loginDetails) {
	return async function reduxThunkAction(dispatch, getState) {
		const { data } = await axios.get(`https://swiggy-api.glitch.me/users`);
		// console.log("users from the server -> ", data);
		if (data.length > 0) {
			const curUser = data.filter((user) => user.phn === loginDetails.phn);

			// console.log("This is the result of matched User -> ", curUser);

			if (curUser.length === 0) {
				dispatch({
					type: LOGIN_FAILED,
					payload: { error: "User Does not Exist." },
				});
			} else {
				if (curUser[0].password !== loginDetails.password) {
					dispatch({
						type: LOGIN_FAILED,
						payload: { error: "Phone Number or Password is not correct." },
					});
				} else {
					dispatch({
						type: LOGIN_SUCCESS,
						payload: { name: curUser[0].name, username: curUser[0].username },
					});
				}
			}
		} else {
			dispatch({
				type: LOGIN_FAILED,
				payload: { error: "User Does not Exist." },
			});
		}
	};
}

// export function login(payload) {
// 	return {
// 		type: LOGIN,
// 		payload,
// 	};
// }

export function logout(payload) {
	return {
		type: LOGOUT,
		payload,
	};
}

// export function register(payload) {
// 	return {
// 		type: REGISTER,
// 		payload,
// 	};
// }

export function register(registerDetails) {
	return async function reduxThunkAction(dispatch, getState) {
		dispatch({ type: REGISTER_REQUEST });

		const { data } = await axios.get(`https://swiggy-api.glitch.me/users`);

		if (data.length > 0) {
			const curUser = data.filter(
				(user) =>
					user.phn === registerDetails.phn ||
					user.username === registerDetails.username
			);

			if (curUser.length === 0) {
				const resp = await axios.post(
					`https://swiggy-api.glitch.me/users`,
					registerDetails
				);

				if (resp.status === 201) {
					dispatch({
						type: REGISTER_SUCCESS,
						payload: { registerStatus: resp.status },
					});
				} else
					dispatch({
						type: REGISTER_FAILED,
						payload: {
							registerStatus: resp.status,
							error: "Could Not Register, Try again after some time.",
						},
					});
			} else {
				dispatch({
					type: REGISTER_FAILED,
					payload: {
						registerStatus: 401,
						error: "This Phone Number or Username is Already Registered",
					},
				});
			}
		} else {
			const resp = await axios.post(
				`https://swiggy-api.glitch.me/users`,
				registerDetails
			);

			if (resp.status === 201) {
				dispatch({
					type: REGISTER_SUCCESS,
					payload: { registerStatus: resp.status },
				});
			} else
				dispatch({
					type: REGISTER_FAILED,
					payload: {
						registerStatus: resp.status,
						error: "Could Not Register, Try again after some time.",
					},
				});
		}
	};
}
