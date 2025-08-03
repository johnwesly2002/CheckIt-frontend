import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productSlice from "./reducers/productSlice";
import categorySlice from "./reducers/categorySlice";
import cartSlice from "./reducers/cartReducer";
import authSlice from "./reducers/authSlice";
import registerSlice from "./reducers/registerSlice";
const cartItems = localStorage.getItem("cartItems")
	? JSON.parse(localStorage.getItem("cartItems"))
	: [];

const user = localStorage.getItem("auth")
	? JSON.parse(localStorage.getItem("auth"))
	: null;

const initialState = {
	auth: { user: user },
	carts: { cart: cartItems },
};

const rootreducer = combineReducers({
	products: productSlice,
	categories: categorySlice,
	carts: cartSlice,
	auth: authSlice,
	register: registerSlice,
});

const store = configureStore({
	reducer: rootreducer,
	preloadedState: initialState,
});

export default store;
