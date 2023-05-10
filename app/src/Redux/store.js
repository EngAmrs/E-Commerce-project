import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "./Slices/ShopSlices/CategoriesSlice";
import productsReducer from "./Slices/ShopSlices/ProductsSlice";
import allProductsReducer from "./Slices/ShopSlices/allProductsSlice";
const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    products: productsReducer,
    allProducts: allProductsReducer,

  },
});

export default store;