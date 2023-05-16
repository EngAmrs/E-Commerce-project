import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchCategories = createAsyncThunk('categories/fetchCategories', async ({limit, page}) => {
    const response = await axios.get(`http://127.0.0.1:8000/product/categories?limit=${limit}&page=${page}`);
    return response.data;
  });

export const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
    count: 0,
    status: 'idle',
    error: null,
  },
  reducers: { },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories = action.payload.results.categories;
        state.count = action.payload.count;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default categoriesSlice.reducer;