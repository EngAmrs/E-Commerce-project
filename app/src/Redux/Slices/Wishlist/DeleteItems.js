import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import setAuthToken from '../../../Auth';

// Set the header

export const deleteItem = createAsyncThunk(
  'deleteWishlist/deleteItem',
  async (productId, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    setAuthToken(token);
    try {
      const response = await axios.delete(`http://localhost:8000/wishlist/${productId}/`);
      return response.data;
    } catch (error) {
      // Handle error
      return rejectWithValue(error.response.data);
    }
  }
);

export const DeleteWishlist = createSlice({
  name: 'deleteWishlist',
  initialState: {
    DeletedProduct: {},
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteItem.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.DeletedProduct = action.payload; 
      })
      .addCase(deleteItem.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload; 
      });
  },
});

export default DeleteWishlist.reducer;