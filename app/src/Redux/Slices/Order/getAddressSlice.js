import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import setAuthToken from '../../../Auth';

// Set the header
const token = localStorage.getItem('token');
setAuthToken(token);

export const fetchUserAddresses = createAsyncThunk('userAddresses/fetchUserAddresses', async () => {
       const response = await axios.get(`http://127.0.0.1:8000//user/address/`);
    return response.data;
  });

export const userAddressesSlice = createSlice({
  name: "userAddresses",
  initialState: {
    addresses: [],
    addressStatus: 'idle',
    error: null,
  },
  reducers: { },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserAddresses.pending, (state) => {
        state.addressStatus = 'loading';
      })
      .addCase(fetchUserAddresses.fulfilled, (state, action) => {
        state.addressStatus = 'succeeded';
        state.addresses = action.payload;
      })
      .addCase(fetchUserAddresses.rejected, (state, action) => {
        state.addressStatus = 'failed';
        state.error = action.error.message;
      });
  },
});

export default userAddressesSlice.reducer;