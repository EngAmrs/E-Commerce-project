import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import setAuthToken from '../../../Auth';

// Set the header
const token = localStorage.getItem('token');
setAuthToken(token);

export const addNewAddress = createAsyncThunk(
  'userAddresses/addNewAddress',
  async (addressData, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/user/address/', addressData);
      return response.data;
    } catch (error) {
      // Handle error
      return rejectWithValue(error.response.data);
    }
  }
);

export const setNewAddressSlice = createSlice({
  name: 'userAddresses',
  initialState: {
    addresses: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addNewAddress.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addNewAddress.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.addresses.push(action.payload); // Assuming the response contains the newly added address
      })
      .addCase(addNewAddress.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload; // Access the error message from the action.payload
      });
  },
});

export default setNewAddressSlice.reducer;