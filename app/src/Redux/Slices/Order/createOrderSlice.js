import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import setAuthToken from '../../../Auth';

// Set the header
const token = localStorage.getItem('token');
setAuthToken(token);

export const createOrder = createAsyncThunk(
  'userNewOrder/createOrder',
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/userorder/', orderData);
      return response.data;
    } catch (error) {
      // Handle error
      return rejectWithValue(error.response.data);
    }
  }
);

export const CreateOrderSlice = createSlice({
  name: 'userNewOrder',
  initialState: {
    newOrder: {},
    orderStatus: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.orderStatus = 'loading';
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orderStatus = 'succeeded';
        state.newAddress = action.payload; // Assuming the response contains the newly added address
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.orderStatus = 'failed';
        state.error = action.payload; // Access the error message from the action.payload
      });
  },
});

export default CreateOrderSlice.reducer;