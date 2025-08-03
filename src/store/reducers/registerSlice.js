import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/api";

const initialState = {
	loading: false,
	error: null,
};

export const registerUser = createAsyncThunk(
	"register/user",
	async (payload) => {
		try {
			const response = await api.post("/auth/signup", payload);
			console.log(response);
			return response;
		} catch (error) {
			console.log(error);
			throw new Error("Error while registering user...");
		}
	}
);

const registerSlice = createSlice({
	name: "register",
	initialState: initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(registerUser.pending, (state, action) => {
				state.loading = true;
			})
			.addCase(registerUser.fulfilled, (state, action) => {
				state.loading = false;
				state.error = null;
				toast.success("User Registered Successfully");
			})
			.addCase(registerUser.rejected, (state, action) => {
				state.loading = false;
				state.error =
					action.payload?.error?.message ||
					"Error while registering the user...";
				toast.error("Error while registering the user...");
			});
	},
});

export default registerSlice.reducer;
