import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import setAuthToken from '../../../Auth';

// Set the header
export const updateUserCart = createAsyncThunk(
  'updateCart/updateUserCart',
  async ({ product, quantity, id }) => {


    const token = localStorage.getItem('token');
    setAuthToken(token);
    try {
      const response = await axios.put(`http://127.0.0.1:8000/usercart/cart/items/${id}/`, { product, quantity });
      return response.data;
    } catch (error) {
      
      // Handle error
    }
  }
);

export const UpdateCartSlice = createSlice({
  name: 'updateCart',
  initialState: {
    updatedCart: {},
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateUserCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.updatedCart = action.payload; 
      })
      .addCase(updateUserCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload; 
      });
  },
});

export default UpdateCartSlice.reducer;