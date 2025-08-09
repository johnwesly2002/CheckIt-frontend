import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productSlice from "./reducers/productSlice";
import categorySlice from "./reducers/categorySlice";
import cartSlice from "./reducers/cartReducer";
import authSlice from "./reducers/authSlice";
import registerSlice from "./reducers/registerSlice";
import addressSlice from "./reducers/addressSlice";
import paymentSlice from "./reducers/paymentSlice";
const cartItems = localStorage.getItem("cartItems")
	? JSON.parse(localStorage.getItem("cartItems"))
	: [];

const user = localStorage.getItem("auth")
	? JSON.parse(localStorage.getItem("auth"))
	: null;

const address = localStorage.getItem("address")
	? JSON.parse(localStorage.getItem("address"))
	: [];
const selectedAddress = localStorage.getItem("selectedAddress")
	? JSON.parse(localStorage.getItem("selectedAddress"))
	: "";
const initialState = {
	auth: { user: user },
	carts: { cart: cartItems },
	address: { address: address, selectedAddress: selectedAddress },
};

const rootreducer = combineReducers({
	products: productSlice,
	categories: categorySlice,
	carts: cartSlice,
	auth: authSlice,
	register: registerSlice,
	address: addressSlice,
	payment: paymentSlice,
});

const store = configureStore({
	reducer: rootreducer,
	preloadedState: initialState,
});

export default store;
