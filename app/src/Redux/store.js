import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "./Slices/ShopSlices/CategoriesSlice";
import productsReducer from "./Slices/ShopSlices/ProductsSlice";
import allProductsReducer from "./Slices/ShopSlices/allProductsSlice";
import CartproductsReducer from "./Slices/Cart/CartProductsSlice"
const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    products: productsReducer,
    allProducts: allProductsReducer,

    cartProducts: CartproductsReducer,

  },
});

export default store;