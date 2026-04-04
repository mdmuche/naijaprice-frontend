import { configureStore } from "@reduxjs/toolkit";
import priceReducer from "./slices/priceSlice";

export const store = configureStore({
  reducer: {
    prices: priceReducer,
  },
});
