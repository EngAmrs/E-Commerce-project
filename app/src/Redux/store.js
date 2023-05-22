import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "./Slices/Shop/CategoriesSlice";
import productsReducer from "./Slices/Shop/ProductsSlice";
import allProductsReducer from "./Slices/Shop/allProductsSlice";
import CartproductsReducer from "./Slices/Cart/CartProductsSlice"
import getAddressReducer from "./Slices/Order/getAddressSlice";
import setNewAddressReducer from "./Slices/Order/setNewAddressSlice";
import CreateOrderReducer from "./Slices/Order/createOrderSlice";
import AddToCartReducer from "./Slices/Cart/AddToCartSlice"
import userCartrReducer from "./Slices/Cart/userCartSlice"
import deleteFromCartReducer from "./Slices/Cart/deleteFromCartSlice"
import UpdateCartReducer from "./Slices/Cart/UpdateCartSlice"
import userOrdersReducer from "./Slices/Order/getOrdersSlice"
import cancelOrderReducer from './Slices/Order/cancelOrderSlice'
import paymentReducer from './Slices/Order/PaymentSlice'
import AddToWishlistReducer from "./Slices/Wishlist/Wishlist";
import DeleteWishlistReducer from "./Slices/Wishlist/DeleteItems";

const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    products: productsReducer,
    allProducts: allProductsReducer,

    // Cart
    cartProducts: CartproductsReducer,
    userCart: userCartrReducer,
    addtoCart: AddToCartReducer,
    deleteFromCart: deleteFromCartReducer,
    updateCart: UpdateCartReducer,

    // Order Reducers
    orderUserAddress: getAddressReducer,
    setNewAddress: setNewAddressReducer,
    createNewOrder: CreateOrderReducer,
    getUserOrders: userOrdersReducer,
    cancelOrder: cancelOrderReducer,
    paymentCard: paymentReducer,
    
    // Wishlist
    addToWishlist: AddToWishlistReducer,
    deleteFromWishlist: DeleteWishlistReducer,

  },
});

export default store;