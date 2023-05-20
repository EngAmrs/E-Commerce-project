import {createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import setAuthToken from '../../../Auth';
import axios from 'axios';

// Set the header

export const fetchUserCart = createAsyncThunk('cartProducts/fetchUserCart', async () => {
    const token = localStorage.getItem('token');
    setAuthToken(token);
    const response = await axios.get(`http://127.0.0.1:8000/usercart/cart/items/`);
    return response.data;
  });
  
  export const userCartSlice = createSlice({
    name: "cartProducts",
    initialState: {
      products: [],
      count: 0,
      status: 'idle',
      error: null
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchUserCart.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchUserCart.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.products = action.payload.products.map(product => ({ data: product }));
          for (let i = 0; i < action.payload.cart_items.length; i++) {
            const cartItem = action.payload.cart_items[i];
            const productIndex = state.products.findIndex(product => product.data.id === cartItem.product);
            if (productIndex !== -1) {
              state.products[productIndex].totalPrice = cartItem.totalPrice;
              state.products[productIndex].qty = cartItem.quantity;
              state.products[productIndex].itemId = cartItem.id;
            }
          }
        })
        .addCase(fetchUserCart.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        });
    },
  });
  
  export default userCartSlice.reducer;