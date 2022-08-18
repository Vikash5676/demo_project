import { configureStore } from "@reduxjs/toolkit";
import { counterSlice } from "../slices/productSlices";

export const store = configureStore({
  reducer: {
    counterSlice: counterSlice,
  },
});
