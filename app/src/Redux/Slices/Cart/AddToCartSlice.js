import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import setAuthToken from '../../../Auth';

// Set the header

export const addProductToCart = createAsyncThunk(
  'newProductToCart/addProductToCart',
  async (ProductData, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    setAuthToken(token);
    try {
      const response = await axios.post('http://127.0.0.1:8000/usercart/cart/add/', ProductData);
      return response.data;
    } catch (error) {
      // Handle error
      return rejectWithValue(error.response.data);
    }
  }
);

export const AddToCartSlice = createSlice({
  name: 'newProductToCart',
  initialState: {
    newproduct: {},
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addProductToCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addProductToCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.newproduct = action.payload; 
      })
      .addCase(addProductToCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload; 
      });
  },
});

export default AddToCartSlice.reducer;