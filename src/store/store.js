import { configureStore } from "@reduxjs/toolkit";
import priceReducer from "./slices/priceSlice";
import marketReducer from "./slices/marketSlice";
import suggestionReducer from "./slices/suggestionSlice";

export const store = configureStore({
  reducer: {
    prices: priceReducer,
    markets: marketReducer,
    suggestions: suggestionReducer,
  },
});
