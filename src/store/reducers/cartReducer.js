import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { api } from "../../api/api";
import { get } from "react-hook-form";
const initialState = {
	cart: [],
	loading: false,
	error: null,
	totalPrice: 0,
	cartId: null,
};

export const CreateUserCart = createAsyncThunk(
	"cart/createUserCart",
	async (payload, { dispatch }) => {
		try {
			const res = await api.post("cart/create", payload);

			await dispatch(getCart());

			return res.data;
		} catch (err) {
			throw new Error("Error Occured while creating Cart.");
		}
	}
);

const getCart = createAsyncThunk("cart/getCart", async () => {
	try {
		const res = await api.get(`/carts/users/cart`);
		return res.data;
	} catch (err) {
		throw new Error("Error while Fetching CartItems.");
	}
});

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
	extraReducers: (builder) => {
		builder
			.addCase(getCart.pending, (state) => {
				state.loading = true;
			})
			.addCase(getCart.fulfilled, (state, action) => {
				state.loading = false;
				state.error = null;
				console.log(action.payload);
				state.cart = action.payload.products;
				state.totalPrice = action.payload.totalPrice;
				state.cartId = action.payload.cartId;
				localStorage.setItem("cartItems", JSON.stringify(state.cart));
			})
			.addCase(getCart.rejected, (state) => {
				state.loading = false;
				state.error = action.payload.error;
				toast.error("Error while creating Cart.");
			});
	},
});

export const {
	addCartItem,
	increaseQuantity,
	DecreaseQuantity,
	removeCartItem,
} = cartSlice.actions;

export const getCartId = (state) => state.carts.cartId;
export const getUserCart = (state) => state.carts.cart;

export const getUserCartTotalPrice = (state) => state.carts.totalPrice;

export default cartSlice.reducer;
