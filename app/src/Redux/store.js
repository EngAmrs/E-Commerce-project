import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "./Slices/Shop/CategoriesSlice";
import productsReducer from "./Slices/Shop/ProductsSlice";
import allProductsReducer from "./Slices/Shop/allProductsSlice";
import CartproductsReducer from "./Slices/Cart/CartProductsSlice"
import getAddressReducer from "./Slices/Order/getAddressSlice";
import setNewAddressReducer from "./Slices/Order/setNewAddressSlice";
import CreateOrderReducer from "./Slices/Order/createOrderSlice";
const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    products: productsReducer,
    allProducts: allProductsReducer,
    cartProducts: CartproductsReducer,

    // Order Reducers
    orderUserAddress: getAddressReducer,
    setNewAddress: setNewAddressReducer,
    createNewOrder: CreateOrderReducer,

  },
});

export default store;