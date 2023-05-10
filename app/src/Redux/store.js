import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "./Slices/CategoriesSlice";
import productsReducer from "./Slices/ProductsSlice";
import allProductsReducer from "./Slices/allProductsSlice";
const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    products: productsReducer,
    allProducts: allProductsReducer,

  },
});

export default store;