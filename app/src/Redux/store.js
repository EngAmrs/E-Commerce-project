import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "./Slices/CategoriesSlice";
const store = configureStore({
  reducer: {
    categories: categoriesReducer,
  },
});

export default store;