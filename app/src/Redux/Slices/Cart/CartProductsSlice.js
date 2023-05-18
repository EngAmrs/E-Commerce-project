import {createSlice } from '@reduxjs/toolkit';



export const CartProductsSlice = createSlice({
  name: "allProducts",
  initialState: {
    visitorProducts: [],
    count: 0,

  },
  reducers: {
    setProducts: (state, action) => {
        state.visitorProducts = action.payload;
      },

   },
});

export const { setProducts } = CartProductsSlice.actions;
export default CartProductsSlice.reducer;