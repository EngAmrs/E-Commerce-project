import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import setAuthToken from '../../../Auth';

// Set the header

export const cancelOrder = createAsyncThunk(
  'cancelOrderS/cancelOrder',
  async (id, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    setAuthToken(token);
    try {
      const response = await axios.put(`http://127.0.0.1:8000/userorder/${id}`);
      return response.data;
    } catch (error) {
      // Handle error
      return rejectWithValue(error.response.data);
    }
  }
);

export const cancelOrderSlice = createSlice({
  name: 'cancelOrderS',
  initialState: {
    canceledProduct: {},
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(cancelOrder.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.canceledProduct = action.payload; 
      })
      .addCase(cancelOrder.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload; 
      });
  },
});

export default cancelOrderSlice.reducer;