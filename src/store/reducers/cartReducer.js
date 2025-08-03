import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
const initialState = {
	cart: [],
	loading: false,
	error: null,
	totalPrice: 0,
	cartId: null,
};

const findItemIndex = (state, action) =>
	state.cart.findIndex(
		(cartItem) => cartItem.productId == action.payload.productId
	);
export const isQntAvailable = (cartState, productsState, productId) => {
	const product = productsState.find((item) => item.productId === productId);
	if (!product) return false;
	const cartItem = cartState.find((item) => item.productId === productId);
	const cartQuantity = cartItem ? cartItem.quantity : 0;

	return cartQuantity + 1 <= product.quantity;
};

const cartSlice = createSlice({
	name: "cart",
	initialState: initialState,
	reducers: {
		addCartItem(state, action) {
			const existingItem = findItemIndex(state, action);
			if (existingItem != -1) {
				state.cart[existingItem].quantity += 1;
			} else {
				state.cart.push({ ...action.payload, quantity: 1 });
			}
			toast.success(`${action.payload?.productName} added to the cart`);
			localStorage.setItem("cartItems", JSON.stringify(state.cart));
		},
		removeCartItem(state, action) {
			const existingItem = findItemIndex(state, action);
			state.cart.splice(existingItem, 1);
			localStorage.setItem("cartItems", JSON.stringify(state.cart));
			toast.success(
				`${action.payload.productName} removed from cart successfully.`
			);
		},
		increaseQuantity(state, action) {
			const existingItem = findItemIndex(state, action);
			if (existingItem != -1) {
				state.cart[existingItem].quantity += 1;
				localStorage.setItem("cartItems", JSON.stringify(state.cart));
			} else {
				toast.error("Error occured while increase quantity in cart");
			}
		},
		DecreaseQuantity(state, action) {
			const existingItem = findItemIndex(state, action);
			state.cart[existingItem].quantity -= 1;
			if (state.cart[existingItem].quantity == 0) {
				state.cart.splice(existingItem, 1);
			}
			localStorage.setItem("cartItems", JSON.stringify(state.cart));
		},
	},
});

export const {
	addCartItem,
	increaseQuantity,
	DecreaseQuantity,
	removeCartItem,
} = cartSlice.actions;

export default cartSlice.reducer;
