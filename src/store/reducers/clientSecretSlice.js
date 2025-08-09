import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../api/api";

export const fetchClientSecret = createAsyncThunk(
	"orders/clientSecret",
	async (payload) => {
		try {
			console.log(payload);
			const response = await api.post("/order/stripe-client-secret", payload);
			console.log(response);
			return response.data;
		} catch (error) {
			throw new Error("Error while Fetching client details...");
		}
	}
);

const initialState = {
	loading: false,
	clientSecret: null,
	error: null,
};

const clientSecretSlice = createSlice({
	name: "clientSecret",
	initialState: initialState,
	reducers: {
		removeClientSecret(state, action) {
			state.clientSecret = null;
			localStorage.removeItem("clientSecret");
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchClientSecret.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchClientSecret.fulfilled, (state, action) => {
				state.loading = false;
				state.clientSecret = action.payload;
				state.error = null;
				localStorage.setItem(
					"clientSecret",
					JSON.stringify(state.clientSecret)
				);
			})
			.addCase(fetchClientSecret.rejected, (state, action) => {
				state.loading = false;
				state.error = "Error while Fetching client details...";
			});
	},
});

const getClientSecret = (state) => state.clientSecret.clientSecret;
const getloading = (state) => state.clientSecret.loading;
const geterror = (state) => state.clientSecret.error;

export const { removeClientSecret } = clientSecretSlice.actions;

export default clientSecretSlice.reducer;
