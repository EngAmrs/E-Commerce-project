import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


export const CartProductsSlice = createSlice({
  name: "allProducts",
  initialState: {
    products: [],
    count: 0,

  },
  reducers: {
    setProducts: (state, action) => {
        state.products = action.payload;
      },

   },

});

export const { setProducts } = CartProductsSlice.actions;
export default CartProductsSlice.reducer;