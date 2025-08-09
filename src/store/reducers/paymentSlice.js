import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	loading: false,
	paymentMethod: "Stripe",
	error: null,
};

const paymentSlice = createSlice({
	name: "payment",
	initialState: initialState,
	reducers: {
		setPaymentMethod(state, action) {
			state.paymentMethod = action.payload;
			localStorage.setItem("paymentMethod", state.paymentMethod);
		},
	},
});

export const { setPaymentMethod } = paymentSlice.actions;
export const getpaymentError = (state) => state.payment.error;
export const getpaymentLoading = (state) => state.payment.loading;

export default paymentSlice.reducer;
