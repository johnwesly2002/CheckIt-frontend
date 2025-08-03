import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../api/api";

export const fetchCategories = createAsyncThunk(
	"public/categories",
	async () => {
		try {
			const response = await api.get("/public/categories");
			return response.data.content;
		} catch (error) {
			throw new Error("Error while Fetching Categories");
		}
	}
);

const initialState = {
	categories: [],
	loading: false,
	error: null,
	pagination: {},
};

const categorySlice = createSlice({
	name: "category",
	initialState: initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchCategories.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchCategories.fulfilled, (state, action) => {
				state.loading = false;
				state.categories = action.payload;
				state.error = null;
			})
			.addCase(fetchCategories.rejected, (state, action) => {
				state.loading = false;
				state.error =
					action.error.message || "Error while fetching categories!!!";
			});
	},
});

export const getAllCategories = (state) => state.categories.categories;
export const getCategoryLoading = (state) => state.categories.loading;
export const getCategoryError = (state) => state.categories.error;
export const getCategoryPagination = (state) => state.categories.pagination;

export default categorySlice.reducer;
