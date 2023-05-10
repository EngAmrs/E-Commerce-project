import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchProducts = createAsyncThunk('products/fetchProducts', async ({id, limit, page}) => {
       const response = await axios.get(`http://127.0.0.1:8000/product/category/${id}?limit=${limit}&page=${page}`);
    return response.data;
  });

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    count: 0,
    status: 'idle',
    error: null,
  },
  reducers: { },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload.results.products;
        state.count = action.payload.count;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default productsSlice.reducer;