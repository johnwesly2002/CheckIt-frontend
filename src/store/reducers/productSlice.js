import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../api/api";
export const fetchProducts = createAsyncThunk(
	"public/getAllProducts",
	async (queryString) => {
		try {
			const response = await api.get(`/public/products?${queryString}`);
			return response.data;
		} catch (error) {
			throw new Error("Error while Fetching Products");
		}
	}
);

const initialState = {
	products: [],
	loading: false,
	error: null,
	pagination: {},
};

const productSlice = createSlice({
	name: "products",
	initialState: initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchProducts.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchProducts.fulfilled, (state, action) => {
				state.loading = false;
				state.products = action.payload.content;
				state.pagination = {
					pageNumber: action.payload.pageNumber,
					pageSize: action.payload.pageSize,
					totalElements: action.payload.totalElements,
					totalPages: action.payload.totalPages,
					lastPage: action.payload.lastPage,
				};
				state.error = null;
			})
			.addCase(fetchProducts.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || "Error while Fetching products";
			});
	},
});

export const getAllProducts = (state) => state.products.products;
export const getProductLoading = (state) => state.products.loading;
export const getProductError = (state) => state.products.error;
export const getPagination = (state) => state.products.pagination;
export default productSlice.reducer;
