import {
	legacy_createStore as createStore,
	combineReducers,
	applyMiddleware,
} from "redux";
import CartReducer from "./Cart/CartReducer";
import RestaurantReducer from "./Restaurant/RestaurantReducer";
import logger from "redux-logger";
import { AuthReducer } from "./Auth/AuthReducer";
import thunk from "redux-thunk";

const Reducer = combineReducers({
	restaurant: RestaurantReducer,
	cart: CartReducer,
	auth: AuthReducer,
});

export const store = createStore(Reducer, applyMiddleware(logger, thunk));
