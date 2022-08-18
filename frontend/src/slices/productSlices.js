import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quantity: 0,
  vat: 0,
  priceNet: 0,
  priceGross: 0,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    totalPrice: (state, action) => {
      state.priceNet = action.payload;
      console.log(state.priceNet);
    },
    vatCal: (state, action) => {
      state.vat = action.payload;
      console.log(state.vat);
    },
  },
});

// Action creators are generated for each case reducer function
export const { totalPrice, vatCal } = counterSlice.actions;

export default counterSlice.reducer;
