import { configureStore } from "@reduxjs/toolkit";
import priceReducer from "./slices/priceSlice";
import marketReducer from "./slices/marketSlice";

export const store = configureStore({
  reducer: {
    prices: priceReducer,
    markets: marketReducer,
  },
});
