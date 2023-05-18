import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import setAuthToken from '../../../Auth';

// Set the header

export const deleteProduct = createAsyncThunk(
  'deleteProduct/deleteProduct',
  async (id, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    setAuthToken(token);
    console.log(token);
    try {
      const response = await axios.delete(`http://127.0.0.1:8000/usercart/cart/items/${id}/remove/`);
      return response.data;
    } catch (error) {
      // Handle error
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteFromCartSlice = createSlice({
  name: 'deleteProduct',
  initialState: {
    deletedProduct: {},
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteProduct.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.deletedProduct = action.payload; 
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload; 
      });
  },
});

export default deleteFromCartSlice.reducer;