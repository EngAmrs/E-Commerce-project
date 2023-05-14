import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchAllProducts = createAsyncThunk('allProducts/fetchAllProducts', async ({limit, page}) => {
       const response = await axios.get(`http://127.0.0.1:8000/product/products?limit=${limit}&page=${page}`);
    return response.data;
  });

export const allProductsSlice = createSlice({
  name: "allProducts",
  initialState: {
    products: [],
    count: 0,
    status: 'idle',
    error: null,
  },
  reducers: { },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload.results;
        state.count = action.payload.count;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default allProductsSlice.reducer;