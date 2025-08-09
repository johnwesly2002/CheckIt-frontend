import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { api } from "../../api/api";
const initialState = {
	addAddressloading: false,
	fetchAddressloading: false,
	address: [],
	selectedAddress: null,
	addAddresserror: null,
	fetchAddresserror: null,
};

export const fetchAddresses = createAsyncThunk(
	"address/fetchAddresses",
	async (_, thunkAPI) => {
		try {
			const res = await api.get("/addresses");
			return res;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.message);
		}
	}
);

export const addAddress = createAsyncThunk(
	"address/addAddress",
	async (address, thunkAPI) => {
		try {
			let res;
			if (address.addressId) {
				res = await api.put(`/addresses/${address.addressId}`, address.data);
			} else {
				res = await api.post("/addresses", address.data);
			}
			return res;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.message);
		}
	}
);

export const deleteUserAddress = createAsyncThunk(
	"address/deleteAddress",
	async (addressId, thunkAPI) => {
		try {
			const res = await api.delete(`/addresses/${addressId}`);
			return res;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.message);
		}
	}
);

const addressSlice = createSlice({
	name: "address",
	initialState: initialState,
	reducers: {
		selectUserAddress(state, action) {
			state.selectedAddress = action.payload;
			localStorage.setItem(
				"selectedAddress",
				JSON.stringify(state.selectedAddress)
			);
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchAddresses.pending, (state) => {
				state.fetchAddressloading = true;
				state.fetchAddresserror = null;
			})
			.addCase(fetchAddresses.fulfilled, (state, action) => {
				state.fetchAddressloading = false;
				state.address = action.payload.data;
				localStorage.setItem("address", JSON.stringify(state.address));
			})
			.addCase(fetchAddresses.rejected, (state, action) => {
				state.fetchAddressloading = false;
				state.fetchAddresserror = action.payload.error;
				toast.error("Failed to fetch addresses");
			})
			.addCase(addAddress.pending, (state) => {
				state.addAddressloading = true;
				state.addAddresserror = null;
			})
			.addCase(addAddress.fulfilled, (state, action) => {
				state.addAddressloading = false;
				state.address.push(action.payload.data);
				toast.success("Address Added Successfully");
				localStorage.setItem("address", JSON.stringify(state.address));
			})
			.addCase(addAddress.rejected, (state, action) => {
				state.addAddressloading = false;
				state.addAddresserror = action.payload.error;
				toast.error("Failed to add address");
			})
			.addCase(deleteUserAddress.pending, (state) => {
				state.fetchAddressloading = true;
				state.fetchAddresserror = null;
			})
			.addCase(deleteUserAddress.fulfilled, (state, action) => {
				state.fetchAddressloading = false;
				state.fetchAddresserror = action.payload;
				toast.success("Address deleted Successfully");
			})
			.addCase(deleteUserAddress.rejected, (state, action) => {
				state.fetchAddressloading = false;
				state.fetchAddresserror = action.payload.error;
				toast.error("Failed to delete address");
			});
	},
});
export const addaddressloading = (state) => state.address.addAddressloading;
export const addaddressError = (state) => state.address.addAddresserror;
export const fetchaddressloading = (state) => state.address.fetchAddressloading;
export const fetchaddressError = (state) => state.address.fetchAddresserror;
export const getAddresses = (state) => state.address.address;
export const { selectUserAddress } = addressSlice.actions;
export const getSelectedAddress = (state) => state.address.selectedAddress;
export default addressSlice.reducer;
