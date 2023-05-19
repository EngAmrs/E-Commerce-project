import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import setAuthToken from '../../../Auth';

// Set the header
const token = localStorage.getItem('token');
setAuthToken(token);

export const fetchUserOrders = createAsyncThunk('userOrders/fetchUserOrders', async () => {
       const response = await axios.get(`http://127.0.0.1:8000/userorder/`);
    return response.data;
  });

export const userOrdersSlice = createSlice({
  name: "userOrders",
  initialState: {
    orders: [],
    status: 'idle',
    error: null,
  },
  reducers: { },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserOrders.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.orders = action.payload;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default userOrdersSlice.reducer;