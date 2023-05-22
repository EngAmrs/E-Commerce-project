import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import setAuthToken from '../../../Auth';

// Set the header

export const AddToWishlist = createAsyncThunk(
  'AddWishlist/AddToWishlist',
  async (data, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    setAuthToken(token);
    try {
      const response = await axios.post('http://localhost:8000/wishlist/', data);
      return response.data;
    } catch (error) {
      // Handle error
      return rejectWithValue(error.response.data);
    }
  }
);

export const AddWishlist = createSlice({
  name: 'AddWishlist',
  initialState: {
    wishlistProduct: {},
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(AddToWishlist.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(AddToWishlist.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.wishlistProduct = action.payload; 
      })
      .addCase(AddToWishlist.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload; 
      });
  },
});

export default AddWishlist.reducer;