import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../api/api";
import { removeClientSecret } from "./clientSecretSlice";
import { removeUserCart } from "./cartReducer";

const initialState = {
	loading: false,
	error: false,
	message: "",
};

export const stripeConfirmPayment = createAsyncThunk(
	"/order/confirm-payment",
	async (payload, { dispatch }) => {
		try {
			console.log(payload);
			const response = await api.post("/order/users/payments/online", payload);
			console.log("API call success", response.data);
			dispatch(removeClientSecret());
			console.log("removeClientSecret dispatched");
			dispatch(removeUserCart());
			console.log("removeUserCart dispatched");
			return response.data;
		} catch (err) {
			throw new Error("Error while confirming the payment.");
		}
	}
);

const stripeSlice = createSlice({
	name: "stripe",
	initialState: initialState,
	extraReducers: (builder) => {
		builder
			.addCase(stripeConfirmPayment.pending, (state) => {
				state.loading = true;
			})
			.addCase(stripeConfirmPayment.fulfilled, (state, action) => {
				state.loading = false;
				state.error = null;
			})
			.addCase(stripeConfirmPayment.rejected, (state, action) => {
				state.loading = false;
				state.error = "Error while Confirm payment from stripe.";
			});
	},
});

export const getStripeloading = (state) => state.stripe.loading;
export const getStripeError = (state) => state.stripe.error;

export default stripeSlice.reducer;
