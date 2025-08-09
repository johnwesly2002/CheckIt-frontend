import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../api/api";

const initialState = {
	loading: false,
	user: null,
	error: null,
};

export const authenticateUser = createAsyncThunk(
	"auth/signin",
	async (payload) => {
		try {
			const response = await api.post("/auth/signin", payload);
			return response;
		} catch (error) {
			throw new Error("Error Occured while Signing in user.");
		}
	}
);

const authSlice = createSlice({
	name: "auth",
	initialState: initialState,
	reducers: {
		LogoutUser(state, action) {
			localStorage.removeItem("auth");
			localStorage.removeItem("address");
			localStorage.removeItem("selectedAddress");
			localStorage.removeItem("clientSecret");
			localStorage.removeItem("cartItems");
			state.user = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(authenticateUser.pending, (state, action) => {
				state.loading = true;
			})
			.addCase(authenticateUser.fulfilled, (state, action) => {
				state.loading = false;
				state.user = action.payload.data;
				state.error = null;
				localStorage.setItem("auth", JSON.stringify(action.payload.data));
			})
			.addCase(authenticateUser.rejected, (state, action) => {
				state.loading = false;
				state.error =
					action.payload.error.message ||
					"Error Occured while authenticating user...";
			});
	},
});

export const getCurrentUser = (state) => state.auth.user;
export const getAuthLoading = (state) => state.auth.loading;
export const getAuthError = (state) => state.auth.error;

export const { LogoutUser } = authSlice.actions;

export default authSlice.reducer;
